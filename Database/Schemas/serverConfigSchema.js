const mongoose = require("mongoose");

module.exports = {
	prefix: { type: String, default: "/", maxlength: 10, minlength: 1 },
	admins: [new mongoose.Schema({
		_id: { type: String, required: true },
		level: { type: Number, default: 1, enum: [1, 2, 3] },
	}, { usePushEach: true })],
};
