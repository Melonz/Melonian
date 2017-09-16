const Eris = require("eris");
const fs = require('fs');
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

var bot = new Eris.CommandClient(config.token, {}, {
    description: config.desc,
    owner: owners(),
    prefix: config.prefix,
	defaultHelpCommand: false,
    permissionMessage: "You don't have permission to use this command."
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
    console.log("\nAdded commands. Melonian is now ready to roll!");
});


bot.connect(); // Won't start without it