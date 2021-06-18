const log = LyraCore.logger("Guilds");

module.exports = function ({CommandoClient}) {
    CommandoClient.guilds.cache.forEach(guild => log(`Guild >${guild.name}< Connected!`));

    CommandoClient.on("guildCreate", (g) => log(`${g.name} added LyraBot.`));

    CommandoClient.on("guildDelete", (g) => log(`${g.name} removed LyraBot.`));
}
