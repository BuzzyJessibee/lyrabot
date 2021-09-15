const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Play a song or playlist!')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('What would you like to play?')
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.voice.channelId)
      return await interaction.reply({
        content: 'You are not in a voice channel!',
        ephemeral: true,
      });
    if (
      interaction.guild.me.voice.channelId &&
      interaction.member.voice.channelId !==
        interaction.guild.me.voice.channelId
    )
      return await interaction.reply({
        content: 'You are not in my voice channel!',
        ephemeral: true,
      });

    await interaction.deferReply();
    const query = interaction.options.getString('query');
    const player = interaction.client.player;
    let playerErr = false;
    if (
      // Handles PlayList Links
      query.match(
        /^(?!.*\?.*\bv=)https:\/\/((w){3}.|)youtube\.com\/.*\?.*\blist=.*$/
      )
    ) {
      let queue = player.createQueue(interaction.guildId, {
        data: {
          queueInitMessage: interaction,
        },
      });
      await queue.join(interaction.member.voice.channel);
      let song = await queue.playlist(query).catch((_) => {
        if (!queue) queue.stop();
        playerErr = true;
      });
      if (!playerErr) {
        interaction.followUp({ content: `⏱ | Loading your playlist...` });
      } else {
        interaction.followUp({ content: `❌ | I can't find that playlist!` });
      }
    } else {
      let queue = player.createQueue(interaction.guildId, {
        data: {
          queueInitMessage: interaction,
        },
      });
      await queue.join(interaction.member.voice.channel);
      let song = await queue.play(query).catch((err) => {
        console.log(err);
        if (!queue) queue.stop();
        playerErr = true;
      });
      if (!playerErr) {
        interaction.followUp({ content: `⏱ | Loading your song...` });
      } else {
        interaction.followUp({ content: `❌ | I can't find that song!` });
      }
    }
  },
};
