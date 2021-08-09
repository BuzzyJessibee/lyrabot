const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./skip"),
    icon: ":twisted_rightwards_arrows:",
    name: 'skip',
    aliases: ['skip-song', 'advance-song', 'next'],
    memberName: 'skip',
    group: 'music',
    description: 'Skip the current playing song!',
    guildOnly: true
});