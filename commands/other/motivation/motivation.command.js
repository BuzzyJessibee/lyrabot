const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./motivation"),
    name: 'motivation',
    aliases: ['motivational', 'motivation-quote', 'motivate'],
    group: 'fun',
    memberName: 'motivation',
    description: 'Get a random motivational quote!'
});