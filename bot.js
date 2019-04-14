// The main file where all the nuts are
const reload = require("require-reload")(require);

const { Client } = require("klasa");
const config = require("./config.json");

Client.defaultGuildSchema
	.add("mod", "Role")
	.add("admin", "Role")
	.add("strikes", "any", { array: true, default: [] })
	.add("certified", "boolean", {
		default: false,
		configurable: false,
	})
	.add("public", "boolean", {
		default: false,
		configurable: false,
	})
	.add("serverDesc", "string", {
		default: "",
		configurable: false,
	})
	.add("serverInv", "string", {
		default: null,
		configurable: false,
	})
	.add("botSite", "string", {
		default: null,
		configurable: false,
	})
	.add("botTwitter", "string", {
		default: null,
		configurable: false,
	});

Client.defaultUserSchema
	.add("won", "integer", {
		default: 0,
		configurable: false,
	})
	.add("nextDailyCollection", "string", {
		default: `${Date.now()}`,
		configurable: false,
	})
	.add("nextVoteCollection", "string", {
		default: `${Date.now()}`,
		configurable: false,
	})
	.add("dailyStreak", "integer", {
		default: 0,
		configurable: false,
	});

const client = new Client({
	clientOptions: {
		fetchAllMembers: false,
	},
	prefix: config.prefix,
	commandEditing: true,
	providers: {
		default: "postgresql",
	},
	gateways: {
		clientStorage: { provider: "json" },
	},
	disableEveryone: true,
}).login(config.token);
