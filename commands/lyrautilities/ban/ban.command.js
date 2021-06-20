const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./ban"),
    icon: ":hammer:",
    name: 'ban',
    aliases: ['ban-member', 'ban-hammer'],
    memberName: 'ban',
    group: 'lyrautilities',
    description: 'Bans a tagged member. With a little BMing thrown in...',
    guildOnly: true,
    userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
    clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
    args: [
      {
        key: 'user',
        prompt: 'Please mention the user you want to ban with @.',
        type: 'user'
      },
      {
        key: 'reason',
        prompt: 'Why do you want to ban this user?',
        type: 'string'
      },
      {
        key: 'daysDelete',
        prompt:
          'How many days worth of messages do you want to delete from this user?',
        type: 'integer',
        validate: function validate(daysDelete) {
          return daysDelete < 8 && daysDelete > 0;
        }
      }
    ]
});
