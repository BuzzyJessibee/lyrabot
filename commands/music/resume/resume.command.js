const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./resume"),
    icon: ":arrow_forward:",
    name: 'resume',
    aliases: ['resume-song', 'continue'],
    memberName: 'resume',
    group: 'music',
    description: 'Resume the current paused song!',
    guildOnly: true
});