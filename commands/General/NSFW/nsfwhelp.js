const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
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
			permissionLevel: 0,
			description: "You'll need to use the help command in an NSFW channel to see the NSFW commands.",
			extendedHelp: "You'll need to use the help command in an NSFW channel to see the NSFW commands.",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [...params]) {
		if (message.channel.nsfw) {
			await message.channel.send("You're in a NSFW channel! Run `m!help` here for NSFW commands");
			return;
		}
		await message.channel.send("You'll need to use the help command in an NSFW channel to see the NSFW commands.");
	}
};
