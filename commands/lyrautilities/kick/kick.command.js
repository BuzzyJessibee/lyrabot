const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./kick"),
    name: 'kick',
    aliases: ['kick-member'],
    memberName: 'kick',
    group: 'lyrautilities',
    description: 'Kicks a tagged member. With a little BMing thrown in...',
    guildOnly: true,
    userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
    clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
    args: [
      {
        key: 'userToKick',
        prompt:
          'Please mention the user you want to kick with @.',
        type: 'user'
      },
      {
        key: 'reason',
        prompt: 'Why do you want to kick this user?',
        type: 'string'
      }
    ]
});




