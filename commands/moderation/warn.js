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

                msg.channel.guild.channels.find(c => c.id === guildConfig.options.warnChannel).createMessage({
                    embed: {
                        color: 0xD02825,
                        title: `:warning: Warning issued to ${memberObjToBan.username}#${memberObjToBan.discriminator}`,
                        fields: [{
                            name: "❔ Reason",
                            value: memberToBan[1],
                            inline: true
                        }, {
                            name: "🔨 Striker",
                            value: msg.author.mention,
                            inline: true
                        }],
                        thumbnail: {
                            url: "https://cdn.discordapp.com/avatars/" + memberObjToBan.id + "/" + memberObjToBan.avatar + ".png"
                        }
                    }
                }).then (function yoy() {
                    console.log("[Command] Successfully warned member");
                    msg.channel.createMessage({
                        embed: {
                            color: 0xD02825,
                            title: bot.user.username,
                            url: "https://github.com/TheRandomMelon/Melonian",
                            description: ":warning: Warned **" + memberObjToBan.username + "** successfully.",
                            thumbnail: {
                                url: "https://cdn.discordapp.com/avatars/" + memberObjToBan.id + "/" + memberObjToBan.avatar + ".png"
                            },
                            footer: {
                                text: "Recieved command on " + new Date(msg.timestamp).toString()
                            }
                        }
                    }).then (function yoy() {
                            console.log("[Command] Successfully ran " + msg.prefix + "warn command");
                        }
                    ).catch (
                        (reason) => {
                            console.log("[Error] [Command] Failed to run " + msg.prefix + "warn command: \n Reason why:\n" +reason);
                        }
                    );
                }).catch (
                    (reason) => {
                        console.log("[Error] [Command] Failed to run " + msg.prefix + "warn command: \n Reason why:\n" +reason);

                        msg.channel.createMessage({
                            embed: {
                                color: 0xD02825,
                                title: bot.user.username,
                                url: "https://github.com/TheRandomMelon/Melonian",
                                description: "Wasn't able to warn member; " + reason,
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
                    description: `Please specify a user to warn! ${msg.author.mention}`,
                    footer: {
                        text: `Recieved command on ${new Date(msg.timestamp).toString()}`,
                    },
                },
            }).then(() => {
                console.log(`[Command] Successfully ran command ${msg.prefix}warn`);
            }).catch(err => {
                console.log(`[Error] Couldn't run ${msg.prefix}warn, ${err}`);
            });
        }
    } else {
        msg.channel.createMessage(`You don't have permission to run this command.`);
    }
};