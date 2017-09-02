module.exports = (msg, args) => {
	const m = msg.channel.createMessage({
		embed: {
			color: 0x3669FA,
			description: `Pinging...`,
		},
	}).then( value => {
        value.edit({
            embed: {
                color: 0x3669FA,
                description: `Pong! Latency: ${value.timestamp - msg.timestamp}ms`,
                footer: {
                    text: `It took ${value.timestamp - msg.timestamp}ms to ping.`,
                },
            },
        });
    }, reason => {
        console.error("[Error fulfilling Promise]" + reason); // Error!
    } );
};