const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./say"),
    name: 'say',
    aliases: ['make-me-say', 'print'],
    memberName: 'say',
    group: 'fun',
    description: 'Make the bot say anything!',
    args: [
      {
        key: 'text',
        prompt: ':microphone2: What do you want the bot to say?',
        type: 'string'
      }
    ]
});