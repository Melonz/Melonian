module.exports = (msg, args) => {
	const bot = msg.channel.guild.shard.client;
	let guildConfig = require(require("path").join(process.cwd(), "database", `${msg.channel.guild.id}.json`));

	/**
	 * Do we have staff?
	 */
	const checkPerms = member => {
		if (guildConfig.options.mod_commands === "true" || guildConfig.options.mod_commands === true) {
			if (guildConfig.options.staff_role_id !== "Unspecified" || guildConfig.options.staff_role_id !== undefined) {
				let role = msg.channel.guild.roles.find(r => r.id === guildConfig.options.staff_role_id);
				if (role) {
					if (member.roles.includes(role.id)) {
						console.log(`Its a true`);
						return true;
					}
				}
				msg.channel.createMessage({
					embed: {
						color: 0xD02825,
						title: bot.user.username,
						url: "https://github.com/TheRandomMelon/Melonian",
						description: `The staff role hasn't been set up correctly. Do ${msg.prefix}config staff_role_id|[role id] to correct the error..`,
						footer: {
							text: `Recieved command on ${new Date(msg.timestamp).toString()}`,
						},
					},
				}).then(() => {
					console.log(`[Command] Successfully ran command ${msg.prefix}config | Ran by ${msg.author.username}#${msg.author.discriminator}`);
				}).catch(err => {
					console.log(`[Error] Couldn't run ${msg.prefix}config, ${err}`);
				});
			} else {
				msg.channel.createMessage({
					embed: {
						color: 0xD02825,
						title: bot.user.username,
						url: "https://github.com/TheRandomMelon/Melonian",
						description: `The staff role hasn't been set up yet. Do ${msg.prefix}config staff_role_id|[role id] to set it up.`,
						footer: {
							text: `Recieved command on ${new Date(msg.timestamp).toString()}`,
						},
					},
				}).then(() => {
					console.log(`[Command] Successfully ran command ${msg.prefix}config | Ran by ${msg.author.username}#${msg.author.discriminator}`);
				}).catch(err => {
					console.log(`[Error] Couldn't run ${msg.prefix }config, ${err}`);
				});
			}
		}
		return false;
	};

	if (checkPerms(msg.member)) {
		if (args.length > 0) {
			var memberToBan = args.join(" ");
			memberToBan = memberToBan.split(" | ");
			if (memberToBan[0].startsWith("<@") && memberToBan[0].endsWith(">")) {
				var searchID = memberToBan[0].replace("<@", "");
				searchID = searchID.replace(">", "");

				var memberObjToBan = msg.channel.guild.members.find(m => m.id === searchID);

				memberObjToBan.kick(memberToBan[1] + " (via " + msg.author.username + "#" + msg.author.discriminator + ")").then (function yoy() {
					console.log("[Command] Successfully kicked member");
					msg.channel.createMessage({
						embed: {
							color: 0xD02825,
							title: bot.user.username,
							url: "https://github.com/TheRandomMelon/Melonian",
							description: "Kicked " + memberObjToBan.username + " successfully",
							thumbnail: {
								url: "https://cdn.discordapp.com/avatars/" + memberObjToBan.id + "/" + memberObjToBan.avatar + ".png"
							},
							footer: {
								text: "Recieved command on " + new Date(msg.timestamp).toString()
							}
						}
					}).then (function yoy() {
							console.log("[Command] Successfully ran " + msg.prefix + "kick command");
						}
					).catch (
						(reason) => {
							console.log("[Error] [Command] Failed to run " + msg.prefix + "kick command: \n Reason why:\n" +reason);
						}
					);
				}).catch (
					(reason) => {
						console.log("[Error] [Command] Failed to run " + msg.prefix + "kick command: \n Reason why:\n" +reason);

						msg.channel.createMessage({
							embed: {
								color: 0xD02825,
								title: bot.user.username,
								url: "https://github.com/TheRandomMelon/Melonian",
								description: "Wasn't able to kick member; " + reason,
								footer: {
									text: "Recieved command on " + new Date(msg.timestamp).toString()
								}
							}
						}).then (function yoy() {
								console.log("[Command] Successfully ran " + msg.prefix + "help command");
							}
						).catch (
							(reason) => {
								console.log("[Error] [Command] Failed to run " + msg.prefix + "help command: \n Reason why:\n" +reason);
							}
						);
					}
				);
			}
		} else {
			msg.channel.createMessage({
				embed: {
					color: 0xD02825,
					title: bot.user.username,
					url: "https://github.com/TheRandomMelon/Melonian",
					description: `Please specify a user to kick! ${msg.author.mention}`,
					footer: {
						text: `Recieved command on ${new Date(msg.timestamp).toString()}`,
					},
				},
			}).then(() => {
				console.log(`[Command] Successfully ran command ${msg.prefix}kick`);
			}).catch(err => {
				console.log(`[Error] Couldn't run ${msg.prefix}kick, ${err}`);
			});
		}
	} else {
		msg.channel.createMessage(`You don't have permission to run this command.`);
	}
};