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
			permissionLevel: 6,
			description: "Configure Melonian's settings for your guild (requires Manage Server perms)",
			extendedHelp: "Configure Melonian's settings for your guild (requires Manage Server perms)",
			usage: "[key:str] [value:role]",
			usageDelim: " ",
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [key, value]) {
		const configuration = require("../../config.json");

		if (key === null || key === undefined || value === null || value === undefined) {
			await message.channel.send({
				embed: {
					color: 0xD02825,
					author: {
						name: `Configuration for server "${message.channel.guild.name}"`,
						icon_url: `${message.channel.guild.iconURL()}`,
					},
					url: "https://melonian.xyz",
					fields: [{
						name: "mod_role",
						value: `${message.channel.guild.configs.roles.mod}`,
						inline: true,
					}, {
						name: "admin_role",
						value: `${message.channel.guild.configs.roles.admin}`,
						inline: true,
					}],
					footer: {
						text: `To change one of these values, type ${configuration.prefix}config <nameOfSetting> <newValue>. ${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		} else {
			if (key != "mod_role" && key != "admin_role") {
				await message.channel.send(":x: You did not define a valid setting name to use.");
			} else if (key === "mod_role") {
				await message.channel.guild.configs.update("roles.mod", value);
				await message.channel.send(":ballot_box_with_check: Made that role the moderator role successfully.");
			} else if (key === "admin_role") {
				await message.channel.guild.configs.update("roles.admin", value);
				await message.channel.send(":ballot_box_with_check: Made that role the admin role successfully.");
			}
		}
	}
};
