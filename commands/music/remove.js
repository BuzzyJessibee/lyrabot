const { Command } = require('discord.js-commando');

module.exports = class RemoveSongCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'remove',
      memberName: 'remove',
      group: 'music',
      description: 'Remove a specific song from queue!',
      guildOnly: true,
      args: [
        {
          key: 'songNumber',
          prompt:
            ':wastebasket: What song number do you want to remove from queue?',
          type: 'integer'
        }
      ]
    });
  }
  async run(message, {songNumber}) {
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
    } else if (songNumber == 1) {
        message.channel.send(':x: Please use skip instead!')
    } else {
        let SongID = parseInt(songNumber)-1; // The index is starting from 0, so we subtract 1.
        
        // Removes a song from the queue
        let song = message.client.player.remove(message, SongID);
        if(song)
            message.channel.send(`Removed song ${song.name} (${songNumber}) from the Queue!`);
     }
   }
}