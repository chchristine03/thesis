// Enhanced Cursor Trail System with Category Support
document.addEventListener('DOMContentLoaded', () => {
  console.log('Enhanced Cursor Trail: Starting...');
  
  // Default image paths (fallback)
  const defaultImagePaths = [
    'images/gif/collection-slow.gif',
    'images/gif/numbers.gif', 
    'images/gif/bagslow.gif',
    'images/gif/hand.gif',
    'images/gif/hate.gif',
    'images/gif/object.gif',
    'images/gif/pink.gif',
    'images/gif/popup.gif',
    'images/gif/pose.gif',
    'images/clock photos/1.jpg',
    'images/clock photos/2.webp',
    'images/clock photos/3.jpg',
    'images/clock photos/4.jpeg',
    'images/clock photos/5.jpeg',
    'images/clock photos/6.jpg',
    'images/clock photos/7.jpg',
    'images/clock photos/8.jpg',
    'images/clock photos/9.jpg',
    'images/clock photos/10.jpg',
    'images/clock photos/11.jpg',
    'images/clock photos/12.jpg'
  ];
  
  let currentImagePaths = [...defaultImagePaths];
  let isInIntro = false;
  let lastMouseTime = 0;
  
  // Cursor Trail Object
  window.cursorTrail = {
    updateImages: function(categoryImages) {
      if (categoryImages && categoryImages.length > 0) {
        currentImagePaths = categoryImages.map(img => img.path);
        console.log('Cursor Trail: Updated with', currentImagePaths.length, 'category images');
      } else {
        currentImagePaths = [...defaultImagePaths];
        console.log('Cursor Trail: Using default images');
      }
    },
    
    getCurrentImages: function() {
      return currentImagePaths;
    }
  };
  
  // Check if we're in intro section
  function checkSection() {
    const introSection = document.getElementById('intro-story');
    if (!introSection) {
      console.log('Enhanced Cursor Trail: intro-story not found');
      return;
    }
    
    const rect = introSection.getBoundingClientRect();
    isInIntro = rect.top <= 0 && rect.bottom >= window.innerHeight;
    console.log('Enhanced Cursor Trail: isInIntro =', isInIntro);
  }
  
  // Add trail image
  function addTrailImage(x, y) {
    if (currentImagePaths.length === 0) return;
    
    console.log('Enhanced Cursor Trail: Adding image at', x, y);
    
    const trailDiv = document.createElement('div');
    trailDiv.style.position = 'fixed';
    trailDiv.style.left = x + 'px';
    trailDiv.style.top = y + 'px';
    trailDiv.style.width = '60px';
    trailDiv.style.height = '60px';
    trailDiv.style.transform = 'translate(-50%, -50%)';
    trailDiv.style.zIndex = '1000';
    trailDiv.style.pointerEvents = 'none';
    trailDiv.style.opacity = '0.8';
    
    const img = document.createElement('img');
    const randomPath = currentImagePaths[Math.floor(Math.random() * currentImagePaths.length)];
    img.src = randomPath;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    
    trailDiv.appendChild(img);
    document.body.appendChild(trailDiv);
    
    console.log('Enhanced Cursor Trail: Image added:', randomPath);
    
    // Remove after 3 seconds
    setTimeout(() => {
      if (trailDiv.parentNode) {
        trailDiv.parentNode.removeChild(trailDiv);
      }
    }, 3000);
  }
  
  // Mouse move handler
  function handleMouseMove(e) {
    if (!isInIntro) return;
    
    const now = Date.now();
    if (now - lastMouseTime < 100) return; // Throttle
    
    lastMouseTime = now;
    addTrailImage(e.clientX, e.clientY);
  }
  
  // Listen for category selection
  window.addEventListener('categorySelected', (event) => {
    console.log('Cursor Trail: Category selected:', event.detail.category);
    // The category filter will call updateImages when ready
  });
  
  // Event listeners
  window.addEventListener('scroll', checkSection);
  document.addEventListener('mousemove', handleMouseMove);
  
  // Initial check
  checkSection();
  
  console.log('Enhanced Cursor Trail: Ready with', currentImagePaths.length, 'images');
});

// Fix cursor trail for 100vh intro section
function checkSection() {
  const introSection = document.getElementById('intro-story');
  if (!introSection) {
    console.log('Enhanced Cursor Trail: intro-story not found');
    return;
  }
  
  const rect = introSection.getBoundingClientRect();
  // Fix: Check if intro section is visible in viewport
  isInIntro = rect.top <= 0 && rect.bottom > 0;
  console.log('Enhanced Cursor Trail: isInIntro =', isInIntro, 'rect.top =', rect.top, 'rect.bottom =', rect.bottom);
}

// Also enable cursor trail in other sections
function handleMouseMove(e) {
  // Enable cursor trail in all sections, not just intro
  const now = Date.now();
  if (now - lastMouseTime < 100) return; // Throttle
  
  lastMouseTime = now;
  addTrailImage(e.clientX, e.clientY);
}

