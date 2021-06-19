const banMessage = require("./messages/ban.message");
const invalidUserMessage = require("./messages/invalidUser.message");
const banErrorMessage = require("./messages/invalidUser.message");

const log = LyraCore.logger("Command/Ban");

module.exports = async function (message, {userToBan, reason, daysDelete}) {
    const extractNumber = /\d+/g;
    const userToBanID = userToBan.match(extractNumber)[0];
    const user = message.mentions.members.first() || (await message.guild.members.fetch(userToBanID));

    if (!user)
        return await message.channel.send(invalidUserMessage());

    if (!user.bannable) {
        await message.say(banErrorMessage());
        log(`Couldn't ban user >${user.user.username}<!`, "error");
    }

    await user.ban({days: daysDelete, reason: reason});
    await user.send("https://tenor.com/view/when-your-team-too-good-ban-salt-bae-gif-7580925");
    await message.say(banMessage(userToBan, reason));


};
