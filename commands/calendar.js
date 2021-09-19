const baseEmbed = require('../baseEmbed');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calendar')
    .setDescription('Print a calendar for an inputted month and year')
    .addIntegerOption((option) =>
      option
        .setName('month')
        .setDescription('What month do you want a calendar for?')
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName('year')
        .setDescription('What year do you want a calendar for?')
        .setRequired(true)
    ),
  async execute(interaction) {
    if (
      // Is the month valid? Jan-Dec?
      interaction.options.getInteger('month') <= 0 ||
      interaction.options.getInteger('month') > 12
    ) {
      interaction.reply(
        `:x: | Sorry! The month you entered \`${interaction.options.getInteger(
          'month'
        )}\` is invalid!`
      );
    }

    if (interaction.options.getInteger('year') < 1753) {
      // Doomsday formula only works with year 1753 or after
      interaction.reply(
        `:x: | Sorry! The year you entered \`${interaction.options.getInteger(
          'year'
        )}\` is invalid! It must be \`1753\` or later!`
      );
    }

    // grab the month and year from the user input
    let month = interaction.options.getInteger('month');
    let year = interaction.options.getInteger('year');

    await interaction.deferReply(); // give us time for calculations

    let header = displayHeader(month, year);
    let offset = computeOffset(month, year);
    let numDays = getNumDays(month);
    let calendar = parseCalendar(header, numDays, offset);

    // Print our calendar in a code block to keep formatting
    await interaction.followUp(`\`\`\`${calendar}\`\`\``);

    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function displayHeader(month, year) {
      let output;
      if (month == 1) output = 'January, ';
      else if (month == 2) output = 'February, ';
      else if (month == 3) output = 'March, ';
      else if (month == 4) output = 'April, ';
      else if (month == 5) output = 'May, ';
      else if (month == 6) output = 'June, ';
      else if (month == 7) output = 'July, ';
      else if (month == 8) output = 'August, ';
      else if (month == 9) output = 'September, ';
      else if (month == 10) output = 'October, ';
      else if (month == 11) output = 'November, ';
      else output = 'December, ';

      output += year; // add the year to the end

      return output;
    }
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function computeOffset(month, year) {
      let m = month;
      let y = year;
      let d = 1;

      const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4]; // doomsday formula offsets
      y -= m < 3;

      let result = (y + y / 4 - y / 100 + y / 400 + t[m - 1] + d) % 7; // doomsday formula
      let int = parseInt(result);
      if (int - 1 == -1) {
        int = 6;
      } else int -= 1;
      console.log(parseInt(result));
      return int;
    }
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function getNumDays(month) {
      let numDays;

      if (month == 1) numDays = 31;
      else if (month == 2) {
        if (year % 4 == 0 && year % 100 != 0) numDays = 29;
        else if (year % 4 == 0 && year % 100 == 0 && year % 400 == 0)
          numDays = 29;
        else numDays = 28;
      } else if (month == 3) numDays = 31;
      else if (month == 4) numDays = 30;
      else if (month == 5) numDays = 31;
      else if (month == 6) numDays = 30;
      else if (month == 7) numDays = 31;
      else if (month == 8) numDays = 31;
      else if (month == 9) numDays = 30;
      else if (month == 10) numDays = 31;
      else if (month == 11) numDays = 30;
      else numDays = 31;

      return numDays;
    }
    //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
    function parseCalendar(header, numDays, offset) {
      let body = header + '\n';
      body += '  Su  Mo  Tu  We  Th  Fr  Sa\n';

      let mOffset = offset;
      if (mOffset !== 6)
        for (let initOffset = 0; initOffset <= mOffset; ++initOffset) {
          body += ''.padStart(4);
        }

      for (
        let mDay = 1; // day of the month we're on
        mDay <= numDays; // Make sure we don't go over
        mDay++, mOffset++
      ) {
        if (mOffset === 5) {
          // If the day is Sat, time to make a new line
          body += `${mDay}\n`.padStart(5);
        } else if (mOffset === 7) {
          // If we get past sunday, time to start over
          body += `${mDay}`.padStart(4);
          mOffset = 0;
        } else body += `${mDay}`.padStart(4); // If nothing special, just print
      }
      if (mOffset !== 6) {
        // Avoid one too many blank lines if the
        // month ends a linebreaking weekday
        body += '\n';
      }

      return body;
    }
  },
};
