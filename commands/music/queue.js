const { Command } = require('discord.js-commando');
const Pagination = require('discord-paginationembed');

module.exports = class QueueCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'queue',
      aliases: ['song-list', 'next-songs', 'q'],
      group: 'music',
      memberName: 'queue',
      guildOnly: true,
      description: 'Display the song queue!'
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
        let queue = message.client.player.getQueue(message);
        if(queue)
        var mapQueue;
        mapQueue = queue.songs.map((song, i) => {
            return `${song.name}`
        });    

        const queueEmbed = new Pagination.FieldsEmbed()
            .setArray(mapQueue)
            .setAuthorizedUsers([message.author.id])
            .setChannel(message.channel)
            .setElementsPerPage(10)
            .formatField('# - Song', function(e) {
              return `**${mapQueue.indexOf(e) + 1}**: ${e}`;
            });

          queueEmbed.embed.setColor('#32A8A0').setTitle('Music Queue').setFooter(`LyraBot - Made with ❤️ by Lyra Rose`);
          queueEmbed.build();
        }
    }
};
