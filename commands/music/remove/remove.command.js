const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./remove"),
    icon: ":wastebasket:",
    name: 'remove',
    memberName: 'remove',
    group: 'music',
    description: 'Remove a specific song from queue!',
    guildOnly: true,
    args: [
        {
            key: 'songNumber',
            prompt:
                ':wastebasket: What song number do you want to remove from queue?',
            type: 'integer'
        }
    ]
});