// Create a grid of 24 clocks (6 rows x 4 columns)
const grid = document.getElementById('grid');

for (let i = 0; i < 24; i++) {
  const clock = document.createElement('div');
  clock.className = 'clock';
  
  // Add two hands to each clock
  clock.innerHTML = '<div class="hand"></div><div class="hand"></div>';
  
  grid.appendChild(clock);
}
