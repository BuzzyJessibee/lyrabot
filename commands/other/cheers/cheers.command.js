const {buildCommand} = LyraCore

module.exports = buildCommand({
    run: require("./cheers"),
    name: 'cheers',
    group: 'fun',
    memberName: 'cheers',
    description: 'Feeling Cheery?'
});