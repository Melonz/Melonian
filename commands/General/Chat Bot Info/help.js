const { Command, RichDisplay, util, util: { isFunction }, ReactionHandler } = require("klasa");
const { MessageEmbed, Permissions } = require("discord.js");
const Configuration = require("../../../config.json");

const PERMISSIONS_RICHDISPLAY = new Permissions([Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADD_REACTIONS]);
const time = 1000 * 60 * 3;

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

		this.createCustomResolver("command", (arg, possible, message) => {
			if (!arg || arg === "") return undefined;
			return this.client.arguments.get("command").run(arg, possible, message);
		});

		// Cache the handlers
		this.handlers = new Map();
	}

	async run(message, [command]) {
		if (command) {
			const { prefix } = message.guildSettings;
			const embed = new MessageEmbed()
				.setColor(0x17a2b8)
				.setTitle(`:information_source: Help for command ${prefix}${command.name}`)
				.addField("Basic description", isFunction(command.description) ? command.description(message.language) : command.description, true)
				.addField("Extended help", isFunction(command.extendedHelp) ? command.description(message.language) : command.extendedHelp, true)
				.addField("Usage", command.usage.fullUsage(message), true)
				.setFooter("Melonian v0.8.0");
			return message.send(embed);
		}

		const method = this.client.user.bot ? "author" : "channel";
		return message[method].send(await this.buildHelp(message), { split: { char: "\n" } })
			.then(() => { if (message.channel.type !== "dm" && this.client.user.bot) message.sendMessage(":mailbox_with_mail: Check your DMs for help."); })
			.catch(() => { if (message.channel.type !== "dm" && this.client.user.bot) message.sendMessage(":x: I can't DM you! Unblock me or allow DMs from me to get help."); });
	}

	async buildHelp(message) {
		const commands = await this._fetchCommands(message);
		const { prefix } = message.guildSettings;

		const helpMessage = [];
		for (const [category, list] of commands) {
			helpMessage.push(`**__${category} Commands__**:\n`, list.map(this.formatCommand.bind(this, message, prefix, false)).join("\n"), "");
		}

		return helpMessage.join("\n");
	}

	formatCommand(message, prefix, richDisplay, command) {
		const description = isFunction(command.description) ? command.description(message.language) : command.description;
		return richDisplay ? `- ${prefix}${command.name} → ${description}` : `- **${prefix}${command.name}** → ${description}`;
	}

	async _fetchCommands(message) {
		const run = this.client.inhibitors.run.bind(this.client.inhibitors, message);
		const commands = new Map();
		await Promise.all(this.client.commands.map(command => run(command, true)
			.then(() => {
				const category = commands.get(command.category);
				if (category) category.push(command);
				else commands.set(command.category, [command]);
			}).catch(() => {
				// Noop
			})
		));

		return commands;
	}
};
