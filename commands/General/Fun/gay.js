const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["gai"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Find out how \"gai\" someone is",
			extendedHelp: "Find out how \"gai\" someone is (it's RNG btw)",
			usage: "<User:user>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [User]) {
		const configuration = require("../../../config.json");
		const percentage = Math.floor((Math.random() * 101) + 1);

		switch (User.id) {
			case "155432796247162881":
				await message.channel.send({
					embed: {
						color: 0x076fe0,
						title: `Is ${User.tag} gai?`,
						description: `Barely, he's 35% gai`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case "146019453291855872":
				await message.channel.send({
					embed: {
						color: 0x076fe0,
						title: `Is ${User.tag} gai?`,
						description: `Definitely, he's ${Math.floor(new Date() / 1000)}% gai 🏳️‍🌈`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case "146002743121805312":
				await message.channel.send({
					embed: {
						color: 0x076fe0,
						title: `Is ${User.tag} gai?`,
						description: `Erm, he's 38% gai`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case "155430797694861312":
				await message.channel.send({
					embed: {
						color: 0x076fe0,
						title: `Is ${User.tag} gai?`,
						description: `I don't know how this is possible, but he's -24% gai`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			default:
				if (percentage > 50) {
					await message.channel.send({
						embed: {
							color: 0x076fe0,
							title: `Is ${User.tag} gai?`,
							description: `I don't know who "<@${User.id}>" is... I'll guess that they're ${percentage}% gai 🏳️‍🌈`,
							footer: {
								text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
							},
						},
					});
				} else {
					await message.channel.send({
						embed: {
							color: 0x076fe0,
							title: `Is ${User.tag} gai?`,
							description: `I don't know who "<@${User.id}>" is... I'll guess that they're ${percentage}% gai`,
							footer: {
								text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
							},
						},
					});
				}
				break;
		}
	}
};
