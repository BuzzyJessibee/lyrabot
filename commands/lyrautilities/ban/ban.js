const banMessage = require("./messages/ban.message")

module.exports = async function (message, { userToBan, reason, daysDelete }) {
  const extractNumber = /\d+/g;
  const userToBanID = userToBan.match(extractNumber)[0];
  const user = message.mentions.members.first() || (await message.guild.members.fetch(userToBanID));
  if (user == undefined)
    return message.channel.send(':x: Please try again with a valid user.');
  await user.send("https://tenor.com/view/when-your-team-too-good-ban-salt-bae-gif-7580925")
  user
    .ban({ days: daysDelete, reason: reason })
    .then(() => {
      message.say(banMessage(userToBan, reason));
    })
    .catch(err => {
      message.say(
        ':x: Something went wrong when trying to ban this user, I probably do not have the permission to ban him!'
      );
      return console.error(err);
    });
};
