const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./ping"),
    name: 'ping',
    group: 'lyrautilities',
    memberName: 'ping',
    description: 'Checks the bot\'s ping to the Discord server.',
    throttling: {
        usages: 5,
        duration: 10
    }
}); 