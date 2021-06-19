const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./uptime"),
    name: 'uptime',
    aliases: ['alive', 'up'],
    memberName: 'uptime',
    group: 'lyrautilities',
    description: "Replies with the bot's total uptime."
});
