const fs = require("fs"); // require FS
const databaseDir = "./database"; // Database directory

if (!fs.existsSync(databaseDir)){ // If directory doesnt exist then make it
    fs.mkdirSync(databaseDir, (err) => {
		if (err) {
			console.error("Melonian setup | Failed to create database directory. | " + err);
			return;
		}
	});
	
	console.log("Melonian setup | Successfully created database directory");
} else { // If it exists
	console.log("Melonian setup | Database directory already exists, moving on...");
}

if(!fs.existsSync(databaseDir + "/sample.json")) { // if sample database entry doesnt exist
	var guildobj = {
	  "discordinfo": {
		"name": "Sample Guild",
		"id": "304829572841453638 (sample ID)",
		"icon": "https://cdn.discordapp.com/icons/304829572841453638/343hfdf93hf8fy2yfh8fh82hf8yf8fh2.jpg (sample icon)",
		"datecreated": "Thu Jun 15 2017 15:09:39 GMT-0500 (sample date)",
		"owner": "103733843208308098",
		"membercount": "420",
		"newmembersmonth": "69",
		"emojis": "<:name:394893832747821184> | <:name2:345893869757821484>"
	  },
	  "settingsbot": {
		"prefix": "m!",
		"messages": {
		  "messagestotal": "6969",
		  "messagesmonth": "696",
		  "messagesday": "69",
		},
		"type": "0 (Gaming), 1 (Community), 2 (Content Creator), 3 (Tech), 4 (Programming), 5 (Other)",
		"othertype": "null unless type = 5",
		"logs": true,
		"logwhat": "0 (Everything), 1 (Server info change [icon, name, region, notification settings, etc]), 2 (Moderation (Kick/Ban/Warnings)), etc",
		"modrecord": {
		  "amount": "2",
		  "1": {
			"type": "0 (0 = Warning, 1 = Kick, 2 = Ban)",
			"useraffected": "109904743774832732",
			"mod": "178283487383798700",
			"reason": "Memes"
		  },
		  "2": {
			"type": "2 (0 = Warning, 1 = Kick, 2 = Ban)",
			"useraffected": "109904743774832732",
			"mod": "178283487383798700",
			"reason": "the banne hammer"
		  }
		}
	  }
	};

	fs.writeFile(databaseDir + "/sample.json", JSON.stringify(guildobj), (err) => {
		if (err) {
			console.error(err);
			return;
		};
	});
	
	console.log("Melonian setup | Successfully made sample.json");
} else { // if sample database entry does exist
	console.log("Melonian setup | Sample JSON file already exists, moving on...");
}

// setup successful ending
console.log("Melonian setup | Successfully set up Melonian. Configure config/example_main.json, rename it to main.json, then give Melonian a go!");