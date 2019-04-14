/* Commented out until I figure this out.
const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["removeStrike"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: false,
			permissionLevel: 0,
			description: "Remove warning from user in guild",
			extendedHelp: "Remove warning from user in guild",
			usage: "<idofstrike:number>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [idofstrike]) {
		if (message.channel.guild.configs.strikes.find(m => m.id === idofstrike)) {
			let strikeObj = message.channel.guild.configs.strikes.find(m => m.id === idofstrike);
			await message.channel.guild.configs.update("strikes", strikeObj, { action: "remove" });
			await message.channel.send(`:ballot_box_with_check: Removed warning ID ${idofstrike} successfully.`);
		} else {
			await message.channel.send(`:x: Can't find warning ID ${idofstrike}!`);
		}
	}
}; */
