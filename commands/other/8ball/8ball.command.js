const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./8ball"),
    name: '8ball',
    group: 'fun',
    memberName: '8ball',
    description: 'Lyra will answer all your questions!',
    examples: ['ly!8ball Will I be rich and famous?'],
    args: [{
        key: 'question',
        prompt: "Don't forget your question!",
        type: 'string'
    }]
});
