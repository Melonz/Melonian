module.exports = (msg, args) => {
	if (msg.content === msg.prefix + "isTRMGay") {
		msg.channel.createMessage("Barely, he's 45% gai " + msg.author.mention);
	} else if (msg.content === msg.prefix + "isIPGGay") {
		msg.channel.createMessage("Definitely, he's 100.2% gai " + msg.author.mention);
	} else if (msg.content === msg.prefix + "isNodePointGay") {
		msg.channel.createMessage("Erm, he's 38% gai " + msg.author.mention);
	} else if (msg.content === msg.prefix + "isSHGay") {
		msg.channel.createMessage("I don't know how this is possible, but he's -24% gai " + msg.author.mention);
	} else {
		var personToTest = args.join(" ");
		
		if (args === null || args.length === 0) {
			msg.channel.createMessage("I need a user to test...");
		} else {
			msg.channel.createMessage("I don't know " + personToTest + "... I'll guess that they're " + Math.floor((Math.random() * 101) + 1) + "% gai");
		}
	}
};