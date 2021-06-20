const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./birthday"),
    icon: ":cake:",
    name: 'birthday',
    group: 'fun',
    memberName: 'birthday',
    description: 'Wish someone a Happy Birthday!',
    args: [{
        key: 'user',
        prompt: "User tag of the person that you want the birthday wishes to go to!",
        type: 'user',
        default: commandoMessage => commandoMessage.author
    }]
});
