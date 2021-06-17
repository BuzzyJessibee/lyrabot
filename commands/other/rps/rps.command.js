const {buildCommand} = LyraCore;

module.exports = buildCommand({
    run: require("./rps"),
    name: 'rps',
    aliases: ['rock-paper-scissors', 'rock'],
    group: 'fun',
    memberName: 'other',
    description: 'Rock paper scissors',
    args: [
      {
        key: 'move',
        prompt:
          'You ready for a game of Rock, Paper, Scissors? \n What is your move?',
        type: 'string',
        validate: function validateResponse(move) {
            if (move == "rock" || move == "paper" || move == "scissors") return true;
            return 'You gotta say **rock**, **paper**, or **scissors**!';
          }
      }
    ]
});