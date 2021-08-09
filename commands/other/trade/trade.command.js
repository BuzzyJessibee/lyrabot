const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./trade"),
    name: 'board',
    aliases: ['trade'],
    group: 'fun',
    memberName: 'board',
    description: 'Post a bounty request',
    args: [
        {
            key: 'request',
            prompt: 'What are you requesting (what do you want?)?',
            type: 'string'
        },
        {
            key: 'reward',
            prompt: 'What are you giving the person?',
            type: 'string'
        },
        {
            key: 'times',
            prompt: 'How many trades are you offering? (if unsure just type 1)',
            type: 'string'
        },
    ],
});