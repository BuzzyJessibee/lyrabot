const kickMessage = require("./messages/kick.message");
const invalidUserMessage = require("./messages/invalidUser.message");
const kickErrorMessage = require("./messages/kickError.message");

const log = LyraCore.logger("Command/Kick");

module.exports = async function (message, {user, reason}) {
    if (!user)
        return await message.say(invalidUserMessage());

    const guildMember = await message.guild.members.fetch(user.id);
    if (!guildMember.kickable) {
        await message.say(kickErrorMessage());
        log(`Couldn't kick user >${user.username}<!`, "error");
        return
    }

    await guildMember.send("https://tenor.com/view/punt-kick-baby-grandma-gif-8217719");
    await guildMember.kick({reason: reason});
    await message.say(kickMessage(user, reason));
    log(`Kicked user >${user.username}< with id >${user.id}< from guild >${message.guild.name}<`);
};