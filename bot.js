// Main definitions
const Discord = require("discord.js");
const bot = new Discord.Client();
const fs = require("fs");
var conffile = fs.readFileSync("config/main.json");
var conf = JSON.parse(conffile);
var currentserverconf;
var currentserverconfread;

bot.on('ready', () => {
	console.log("Melonian's ready to rock n' roll! Serving " + bot.guilds.array.length + " guilds with a combined total of " + bot.users.array.length + " users.");
});

bot.on('guildCreate', guild => {
	var guildobj = {
		  "discordinfo": {
			"name": guild.name,
			"id": guild.id,
			"icon": guild.iconURL,
			"datecreated": guild.createdTimestamp,
			"owner": guild.ownerID,
			"membercount": guild.memberCount,
			"newmembersmonth": 0
		  },
		  "settingsbot": {
			"prefix": "m!",
			"messages": {
			  "messagestotal": 0,
			  "messagesmonth": 0,
			  "messagesday": 0,
			},
			"type": "5",
			"othertype": "Unspecified",
			"logs": false,
			"logwhat": 4, // 4 = nothing
			"modrecord": {
			  "amount": "0"
			}
		  }
	};

	fs.writeFile("database/" + guild.id + ".json", JSON.stringify(guildobj), (err) => {
		if (err) {
			console.error(err);
			return;
		};
		
		console.log("Successfully wrote guild config ayo i can code | Guild name: '" + guild.name + "'");
	});
});

bot.on('message', message => {
	if (typeof message.channel.recipient != "object" && message.author.id != bot.user.id) {
	  currentserverconfread = fs.readFileSync("database/" + message.guild.id + ".json");
	  currentserverconf = JSON.parse(currentserverconfread);
	  if (message.content === currentserverconf.settingsbot.prefix + 'ping') {
		message.channel.send("Pong! \n\"I'll sure kick your butt in a game of ping-pong!\" - \"Weird Al\" Yankovic, 2006");
	  }
	  currentserverconf = null;
	} else if (typeof message.channel.recipient === "object" && message.author.id != bot.user.id) {
		message.channel.send("I don't support DMs yet... Stay tuned, " + message.author.username + "!");
	}
});

bot.login(conf.token);
