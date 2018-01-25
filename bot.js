// The main file where all the nuts are
const Discord = require("discord.js");
const bot = new Discord.Client();

const config = require("./config.json");

bot.on("ready", function() {
  console.log(`Ready!`)
  client.user.setActivity(`with ${bot.users.size} users!`) // Set the bot's game to how many users are in the servers that the bot is invited in
})
