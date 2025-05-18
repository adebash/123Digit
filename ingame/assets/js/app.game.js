let currentPlayer = sessionStorage.getItem('isPlaying'); //Recover current player form session storage
let currentDifficulty = sessionStorage.getItem('isCurrentDifficulty'); //Recover current level form session storage
let currentLives = Number(sessionStorage.getItem('isCurrentLives')) || 0; //Recover current difficulty form session storage
let sessionDifficulty = sessionStorage.getItem('currentCallDifficulty');

const currentNumber = sessionStorage.getItem('guessNumber');
const currentHelpMessage = sessionStorage.getItem('helpMessage');

let isPlayer = document.getElementById('isPlayer'); //Call for greating current player
// const begPlaye
const isRemainingLife = document.getElementById('isRemainingLife'); //Call for this id (life remaining) to auto change the content
// begPlayerName = document.getElementById('begPlayerName');

const helpLog = document.getElementById('helpLog');

console.log(isPlayer, currentPlayer);

// begPlayerName.textContent = currentPlayer;
isPlayer.textContent = currentPlayer; //Set greating current player's content to current player recovered from session storage

const difficulties = document.querySelectorAll('input[name="difficulty"]'); //Call for all input has named difficulty

let isDifficulty; //Call a variable for difficulty changing
const flowDifficulty = document.getElementById('flowDifficulty'); //Call for difficulty displayer in submitter

const subDifficulty = document.getElementById('subDifficulty'); //Call for difficulty submitter
;

let tries;

const dBoxes = document.querySelectorAll(".dBox");
console.log(dBoxes);

dBoxes.forEach(dBox => {
  dBox.addEventListener('click', () => {
    dBoxes.forEach(dB => dB.removeAttribute('id'));
    dBox.setAttribute('id', 'active');
  });
  
})

const isDifficultyValueChange = function () {
    //This function is here to change tries value on ${isDifficulty}'s value changing
  if (isDifficulty === "easy") {
    tries = 10; //Set tries to 10
  } else if (isDifficulty === "normal") {
    tries = 5; //Set tries to 5
  } else if (isDifficulty === 'hard') {
    tries = 3; //Set tries to 3
  }

  flowDifficulty.textContent = `(${tries} Tries)`; //Show current difficulty to the player before submition

  console.log(currentLives, 'isRemainingLife', isRemainingLife.textContent);
  currentLives = tries;

//  currentLives = isRemainingLife.textContent; //isCurrentLives will take content of isRemainaingLife
}


let isCallDifficulty;

subDifficulty.addEventListener('click', () => {
  if (isDifficulty) { //If isDifficulty exists, make this
    isDifficultyValueChange(); //Start this function

    callDifficulty.textContent = isDifficulty; //Set content of callDifficulty to value stocked in session storage

    sessionStorage.setItem('isCurrentDifficulty', isDifficulty); //Set last difficulty value to the current value selected among actuals difficulties
    
    sessionStorage.setItem('isCurrentLives', currentLives); //Set last difficulty value to the current value selected among actuals difficulties

    isRemainingLife.textContent = parseInt(currentLives); //isRemainingLife will take current tries value

    console.log(isDifficulty, currentLives, tries);

    console.log(callDifficulty, isDifficulty);
    isCallDifficulty = callDifficulty.textContent;

    sessionStorage.setItem('currentCallDifficulty', isCallDifficulty)

    setDifficultiesBox();
  }
    

  console.log(isCallDifficulty)
});

function isDifficultiesSet () {
  difficulties.forEach(difficulty => {
  //Select all elements of difficulties[]
  difficulty.addEventListener('click', () => {
    //Add event to each elements of difficulties[]
    isDifficulty = difficulty.value; //Change ${isDifficulty}'s value to current clicked element's value
    isDifficultyValueChange(); //Call for isDifficultyValueChange()
  console.log(isDifficulty);
  }); //
});
}

isDifficultiesSet();

//START INGAME MATCHING DATAS ENTRIES

const callPlayer2nd = document.getElementById('callPlayer2nd'); //Call for this id (player name in game) to auto change the content
const callDifficulty = document.getElementById('callDifficulty'); //Call for this id (difficulty) to auto change the content

if (currentDifficulty) {
  callDifficulty.textContent = currentDifficulty;
}

if (currentPlayer) {
callPlayer2nd.textContent = currentPlayer;
}

console.log(callPlayer2nd.textContent, callDifficulty.textContent, isRemainingLife.textContent);

