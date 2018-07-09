const { Command, Timestamp } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text", "dm"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["dailywon"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Collect your daily won.",
			extendedHelp: "Collect your daily won. Keep collecting every day for streaks!",
			usage: "[usertogive:user]",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [usertogive]) {
		const configuration = require("../../config.json");
		const timeUntilCollection = message.author.configs.nextDailyCollection - Date.now();
		if (usertogive === null || usertogive === undefined) {
			if (timeUntilCollection > 0) {
				await message.channel.send({
					embed: {
						color: 0xf44242,
						author: {
							name: `Error collecting daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `You need to wait another \`${new Timestamp("HH [hours], mm [minutes] [and] ss [seconds]").displayUTC(timeUntilCollection)}\` before collecting your daily.`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
			} else if (timeUntilCollection <= 0 && timeUntilCollection >= -86400000) {
				await message.author.configs.update("dailyStreak", message.author.configs.dailyStreak + 1);
				let determineStreakWon = 25 * message.author.configs.dailyStreak;
				determineStreakWon += 100;
				await message.author.configs.update("won", message.author.configs.won + determineStreakWon);
				await message.author.configs.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Your daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully collected your daily won (you got \`+ ${determineStreakWon}₩\` because of your streak of ${message.author.configs.dailyStreak})!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
			} else if (timeUntilCollection < -86400000) {
				await message.author.configs.update("dailyStreak", 0);
				await message.author.configs.update("won", message.author.configs.won + 100);
				await message.author.configs.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Your daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully collected your daily won (you got \`+ 100₩\` because your streak got reset/started)!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
			}
		} else {
			if (timeUntilCollection > 0) {
				await message.channel.send({
					embed: {
						color: 0xf44242,
						author: {
							name: `Error giving daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `You need to wait another \`${new Timestamp("HH [hours], mm [minutes] [and] ss [seconds]").displayUTC(timeUntilCollection)}\` before giving your daily to <@${usertogive.id}>.`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
			} else if (timeUntilCollection <= 0 && timeUntilCollection >= -86400000) {
				await message.author.configs.update("dailyStreak", message.author.configs.dailyStreak + 1);
				let determineStreakWon = 25 * message.author.configs.dailyStreak;
				determineStreakWon += 100;
				await usertogive.configs.update("won", message.author.configs.won + determineStreakWon);
				await message.author.configs.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Gifting daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully gave your daily won to <@${usertogive.id}> (you gave ${usertogive.username} \`+ ${determineStreakWon}₩\` because of your streak of ${message.author.configs.dailyStreak})!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
			} else if (timeUntilCollection < -86400000) {
				await message.author.configs.update("dailyStreak", message.author.configs.dailyStreak + 1);
				await usertogive.configs.update("won", message.author.configs.won + 100);
				await message.author.configs.update("nextDailyCollection", Date.now() + 86400000);
				await message.channel.send({
					embed: {
						color: 0x00FF00,
						author: {
							name: `Gifting daily`,
							icon_url: `${message.author.avatarURL()}`,
						},
						description: `☑ Successfully gave your daily won to <@${usertogive.id}> (you gave ${usertogive.username} \`+ 100₩\` because your streak was just reset/created!`,
						footer: {
							text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
						},
					},
				});
			}
		}

		if (message.author.configs.won < 0) {
			message.author.configs.update("won", 0);
		}
	}
};
