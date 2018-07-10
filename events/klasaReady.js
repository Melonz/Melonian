const { Event } = require("klasa");

module.exports = class extends Event {
	constructor(...args) {
		super(...args, {
			enabled: true,
			once: false,
		});
	}

	async run() {
		const web = require("../web/app.js");
		const DBL = require("dblapi.js");
		const configuration = require("../config.json");

		if (configuration.dbltoken === undefined || configuration.dbltoken === "null") {
			console.log("No Discord Bot List token, skipping");
		} else {
			const dbl = new DBL(configuration.dbltoken, this.client);
			setInterval(() => {
				dbl.postStats(this.client.guilds.size);
			}, 1800000);
		}

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

		if (!this.client.gateways.users.schema.has("won")) {
			await this.client.gateways.users.schema.add("won", {
				type: "integer",
				default: 0,
				configurable: false,
			});
		}

		if (!this.client.gateways.users.schema.has("nextDailyCollection")) {
			await this.client.gateways.users.schema.add("nextDailyCollection", {
				type: "string",
				default: `${Date.now()}`,
				configurable: false,
			});
		}

		if (!this.client.gateways.users.schema.has("dailyStreak")) {
			await this.client.gateways.users.schema.add("dailyStreak", {
				type: "integer",
				default: 0,
				configurable: false,
			});
		}

		web(this.client, configuration);

		await this.client.user.setActivity(`with ${this.client.users.size} people on ${this.client.guilds.size} servers! Learn more at melonian.xyz.`, { type: "PLAYING" });
	}

	async init() {
		/*
         * You can optionally define this method which will be run when the bot starts
         * (after login, so discord data is available via this.client)
         */
	}
};
