
// Simple Cursor Trail System
document.addEventListener('DOMContentLoaded', () => {
  console.log('Simple Cursor Trail: Starting...');
  
  const imagePaths = [
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
  
  let isInIntro = false;
  let lastMouseTime = 0;
  
  // Check if we're in intro section
  function checkSection() {
    const introSection = document.getElementById('intro-story');
    if (!introSection) {
      console.log('Simple Cursor Trail: intro-story not found');
      return;
    }
    
    const rect = introSection.getBoundingClientRect();
    isInIntro = rect.top <= 0 && rect.bottom >= window.innerHeight;
    console.log('Simple Cursor Trail: isInIntro =', isInIntro);
  }
  
  // Add trail image
  function addTrailImage(x, y) {
    console.log('Simple Cursor Trail: Adding image at', x, y);
    
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
    const randomPath = imagePaths[Math.floor(Math.random() * imagePaths.length)];
    img.src = randomPath;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.borderRadius = '50%';
    
    trailDiv.appendChild(img);
    document.body.appendChild(trailDiv);
    
    console.log('Simple Cursor Trail: Image added:', randomPath);
    
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
  
  // Event listeners
  window.addEventListener('scroll', checkSection);
  document.addEventListener('mousemove', handleMouseMove);
  
  // Initial check
  checkSection();
  
  console.log('Simple Cursor Trail: Ready with', imagePaths.length, 'images');
});

