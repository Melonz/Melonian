const {
	Command,
	Timestamp,
} = require("klasa");
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
		const https = require("https");
		const url = "https://discordbots.org/api/weekend";
		https.get(url, res => {
			res.setEncoding("utf8");
			let body = "";
			res.on("data", data => {
				body += data;
			});
			res.on("end", () => {
				body = JSON.parse(body);
				if (body.is_weekend) {
					const timeUntilCollection = message.author.settings.get("nextVoteCollection") - Date.now();
					if (timeUntilCollection > 0) {
						message.channel.send({
							embed: {
								color: 0xf44242,
								author: {
									name: `Error collecting vote reward`,
									icon_url: `${message.author.avatarURL()}`,
								},
								description: `You need to wait another \`${new Timestamp("HH [hours], mm [minutes] [and] ss [seconds]").displayUTC(timeUntilCollection)}\` before collecting your vote reward. (P.S It's the weekend! Votes during the weekend give you 200 won instead of 100!)`,
								footer: {
									text: `${this.client.user.username} v${configuration.version} powered by Melonian`,
								},
							},
						});
					} else if (timeUntilCollection <= 0) {
						dbl.hasVoted(message.author.id).then(voted => {
							if (voted) {
								message.author.settings.update("won", message.author.settings.get("won") + 200);
								message.author.settings.update("nextVoteCollection", Date.now() + 43200000);
								message.channel.send(`:ballot_box_with_check: Thanks for voting on discordbots.org! Here's 200₩! (You can vote every 12 hours [you can only claim this reward 12 hours after you last claimed one])\n\n*Not ${message.author.tag}? Want to vote? After all, it is the weekend! You get 200 won instead of 100! Go here: https://discordbots.org/bot/236987731232686081/vote`);
							} else {
								message.channel.send(`:x: You didn't vote! Go to https://discordbots.org/bot/236987731232686081/vote and do so.`);
							}
						});
					}
				} else {
					const timeUntilCollection = message.author.settings.get("nextVoteCollection") - Date.now();
					if (timeUntilCollection > 0) {
						message.channel.send({
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
								message.author.settings.update("won", message.author.settings.get("won") + 100);
								message.author.settings.update("nextVoteCollection", Date.now() + 43200000);
								message.channel.send(`:ballot_box_with_check: Thanks for voting on discordbots.org! Here's 100₩! (You can vote every 12 hours [you can only claim this reward 12 hours after you last claimed one])\n\n*Not ${message.author.tag}? Want to vote? Go here: https://discordbots.org/bot/236987731232686081/vote`);
							} else {
								message.channel.send(`:x: You didn't vote! Go to https://discordbots.org/bot/236987731232686081/vote and do so.`);
							}
						});
					}
				}
			});
		});
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
