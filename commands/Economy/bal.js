const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		/**
         * Any default options can be omitted completely.
         * if all options are default, you can omit the constructor completely
         */
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["balance", "money", "won"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Check how much ₩ (won) you have.",
			extendedHelp: "Check how much ₩ (won) you have. See the Economy section of help for more.",
			usage: "[User:user]",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [User]) {
		const configuration = require("../../config.json");
		if (User === null || User === undefined) {
			await message.channel.send({
				embed: {
					color: 0x00FF00,
					author: {
						name: `${message.author.tag}'s won`,
						icon_url: `${message.author.avatarURL()}`,
					},
					url: "https://melonian.xyz",
					description: `You currently have ${message.author.settings.get("won")}₩.`,
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		} else {
			await message.channel.send({
				embed: {
					color: 0x00FF00,
					author: {
						name: `${User.tag}'s won`,
						icon_url: `${User.avatarURL()}`,
					},
					url: "https://melonian.xyz",
					description: `<@${User.id}> currently has ${User.settings.get("won")}₩.`,
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		}

		if (message.author.settings.get("won") < 0) {
			message.author.settings.update("won", 0);
		}
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}
};
