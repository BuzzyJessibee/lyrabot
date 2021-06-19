const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./prune"),
    name: 'prune',
    aliases: ['delete-messages', 'bulk-delete', 'purge'],
    description: 'Delete up to 99 recent messages. Only works within 14 days.',
    group: 'lyrautilities',
    memberName: 'prune',
    guildOnly: true,
    userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
    args: [
      {
        key: 'deleteCount',
        prompt: 'How many messages do you want to delete?',
        type: 'integer',
        validate: deleteCount => deleteCount < 100 && deleteCount > 0
      }
    ]
}); 