const { Command, version: klasaVersion, Duration } = require("klasa");
const { version: discordVersion } = require("discord.js");
const Configuration = require("../../config.json");

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
			description: "Find out some stats about the bot",
			extendedHelp: "Find out some stats about the bot",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message) {
		let [users, guilds, channels, memory] = [0, 0, 0, 0];

		await message.channel.send({
			embed: {
				color: 0x00FF00,
				author: {
					name: `Bot statistics`,
					icon_url: `${this.client.user.avatarURL()}`,
				},
				url: "https://melonian.xyz",
				fields: [{
					name: "Memory Usage",
					value: `${(memory || process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
					inline: true,
				}, {
					name: "Uptime",
					value: `${Duration.toNow(Date.now() - (process.uptime() * 1000))}`,
					inline: true,
				}, {
					name: "Users",
					value: `${this.client.users.size}`,
					inline: true,
				}, {
					name: "Servers",
					value: `${this.client.guilds.size}`,
					inline: true,
				}, {
					name: "Text channels",
					value: `${this.client.channels.filter(c => c.type === "text").size}`,
					inline: true,
				}, {
					name: "Node.js version",
					value: `${process.version}`,
					inline: true,
				}, {
					name: "Melonian version",
					value: `${Configuration.version}`,
					inline: true,
				}, {
					name: "Discord.js version",
					value: `${discordVersion}`,
					inline: true,
				}, {
					name: "Klasa version",
					value: `${klasaVersion}`,
					inline: true,
				}],
				footer: {
					text: `${this.client.user.username} v${Configuration.version} powered by Melonian`,
				},
			},
		});
	}
};
