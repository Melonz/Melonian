const { Command } = require("klasa");

module.exports = class extends Command {
	constructor(...args) {
		super(...args, {
			enabled: false,
		});
	}

	async run(message, [...params]) {
		// Disabled
	}
};
