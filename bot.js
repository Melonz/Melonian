const Eris = require("eris");
const fs = require('fs');
var util = require('util');

let package = require("./package.json");
global.version = package.version;

global.config = require("./config.js");
global.commands = JSON.parse(fs.readFileSync('./commands.json', 'utf8'));

/**
 * The owner(s) in a list.
 * @returns {string} The owners in a string list
 */
function owners() {
    var varowners = "";
    config.maintainers.forEach(function(i, idx, array){
        if (array.length != 1) {
            if (idx === array.length - 1) {
                varowners += "and <@" + i + ">";
            } else {
                varowners += "<@" + i + ">, ";
            }
        } else {
            varowners = "<@" + i + ">";
        }
    }, this);

    return varowners;
}

let bot = new Eris.CommandClient(config.token, {}, {
    description: config.desc,
    owner: owners(),
    prefix: config.prefix,
	defaultHelpCommand: false,
    defaultCommandOptions: {
        permissionMessage: "🤖 Computer says no! (You don't have permission to use this command.)"
    }
});


function switchPlayingGame() {
	let randomQuote = Math.floor(Math.random() * config.playingQuotes.length);
	console.log(`[Changed playing quote] Changed to "${config.playingQuotes[randomQuote]}"`);
	bot.editStatus({
		"name": config.playingQuotes[randomQuote],
		"type": 0
	});
};

/**
 * Ready event (when the bot's connected to Discord)
 */
bot.on("ready", () => {
    console.log("Adding commands... (This may take a bit)");

    for (const command in commands) {
        let theCommand = commands[command];

            /**
             * Sets permissions object, depending on if the command is maintainer-only or not
             */
            let requireMaintainer;
            
            if (theCommand.maintainer === true) {
                requireMaintainer = {
                    userIDs: config.maintainers
                }
            } else if (theCommand.maintainer === false && theCommand.permissions != undefined) {
                requireMaintainer = {
                    permissions: theCommand.permissions
                }
            } else {
                requireMaintainer = {};
            }
			
            bot.registerCommand(command, require("./commands/" + theCommand.file), {
                aliases: theCommand.aliases,
                guildOnly: true,
                description: theCommand.desc,
                usage: theCommand.usage,
                requirements: requireMaintainer
            });
    }

	switchPlayingGame();
	
	setInterval(function(){
		switchPlayingGame();
	}, 900000);
    console.log("\nAdded commands. Checking config files...");

    bot.guilds.forEach(function (guild) {
        if (fs.existsSync("./database/" + guild.id + ".json")) {
            console.log("[Config] Found config file for server '" + guild.name + "'");   
        } else {
            console.log("[Error] Couldn't find config for server '" + guild.name + "', creating one");
            
            var obj = {
                name: guild.name,
                id: guild.id,
                options: {
                    staff_role_id: "Unspecified",
                    mod_commands: "false"
                }
            };

            fs.writeFileSync("./database/" + guild.id + ".json", JSON.stringify(obj, null, 2), 'utf-8');
        }
    });
});


bot.connect(); // Won't start without it