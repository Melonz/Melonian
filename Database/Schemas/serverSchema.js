const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: { type: String, required: true },
	strikes: [new mongoose.Schema({
		_id: { type: String, required: true },
		user: { type: String, required: true },
		reason: { type: String, required: true },
		strikedBy: { type: String, required: true },
	})],
	config: require("./serverConfigSchema.js"),
}, { usePushEach: true });
