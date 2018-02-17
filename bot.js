// The main file where all the nuts are
const { Client } = require("discord.js");
const client = new Client();

const config = require("./config.json");

client.on("ready", () => {
	console.log(`Ready!`);
	client.user.setActivity(`with ${client.users.size} users!`); // Set the bot's game to how many users are in the servers that the bot is invited in
});

client.on("message", async msg => {
	if (!msg.content.startsWith(config.prefix)) return;
});

client.login(config.token); // Login the bot to Discord using the token in `./config.json`
