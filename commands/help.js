module.exports = (msg, args) => {
	let bot = msg.channel.guild.shard.client;
	let result = [];
	
	let varowners = "";
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
	
	function isCommandMaintainer(commandObj) {
		if (commandObj.requirements.userIDs === config.maintainers) {
			return true;
		} else {
			return false;
		}
	}

	function doesRequirePerm(commandObj) {
		if (commandObj.requirements.permissions != null || commandObj.requirements.permissions != undefined || commandObj.requirements.permissions != "") {
			return "Yes, " + JSON.stringify(commandObj.requirements.permissions);
		} else {
			return false;
		}
	}
	
	for(label in bot.commands) {
		if (bot.commands[label] && bot.commands[label].permissionCheck(msg)) {
			var objToPush = {
				name: msg.prefix + label,
				value: bot.commands[label].description,
				inline: false
			};	

			result.push(objToPush);
		}
	}
	
	if(args.length > 0) {
        var cur = bot.commands[bot.commandAliases[args[0]] || args[0]];
        if(!cur) {
            msg.channel.createMessage({
				embed: {
					color: 0xD02825,
					title: bot.user.username + " | m!help",
					url: "https://github.com/TheRandomMelon/Melonian",
					description: "Couldn't find command ``" + msg.prefix + args[0] + "``",
					footer: {
						text: "Recieved command on " + new Date(msg.timestamp).toString()
					}
				}
			}).then (function yoy() {
					console.log("[Command] Successfully ran " + msg.prefix + "help " + args.join("") + " command (cmd not found...)");
				}
			).catch (
				(reason) => {
					console.log("[Error] [Command] Failed to run " + msg.prefix + "help " + args.join("") + " command: \n Reason why:\n" +reason);
				}
			);
			
			return;
        }
		let resultComm = [];
		
		var objToPush = {
			name: "Description",
			value: cur.description,
			inline: false
		};
		resultComm.push(objToPush);
		
		function findCurUsage() {
			if (cur.usage === null || cur.usage === "") {
				return "[]";
			} else {
				return cur.usage;
			}
		}
		
		objToPush = {
			name: "Usage",
			value: "``" + findCurUsage() + "``",
			inline: false
		};
		resultComm.push(objToPush);
		
		var objToPush = {
			name: "Maintainer-only?",
			value: isCommandMaintainer(cur),
			inline: false
		};
		resultComm.push(objToPush);

		var objToPush = {
			name: "Requires permissions?",
			value: doesRequirePerm(cur),
			inline: false
		};
		resultComm.push(objToPush);

		if (Object.keys(cur.aliases).length > 0) {
			var objToPush = {
				name: "Aliases",
				value: "``" + cur.aliases.join(", ") + "``",
				inline: false
			};
			resultComm.push(objToPush);
        }
		
		msg.channel.createMessage({
				embed: {
					color: 0xD02825,
					title: bot.user.username + " | m!help",
					url: "https://github.com/TheRandomMelon/Melonian",
					description: "More information on " + msg.prefix + args.join(" "),
					fields: resultComm,
					footer: {
						text: "Recieved command on " + new Date(msg.timestamp).toString()
					}
				}
			}).then (function yoy() {
					console.log("[Command] Successfully ran " + msg.prefix + "help " + args.join("") + " command");
				}
			).catch (
				(reason) => {
					console.log("[Error] [Command] Failed to run " + msg.prefix + "help " + args.join("") + " command: \n Reason why:\n" +reason);
				}
			);
    } else {
		msg.channel.createMessage({
			embed: {
				color: 0xD02825,
				title: bot.user.username + " | A lightweight-ish Eris bot by TheRandomMelon",
				url: "https://github.com/TheRandomMelon/Melonian",
				description: "Instance owned by " + varowners + "\n\n__**Commands**__",
				fields: result,
				thumbnail: {
					url: "https://cdn.discordapp.com/avatars/" + bot.user.id + "/" + bot.user.avatar + ".png"
				},
				footer: {
					text: "Recieved command on " + new Date(msg.timestamp).toString()
				}
			}
		}).then (function yoy() {
				console.log("[Command] Successfully ran " + msg.prefix + "help command");
			}
		).catch (
			(reason) => {
				console.log("[Error] [Command] Failed to run " + msg.prefix + "help command: \n Reason why:\n" +reason);
			}
		);
	}
};