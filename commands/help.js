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
	}).then (
		function yoy() {
			console.log("[Command] Successfully ran " + msg.prefix + "help command");
		}
	).catch (
		(reason) => {
			console.log("[Error] [Command] Failed to run " + msg.prefix + "help command: \n Reason why:\n" +reason);
		}
	);
};