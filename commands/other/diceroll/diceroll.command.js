const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./diceroll"),
    name: 'roll',
    group: 'fun',
    memberName: 'roll',
    description: 'Rolls a dice.',
    args: [
        {
            key: 'dice',
            prompt: 'Please enter a dice in the form [# of dice]d[# of sides]!',
            type: 'string',
            default: '1d6'
        }
    ]
});