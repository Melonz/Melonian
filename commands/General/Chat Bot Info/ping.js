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
			description: "Check the ping of the bot",
			extendedHelp: "Check the ping of the bot",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [...params]) {
		const configuration = require("../../../config.json");
		const m = await message.channel.send(":ping_pong: Pinging...");
		await m.edit({
			embed: {
				color: 0x00FF00,
				title: "Pong!",
				description: `Last heartbeat: ${Math.floor(this.client.ping)}ms`,
				footer: {
					text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
				},
			},
		});
	}
};
