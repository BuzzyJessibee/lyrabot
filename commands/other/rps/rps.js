const rpsMessage = require("./messages/rps.message")
 
 
module.exports = async function (message, {move}) {
    const replies = [':rock: Rock', ':pencil: Paper', ':scissors: Scissors'];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    let isWin;

    if (reply === replies[0]){
        switch(move){
            case "rock":
                isWin = "Tie!"
                break
            case "paper":
                isWin = "You win!"
                break
            case "scissors":
                isWin = "I win!"
        }
    } else if (reply === replies[1]){
        switch(move){
            case "rock":
                isWin = "I win!"
                break
            case "paper":
                isWin = "Tie!"
                break
            case "scissors":
                isWin = "You win!"
        }
    } else if (reply === replies[2]){
        switch(move){
            case "rock":
                isWin = "You win!"
                break
            case "paper":
                isWin = "I win!"
                break
            case "scissors":
                isWin = "Tie!"
        }
    }
    await message.say(rpsMessage(reply, isWin));

};
