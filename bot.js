// The main file where all the nuts are
const reload = require("require-reload")(require);

const { Client } = require("klasa");
const config = require("./config.json");

new Client({
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
