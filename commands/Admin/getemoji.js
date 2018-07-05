// NOTE: This command was implemented so I could test animated emoji support.
// You can change the permissionLevel to 0 if you'd like to let other users use this command.
const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text"],
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
			permissionLevel: 9,
			description: "",
			extendedHelp: "No extended help available.",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [...params]) {
		let someemojis = "";
		for (let e in message.channel.guild.emojis.array()) {
			if (message.channel.guild.emojis.array()[e].animated) {
				someemojis += `<${message.channel.guild.emojis.array()[e].identifier}> — Name: \`:${message.channel.guild.emojis.array()[e].name}:\` — Animated: ${message.channel.guild.emojis.array()[e].animated} — Requires Colons: ${message.channel.guild.emojis.array()[e].requiresColons}\n`;
			} else {
				someemojis += `<:${message.channel.guild.emojis.array()[e].identifier}> — Name: \`:${message.channel.guild.emojis.array()[e].name}:\` — Animated: ${message.channel.guild.emojis.array()[e].animated} — Requires Colons: ${message.channel.guild.emojis.array()[e].requiresColons}\n`;
			}
		}
		await message.channel.send(someemojis);
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}
};
