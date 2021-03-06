const { Event } = require("klasa");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			enabled: true,
			once: false,
		});
	}

	async run() {
		// Update playing status
		await this.client.user.setActivity(`with ${this.client.users.cache.size} people on ${this.client.guilds.cache.size} servers! Learn more at melonian.xyz.`, { type: "PLAYING" });
	}
};
