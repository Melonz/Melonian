const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			permissionLevel: 10,
			requiredSettings: [],
			aliases: [],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			description: "Say something as the bot (bot owner only)",
			extendedHelp: "Say something as the bot (bot owner only)",
			usage: "<msgToSay:str>",
			usageDelim: undefined,
			quotedStringSupport: true,
			subcommands: false,
		});
	}

	async run(message, [msgToSay]) {
		await message.delete();
		await message.channel.send(msgToSay);
	}
};
