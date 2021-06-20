const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./motivation"),
    icon: ":mega:",
    name: 'motivation',
    aliases: ['motivational', 'motivation-quote', 'motivate'],
    group: 'fun',
    memberName: 'motivation',
    description: 'Get a random motivational quote!'
});
