// Immediate Cursor Trail System - Generates trail immediately at cursor position
console.log('=== CURSOR TRAIL STARTING ===');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let trailImages = [];
let trailInterval = null;

// Image paths
const imagePaths = [
  'images/gif/hand.gif',
  'images/gif/bagslow.gif',
  'images/gif/collection-slow.gif',
  'images/gif/numbers.gif',
  'images/gif/object.gif',
  'images/gif/pink.gif',
  'images/gif/popup.gif',
  'images/gif/pose.gif'
];

console.log('Image paths loaded:', imagePaths.length);

function addTrailImage(x, y) {
  console.log('Adding trail image at:', x, y);
  
  // Create image element
  const img = document.createElement('img');
  const randomPath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
  
  img.src = randomPath;
  img.style.position = 'fixed';
  img.style.left = x + 'px';
  img.style.top = y + 'px';
  img.style.width = '60px';
  img.style.height = '60px';
  img.style.transform = 'translate(-50%, -50%)';
  img.style.zIndex = '9999';
  img.style.pointerEvents = 'none';
  img.style.opacity = '0.8';
  img.style.borderRadius = '50%';
  img.style.objectFit = 'cover';
  
  // Add to page
  document.body.appendChild(img);
  trailImages.push(img);
  
  console.log('Image added to DOM, total images:', trailImages.length);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (img.parentNode) {
      img.parentNode.removeChild(img);
      const index = trailImages.indexOf(img);
      if (index > -1) {
        trailImages.splice(index, 1);
      }
    }
  }, 3000);
}

// Start trail immediately at center position
console.log('Starting trail immediately at center:', mouseX, mouseY);

// Add first image immediately
addTrailImage(mouseX, mouseY);

// Add a few more images to simulate existing trail
setTimeout(() => addTrailImage(mouseX, mouseY), 100);
setTimeout(() => addTrailImage(mouseX, mouseY), 200);
setTimeout(() => addTrailImage(mouseX, mouseY), 300);

// Start continuous generation
trailInterval = setInterval(() => {
  addTrailImage(mouseX, mouseY);
}, 300);

// Track mouse position
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  console.log('Mouse moved to:', mouseX, mouseY);
});

console.log('=== CURSOR TRAIL READY ===');
