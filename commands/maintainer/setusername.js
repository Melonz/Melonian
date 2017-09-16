module.exports = (msg, args) => { 
	let bot = msg.channel.guild.shard.client;
	bot.editSelf({
		username: args.join(" ")
	}).then (
		function okayDone() {
			msg.channel.createMessage({
				embed: {
					title: "Successfully changed username",
					description: "Alright! I've changed the username to ``" + args.join(" ") + "``.",
					color: 0x00FF80,
					footer: {
						text: "Recieved command on " + new Date(msg.timestamp).toString()
					}
				}
			});
		}
	).catch (
		(reason) => {
			msg.channel.createMessage({
				embed: {
					title: "Failed to change username",
					description: "I wasn't able to change the username.\nReason why: ```" + reason + "```",
					color: 0xFF0000,
					footer: {
						text: "Recieved command on " + new Date(msg.timestamp).toString()
					}
				}
			});
		}
	)
}