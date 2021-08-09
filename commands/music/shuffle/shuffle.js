const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = async function (message) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply(
        ':no_entry: Please join a voice channel and try again!'
      );
    if (!message.client.player.isPlaying(message)) {
      return message.say(':x: There is no song playing right now!');
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: You must be in the same voice channel as the bot in order to use that!`
      );
      return;
    } else {
        let songs = message.client.player.shuffle(message);
        if(songs) 
            message.channel.send(`:twisted_rightwards_arrows: Shuffled the Queue!`);
     }
}