const commando = require('discord.js-commando');
const Discord = require('discord.js');
const canvacord = require("canvacord");
const guildXpMessage = require('./messages/guildXPMessage.message')

module.exports = async function (message, {xpType}) {
/*     const Levels = LyraCore.plugins.levels
    let target = message.mentions.users.first() || message.author;

    const uid = target.id;
    const gid = message.guild.id;

    //if (!user) return message.channel.send("Seems like this user has not earned any xp so far.");

    const userData = {
        backgroundImg: "wallpaper2.jpg",
        level: await Levels.getUserGuildLevel(uid, gid),
        xp: await Levels.getUserGuildXp(uid, gid),
        requiredXp: await Levels.getXpToNextUserGuildLevel(uid, gid),
        message,
    }
    console.log(userData)

    if (xpType === "guild") {
        return await message.send(await guildXpMessage(userData))
    } else if (xpType === "personal") {
        return await message.send(await personalXpMessage(userData))

    } else {
        return await message.send(errorMessage())
    } */
    await message.channel.send(":x: This command is currently disabled!")
}