let toGuess;
const indexDifficulty = document.getElementById('indexDifficulty');

function setToGuess () {
  if (indexDifficulty) {
    if (indexDifficulty.textContent === "Beginner") {
      toGuess = Math.floor(Math.random() * 10);
    } else if (indexDifficulty.textContent === "Medium") {
      toGuess = Math.floor(Math.random() * 20);
    } else if (indexDifficulty.textContent === "Pro") {
      toGuess = Math.floor(Math.random() * 50);
    }

    sessionStorage.setItem('guessNumber', toGuess)
  }
}

if (currentNumber) {
  toGuess = currentNumber
  } else {
    setToGuess();
  }
  console.log(toGuess);
  
  sessionStorage.setItem('guessNumber', toGuess);

console.log(toGuess);

const guessInput = document.getElementById('guessInput');
const inputChecker = document.getElementById('inputChecker');
const helper = document.getElementById('helper');
let helperContent;

console.log('Tries: ', tries, 'currentLives: ', currentLives);

currentLives = currentLives * 1;

function restartGame() {
  helperContent = "";
  sessionStorage.setItem('helpMessage', helperContent);

  guessInput.disabled = true;
  inputChecker.disabled = true;

  let timeLeft = 20;
  const countdownMessage = document.getElementById('countdownMessage');
  const restartNowBtn = document.getElementById('restartNow');

  countdownMessage.textContent = `Next game will start in ${timeLeft} seconds...`;
  restartNowBtn.style.display = "inline-block"; // Affiche le bouton

  const endRestart = () => {
    countdownMessage.textContent = '';
    restartNowBtn.style.display = "none";

    currentLives = 0;
    sessionStorage.setItem('isCurrentLives', currentLives);
    isRemainingLife.textContent = currentLives;

    guessInput.disabled = false;
    inputChecker.disabled = false;

    setDifficultiesBox();
    console.log(indexDifficulty.textContent)
  };

  const countdown = setInterval(() => {
    timeLeft--;
    countdownMessage.textContent = `Next game will start in ${timeLeft} seconds...`;

    if (timeLeft <= 0) {
      clearInterval(countdown);
      endRestart();
    }
  }, 1000);

  restartNowBtn.onclick = () => {
    clearInterval(countdown);
    endRestart();
  };
}

inputChecker.addEventListener('click', () => {
  if (((currentLives) === 1) && (guessInput.value != toGuess)) {
    helper.textContent = `Oops, you loosed ! The number was ${toGuess}`;
    restartGame();
    setToGuess();
  } else {
    if (guessInput.value < toGuess) {
      helper.textContent = `${guessInput.value} is under the number to guess.`;
      helpLog.style.backgroundColor = `var(--danger-alt)`;
      helpLog.style.border = `1px solid var(--danger)`;
    } else if (guessInput.value > toGuess) {
      helper.textContent = `${guessInput.value} is more than the number to guess.`
      helpLog.style.backgroundColor = `var(--danger-alt)`;
      helpLog.style.border = `1px solid var(--danger)`;
    } else {
      helper.textContent = `Congratulation ! The number was ${toGuess}`
      helpLog.style.backgroundColor = `var(--success-alt)`;
      helpLog.style.border = `1px solid var(--success)`;
      restartGame();
      setToGuess();
    }
    sessionStorage.setItem('helpMessage', helper.textContent);

  }

  currentLives = currentLives - 1;
  isRemainingLife.textContent = parseInt(currentLives * 1);

  sessionStorage.setItem('isCurrentLives', currentLives)
  console.log(currentLives, isRemainingLife.textContent)
})

if (currentLives) {
  isRemainingLife.textContent = parseInt(currentLives);
}

if (currentHelpMessage) {
  helper.textContent = currentHelpMessage;
} else {
  helperContent = helper.textContent;
  sessionStorage.setItem('helpMessage', helperContent); 
}

  console.log(currentLives, isRemainingLife.textContent, currentHelpMessage)
  

const difficultiesBox = document.getElementById('difficultiesBox');

function setDifficultiesBox () {
if (isRemainingLife || currentLives) {
  if ((isRemainingLife.textContent * 1) > 0) {
    difficultiesBox.style.opacity = 0;
    difficultiesBox.style.zIndex = -1;
  } else {
    difficultiesBox.style.opacity = 1;
    difficultiesBox.style.zIndex = 2;
  }
  }
}

setDifficultiesBox();