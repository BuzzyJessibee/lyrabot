const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./shuffle"),
    icon: ":twisted_rightwards_arrows:",
    name: 'shuffle',
    memberName: 'shuffle',
    group: 'music',
    description: 'Shuffle the song queue!',
    guildOnly: true
});