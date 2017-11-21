module.exports = (msg, args) => {
    // Imports
    var fs = require("fs");
    let bot = msg.channel.guild.shard.client;
    let configObj = JSON.parse(fs.readFileSync(process.cwd() + "/database/" + msg.channel.guild.id + ".json", 'utf8'));

    let resultComm = [];

    if (args.length > 0) {
        var settingsArr = args.join(" ");
        settingsArr = settingsArr.split("|");

        if (configObj.options[settingsArr[0]]) {
            var valueToSet = settingsArr[1];

            configObj.options[`${settingsArr[0]}`] = valueToSet;
            fs.writeFileSync("./database/" + msg.channel.guild.id + ".json", JSON.stringify(configObj, null, 2), 'utf-8');

            msg.channel.createMessage({
                embed: {
                    color: 0xD02825,
                    title: bot.user.username,
                    url: "https://github.com/TheRandomMelon/Melonian",
                    description: "Successfully set option " + settingsArr[0] + " to " + valueToSet + ".",
                    footer: {
                        text: "Recieved command on " + new Date(msg.timestamp).toString()
                    }
                }
            }).then (function(message) {
                console.log("[Command] Successfully ran command " + msg.prefix + "config | Ran by " + msg.author.username + "#" + msg.author.discriminator + " on " + msg.channel.guild.name);
            }).catch (function (reason) {
                console.log("[Error] Couldn't run " + msg.prefix + "config, " + reason);
            });
        } else {
            msg.channel.createMessage({
                embed: {
                    color: 0xD02825,
                    title: bot.user.username,
                    url: "https://github.com/TheRandomMelon/Melonian",
                    description: "Can't find option " + settingsArr[0],
                    footer: {
                        text: "Recieved command on " + new Date(msg.timestamp).toString()
                    }
                }
            }).then (function(message) {
                console.log("[Command] Wasn't able to find config option | Ran by " + msg.author.username + "#" + msg.author.discriminator + " on " + msg.channel.guild.name);
            }).catch (function (reason) {
                console.log("[Error] Couldn't run " + msg.prefix + "config, " + reason);
            });
        }
    } else {
        var objToPush = {
            name: "Staff Role ID",
            value: configObj.options.staff_role_id,
            inline: true
        };
        resultComm.push(objToPush);

        objToPush = {
            name: "Mod Commands On",
            value: configObj.options.mod_commands,
            inline: true
        };
        resultComm.push(objToPush);

        objToPush = {
            name: "warnChannel",
            value: configObj.options.warnChannel,
            inline: true
        };
        resultComm.push(objToPush);

        msg.channel.createMessage({
            embed: {
                color: 0xD02825,
                title: bot.user.username,
                url: "https://github.com/TheRandomMelon/Melonian",
                description: "Configuration for " + msg.channel.guild.name,
                fields: resultComm,
                footer: {
                    text: "Recieved command on " + new Date(msg.timestamp).toString()
                }
            }
        }).then (function(message) {
            console.log("[Command] Successfully ran command " + msg.prefix + "config | Ran by " + msg.author.username + "#" + msg.author.discriminator);
        }).catch (function (reason) {
            console.log("[Error] Couldn't run " + msg.prefix + "config, " + reason);
        });
    }
};