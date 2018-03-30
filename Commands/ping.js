module.exports = async(client, msg, suffix, config) => {
	const m = await msg.channel.send(":ping_pong: Pinging...");
	await m.edit({
		embed: {
			color: 0x00FF00,
			title: "Pong!",
			description: `Last heartbeat: ${Math.floor(client.ping)}ms`,
			footer: {
				text: `${client.user.username} v${config.version} powered by Melonian`,
			},
		},
	});
};
