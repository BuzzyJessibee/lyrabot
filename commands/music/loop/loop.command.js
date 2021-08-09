const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./loop"),
    icon: ":arrows_clockwise:",
    name: 'loop',
    aliases: [`repeat`],
    group: 'music',
    memberName: 'loop',
    guildOnly: true,
    description: 'Loop the currently playing song!'
});