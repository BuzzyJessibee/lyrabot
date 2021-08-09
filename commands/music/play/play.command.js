const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./play"),
    icon: ":play_pause:",
    name: 'play',
    aliases: ['play-song', 'add', 'p'],
    memberName: 'play',
    group: 'music',
    description: 'Play any song or playlist from youtube!',
    guildOnly: true,
    clientPermissions: ['SPEAK', 'CONNECT'],
    throttling: {
        usages: 2,
        duration: 5
    },
    args: [
        {
            key: 'query',
            prompt: ':notes: What song or playlist would you like to listen to?',
            type: 'string',
            validate: function(query) {
                return query.length > 0 && query.length < 200;
            }
        }
    ]
});