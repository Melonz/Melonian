module.exports = (msg, args) => {
    let bot = msg.channel.guild.shard.client;
    if (args.join(" ") === null || args.join(" ") === "") {
        let usrNickname = function () {
            if (msg.member.nick === null) {
                return "No nickname";
            } else {
                return msg.member.nick;
            }
        };

        msg.channel.createMessage({
            embed: {
                color: 0xD02825,
                author: {
                    name: `${msg.author.username}#${msg.author.discriminator}`,
                    icon_url: `${msg.author.avatarURL}`
                },
                url: "https://melonian.xyz",
                fields: [{
                    name: "📛 Nickname",
                    value: `${usrNickname()}`,
                    inline: true
                }, {
                    name: "🤖 Bot?",
                    value: `${msg.author.bot}`,
                    inline: true
                }, {
                    name: "📆 Date created",
                    value: `${new Date(msg.author.createdAt).toString()}`,
                    inline: true
                }, {
                    name: "🤝 Joined guild on",
                    value: `${new Date(msg.member.joinedAt).toString()}`,
                    inline: true
                }],
                footer: {
                    text: "Recieved command on " + new Date(msg.timestamp).toString()
                }
            }
        }).then (function(message) {
            console.log("[Command] Successfully ran command " + msg.prefix + "profile | Ran by " + msg.author.username + "#" + msg.author.discriminator);
        }).catch (function (reason) {
            console.log("[Error] Couldn't run " + msg.prefix + "profile, " + reason);
        });
    } else {
        let userToFind = args.join(" ");
        
        userToFind = userToFind.replace("<@!", "");
        userToFind = userToFind.replace("<@", "");
        userToFind = userToFind.replace(">", "");

        let userUser = bot.users.find(u => u.id === userToFind);
        if (userUser === null || userUser === undefined) {
            msg.channel.createMessage("Couldn't find that user. Try mentioning them.");
            return;
        }

        let userMember = msg.channel.guild.members.find(u => u.id === userToFind);

        let usrNickname = function () {
            if (userMember.nick === null) {
                return "No nickname";
            } else {
                return userMember.nick;
            }
        };

        msg.channel.createMessage({
            embed: {
                color: 0xD02825,
                author: {
                    name: `${userUser.username}#${userUser.discriminator}`,
                    icon_url: `${userUser.avatarURL}`
                },
                url: "https://melonian.xyz",
                fields: [{
                    name: "📛 Nickname",
                    value: `${usrNickname()}`,
                    inline: true
                }, {
                    name: "🤖 Bot?",
                    value: `${userUser.bot}`,
                    inline: true
                }, {
                    name: "📆 Date created",
                    value: `${new Date(userUser.createdAt).toString()}`,
                    inline: true
                }, {
                    name: "🤝 Joined guild on",
                    value: `${new Date(userMember.joinedAt).toString()}`,
                    inline: true
                }],
                footer: {
                    text: "Recieved command on " + new Date(msg.timestamp).toString()
                }
            }
        }).then (function(message) {
            console.log("[Command] Successfully ran command " + msg.prefix + "profile | Ran by " + userUser.username + "#" + userUser.discriminator);
        }).catch (function (reason) {
            console.log("[Error] Couldn't run " + msg.prefix + "profile, " + reason);
        });
    }
};