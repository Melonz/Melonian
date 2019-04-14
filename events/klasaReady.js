const { Event, Client } = require("klasa");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			enabled: true,
			once: false,
		});
	}

	async run() {
		const web = require("../web/app.js");
		const configuration = require("../config.json");

		web(this.client, configuration);

		await this.client.user.setActivity(`with ${this.client.users.size} people on ${this.client.guilds.size} servers! Learn more at melonian.xyz.`, { type: "PLAYING" });
	}
};
