module.exports = (msg, args) => {
    if (args) {
        msg.channel.createMessage(args.join(" "));
        msg.delete();
    }
};