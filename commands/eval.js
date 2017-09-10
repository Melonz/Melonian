module.exports = (msg, args) => {
	if (args) {
		try {
			let msgcontent = args.join(" ");
			let bot = msg.channel.guild.shard.client;

			if (msgcontent.startsWith("```js") && msgcontent.endsWith("```")) {
				msgcontent = msgcontent.substring(5, msgcontent.length - 3);
			}
			const asyncCode = code => `(async () => {\nreturn ${code}\n})()`;
			let result = eval(asyncCode(msgcontent));
			if (typeof result !== "string") result = require("util").inspect(result, false, 2);
			result = result.replace(new RegExp(`${bot.token}|${config.token}`, "g"), "nuh-uh sonny boy no token 4 u");
			msg.channel.createMessage({
				embed: {
					description: `\`\`\`js\n${result}\`\`\``,
					color: 0x3669FA,
				},
			});
		} catch (err) {
			msg.channel.createMessage({
				embed: {
					description: `\`\`\`js\n${err}\`\`\``,
					color: 0xFF0000,
				},
			});
		}
	} else {
		msg.channel.createMessage({
			embed: {
				description: `You want me to evaluate what, now?`,
				color: 0xFF0000,
			},
		});
	}
}