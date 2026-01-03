// Symbol to angle mapping
const charMap = {
  '╔': [90, 0], '╗': [90, 180], '╚': [-90, 0], '╝': [-90, 180],
  '═': [0, 180], '║': [-90, 90], ' ': [135, 135]
};

// All digit patterns
const digits = {
  0: ['╔','═','═','╗','║','╔','╗','║','║','║','║','║','║','║','║','║','║','╚','╝','║','╚','═','═','╝'],
  1: ['╔','═','╗',' ','╚','╗','║',' ',' ','║','║',' ',' ','║','║',' ','╔','╝','╚','╗','╚','═','═','╝'],
  2: ['╔','═','═','╗','╚','═','╗','║','╔','═','╝','║','║','╔','═','╝','║','╚','═','╗','╚','═','═','╝'],
  3: ['╔','═','═','╗','╚','═','╗','║','╔','═','╝','║','╚','═','╗','║','╔','═','╝','║','╚','═','═','╝'],
  4: ['╔','╗','╔','╗','║','║','║','║','║','╚','╝','║','╚','═','╗','║',' ',' ','║','║',' ',' ','╚','╝'],
  5: ['╔','═','═','╗','║','╔','═','╝','║','╚','═','╗','╚','═','╗','║','╔','═','╝','║','╚','═','═','╝'],
  6: ['╔','═','═','╗','║','╔','═','╝','║','╚','═','╗','║','╔','╗','║','║','╚','╝','║','╚','═','═','╝'],
  7: ['╔','═','═','╗','╚','═','╗','║',' ',' ','║','║',' ',' ','║','║',' ',' ','║','║',' ',' ','╚','╝'],
  8: ['╔','═','═','╗','║','╔','╗','║','║','╚','╝','║','║','╔','╗','║','║','╚','╝','║','╚','═','═','╝'],
  9: ['╔','═','═','╗','║','╔','╗','║','║','╚','╝','║','╚','═','╝','║','╔','═','╝','║','╚','═','═','╝']
};

// Create a single digit grid
function createDigit() {
  const digitEl = document.createElement('div');
  digitEl.className = 'digit';
  
  for (let i = 0; i < 24; i++) {
    const clock = document.createElement('div');
    clock.className = 'clock';
    clock.innerHTML = '<div class="hand"></div><div class="hand"></div>';
    digitEl.appendChild(clock);
  }
  
  return digitEl;
}

// Set a digit element to display a number
function setDigit(digitEl, number) {
  const pattern = digits[number];
  const clocks = digitEl.querySelectorAll('.clock');
  
  clocks.forEach((clock, i) => {
    const [a1, a2] = charMap[pattern[i]];
    const hands = clock.querySelectorAll('.hand');
    hands[0].style.transform = `rotate(${a1}deg)`;
    hands[1].style.transform = `rotate(${a2}deg)`;
  });
}

// Get current time as array of 6 digits
function getTimeDigits() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  
  // Pad each to 2 digits and combine: "093045"
  const timeStr = [hours, minutes, seconds]
    .map(n => String(n).padStart(2, '0'))
    .join('');
  
  // Split into individual digits: [0,9,3,0,4,5]
  return timeStr.split('').map(Number);
}

// Create 6 digit displays
const display = document.getElementById('display');
const digitElements = [];

for (let i = 0; i < 6; i++) {
  const d = createDigit();
  display.appendChild(d);
  digitElements.push(d);
}

// Update the display with current time
function updateTime() {
  const timeDigits = getTimeDigits();
  timeDigits.forEach((digit, i) => {
    setDigit(digitElements[i], digit);
  });
}

// Update every second
updateTime();
setInterval(updateTime, 1000);
