const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription("Replies with the bot's total uptime."),
  async execute(interaction) {
    let seconds = parseInt((interaction.client.uptime / 1000) % 60);
    let minutes = parseInt((interaction.client.uptime / (1000 * 60)) % 60);
    let hours = parseInt((interaction.client.uptime / (1000 * 60 * 60)) % 24);

    // if there's not two digits, add a 0 to make it prettier
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    await interaction.reply(
      `:chart_with_upwards_trend: I've been running for **${hours}** hours, **${minutes}** minutes and **${seconds}** seconds!`
    );
  },
};
