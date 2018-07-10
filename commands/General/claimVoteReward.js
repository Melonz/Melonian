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
			description: "Claim your 100 won for voting on discordbots.org (must actually vote)",
			extendedHelp: "Claim your 100 won for voting on discordbots.org (must actually vote)",
			usage: "",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false
		});
	}

	async run(message, [...params]) {
		dbl.hasVoted(message.author.id).then(voted => {
			if (voted) {
				message.author.configs.update("won", message.author.configs.won + 100);
				message.channel.send(`:ballot_box_with_check: Thanks for voting on discordbots.org! Here's 100₩! (You can vote every 24 hours, so there's something)\n\n*Not ${message.author.tag}? Want to vote? Go here: https://discordbots.org/bot/236987731232686081/vote`);
			} else {
				message.channel.send(`:x: You didn't vote! Go to https://discordbots.org/bot/236987731232686081/vote and do so.`);
			}
		});
	}

	async init() {
		const configuration = require("../../config.json");
		if (configuration.dbltoken === undefined || configuration.dbltoken === "null") {
			console.log("No Discord Bot List token, skipping");
		} else {
			const dbl = new DBL(configuration.dbltoken, this.client);
		}
	}

};
