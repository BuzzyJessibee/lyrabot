const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./queue"),
    icon: ":pencil:",
    name: 'queue',
    aliases: ['song-list', 'next-songs', 'q'],
    group: 'music',
    memberName: 'queue',
    guildOnly: true,
    description: 'Display the song queue!'
});