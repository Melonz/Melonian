module.exports = (msg, args) => {
	if (msg.content === msg.prefix + "isTRMGay") {
		msg.channel.createMessage("Barely, he's 45% gai " + msg.author.mention);
	} else if (msg.content === msg.prefix + "isIPGGay") {
		msg.channel.createMessage("Definitely, he's " + Math.floor(new Date() / 1000) + "% gai " + msg.author.mention);
	} else if (msg.content === msg.prefix + "isNodePointGay") {
		msg.channel.createMessage("Erm, he's 38% gai " + msg.author.mention);
	} else if (msg.content === msg.prefix + "isSHGay") {
		msg.channel.createMessage("I don't know how this is possible, but he's -24% gai " + msg.author.mention);
	} else {
		var personToTest = args.join(" ");
		
		if (args === null || args.length === 0) {
			msg.channel.createMessage("I need a user to test...");
		} else {
			console.log('"' + personToTest + '"');
			if (personToTest === "<@155432796247162881>" || personToTest === "TheRandomMelon" || personToTest.toUpperCase() === "TRM") {
				msg.channel.createMessage("Barely, he's 45% gai " + msg.author.mention);
			} else if (personToTest === "<@146019453291855872>" || personToTest === "InvoxiPlayGames" || personToTest.toUpperCase() === "IPG") {
				msg.channel.createMessage("Definitely, he's " + Math.floor(new Date() / 1000) + "% gai " + msg.author.mention);
			} else if (personToTest === "<@146002743121805312>" || personToTest === "NodePoint" || personToTest.toUpperCase() === "Node") {
				msg.channel.createMessage("Erm, he's 38% gai " + msg.author.mention);
			} else if (personToTest === "<@155430797694861312>" || personToTest === "SonicHack" || personToTest.toUpperCase() === "Sonic") {
				msg.channel.createMessage("I don't know how this is possible, but he's -24% gai " + msg.author.mention);
			}
			msg.channel.createMessage("I don't know " + personToTest + "... I'll guess that they're " + Math.floor((Math.random() * 101) + 1) + "% gai");
		}
	}
};