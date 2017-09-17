module.exports = (msg, args) => {
    let bot = msg.channel.guild.shard.client;

    let role = msg.channel.guild.roles.find(r => r.name === args.join(" "));

    if (role === undefined || role === null || role == "") {
        msg.channel.createMessage("Can't find this role");
    } else {
        msg.channel.createMessage("📛 **Name**: " + role.name + "\n🆔 **ID**: " + role.id);
    }
};