// Enhanced debugging for cursor trail
console.log('=== CURSOR TRAIL DEBUG ===');
console.log('DOM loaded, checking elements...');

// Check if elements exist
const introSection = document.getElementById('intro-story');
console.log('intro-story element:', introSection);

// Force enable cursor trail for testing
let forceEnable = true;
console.log('Force enabling cursor trail:', forceEnable);

// Override mouse move handler with debugging
function handleMouseMove(e) {
  console.log('Mouse moved at:', e.clientX, e.clientY);
  
  if (forceEnable) {
    const now = Date.now();
    if (now - lastMouseTime < 100) return; // Throttle
    
    lastMouseTime = now;
    console.log('Adding trail image...');
    addTrailImage(e.clientX, e.clientY);
  }
}

// Test function to manually add trail image
window.testCursorTrail = function() {
  console.log('Testing cursor trail manually...');
  addTrailImage(400, 300);
};

console.log('=== CURSOR TRAIL DEBUG END ===');

// Updated addTrailImage function with better debugging
function addTrailImage(x, y) {
  if (currentImagePaths.length === 0) {
    console.log('No images available for cursor trail');
    return;
  }
  
  console.log('Adding trail image at', x, y, 'with', currentImagePaths.length, 'available images');
  
  const trailDiv = document.createElement('div');
  trailDiv.className = 'cursor-trail-image';
  trailDiv.style.position = 'fixed';
  trailDiv.style.left = x + 'px';
  trailDiv.style.top = y + 'px';
  trailDiv.style.width = '60px';
  trailDiv.style.height = '60px';
  trailDiv.style.transform = 'translate(-50%, -50%)';
  trailDiv.style.zIndex = '9999';
  trailDiv.style.pointerEvents = 'none';
  trailDiv.style.opacity = '0.8';
  trailDiv.style.border = '2px solid red'; // Debug border
  
  const img = document.createElement('img');
  const randomPath = currentImagePaths[Math.floor(Math.random() * currentImagePaths.length)];
  img.src = randomPath;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  img.style.borderRadius = '50%';
  img.style.display = 'block';
  
  // Add error handling
  img.onerror = function() {
    console.error('Failed to load cursor trail image:', randomPath);
  };
  
  img.onload = function() {
    console.log('Cursor trail image loaded successfully:', randomPath);
  };
  
  trailDiv.appendChild(img);
  document.body.appendChild(trailDiv);
  
  console.log('Trail image added to DOM:', trailDiv);
  
  // Remove after 3 seconds
  setTimeout(() => {
    if (trailDiv.parentNode) {
      trailDiv.parentNode.removeChild(trailDiv);
      console.log('Trail image removed');
    }
  }, 3000);
}

// Simple test to verify cursor trail is working
console.log('=== SIMPLE CURSOR TRAIL TEST ===');

// Test if mouse events are being captured
document.addEventListener('mousemove', function(e) {
  console.log('Mouse event captured at:', e.clientX, e.clientY);
});

// Test if we can create and show an image
function testImageCreation() {
  console.log('Testing image creation...');
  
  const testDiv = document.createElement('div');
  testDiv.style.position = 'fixed';
  testDiv.style.left = '100px';
  testDiv.style.top = '100px';
  testDiv.style.width = '60px';
  testDiv.style.height = '60px';
  testDiv.style.backgroundColor = 'red';
  testDiv.style.zIndex = '9999';
  testDiv.innerHTML = 'TEST';
  
  document.body.appendChild(testDiv);
  console.log('Test div added to page');
  
  // Remove after 5 seconds
  setTimeout(() => {
    if (testDiv.parentNode) {
      testDiv.parentNode.removeChild(testDiv);
      console.log('Test div removed');
    }
  }, 5000);
}

// Run test immediately
testImageCreation();

// Also test with a real image
function testRealImage() {
  console.log('Testing real image...');
  
  const imgDiv = document.createElement('div');
  imgDiv.style.position = 'fixed';
  imgDiv.style.left = '200px';
  imgDiv.style.top = '100px';
  imgDiv.style.width = '60px';
  imgDiv.style.height = '60px';
  imgDiv.style.zIndex = '9999';
  imgDiv.style.border = '2px solid blue';
  
  const img = document.createElement('img');
  img.src = 'images/gif/hand.gif';
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.objectFit = 'cover';
  
  img.onload = function() {
    console.log('Test image loaded successfully');
  };
  
  img.onerror = function() {
    console.error('Test image failed to load');
  };
  
  imgDiv.appendChild(img);
  document.body.appendChild(imgDiv);
  
  setTimeout(() => {
    if (imgDiv.parentNode) {
      imgDiv.parentNode.removeChild(imgDiv);
      console.log('Test image removed');
    }
  }, 5000);
}

// Run real image test
testRealImage();

console.log('=== SIMPLE CURSOR TRAIL TEST END ===');
