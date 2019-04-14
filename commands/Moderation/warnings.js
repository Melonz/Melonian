/* const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["strikes"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "See warnings for a member in the guild",
			extendedHelp: "See warnings for a member in the guild",
			usage: "<memberToCheck:member>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [memberToCheck]) {
		const configuration = require("../../config.json");
		let strikesForUser = message.channel.guild.configs.strikes.filter(s => s.user === memberToCheck);

		function createStrikesEmbedFields(strikesArray) {
			let outputArray = [];

			if (!Array.isArray(strikesArray) || !strikesArray.length) {
				outputArray.push({
					name: "Can't find any warnings",
					value: `There are no warnings for ${memberToCheck.user.tag} in this server.`,
					inline: true,
				});

				return outputArray;
			}

			for (let i in strikesArray) {
				outputArray.push({
					name: `${strikesArray[i].id.toString()} [${strikesArray[i].type.charAt(0).toUpperCase() + strikesArray[i].type.slice(1)}]`,
					value: `${strikesArray[i].reason}`,
					inline: true,
				});
			}
			return outputArray;
		}

		await message.channel.send({
			embed: {
				color: 0xD02825,
				author: {
					name: `Warnings/strikes for user "${memberToCheck.user.tag}"`,
					icon_url: `${memberToCheck.user.avatarURL()}`,
				},
				url: "https://melonian.xyz",
				fields: createStrikesEmbedFields(strikesForUser),
				footer: {
					text: `To remove a warning, see "removeWarning". ${this.client.user.username} v${configuration.version} powered by Melonian`,
				},
			},
		});
	}
}; */
