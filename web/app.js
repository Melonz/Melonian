var express = require("express");
var path = require("path");
var session = require("express-session");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var debug = require("debug")("web:server");
var http = require("http");

let passport = require("passport");
let Strategy = require("passport-discord").Strategy;
var scopes = ["identify", "guilds"];

var app = express();

module.exports = function billy(bot, config) {
	// view engine setup
	app.set("views", path.join(__dirname, "views"));
	app.set("view engine", "ejs");

	// uncomment after placing your favicon in /partials
	// app.use(favicon(path.join(__dirname, 'partials', 'favicon.ico')));
	app.use(logger("dev"));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(cookieParser());
	app.use(express.static(path.join(__dirname, "partials")));


	// Log-in system (passport-discord)

	passport.serializeUser((user, done) => {
		done(null, user);
	});
	passport.deserializeUser((obj, done) => {
		done(null, obj);
	});

	passport.use(new Strategy({
		clientID: config.inviteLink.client_id,
		clientSecret: config.inviteLink.client_secret,
		callbackURL: "https://melonian.xyz/login/callback",
		scope: scopes,
	}, (accessToken, refreshToken, profile, done) => {
		process.nextTick(() => {
			return done(null, profile);
		});
	}));

	app.use(session({
		secret: "Uv4uaDHTbg1WrKwzK4or",
		resave: false,
		saveUninitialized: false,
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	app.use((req, res, next) => {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});

	app.get("/login/", passport.authenticate("discord", { scope: scopes }), (req, res) => { var justtomakeeslinthappy = 1 + 1; });
	app.get("/login/callback", passport.authenticate("discord", { failureRedirect: "/login/fail" }), (req, res) => {
		res.redirect("/dashboard");
	});

	app.get("/", (req, res, next) => {
		let os = require("os");

		res.render("index.ejs", { title: "Home", os: os, bot: bot, config: config, authUser: req.user, successlogout: req.query.successlogout });
	});

	app.get("/commands", (req, res, next) => {
		res.render("commands.ejs", { title: "Commands", bot: bot, config: config, authUser: req.user });
	});

	app.get("/login/fail", (req, res, next) => {
		res.render("login_error.ejs", { title: "Error logging in", bot: bot, config: config, authUser: req.user });
	});

	app.get("/dashboard", checkAuth, (req, res) => {
		// console.log(req.user)
		res.render("dashboard_home.ejs", { title: "Dashboard", bot: bot, config: config, authUser: req.user });
	});

	app.get("/logout", (req, res) => {
		req.logout();
		res.redirect("/?successlogout=1");
	});

	function checkAuth(req, res, next) {
		if (req.isAuthenticated()) return next();
		res.redirect("/login/");
	}

	// catch 404 and forward to error handler
	app.use((req, res, next) => {
		var err = new Error("Not Found");
		err.status = 404;
		next(err);
	});

	// error handler
	app.use((err, req, res, next) => {
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get("env") === "development" ? err : {};

		// render the error page
		res.status(err.status || 500);
		res.render("error", { title: "Error!", bot: bot, req: req, authUser: req.user });
	});


	// Start our actual server

	var portNorm = normalizePort(config.port || "3000");
	app.set("port", portNorm);

	var server = http.createServer(app);

	server.listen(portNorm);
	server.on("error", onError);
	server.on("listening", onListening);

	function normalizePort(val) {
		var port = parseInt(val, 10);

		if (isNaN(port)) {
			// named pipe
			return val;
		}

		if (port >= 0) {
			// port number
			return port;
		}

		return false;
	}

	function onError(error) {
		if (error.syscall !== "listen") {
			throw error;
		}

		var bind = typeof portNorm === "string" ?
			`Pipe ${portNorm}` :
			`Port ${portNorm}`;

		// handle specific listen errors with friendly messages
		switch (error.code) {
			case "EACCES":
				console.error(`${bind} requires elevated privileges`);
				process.exit(1);
				break;
			case "EADDRINUSE":
				console.error(`${bind} is already in use`);
				process.exit(1);
				break;
			default:
				throw error;
		}
	}

	function onListening() {
		var addr = server.address();
		var bind = typeof addr === "string" ?
			`pipe ${addr}` :
			`port ${addr.port}`;
		debug(`Listening on ${bind}`);
		console.log(`[Web] Listening on ${bind}`);
	}
};
