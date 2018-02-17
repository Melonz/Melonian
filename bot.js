// The main file where all the nuts are
const reload = require("require-reload")(require);

const { Client } = require("discord.js");
const client = new Client({
	disableEveryone: true,
});

const config = require("./config.json");
const database = require("./Database/Database.js");

database.initialize(config.mongoURL).then(db => {
	console.log(`Database Loaded!`);
}).catch(err => {
	console.log(`Failed to launch Database, this is probably your fault you Mongo`, err);
	process.exit(1);
});


client.on("ready", () => {
	console.log(`Ready!`);
	client.user.setActivity(`with ${client.users.size} users!`); // Set the bot's game to how many users are in the servers that the bot is invited in
});

client.on("message", async msg => {
	let prefix, serverDocument;
	try {
		serverDocument = await Servers.findOne({ _id: msg.guild.id });
		if (!serverDocument) throw new Error();
		prefix = serverDocument.prefix;
	} catch (err) {
		require("./Events/guildCreate")(client, msg.guild);
		prefix = "/";
	}

	if (!msg.content.startsWith(prefix)) return;
	if (msg.author.bot) return;

	const cmd = msg.content.split(" ")[0].trim().toLowerCase().replace(prefix);
	const suffix = msg.content.split(" ").splice(1).join(" ")
		.trim();

	let cmdFile;
	try {
		reload(`./Commands/${cmd}.js`);
	} catch (err) {
		return null;
	}
	return cmdFile(client, msg, suffix);
});

client.login(config.token); // Login the bot to Discord using the token in `./config.json`
