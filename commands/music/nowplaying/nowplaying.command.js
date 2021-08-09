const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./nowplaying"),
    icon: ":headphones:",
    name: 'nowplaying',
    group: 'music',
    memberName: 'nowplaying',
    aliases: ['np', 'currently-playing', 'now-playing'],
    guildOnly: true,
    description: 'Display the currently playing song!'
});