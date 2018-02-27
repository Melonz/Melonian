module.exports = async(client, msg, suffix) => {
	const m = await msg.channel.send(":ping_pong: Pinging...");
	await m.edit({
		embed: {
			color: 0x00FF00,
			title: "Pong!",
			description: `Last Heartbeat: ${Math.floor(client.ping)}\nEditing Message ${m.editedTimestamp - m.createdTimestamp}`,
			footer: {
				text: `${client.user.username} v${config.version} powered by Melonian`,
			},
		},
	});
};
