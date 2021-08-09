const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./pause"),
    icon: ":pause_button:",
    name: 'pause',
    aliases: ['pause-song', 'hold'],
    memberName: 'pause',
    group: 'music',
    description: 'Pause the current playing song!',
    guildOnly: true
});