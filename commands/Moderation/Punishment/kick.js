/* Commented out until I figure this out.
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
			description: "Kick a user from your guild (Moderator+ only)",
			extendedHelp: "Kick a user from your guild (Moderator+ only)",
			usage: "<memberToKick:member> [reason:str]",
			usageDelim: " ",
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [memberToKick, reason]) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		function doThing() {
			let randomid = getRandomInt(999999999);

			// Checks to see if the strike ID already exists to avoid conflicts
			if (message.channel.guild.configs.strikes.find(s => s.id === randomid) === undefined || message.channel.guild.configs.strikes.find(s => s.id === randomid) === null) {
				// Doesn't work for some reason — message.channel.guild.configs.update("strikes", { id: randomid, user: memberToKick, reason: reason || "No reason", type: "kick", striker: message.member });
				memberToKick.kick(reason).then(() => {
					message.channel.send(`:ballot_box_with_check: Kicked user ${memberToKick.user.tag} successfully.`);
				}, (error) => {
					if (error.name === "DiscordAPIError" && error.message === "Privilege is too low...") {
						message.channel.send(`:x: Failed to kick user ${memberToKick.user.tag} (I don't have permission!)`);
					} else {
						message.channel.send(`:x: Failed to kick user ${memberToKick.user.tag} for an unknown reason.`);
					}
				});
			} else {
				doThing();
			}
		}

		if (memberToKick.user.id === message.channel.guild.ownerID) {
			await message.channel.send(`:x: You cannot kick the server owner!`);
			return;
		} else if (memberToKick.roles.highest.comparePositionTo(message.member.roles.highest) >= 0) {
			await message.channel.send(`:x: You can't kick a person who has a higher role than you!`);
			return;
		}

		const configuration = require("../../../config.json");
		if (message.channel.guild.configs.roles.mod === null && message.channel.guild.configs.roles.admin === null) {
			await message.channel.send(`None of your roles are set up. Please type ${configuration.prefix} to configure them.`);
		} else if (message.channel.guild.configs.roles.admin != null && message.member.roles.find(m => m.id === message.channel.guild.configs.roles.admin).name != undefined) {
			doThing();
			return;
		} else if (message.channel.guild.configs.roles.mod != null && message.member.roles.find(m => m.id === message.channel.guild.configs.roles.mod).name != undefined) {
			doThing();
			return;
		} else {
			await message.channel.send(`:x: You don't have permission to run this command. Believe this is an error? Get a person with the Manage Server permission to run ${configuration.prefix}config to check the roles.`);
		}
	}
}; */
