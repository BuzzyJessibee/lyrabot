const { Command } = require('discord.js-commando');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'loopqueue',
      memberName: 'loopqueue',
      aliases: ['loop-queue', 'queue-loop'],
      group: 'music',
      description: 'Loop the entire queue!',
      guildOnly: true,
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
        let toggle = message.client.player.toggleQueueLoop(message);
        
        if(toggle === null)
            return;
        // Send a message with the toggle information
        else if (toggle)
            message.channel.send(`The full queue is now on repeat :repeat:`);
        else message.channel.send(`The full queue is no longer on repeat :repeat:`);
     }
   }
}