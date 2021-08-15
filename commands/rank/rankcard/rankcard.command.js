const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./rankcard"),
    name: 'rank',
    group: 'rank',
    memberName: 'rank',
    description: 'View your rank card, showing your current XP with LyraBot :heart:',
    args: [
        {
            key: 'xpType',
            prompt: 'Would you like **guild** xp or **personal** xp?',
            type: 'string',
            default: 'guild'
        }
    ]
});
