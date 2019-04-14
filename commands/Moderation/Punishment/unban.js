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
			description: "Unban a banned user from your guild (mod+ only)",
			extendedHelp: "Unban a banned user from your guild (mod+ only)",
			usage: "<memberToUnban:user> [reason:str]",
			usageDelim: " ",
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [memberToUnban, reason]) {
		function getRandomInt(max) {
			return Math.floor(Math.random() * Math.floor(max));
		}

		function doThing() {
			let randomid = getRandomInt(999999999);

			// Checks to see if the strike ID already exists to avoid conflicts
			if (message.channel.guild.configs.strikes.find(s => s.id === randomid) === undefined || message.channel.guild.configs.strikes.find(s => s.id === randomid) === null) {
				message.guild.members.unban(memberToUnban, reason).then(() => {
					message.channel.send(`:ballot_box_with_check: Unbanned user ${memberToUnban.tag} successfully.`);
				}, (error) => {
					if (error.name === "DiscordAPIError" && error.message === "Privilege is too low...") {
						message.channel.send(`:x: Failed to unban user ${memberToUnban.tag} (I don't have permission!)`);
					} else {
						message.channel.send(`:x: Failed to unban user ${memberToUnban.tag} for an unknown reason:\`\`\`${error}\`\`\``);
					}
				});
			} else {
				doThing();
			}
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
