const commando = require("discord.js-commando");

// Wraps command class creation to remove boilerplate.
module.exports = function ({run, icon, ...commandOpts}) {
    const log = LyraCore.logger("Command Builder");
    log(`Building Command >${commandOpts.name}<`);

    const C = class extends commando.Command {
        constructor(client) {
            super(client, commandOpts);
            this.icon = icon ?? ":blue_square:"
        }

        async run(message, args, fromPattern, result) {
            await run(message, args);
            return null;
        }
    }

    //https://stackoverflow.com/questions/33605775/es6-dynamic-class-names
    Object.defineProperty(C, 'name', {value: `Command${commandOpts.name}`});

    return C;
}
