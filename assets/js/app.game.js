const username = document.getElementById('username');  //INPUT WHICH CONTENTS USERNAME
const autoName = document.getElementById('autoName'); //IT WILL CHANGE GREATING NAME CONTENT ON SER

let isPlayer;

let callPlayer2nd = document.getElementById('callPlayer2nd');

const currentPlayer = sessionStorage.getItem('isPlaying', isPlayer);

function isChangePlayer () {
  username.addEventListener('input', () => {
    autoName.textContent = username.value;
  });
} 

if (currentPlayer) {
  username.value = null;
  autoName.textContent = currentPlayer; 

  isChangePlayer();

  console.log(currentPlayer)
} else {
  isChangePlayer();
}

const nameFormSub = document.getElementById('nameFormSub');

const setPlayer = function () {
  if (username.value == '') {
    isPlayer = currentPlayer;
  } else {
    isPlayer = username.value;
  }
  console.log('Le joueur est: ', isPlayer);

  sessionStorage.setItem('isPlaying', isPlayer);
}

isPlayer = username.value;

console.log(isPlayer);