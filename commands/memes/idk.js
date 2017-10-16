module.exports = (msg, args) => {
    msg.channel.createMessage("I don't know " + args.join(" ") + "...");
};