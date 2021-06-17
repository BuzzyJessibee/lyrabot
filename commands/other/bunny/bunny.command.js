module.exports = buildCommand({
    run: require("./bunny"),
    name: 'bunny',
    group: 'fun',
    memberName: 'bunny',
    description: 'Get a picture of a rabbit!'
});