const { Command } = require('discord.js-commando');

module.exports = class LoopCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'clear',
      aliases: [`clearqueue`, `cq`],
      group: 'music',
      memberName: 'clear',
      guildOnly: true,
      description: 'Clear the queue!'
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
        let isDone = message.client.player.clearQueue(message);
        if(isDone)
            message.channel.send('Queue was cleared!');
     }
   }
}