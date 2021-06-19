const Levels = require("./discord-xp");

module.exports = async function ({Database, CommandoClient}) {
    await Levels.setDb(Database);

    CommandoClient.on("message", async (message) => {
        if (!message.guild) return;
        if (message.author.bot) return;

        //const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
        const randomAmountOfXp = 5000; // Min 1, Max 30

        const {guildLevel, userLevel} = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);

        if (userLevel && guildLevel)
            await message.channel.send(`${message.author}, congratulations! Your server level has increased to **${guildLevel}**, and your personal to **${userLevel}**! :tada:`);
        else if (userLevel)
            message.channel.send(`${message.author}, congratulations! Your personal level has increased to **${userLevel}**. :tada:`);
        else if (guildLevel)
            message.channel.send(`${message.author}, congratulations! Your server level has increased to **${guildLevel}**. :tada:`);

    });

    return Levels
}
