const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Play rock paper scissors!')

    .addStringOption((option) =>
      option
        .setName('move')
        .setDescription("What's your move?")
        .setRequired(true)
        .addChoice('Rock', 'rock')
        .addChoice('Paper', 'paper')
        .addChoice('Scissors', 'scissors')
    ),

  async execute(interaction) {
    let move = interaction.options.getString('move');

    const replies = [':rock: Rock', ':pencil: Paper', ':scissors: Scissors'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    let isWin;

    if (reply === replies[0]) {
      switch (move) {
        case 'rock':
          isWin = 'Tie!';
          break;
        case 'paper':
          isWin = 'You win!';
          break;
        case 'scissors':
          isWin = 'I win!';
      }
    } else if (reply === replies[1]) {
      switch (move) {
        case 'rock':
          isWin = 'I win!';
          break;
        case 'paper':
          isWin = 'Tie!';
          break;
        case 'scissors':
          isWin = 'You win!';
      }
    } else if (reply === replies[2]) {
      switch (move) {
        case 'rock':
          isWin = 'You win!';
          break;
        case 'paper':
          isWin = 'I win!';
          break;
        case 'scissors':
          isWin = 'Tie!';
      }
    }
    let embed = baseEmbed()
      .setTitle('Rock, Paper, Scissors')
      .setDescription(`**${reply}**\n\n**${isWin}**`);

    await interaction.reply({ embeds: [embed] });
  },
};
