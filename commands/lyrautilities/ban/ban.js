const banMessage = require("./messages/ban.message");
const invalidUserMessage = require("./messages/invalidUser.message");
const banErrorMessage = require("./messages/banError.message");

const log = LyraCore.logger("Command/Ban");

module.exports = async function (message, {user, reason, daysDelete}) {
    if (!user)
        return await message.say(invalidUserMessage());

    const guildMember = await message.guild.members.fetch(user.id);
    if (!guildMember.bannable) {
        await message.say(banErrorMessage());
        log(`Couldn't ban user >${user.username}<!`, "error");
        return
    }

    await guildMember.send("https://tenor.com/view/when-your-team-too-good-ban-salt-bae-gif-7580925");
    await guildMember.ban({days: daysDelete, reason: reason});
    await message.say(banMessage(user, reason));
    log(`Banned user >${user.username}< with id >${user.id}< from guild >${message.guild.name}<`);
};
