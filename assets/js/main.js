const nameInput = document.getElementById('nameInput');
const miracleInput = document.getElementById('miracleInput');
const keyboard = document.getElementById('keyboard');
const timerDisplay = document.getElementById('timer');
const resultDisplay = document.getElementById('modalMessage');
const startButton = document.getElementById('startButton');
const step2 = document.getElementById('step2');
const difficultySelect = document.getElementById('difficulty');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const modalButton = document.getElementById('modalButton');
const restartButton = document.getElementById('restartButton');

const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let timer;
let timeLeft;

function showModal(message, type = 'success', restart = false) {
  resultDisplay.textContent = message;
  modal.className = `modal show ${type}`;
  overlay.classList.add('show');
  restartButton.classList.toggle('hidden', !restart);
}

function hideModal() {
  modal.classList.remove('show');
  overlay.classList.remove('show');
}

function createKeyboard() {
  keyboard.innerHTML = '';
  const shuffledKeys = [...keys].sort(() => Math.random() - 0.5);
  shuffledKeys.forEach((key) => {
    const keyButton = document.createElement('div');
    keyButton.classList.add('key');
    keyButton.textContent = key;
    keyButton.onclick = () => {
      miracleInput.value += key;
      keyButton.classList.add('highlight');
      setTimeout(() => keyButton.classList.remove('highlight'), 200);
    };
    keyboard.appendChild(keyButton);
  });
}

function startGame() {
  if (!nameInput.value.trim()) {
    showModal('Please fill in your name to start the game.', 'error');
    return;
  }

  timeLeft = parseInt(difficultySelect.value, 10);
  nameInput.disabled = true;
  miracleInput.value = '';
  miracleInput.placeholder = 'Type here';
  miracleInput.readOnly = false;
  miracleInput.classList.remove('hidden');
  keyboard.classList.remove('hidden');
  step2.classList.remove('hidden');
  timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
  startButton.disabled = true;

  createKeyboard();
  const keyboardInterval = setInterval(createKeyboard, 500);

  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      clearInterval(keyboardInterval);
      finishGame();
    }
  }, 1000);
}

function finishGame() {
  miracleInput.readOnly = true;
  startButton.disabled = false;
  keyboard.classList.add('hidden');

  const originalName = nameInput.value.trim().toUpperCase();
  const typedName = miracleInput.value.trim().toUpperCase();

  if (originalName === typedName) {
    showModal(`Congratulations, ${nameInput.value}! You typed the name correctly.`, 'success', true);
  } else {
    showModal(`Oops, ${nameInput.value}! The names do not match. Try again.`, 'error', true);
  }
}

miracleInput.addEventListener('paste', (e) => e.preventDefault());
miracleInput.addEventListener('keydown', (e) => e.preventDefault());

startButton.addEventListener('click', startGame);
modalButton.addEventListener('click', hideModal);
restartButton.addEventListener('click', () => {
  hideModal();
  nameInput.disabled = false;
  nameInput.value = '';
  miracleInput.value = '';
  step2.classList.add('hidden');
  miracleInput.classList.add('hidden');
  keyboard.classList.add('hidden');
  startButton.disabled = false;
});