const { Command, util } = require("klasa");
const Configuration = require("../../../config.json");

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
			description: "Get help for the bot.",
			extendedHelp: "Get help for the bot.",
			usage: "[command:command]",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [command]) {
		if (command) {
			await message.channel.send({
				embed: {
					color: 0x17a2b8,
					title: `:information_source: Help for command ${Configuration.prefix}${command.name}`,
					fields: [{
						name: "Basic description",
						value: util.isFunction(command.description) ? command.description(message) : command.description,
						inline: true,
					}, {
						name: "Full description (extended help)",
						value: util.isFunction(command.extendedHelp) ? command.extendedHelp(message) : command.extendedHelp,
						inline: true,
					}, {
						name: "Usage",
						value: command.usage.fullUsage(message),
						inline: true,
					}],
					footer: {
						text: `${this.client.user.username} v${Configuration.version} powered by Melonian`,
					},
				},
			});
		}

		// Because all this stuff is pretty complex, I'm leaving this until I get better at Klasa.
		const help = await this.buildHelp(message);
		const categories = Object.keys(help);
		const method = this.client.user.bot ? "author" : "channel";
		const helpMessage = [];
		for (let cat = 0; cat < categories.length; cat++) {
			helpMessage.push(`**${categories[cat]} Commands**:`, "```asciidoc");
			const subCategories = Object.keys(help[categories[cat]]);
			for (let subCat = 0; subCat < subCategories.length; subCat++) helpMessage.push(`= ${subCategories[subCat]} =`, `${help[categories[cat]][subCategories[subCat]].join("\n")}\n`);
			helpMessage.push("```", "\u200b");
		}

		return message[method].send(helpMessage, { split: { char: "\u200b" } })
			.then(() => { if (message.channel.type !== "dm" && this.client.user.bot) message.send(`:ballot_box_with_check: Sent help to your DMs.`); })
			.catch(() => { if (message.channel.type !== "dm" && this.client.user.bot) message.send(`:x: Couldn't send help to your DMs! Try enabling "Allow direct messages from server members" in Privacy Settings on this server.`); });
	}

	// Taken from Klasa help ofc
	async buildHelp(message) {
		const help = {};

		const commandNames = [...this.client.commands.keys()];
		const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

		await Promise.all(this.client.commands.map(command =>
			this.client.inhibitors.run(message, command, true)
				.then(() => {
					if (!help.hasOwnProperty(command.category)) help[command.category] = {};
					if (!help[command.category].hasOwnProperty(command.subCategory)) help[command.category][command.subCategory] = [];
					const description = typeof command.description === "function" ? command.description(message) : command.description;
					help[command.category][command.subCategory].push(`${message.guildConfigs.prefix}${command.name.padEnd(longest)} :: ${description}`);
				})
				.catch(() => {
					// noop
				})
		));

		return help;
	}
};
