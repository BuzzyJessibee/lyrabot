module.exports = async function ({CommandoClient}) {
    const activity = ['intently | use ly!ra', {type: 'WATCHING'}];

    await CommandoClient.user.setActivity(...activity)

    setInterval(() => {
        CommandoClient.user.setActivity(...activity)
    }, 100000);
}
