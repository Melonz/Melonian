const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["profile", "userinfo", "user", "uinfo"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Get info for a guild member. Only usable in guilds.",
			extendedHelp: "Get info for a guild member. Only usable in guilds.",
			usage: "[Member:member]",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [Member]) {
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

		function usrNickname(memberobj) {
			if (memberobj.nickname === null) {
				return "No nickname";
			} else {
				return memberobj.nickname;
			}
		}

		const configuration = require("../../../config.json");
		if (Member === null || Member === undefined) {
			Member = message.member;
			const User = message.author;

			await message.channel.send({
				embed: {
					color: 0xD02825,
					author: {
						name: `${User.username}#${User.discriminator}`,
						icon_url: `${User.avatarURL()}`,
					},
					url: "https://melonian.xyz",
					fields: [{
						name: "📛 Nickname",
						value: `${usrNickname(Member)}`,
						inline: true,
					}, {
						name: "🤖 Bot?",
						value: `${User.bot}`,
						inline: true,
					}, {
						name: "📆 Date created",
						value: `${new Date(User.createdAt).toString()}`,
						inline: true,
					}, {
						name: "🤝 Joined guild on",
						value: `${new Date(Member.joinedAt).toString()}`,
						inline: true,
					}, {
						name: "🔒 Roles",
						value: `${getRoles(Member)}`,
						inline: true,
					}],
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		} else {
			const User = this.client.users.find(m => m.id === Member.id);

			await message.channel.send({
				embed: {
					color: 0xD02825,
					author: {
						name: `${User.username}#${User.discriminator}`,
						icon_url: `${User.avatarURL()}`,
					},
					url: "https://melonian.xyz",
					fields: [{
						name: "📛 Nickname",
						value: `${usrNickname(Member)}`,
						inline: true,
					}, {
						name: "🤖 Bot?",
						value: `${User.bot}`,
						inline: true,
					}, {
						name: "📆 Date created",
						value: `${new Date(User.createdAt).toString()}`,
						inline: true,
					}, {
						name: "🤝 Joined guild on",
						value: `${new Date(Member.joinedAt).toString()}`,
						inline: true,
					}, {
						name: "🔒 Roles",
						value: `${getRoles(Member)}`,
						inline: true,
					}],
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		}
	}
};
