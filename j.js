let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const centiseconds = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${minutes}:${seconds}:${centiseconds}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

document.getElementById('start').onclick = () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    isRunning = true;
  }
};

document.getElementById('pause').onclick = () => {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
  }
};

document.getElementById('reset').onclick = () => {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  updateDisplay();
  laps.innerHTML = '';
};

document.getElementById('lap').onclick = () => {
  if (isRunning) {
    const li = document.createElement('li');
    li.textContent = formatTime(elapsedTime);
    laps.appendChild(li);
  }
};
