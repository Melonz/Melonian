module.exports = (msg, args) => {
    const bot = msg.channel.guild.shard.client;
    const Danbooru = require('danbooru')

    if (msg.channel.nsfw) {
        if (args) {
            const booru = require('booru')

            booru.search('rule34.xxx', args, {limit: 1, random: true})
            .then(booru.commonfy)
            .then(images => {
              //Log the direct link to each image 
              for (let image of images) {
                if (image.tags.includes("loli") || image.tags.includes("shota")) {
                    msg.channel.createMessage("Sorry, but Discord's guidelines don't allow us to show you posts with the tags `loli` or `shota`.");
                    return;
                }

                let imgRating = "";
                if (image.rating === "s") {
                    imgRating = "Safe";
                } else if (image.rating === "q") {
                    imgRating = "Questionable";
                } else if (image.rating === "e") {
                    imgRating = "Explicit";
                } else {
                    imgRating = "Unknown";
                }

                msg.channel.createMessage(`**__<https://rule34.xxx/post/show/${image.id}>__**\n\n**ðŸ”ž Rating**: ${imgRating}\n**ðŸ† Score**: ${image.common.score}\n**ðŸ“› Tags**: ` + "``" + image.common.tags.join(" ") + "``" + `\n\n${image.common.file_url}`);
              }
            })
            .catch(err => {
              if (err.name === 'booruError' && err.message === "You didn't give any images") {
                msg.channel.createMessage("No results were found.");
              } else {
                console.log(err);
              }
            })
        } else {
            msg.channel.createMessage(`${msg.author.mention} I need a tag, please.`);
        }
    } else {
        msg.channel.createMessage(`Sorry, but this channel isn't an NSFW channel. Go to a NSFW channel, or mark this channel as NSFW.`);
    }
};
