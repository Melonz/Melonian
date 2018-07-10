const { Command, Timestamp } = require("klasa");
const configuration = require("../../config.json");
let dbl;

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
			subcommands: false,
		});
	}

	async run(message, [...params]) {
		const timeUntilCollection = message.author.configs.nextVoteCollection - Date.now();
		if (timeUntilCollection > 0) {
			await message.channel.send({
				embed: {
					color: 0xf44242,
					author: {
						name: `Error collecting vote reward`,
						icon_url: `${message.author.avatarURL()}`,
					},
					description: `You need to wait another \`${new Timestamp("HH [hours], mm [minutes] [and] ss [seconds]").displayUTC(timeUntilCollection)}\` before collecting your vote reward.`,
					footer: {
						text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
					},
				},
			});
		} else if (timeUntilCollection <= 0) {
			dbl.hasVoted(message.author.id).then(voted => {
				if (voted) {
					message.author.configs.update("won", message.author.configs.won + 100);
					message.channel.send(`:ballot_box_with_check: Thanks for voting on discordbots.org! Here's 100₩! (You can vote every 24 hours [you can only claim this reward 24 hours after you last claimed one], so there's something)\n\n*Not ${message.author.tag}? Want to vote? Go here: https://discordbots.org/bot/236987731232686081/vote`);
				} else {
					message.channel.send(`:x: You didn't vote! Go to https://discordbots.org/bot/236987731232686081/vote and do so.`);
				}
			});
		}
	}

	async init() {
		const DBL = require("dblapi.js");

		if (configuration.dbltoken === undefined || configuration.dbltoken === "null") {
			console.log("No Discord Bot List token, skipping");
		} else {
			dbl = new DBL(configuration.dbltoken, this.client);
			setInterval(() => {
				dbl.postStats(this.client.guilds.size);
			}, 1800000);
		}
	}
};
