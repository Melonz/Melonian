const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["question"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "A simple 8-ball.",
			extendedHelp: "A simple 8-ball.",
			usage: "<question:str>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [question]) {
		const configuration = require("../../../config.json");
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		switch (getRandomInt(20)) {
			case 0:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "It is certain.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 1:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "It is decidedly so.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 2:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "Without a doubt.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;	
			case 3:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "Yes - definitely.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 4:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "You may rely on it.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 5:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "As I see it, yes.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 6:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "Most likely.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 7:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "Outlook good.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 8:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "Yes.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 9:
				await message.channel.send({
					embed: {
						color: 0x008000,
						title: "Answer to your question",
						description: "Signs point to yes.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 10:
				await message.channel.send({
					embed: {
						color: 0xffd700,
						title: "Answer to your question",
						description: "Reply hazy, try again",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 11:
				await message.channel.send({
					embed: {
						color: 0xffd700,
						title: "Answer to your question",
						description: "Ask again later.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 12:
				await message.channel.send({
					embed: {
						color: 0xffd700,
						title: "Answer to your question",
						description: "Better not tell you now.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 13:
				await message.channel.send({
					embed: {
						color: 0xffd700,
						title: "Answer to your question",
						description: "Cannot predict now.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 14:
				await message.channel.send({
					embed: {
						color: 0xffd700,
						title: "Answer to your question",
						description: "Concentrate and ask again.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 15:
				await message.channel.send({
					embed: {
						color: 0xff0000,
						title: "Answer to your question",
						description: "Don't count on it.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 16:
				await message.channel.send({
					embed: {
						color: 0xff0000,
						title: "Answer to your question",
						description: "My reply is no.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 17:
				await message.channel.send({
					embed: {
						color: 0xff0000,
						title: "Answer to your question",
						description: "My sources say no.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 18:
				await message.channel.send({
					embed: {
						color: 0xff0000,
						title: "Answer to your question",
						description: "Outlook not so good.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			case 19:
				await message.channel.send({
					embed: {
						color: 0xff0000,
						title: "Answer to your question",
						description: "Very doubtful.",
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
			default:
				await message.channel.send({
					embed: {
						color: 0xffd700,
						title: "Answer to your question",
						description: `Concentrate and ask again.`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
				break;
		}
	}

	async init() {
		/*
		 * You can optionally define this method which will be run when the bot starts
		 * (after login, so discord data is available via this.client)
		 */
	}
};
