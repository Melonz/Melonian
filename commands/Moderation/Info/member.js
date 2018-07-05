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
			permissionLevel: 0,
			description: "Get info for a guild member.",
			extendedHelp: "Get info for a guild member. Only usable in guilds, see user (userinfo) for user info only",
			usage: "<Member:member>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [Member]) {
		const configuration = require("../../../config.json");
		const User = this.client.users.find(m => m.id === Member.id);

		function usrNickname() {
			if (Member.nickname === null) {
				return "No nickname";
			} else {
				return Member.nickname;
			}
		}

		let rolestring = "";

		function getRoles() {
			for (let r in Member.roles.array()) {
				if (Number(r) === Member.roles.array().length - 1) {
					rolestring += `and ${Member.roles.array()[r].name}`;
				} else {
					rolestring += `${Member.roles.array()[r].name}, `;
				}
			}
			return rolestring;
		}

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
					value: `${usrNickname()}`,
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
					value: `${getRoles()}`,
					inline: true,
				}],
				footer: {
					text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
				},
			},
		});
	}
};
