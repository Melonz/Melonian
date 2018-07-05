const { Event } = require("klasa");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			enabled: true,
			once: false,
		});
	}

	async run() {
		if (!this.client.gateways.guilds.schema.has("roles")) {
			await this.client.gateways.guilds.schema.add("roles", {
				mod: {
					type: "Role",
				},
				admin: {
					type: "Role",
				},
			});
		}

		if (!this.client.gateways.guilds.schema.has("strikes")) {
			await this.client.gateways.guilds.schema.add("strikes", { array: true, type: "any", default: [] });
		}

		await this.client.user.setActivity(`with ${this.client.users.size} people on ${this.client.guilds.size} servers! Learn more at melonian.xyz.`, { type: "PLAYING" });
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}
};
