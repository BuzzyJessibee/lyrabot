const { Command } = require('discord.js-commando');

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
      let song = message.client.player.pause(message);
      if(song) 
          message.channel.send(`:pause_button: Song was paused!`);
     }
};
