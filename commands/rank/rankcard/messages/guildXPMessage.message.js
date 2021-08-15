const Discord = require('discord.js');
const canvacord = require("canvacord");

module.exports = async function ({backgroundImg, message, level, xp, requiredXp}) {
    const rank = new canvacord.Rank()
        .setAvatar(message.author.avatarURL({format: "jpg"}))
        .setBackground("IMAGE", backgroundImg)
        .setCurrentXP(xp)
        .setRequiredXP(requiredXp)
        .setStatus("online")
        .setProgressBar("#FFFFFF", "COLOR")
        .setUsername(message.author.username)
        .setDiscriminator(message.author.discriminator)
        .setLevel(level)
        .setRank(1, '1', false);

    const data = await rank.build();
    return new Discord.MessageAttachment(data, "RankCard.png");
}