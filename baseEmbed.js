const { MessageEmbed } = require('discord.js');

module.exports = function () {
  return new MessageEmbed()
    .setFooter({ text: `LyraBot - Made with ❤️ by Lyra Rose` })
    .setColor('#F399D9');
};
