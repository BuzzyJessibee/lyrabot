const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./loopqueue"),
    icon: ":arrows_counterclockwise:",
    name: 'loopqueue',
    memberName: 'loopqueue',
    aliases: ['loop-queue', 'queue-loop'],
    group: 'music',
    description: 'Loop the entire queue!',
    guildOnly: true,
});