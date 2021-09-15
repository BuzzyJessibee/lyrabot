const baseEmbed = require('../baseEmbed');
const answers = require('./json/8ballAnswers.json');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Lyra will answer all your questions!')
    .addStringOption((option) =>
      option
        .setName('question')
        .setDescription("Don't forget your question!")
        .setRequired(true)
    ),
  async execute(interaction) {
    let question = interaction.options.getString('question');
    let answer = answers[Math.floor(Math.random() * answers.length)];
    let embed = baseEmbed()
      .setTitle(':8ball: | 8ball')
      .setDescription(
        `Q: ${question}
                            A: **${answer}**`
      );
    await interaction.reply({ embeds: [embed] });
  },
};
