const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text"],
			requiredPermissions: [],
			aliases: ["strike"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Warn a user for being naughty (Moderator and above only)",
			extendedHelp: "Warn a user for being naughty (Moderator and above only)",
			usage: "<memberToWarn:member> [reason:str]",
			usageDelim: " | ",
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [memberToWarn, reason]) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		function doThing() {
			let randomid = getRandomInt(999999999);

			// Checks to see if the strike ID already exists to avoid conflicts
			if (message.channel.guild.configs.strikes.find(s => s.id === randomid) === undefined || message.channel.guild.configs.strikes.find(s => s.id === randomid) === null) {
				message.channel.guild.configs.update("strikes", { id: randomid, user: memberToWarn, reason: reason || "No reason", type: "warning", striker: message.member });
				message.channel.send(`:ballot_box_with_check: Striked user ${memberToWarn.user.tag} successfully.`);
				return;
			} else {
				doThing();
			}
		}

		if (memberToWarn.user.id === message.channel.guild.ownerID) {
			await message.channel.send(`:x: You cannot warn the server owner!`);
			return;
		} else if (memberToWarn.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) {
			await message.channel.send(`:x: You can't warn a person who has a higher role than you!`);
			return;
		} else if (memberToWarn.user.bot) {
			await message.channel.send(`:x: You cannot warn a bot!`);
			return;
		}

		const configuration = require("../../config.json");
		if (message.channel.guild.configs.roles.mod === null && message.channel.guild.configs.roles.admin === null) {
			await message.channel.send(`None of your roles are set up. Please type ${configuration.prefix}config to configure them.`);
		} else if (message.channel.guild.configs.roles.admin != null && message.member.roles.find(m => m.id === message.channel.guild.configs.roles.admin) != undefined) {
			doThing();
		} else if (message.channel.guild.configs.roles.mod != null && message.member.roles.find(m => m.id === message.channel.guild.configs.roles.mod) != undefined) {
			doThing();
		} else {
			await message.channel.send(`:x: You don't have permission to run this command. Believe this is an error? Get a person with the Manage Server permission to run ${configuration.prefix}config to check the roles.`);
		}
	}
};
