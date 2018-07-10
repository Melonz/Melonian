const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: true,
			runIn: ["text"],
			requiredPermissions: [],
			requiredSettings: [],
			aliases: ["furry"],
			autoAliases: true,
			bucket: 1,
			cooldown: 0,
			promptLimit: 0,
			promptTime: 30000,
			deletable: false,
			guarded: false,
			nsfw: true,
			permissionLevel: 0,
			description: "Searches e621 for some more... frisky stuff.",
			extendedHelp: "Searches e621 for some more... frisky stuff. This command can only be used in NSFW-marked channels.",
			usage: "<Tags:str>",
			usageDelim: undefined,
			quotedStringSupport: false,
			subcommands: false,
		});
	}

	async run(message, [Tags]) {
		const booru = require("booru");
		
		if (Tags.includes("loli") || Tags.includes("shota") || Tags.includes("young")) {
			message.channel.send("Sorry, but Discord's guidelines don't allow us to show you posts with the tags `loli`, `young` or `shota`.");
			return;
		}

		booru.search("e621.net", Tags.split(" ") + " -loli -lolicon -shota -shotacon -young", { limit: 1, random: true })
			.then(booru.commonfy)
			.then(images => {
				for (let image of images) {

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

					message.channel.send(`**__<https://e621.net/post/show/${image.id}>__**\n\n**🔞 Rating**: ${imgRating}\n**🏆 Score**: ${image.common.score}\n**📛 Tags**: \`\`${image.common.tags.join(" ")}\`\`\n\n${image.common.file_url}`);
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
