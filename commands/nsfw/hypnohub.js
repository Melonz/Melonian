module.exports = (msg, args) => {
    const bot = msg.channel.guild.shard.client;
    const Danbooru = require('danbooru')

    if (msg.channel.nsfw) {
        if (args) {
            const booru = require('booru')

            booru.search('hypnohub.net', args, {limit: 1, random: true})
            .then(booru.commonfy)
            .then(images => {
              //Log the direct link to each image 
              for (let image of images) {
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
                msg.channel.createMessage(`<https://hypnohub.net/post/show/${image.id}>\n\n**Rating**: ${imgRating}\n**Score**: ${image.common.score}\n**Tags**: ${image.common.tags.join(" ")}\n\n ${image.common.file_url}`);
              }
            })
            .catch(err => {
              if (err.name === 'booruError') {
                //It's a custom error thrown by the package 
                console.log(err.message)
              } else {
                //This means I messed up. Whoops. 
                console.log(err)
              }
            })
        } else {
            msg.channel.createMessage(`${msg.author.mention} I need a tag, please.`);
        }
    } else {
        msg.channel.createMessage(`Sorry, but this channel isn't an NSFW channel. Go to a NSFW channel, or mark this channel as NSFW.`);
    }
};