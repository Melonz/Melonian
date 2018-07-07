const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["hypnosis", "hypno"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: true,
			permissionLevel: 0,
			description: "Searches HypnoHub.net for some... well... hypnotic NSFW stuff.",
			extendedHelp: "Searches HypnoHub.net for some... well... hypnotic NSFW stuff. This command can only be used in NSFW-marked channels.",
			usage: "<Tags:str>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [Tags]) {
		const booru = require("booru");

		booru.search("hypnohub.net", Tags.split(" "), { limit: 1, random: true })
			.then(booru.commonfy)
			.then(images => {
				for (let image of images) {
					if (image.tags.includes("loli") || image.tags.includes("shota")) {
						message.channel.send("Sorry, but Discord's guidelines don't allow us to show you posts with the tags `loli` or `shota`.");
						return;
					}

					let imgRating = "";
					if (image.rating === "s") {
						imgRating = "Safe";
					} else if (image.rating === "q") {
						imgRating = "Questionable";
					} else if (image.rating === "e") {
						imgRating = "Explicit";
					} else {
						imgRating = "Unknown";
					}

					message.channel.send(`**__<https://rule34.xxx/post/show/${image.id}>__**\n\n**🔞 Rating**: ${imgRating}\n**🏆 Score**: ${image.common.score}\n**📛 Tags**: \`\`${image.common.tags.join(" ")}\`\`\n\n${image.common.file_url}`);
				}
			})
			.catch(err => {
				if (err.name === "booruError" && err.message === "You didn't give any images") {
					message.channel.send("No results were found.");
				} else {
					console.log(err);
				}
			});
	}
};