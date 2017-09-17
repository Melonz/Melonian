/**
 * This is example code to allow you to check if someone is staff or not.
 * Written by Vlad (KingDGrizzle).
 */
module.exports = (msg, args) => {
	const bot = msg.channel.guild.shard.client;

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
		// Your code
	} else {
		msg.channel.createMessage(`You don't have permission to run this command.`);
	}
};