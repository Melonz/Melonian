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
			description: "Get info on a server (can only be run in servers).",
			extendedHelp: "Get info on a server (can only be run in servers).",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [...params]) {
		const configuration = require("../../../config.json");

		if (message.channel.guild === undefined || message.channel.guild === null) {
			await message.channel.send(":x: Please use this command on a server.");
			return;
		}

		let rolestring = "";
		function getRoles(memberobj) {
			for (let r in memberobj.roles.array()) {
				if (Number(r) === memberobj.roles.array().length - 1) {
					rolestring += `and ${memberobj.roles.array()[r].name}`;
				} else {
					rolestring += `${memberobj.roles.array()[r].name}, `;
				}
			}
			return rolestring;
		}

		function getRegion(region) {
			switch (region) {
				case "brazil":
					return "🇧🇷 Brazil";
				case "eu-central":
					return "🇪🇺 Central Europe";
				case "hongkong":
					return "🇭🇰 Hong Kong";
				case "japan":
					return "🇯🇵 Japan";
				case "russia":
					return "🇷🇺 Russia";
				case "singapore":
					return "🇸🇬 Singapore";
				case "sydney":
					return "🇦🇺 Sydney";
				case "us-central":
					return "🇺🇸 US Central";
				case "us-east":
					return "🇺🇸 US East";
				case "us-south":
					return "🇺🇸 US South";
				case "us-west":
					return "🇺🇸 US West";
				case "eu-west":
					return "🇪🇺 Western Europe";
				default:
					return `❔ Other region (\`${region}\`)`;
			}
		}

		await message.channel.send({
			embed: {
				color: 0xD02825,
				author: {
					name: `Information about server "${message.channel.guild.name}"`,
					icon_url: `${message.channel.guild.iconURL()}`,
				},
				url: "https://melonian.xyz",
				fields: [{
					name: "📛 Name",
					value: `${message.channel.guild.name}`,
					inline: true,
				}, {
					name: "👥 Members",
					value: `${message.channel.guild.members.size} (${message.channel.guild.members.filter(m => m.user.bot === false).size} humans, ${message.channel.guild.members.filter(m => m.user.bot === true).size} bots)`,
					inline: true,
				}, {
					name: "📆 Date created",
					value: `${new Date(message.channel.guild.createdAt).toString()}`,
					inline: true,
				}, {
					name: "👤 Owner",
					value: `<@${message.channel.guild.ownerID}>`,
					inline: true,
				}, {
					name: "🏳 Region",
					value: `${getRegion(message.channel.guild.region)}`,
					inline: true,
				}, {
					name: "💬 Channels",
					value: `${message.channel.guild.channels.size} channels (${message.channel.guild.channels.filter(m => m.type === "text").size} text and ${message.channel.guild.channels.filter(m => m.type === "voice").size} voice, in ${message.channel.guild.channels.filter(m => m.type === "category").size} categories)`,
					inline: true,
				}, {
					name: "🔒 Roles",
					value: `${getRoles(message.channel.guild)}`,
					inline: true,
				}],
				footer: {
					text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
				},
			},
		});
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}
};
