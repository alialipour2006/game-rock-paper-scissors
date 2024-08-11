const scissorsUser = document.getElementById('scissors-user');
const paperUser = document.getElementById('paper-user');
const stoneUser = document.getElementById('stone-user');
const currentTime = document.getElementById('current-time-num')
const comPoint = document.getElementById('num-comp')
const clinPoint = document.getElementById('num-clin')
const choiceUser = document.getElementById('choice-user')
const choiceCom = document.getElementById('choice-com')
const resultGame = document.getElementById('result-game')
const btmResetGame = document.getElementById('btm-reset')
const choices = ["scissors", "paper", "stone"]
const messages = {
    finishGame: "بازی تمام شد",
    win: "شما برنده شدید",
    lose: "شما باختید",
    even: "مساوی",
}

let myPoint = 0;
let cmPoint = 0;
let timeGame = 15;


addEventListener("DOMContentLoaded", () => {
    timeing()
});


btmResetGame.addEventListener("click", () => {
    choiceUser.innerText = "";
    choiceCom.innerText = "";

    resultGame.innerText = "";

    timeGame = 15;

});




scissorsUser.addEventListener("click", () => {
    playGame("scissors", "✌️");
    console.log(playGame);
})
paperUser.addEventListener("click", () => {
    playGame("paper", "✋");
})
stoneUser.addEventListener("click", () => {
    playGame("stone", "✊");
})



function timeing() {
    currentTime.innerText = timeGame;
    setInterval(() => {
        if (timeGame >= 0) {
            currentTime.innerText = timeGame;
            timeGame = timeGame - 1;
        }
        if (timeGame <= 0) {
            resultGame.innerText = messages.finishGame;
            choiceUser.innerText = "";
            choiceCom.innerText = "";
        }
    }, 1000)
}



function playGame(choice, emoji) {
    if (timeGame > 0) {
        game(choice);
        choiceUser.innerText = emoji;
        timeGame = 15;
    } else {
        resultGame.innerText = messages.finishGame;

    }

}


function game(userChoice) {
    let resultCom = choices[Math.floor(Math.random() * choices.length)];
    switch (resultCom) {
        case "scissors":
            choiceCom.innerText = "✌️";
            break;
        case "paper":
            choiceCom.innerText = "✋";
            break;
        case "stone":
            choiceCom.innerText = "✊";
            break;
        default:
            choiceCom.innerText = "";
    }
    result(userChoice, resultCom)
}



function result(userChoice, resultCom) {
    if (userChoice === resultCom) {
        showResult("even")
    } else if (
        (userChoice === "stone" && resultCom === "scissors") ||
        (userChoice === "paper" && resultCom === "stone") ||
        (userChoice === "scissors" && resultCom === "paper")
    ) {
        showResult("win")
    } else {
        showResult("lose")
    }
}



function showResult(textRs) {
    if (textRs == "win") {
        resultGame.innerText = messages.win;
        resultGame.classList.add("win");
        myPoint = myPoint + 1;
        clinPoint.innerText = myPoint;
    } else if (textRs == "lose") {
        resultGame.innerText = messages.lose;
        resultGame.classList.add("lose");
        cmPoint = cmPoint + 1;
        comPoint.innerText = cmPoint;
    } else if (textRs == "even") {
        resultGame.innerText = messages.even;
        resultGame.classList.add("even");
    }
}
