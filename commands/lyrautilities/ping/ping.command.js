const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./ping"),
    name: 'ping',
    group: 'lyrautilities',
    memberName: 'ping',
    description: 'Checks the bot\'s ping to the Discord server.',
    icon: ":ping_pong:",
    throttling: {
        usages: 5,
        duration: 10
    }
});
