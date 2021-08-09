const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./leave"),
    icon: ":door:",
    name: 'leave',
    aliases: ['end', 'stop'],
    group: 'music',
    memberName: 'leave',
    guildOnly: true,
    description: 'Leaves voice channel if in one!'
});