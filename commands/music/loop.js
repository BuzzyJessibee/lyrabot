const { Command } = require('discord.js-commando');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loop',
      aliases: [`repeat`],
      group: 'music',
      memberName: 'loop',
      guildOnly: true,
      description: 'Loop the currently playing song!'
    });
  }

  async run(message) {
    var voiceChannel = message.member.voice.channel;
    if (!voiceChannel)
      return message.reply(
        ':no_entry: Please join a voice channel and try again!'
      );
    if (!message.client.player.isPlaying(message)) {
      return message.say(':x: There is no song playing right now!');
    } else if (voiceChannel.id !== message.guild.me.voice.channel.id) {
      message.reply(
        `:no_entry: You must be in the same voice channel as the bot's in order to use that!`
      );
      return;
    } else {
        const video = await message.client.player.nowPlaying(message);
        let toggle = message.client.player.toggleLoop(message);
        
        if(toggle === null)
            return;
        // Send a message with the toggle information
        else if (toggle)
            message.channel.send(`**${video.name}** is now playing on repeat :repeat:`);
        else message.channel.send(`**${video.name}** is no longer playing on repeat :repeat:`);
     }
   }
}