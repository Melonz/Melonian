const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["info", "invite"],
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
				description: `Melonian is a lightweight-ish Discord.js bot, designed to be packed with features, versatile, and easily self-hostable. The bot you're using, ${this.client.user.username}, is powered by Melonian.\n\nCheck it out on [**GitLab**](https://gitlab.com/Melonz/Melonian).\n\nFor updates and other status info on Melonian, [follow @melonianbot on Twitter](https://twitter.com/melonianbot).\n\nMelonian also has a listing on Discord Bot List (top.gg) right [here](https://top.gg/bot/236987731232686081)! Whoever votes will get \`100₩\` (or \`200₩\` for a weekend)`,
				footer: {
					text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
				},
			},
		});
	}
};
