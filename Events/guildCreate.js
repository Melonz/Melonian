module.exports = async(client, guild) => {
	let serverDocument;
	try {
		serverDocument = await Servers.findOne({ _id: guild.id });
		if (!serverDocument) throw new Error();
	} catch (err) {
		serverDocument = await Servers.create(new Servers({
			_id: guild.id,
		}));
	}
};
