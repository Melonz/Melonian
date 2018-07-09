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
			description: "Gamble an amount of won (default is 10₩)",
			extendedHelp: "Gamble an amount of won (default is 10₩). If you tie, you get quadruple your bet. If you get a higher number than your opponent, you get double your bet. If you get less, you lose your bet. (50 bet, you'd lose 100)",
			usage: "[moneyToGamble:number]",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [moneyToGamble]) {
		const configuration = require("../../../config.json");
		if (moneyToGamble === undefined || moneyToGamble === null || moneyToGamble === 0) {
			moneyToGamble = 10;
		} else if (moneyToGamble < 1) {
			await message.channel.send(`:x: You cannot bet less than 1!`);
			return;
		}

		if (message.author.configs.won < moneyToGamble * 2) {
			await message.channel.send(`:x: You don't have enough money to gamble this. (You need double your bet, in case you lose and have to pay more.)`);
			return;
		}
		await message.author.configs.update("won", message.author.configs.won - moneyToGamble);

		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		let playerRNG = getRandomInt(12);
		let botRNG = getRandomInt(12);

		let moneyWon;

		if (playerRNG === botRNG) {
			moneyWon = moneyToGamble * 4;
			await message.author.configs.update("won", message.author.configs.won + moneyWon);
			await message.channel.send({
				embed: {
					color: 0x00FF00,
					author: {
						name: `Gambling result`,
						icon_url: `${message.author.avatarURL()}`,
					},
					description: `You tied with me, so you get quadruple your bet, which is ${moneyWon}₩! (You now have ${message.author.configs.won})`,
					fields: [{
						name: `You (${message.author.tag})`,
						value: `:ballot_box_with_check: Rolled a ${playerRNG}`,
						inline: true,
					}, {
						name: `Melonian`,
						value: `:x: Rolled a ${botRNG}`,
						inline: true,
					}],
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		} else if (playerRNG > botRNG) {
			moneyWon = moneyToGamble * 2;
			await message.author.configs.update("won", message.author.configs.won + moneyWon);
			await message.channel.send({
				embed: {
					color: 0x00FF00,
					author: {
						name: `Gambling result`,
						icon_url: `${message.author.avatarURL()}`,
					},
					description: `You got a higher number than me, so you win ${moneyWon}₩! (You now have ${message.author.configs.won})`,
					fields: [{
						name: `You (${message.author.tag})`,
						value: `:ballot_box_with_check: Rolled a ${playerRNG}`,
						inline: true,
					}, {
						name: `Melonian`,
						value: `:x: Rolled a ${botRNG}`,
						inline: true,
					}],
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		} else if (playerRNG < botRNG) {
			await message.author.configs.update("won", message.author.configs.won - moneyToGamble);
			await message.channel.send({
				embed: {
					color: 0xf44242,
					author: {
						name: `Gambling result`,
						icon_url: `${message.author.avatarURL()}`,
					},
					description: `I have a higher number than you, so you lose ${moneyToGamble}₩! (You now have ${message.author.configs.won})`,
					fields: [{
						name: `You (${message.author.tag})`,
						value: `:x: Rolled a ${playerRNG}`,
						inline: true,
					}, {
						name: `Melonian`,
						value: `:ballot_box_with_check: Rolled a ${botRNG}`,
						inline: true,
					}],
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		}

		if (message.author.configs.won < 0) {
			message.author.configs.update("won", 0);
		}
	}
};
