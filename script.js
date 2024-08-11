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
const btmResetPoint = document.getElementById('btm-reset-point')
const winComp = document.getElementById('win-comp')
const winUser = document.getElementById('win-user')
const choices = ["scissors", "paper", "stone"]
const messages = {
    finishGame: "زمان بازی تمام شد باختی",
    win: "شما برنده شدید",
    lose: "شما باختید",
    even: "مساوی",
}

let myPoint = 0;
let cmPoint = 0;
let timeGame = 15;

var winA = new Audio('win.mp3');
var loseA = new Audio('lose.mp3');


addEventListener("DOMContentLoaded", () => {
    timeing(false)
});



// Game reset button
btmResetGame.addEventListener("click", function (event) {
    choiceUser.innerText = "";
    choiceCom.innerText = "";
    resultGame.innerText = "";
    resultGame.classList = "";
    winUser.classList.remove('winer-border');
    winComp.classList.remove('winer-border')
    if (timeGame <= 0) {
        timeing(false)
    }
    timeGame = 15;
    timeing(true)
});



// Points reset button
btmResetPoint.addEventListener("click", () => {
    comPoint.innerText = "0";
    clinPoint.innerText = "0";
    myPoint = 0;
    cmPoint = 0;
})


// Rock Paper Scissors button click part
scissorsUser.addEventListener("click", () => {
    playGame("scissors", "✌️");
})
paperUser.addEventListener("click", () => {
    playGame("paper", "✋");
})
stoneUser.addEventListener("click", () => {
    playGame("stone", "✊");

})


// The timing part of the game
function timeing(clear) {
    currentTime.innerText = timeGame;
    let myInterval = setInterval(() => {
        if (timeGame >= 0) {
            currentTime.innerText = timeGame;
            timeGame = timeGame - 1;
        }
        if (timeGame <= -1) {
            resultGame.innerText = messages.finishGame;
            resultGame.classList.add("lose");
            loseA.play();
            cmPoint = cmPoint + 1;
            comPoint.innerText = cmPoint;
            choiceUser.innerText = "";
            choiceCom.innerText = "";
            clearInterval(myInterval);
            scissorsUser.classList.add("hide");
            paperUser.classList.add("hide");
            stoneUser.classList.add("hide");
            winUser.classList.remove('winer-border');
            winComp.classList.remove('winer-border')
        }
    }, 1000)
    if (clear) {
        clearInterval(myInterval);
    }

}


// Game start function
function playGame(choice, emoji) {
    if (timeGame > 0) {
        game(choice);
        choiceUser.innerText = emoji;
        console.log(choiceUser)
        timeGame = 15;
    } else {
        resultGame.innerText = messages.finishGame;
        resultGame.classList.add("lose");
    }
}


// Game function
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



// The part of calculating the result of the game
function result(userChoice, resultCom) {
    if (userChoice === resultCom) {
        winUser.classList.remove('winer-border');
        winComp.classList.remove('winer-border');
        showResult("even")
    } else if (
        (userChoice === "stone" && resultCom === "scissors") ||
        (userChoice === "paper" && resultCom === "stone") ||
        (userChoice === "scissors" && resultCom === "paper")
    ) {
        winComp.classList.remove('winer-border');
        winUser.classList.add('winer-border')
        showResult("win")
    } else {
        winUser.classList.remove('winer-border');
        winComp.classList.add('winer-border')
        showResult("lose")
    }
}



// Show the result of the game
function showResult(textRs) {
    if (textRs == "win") {
        resultGame.innerText = messages.win;
        resultGame.classList.remove("lose");
        resultGame.classList.remove("even");
        resultGame.classList.add("win");
        loseA.pause();
        winA.play();
        myPoint = myPoint + 1;
        clinPoint.innerText = myPoint;
    } else if (textRs == "lose") {
        resultGame.innerText = messages.lose;
        winA.pause();
        loseA.play();
        resultGame.classList.remove("win");
        resultGame.classList.remove("even");
        resultGame.classList.add("lose");
        cmPoint = cmPoint + 1;
        comPoint.innerText = cmPoint;
    } else if (textRs == "even") {
        resultGame.innerText = messages.even;
        resultGame.classList.remove("lose");
        resultGame.classList.remove("win");
        resultGame.classList.add("even");
    }
}
