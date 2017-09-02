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
};

var bot = new Eris.CommandClient(config.token, {}, {
    description: config.desc,
    owner: owners(),
    prefix: config.prefix
});

/**
 * Ready event (when the bot's connected to Discord)
 */
bot.on("ready", () => {
    console.log("Adding commands... (This may take a bit)");

    for (const command in commands) {
        let theCommand = commands[command];

        try {
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

            /*
                Debugging
                ----------------------
                console.log("[theCommand]:" + theCommand);
                console.log("[theCommand.label]:" + theCommand.label);
                console.log("[theCommand.file]:" + theCommand.file);
                console.log("[theCommand.aliases]:" + theCommand.aliases);
                console.log("[theCommand.usage]:" + theCommand.usage);
                console.log("[require('./commands/' + theCommand.file);]: " + typeof require("./commands/" + theCommand.file));
            */

            bot.registerCommand(command, require("./commands/" + theCommand.file), {
                aliases: theCommand.aliases,
                guildOnly: true,
                description: theCommand.desc,
                usage: theCommand.usage,
                requirements: requireMaintainer
            });
        } catch (err) {
            console.error("[Error] " + err);
        }
    }

    console.log("\nAdded commands. Melonian is now ready to roll!");
});

bot.on("message", msg => {
	// Old
});

bot.connect(); // Won't start without it