const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["info"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Find out more about Melonian, which this bot is powered by",
			extendedHelp: "Find out more about Melonian, the Discord bot project that this bot is powered by.",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [...params]) {
		const configuration = require("../../../config.json");
		await message.channel.send({
			embed: {
				color: 0x00FF00,
				title: "About Melonian",
				description: `Melonian is a lightweight-ish Discord.js bot, designed to be packed with features, versatile, and easily self-hostable. The bot you're using, ${this.client.user.username}, is powered by Melonian.\n\nCheck it out at [melonian.xyz](https://melonian.xyz).\n\nFor updates and other status info on Melonian, [follow @melonianbot on Twitter](https://twitter.com/melonianbot).`,
				footer: {
					text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
				},
			},
		});
	}
};
