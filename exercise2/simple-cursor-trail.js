// Simple Cursor Trail System - Intro Section Only
console.log('Simple Cursor Trail: Starting...');

let mouseX = 0;
let mouseY = 0;
let trailImages = [];
let isInIntro = false;
let lastMouseTime = 0;

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

// Check if we're in intro section
function checkIntroSection() {
  const introSection = document.getElementById('intro-story');
  if (!introSection) {
    console.log('Intro section not found');
    return;
  }
  
  const rect = introSection.getBoundingClientRect();
  // Check if intro section is visible in viewport
  isInIntro = rect.top <= 0 && rect.bottom > 0;
  console.log('In intro section:', isInIntro);
}

// Track mouse position with throttling
document.addEventListener('mousemove', function(e) {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  // Only add trail images if we're in the intro section
  if (isInIntro) {
    const now = Date.now();
    // Throttle to every 100ms (slower than original 100ms)
    if (now - lastMouseTime >= 100) {
      lastMouseTime = now;
      addTrailImage(mouseX, mouseY);
    }
  }
});

// Check section on scroll
window.addEventListener('scroll', checkIntroSection);

// Initial check
checkIntroSection();

function addTrailImage(x, y) {
  // Limit number of trail images
  if (trailImages.length > 8) { // Reduced from 10
    const oldImage = trailImages.shift();
    if (oldImage && oldImage.parentNode) {
      oldImage.parentNode.removeChild(oldImage);
    }
  }
  
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
  img.style.opacity = '0.7';
  img.style.borderRadius = '50%';
  img.style.objectFit = 'cover';
  
  // Add to page
  document.body.appendChild(img);
  trailImages.push(img);
  
  console.log('Trail image added:', randomPath);
  
  // Remove after 3 seconds (longer than before)
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

console.log('Simple Cursor Trail: Ready (Intro section only, slower)');
