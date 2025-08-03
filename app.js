const bells = new Audio('./sounds/bell.wav');
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const session = document.querySelector('.minutes');
let myInterval;
let state = true;
let savedSeconds = 0;
let isPaused = false;

const appTimer = () => {
  const sessionAmount = Number.parseInt(session.textContent);
  const minuteDiv = document.querySelector('.minutes');
  const secondDiv = document.querySelector('.seconds');

  // If timer was paused, restore normal display
  if (isPaused) {
    isPaused = false;
    const timerDisplay = document.querySelector('.app-counter-box p');
    timerDisplay.innerHTML = `<span class="minutes">${Math.floor(savedSeconds / 60)}</span>:<span class="seconds">${String(savedSeconds % 60).padStart(2, '0')}</span>`;
  }

  if (state) {
    state = false;
    let totalSeconds = isPaused ? savedSeconds : sessionAmount * 60;

    const updateSeconds = () => {
      const minuteDiv = document.querySelector('.minutes');
      const secondDiv = document.querySelector('.seconds');

      totalSeconds--;

      let minutesLeft = Math.floor(totalSeconds / 60);
      let secondsLeft = totalSeconds % 60;

      if (secondsLeft < 10) {
        secondDiv.textContent = '0' + secondsLeft;
      } else {
        secondDiv.textContent = secondsLeft;
      }
      minuteDiv.textContent = `${minutesLeft}`;

      if (minutesLeft === 0 && secondsLeft === 0) {
        bells.play();
        clearInterval(myInterval);
      }
    };

    myInterval = setInterval(updateSeconds, 1000);
  } else {
    alert('Session has already started.');
  }
};

startBtn.addEventListener('click', appTimer);

// Add pause button functionality
pauseBtn.addEventListener('click', () => {
  if (myInterval && !isPaused) {
    // Save current time
    const minuteDiv = document.querySelector('.minutes');
    const secondDiv = document.querySelector('.seconds');
    const timerDisplay = document.querySelector('.app-counter-box p');
    
    savedSeconds = parseInt(minuteDiv.textContent) * 60 + parseInt(secondDiv.textContent);
    clearInterval(myInterval);
    myInterval = null;
    state = true;
    isPaused = true;
    
    // Replace the entire timer display with "PAUSED" text
    timerDisplay.innerHTML = "<span class='paused-text'>PAUSED</span>";
  }
});