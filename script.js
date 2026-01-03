/**
 * Clock Made of Clocks
 * Each digit is formed by a 6x4 grid of mini analog clocks
 */

// Symbol to angle mapping
// Each symbol maps to [angle1, angle2] for the two clock hands
const charMap = {
  '╔': [90, 0],      // down + right
  '╗': [90, 180],    // down + left
  '╚': [-90, 0],     // up + right
  '╝': [-90, 180],   // up + left
  '═': [0, 180],     // horizontal
  '║': [-90, 90],    // vertical
  ' ': [135, 135]    // neutral (hidden)
};

// Digit patterns (0-9)
// Each is a 24-element array representing a 6x4 grid
const digits = {

  0:['╔','═','═','╗',
     '║','╔','╗','║',
     '║','║','║','║',
     '║','║','║','║',
     '║','╚','╝','║',
     '╚','═','═','╝'],

  1: ['╔','═','╗',' ',
      '╚','╗','║',' ',
      ' ','║','║',' ',
      ' ','║','║',' ',
      '╔','╝','╚','╗',
      '╚','═','═','╝'],

  2: ['╔','═','═','╗',
      '╚','═','╗','║',
      '╔','═','╝','║',
      '║','╔','═','╝',
      '║','╚','═','╗',
      '╚','═','═','╝'],

  3: ['╔','═','═','╗',
      '╚','═','╗','║',
      '╔','═','╝','║',
      '╚','═','╗','║',
      '╔','═','╝','║',
      '╚','═','═','╝'],
      
  4: ['╔','╗','╔','╗',
      '║','║','║','║',
      '║','╚','╝','║',
      '╚','═','╗','║',
      ' ',' ','║','║',
      ' ',' ','╚','╝'],

  5: ['╔','═','═','╗',
      '║','╔','═','╝',
      '║','╚','═','╗',
      '╚','═','╗','║',
      '╔','═','╝','║',
      '╚','═','═','╝'],

  6: ['╔','═','═','╗',
      '║','╔','═','╝',
      '║','╚','═','╗',
      '║','╔','╗','║',
      '║','╚','╝','║',
      '╚','═','═','╝'],

  7: ['╔','═','═','╗',
      '╚','═','╗','║',
      ' ',' ','║','║',
      ' ',' ','║','║',
      ' ',' ','║','║',
      ' ',' ','╚','╝'],

  8: ['╔','═','═','╗',
      '║','╔','╗','║',
      '║','╚','╝','║',
      '║','╔','╗','║',
      '║','╚','╝','║',
      '╚','═','═','╝'],

  9: ['╔','═','═','╗',
      '║','╔','╗','║',
      '║','╚','╝','║',
      '╚','═','╝','║',
      '╔','═','╝','║',
      '╚','═','═','╝']
};

// Create a digit container with 24 mini clocks
function createDigit() {
  const el = document.createElement('div');
  el.className = 'digit';
  
  for (let i = 0; i < 24; i++) {
    const clock = document.createElement('div');
    clock.className = 'clock';
    clock.innerHTML = '<div class="hand"></div><div class="hand"></div>';
    el.appendChild(clock);
  }
  
  return el;
}

// Update a digit to show a specific number
function setDigit(el, num) {
  const pattern = digits[num];
  el.querySelectorAll('.clock').forEach((clock, i) => {
    const [a1, a2] = charMap[pattern[i]];
    const hands = clock.querySelectorAll('.hand');
    hands[0].style.transform = `rotate(${a1}deg)`;
    hands[1].style.transform = `rotate(${a2}deg)`;
  });
}

// Get current time as array of 6 digits (12-hour format)
function getTimeDigits() {
  const now = new Date();
  const h = now.getHours() % 12 || 12;
  const m = now.getMinutes();
  const s = now.getSeconds();
  
  return [h, m, s]
    .map(n => String(n).padStart(2, '0'))
    .join('')
    .split('')
    .map(Number);
}

// Initialize display
const display = document.getElementById('display');
const digitElements = [];

// Create 3 pairs of digits (HH:MM:SS)
for (let i = 0; i < 3; i++) {
  const pair = document.createElement('div');
  pair.className = 'digit-pair';
  
  const d1 = createDigit();
  const d2 = createDigit();
  pair.appendChild(d1);
  pair.appendChild(d2);
  display.appendChild(pair);
  
  digitElements.push(d1, d2);
}

// Update the display with current time
function update() {
  getTimeDigits().forEach((digit, i) => {
    setDigit(digitElements[i], digit);
  });
}

// Start the clock
update();
setInterval(update, 1000);

// Theme toggle
document.getElementById('themeToggle').onclick = () => {
  document.body.classList.toggle('dark');
};
