const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./clear"),
    icon: ":x:",
    name: 'clear',
    aliases: [`clearqueue`, `cq`],
    group: 'music',
    memberName: 'clear',
    guildOnly: true,
    description: 'Clear the queue!'
});