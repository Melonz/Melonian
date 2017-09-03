/*
   This file is an example config. Tweak it to your liking and rename to "config.js"
   
   WARNING: If you plan to upload your change(s) to the Melonian repo, don't rename this file. 
   Instead, make a copy of it and rename your *copy* to config.js.
*/
module.exports = {
    token: "token here", // Your bot's token (can be found at https://discordapp.com/developers/applications/me)
    maintainers: ["user", "ids", "here"], // "Maintainers" (has all permissions) - Array of user IDs
    prefix: "m!", // The prefix for all commands. (e.g m!help)
    desc: "[WIP] A lightweight-ish Eris bot, made for every Discord guild.", // Description that will be in the help command
	playingQuotes: [
		"If you want",
		"to cycle",
		"through some games",
		"use this array."
	] // The bot will cycle through these "games" every 90 seconds. (90000 ms)
};
