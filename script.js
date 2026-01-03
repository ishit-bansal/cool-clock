// Mapping of positions to angles
// Each clock can form different shapes based on hand angles
// Angles: 0 = right, 90 = down, 180 = left, -90 = up

const angles = {
  'corner-tl': [90, 0],    // top-left corner: down + right
  'corner-tr': [90, 180],  // top-right corner: down + left
  'corner-bl': [-90, 0],   // bottom-left: up + right
  'corner-br': [-90, 180], // bottom-right: up + left
  'horizontal': [0, 180],  // horizontal line
  'vertical': [-90, 90],   // vertical line
  'blank': [135, 135]      // neutral position
};

// Create the grid
const grid = document.getElementById('grid');

for (let i = 0; i < 24; i++) {
  const clock = document.createElement('div');
  clock.className = 'clock';
  clock.innerHTML = '<div class="hand"></div><div class="hand"></div>';
  grid.appendChild(clock);
}

// Test: set first clock to corner-tl
const firstClock = document.querySelector('.clock');
const hands = firstClock.querySelectorAll('.hand');
hands[0].style.transform = `rotate(${angles['corner-tl'][0]}deg)`;
hands[1].style.transform = `rotate(${angles['corner-tl'][1]}deg)`;
