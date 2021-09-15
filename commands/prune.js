const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('prune')
    .setDescription(
      'Delete up to 99 recent messages. Only works within 14 days.'
    )
    .addIntegerOption((option) =>
      option
        .setName('deletecount')
        .setDescription('Number of messages to delete')
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)
    ) {
      await interaction.reply(
        ":x: | Sorry! You don't have permission to use this command in this server. Missing perm: MANAGE_MESSAGES"
      );
    } else {
      let deleteCount = interaction.options.getInteger('deletecount');
      try {
        await interaction.channel.bulkDelete(deleteCount);
        await interaction.reply(`Deleted ${deleteCount} messages.`);
      } catch (e) {
        console.error(e);
        await interaction.reply(
          ":x: Something went wrong when trying to delete messages, it's probably been too long since they've been sent!"
        );
      }
    }
  },
};
