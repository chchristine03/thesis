(function(){
  console.log('Script starting...');
  
  const glowElement = document.getElementById('heartbeat-glow');
  if (!glowElement) {
    console.error('Heartbeat glow element not found!');
    return;
  }
  
  let ticking = false;

  // Music Player Functionality
  const backgroundMusic = document.getElementById('backgroundMusic');
  const musicToggle = document.getElementById('musicToggle');
  
  if (backgroundMusic && musicToggle) {
    let isPlaying = false;
    
    // Handle autoplay issues by starting paused
    backgroundMusic.pause();
    backgroundMusic.volume = 0.5; // Set volume to 50%
    
    musicToggle.addEventListener('click', function() {
      if (isPlaying) {
        backgroundMusic.pause();
        musicToggle.textContent = '▶';
        isPlaying = false;
        console.log('Music paused');
      } else {
        backgroundMusic.play().then(() => {
          musicToggle.textContent = '';
          isPlaying = true;
          console.log('Music playing');
        }).catch(error => {
          console.error('Error playing music:', error);
        });
      }
    });
    
    // Handle music end event
    backgroundMusic.addEventListener('ended', function() {
      musicToggle.textContent = '▶';
      isPlaying = false;
      console.log('Music ended');
    });
    
    console.log('Music player initialized');
  } else {
    console.error('Music player elements not found!');
  }


  function heartbeat(){
    const time = Date.now() * 0.001;
    const lubPhase = (time % 1.2) / 1.2;
    const lub = Math.pow(Math.sin(lubPhase * Math.PI), 0.4);
    const dubPhase = ((time + 0.4) % 1.2) / 1.2;
    const dub = Math.pow(Math.sin(dubPhase * Math.PI), 0.4) * 0.6;
    return Math.max(lub, dub);
  }

  function update(){
    const y = window.scrollY || 0;
    const windowHeight = window.innerHeight;
    
    let alpha = 0.05;  // Start with very low alpha (almost invisible)
    let sizePct = 20;  // Start with small size
    let blurPx = 80;   // Start with high blur
    
    // Debug logging
    console.log(`Scroll: ${y}px, Window height: ${windowHeight}`);
    
    // Each section is 800vh = 8 viewport heights
    const sectionHeight = windowHeight * 8;
    
    // Get section positions
    const introStoryElement = document.getElementById('intro-story');
    const firstStoryElement = document.getElementById('first-story');
    const clockStoryElement = document.getElementById('clock-story');
    
    const introStoryTop = introStoryElement ? introStoryElement.offsetTop : 0;
    const firstStoryTop = firstStoryElement ? firstStoryElement.offsetTop : sectionHeight;
    const clockStoryTop = clockStoryElement ? clockStoryElement.offsetTop : sectionHeight * 2;
    
    if (y < firstStoryTop) {
      // Intro section - completely black, no heartbeat
      alpha = 0.05;
      sizePct = 20;
      blurPx = 80;
      console.log('Intro section - black');
      
    } else if (y < clockStoryTop) {
      // First section - heartbeat based on scroll position
      const firstSectionProgress = (y - firstStoryTop) / sectionHeight;
      
      // 🔥 HEARTBEAT FREQUENCY CONTROL 🔥
      // Change this number to control how many heartbeats happen per section:
      // - 1 = 1 heartbeat per section (very long)
      // - 3 = 3 heartbeats per section (current setting)
      // - 5 = 5 heartbeats per section (more frequent)
      // - 10 = 10 heartbeats per section (very frequent)
      const heartbeatCycles = 3;
      const cycleProgress = (firstSectionProgress * heartbeatCycles) % 1;
      
      // 🔥 HEARTBEAT DURATION CONTROL 🔥
      // Change this number to control how long each heartbeat lasts:
      // - 0.3 = heartbeat lasts 30% of cycle, black 70% (short pulse)
      // - 0.5 = heartbeat lasts 50% of cycle, black 50% (balanced)
      // - 0.6 = heartbeat lasts 60% of cycle, black 40% (current setting - longer pulse)
      // - 0.8 = heartbeat lasts 80% of cycle, black 20% (very long pulse)
      let pulse = 0;
      if (cycleProgress < 0.6) {
        // First 60% of each cycle - heartbeat (longer pulse)
        const heartbeatPhase = cycleProgress / 0.6;
        
        // 🔥 HEARTBEAT SMOOTHNESS CONTROL 🔥
        // Change these numbers to control heartbeat smoothness:
        // - 0.2 = very smooth, gentle curves
        // - 0.3 = smooth curves (current setting)
        // - 0.4 = normal curves
        // - 0.6 = sharper curves, more dramatic
        const lubPhase = heartbeatPhase;
        const lub = Math.pow(Math.sin(lubPhase * Math.PI), 0.3); // Smoother curve
        const dubPhase = Math.max(0, heartbeatPhase - 0.3);
        const dub = dubPhase > 0 ? Math.pow(Math.sin(dubPhase * Math.PI), 0.3) * 0.7 : 0;
        pulse = Math.max(lub, dub);
        
        // 🔥 FADE TRANSITION CONTROL 🔥
        // Change these numbers to control fade-in/out speed:
        // - 1 = fast fade (abrupt)
        // - 2 = medium fade (current setting)
        // - 3 = slow fade (very gradual)
        // - 5 = very slow fade (extremely gradual)
        const fadeIn = Math.min(1, heartbeatPhase * 2); // Slower fade-in
        const fadeOut = Math.min(1, (1 - heartbeatPhase) * 2); // Slower fade-out
        pulse *= fadeIn * fadeOut;
      } else {
        // Last 40% of each cycle - black (shorter black period)
        pulse = 0;
      }
      
      // 🔥 OVERALL INTENSITY CONTROL 🔥
      // FIXED: Use consistent intensity throughout the section instead of sine wave
      // Change these numbers to control overall glow intensity:
      // - 0.05 = very low base alpha (almost invisible)
      // - 0.85 = max alpha multiplier (current setting)
      // - 0.95 = higher max alpha (more visible)
      // - 1.0 = maximum alpha (very bright)
      
      // Use consistent intensity throughout the section (no fade in/out)
      const scrollIntensity = 1.0; // Always full intensity
      alpha = 0.05 + 0.85 * scrollIntensity * pulse;
      sizePct = 20 + 80 * scrollIntensity * pulse;
      blurPx = 80 - 60 * scrollIntensity * pulse;
      
      console.log(`First section - Progress: ${firstSectionProgress.toFixed(3)}, Cycle: ${cycleProgress.toFixed(3)}, Pulse: ${pulse.toFixed(3)}, Alpha: ${alpha.toFixed(3)}`);
      
    } else {
      // Clock section and beyond - no heartbeat
      alpha = 0.05;
      sizePct = 20;
      blurPx = 80;
      console.log('Clock section - no heartbeat');
    }

    // Set CSS custom properties
    glowElement.style.setProperty('--pulse-alpha', alpha.toFixed(3));
    glowElement.style.setProperty('--pulse-size', sizePct.toFixed(1) + '%');
    glowElement.style.setProperty('--pulse-blur', Math.round(blurPx) + 'px');
    
    // Debug: log the actual CSS values being set
    console.log(`CSS Values - Alpha: ${alpha.toFixed(3)}, Size: ${sizePct.toFixed(1)}%, Blur: ${Math.round(blurPx)}px`);
    
    // Also try setting the background directly for testing
    if (alpha > 0.1) {
      glowElement.style.background = `radial-gradient(circle at 50% 50%, rgba(255,0,0,${alpha.toFixed(3)}) 0%, rgba(255,0,0,0) 50%)`;
      glowElement.style.filter = `blur(${Math.round(blurPx)}px)`;
    }

    ticking = false;
  }

  // Simplified Canvas Clock Implementation
  function initCanvasClock() {
    const canvas = document.getElementById('clockCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let radius = canvas.height / 2;
    ctx.translate(radius, radius);
    radius = radius * 0.90;
    
    function drawClock() {
      // Clear canvas
      ctx.clearRect(-radius, -radius, radius * 2, radius * 2);
      
      // Draw only numbers and hands - no background, no shadows, no circles
      // drawNumbers(ctx, radius); // Hidden clock numbers
      drawTime(ctx, radius);
    }
    
    function drawNumbers(ctx, radius) {
      ctx.font = radius*0.15 + "px arial";
      ctx.textBaseline="middle";
      ctx.textAlign="center";
      ctx.fillStyle = '#000';
      for(let num = 1; num < 13; num++){
        let ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
      }
    }
    
    function drawTime(ctx, radius){
      const now = new Date();
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      
      //hour
      hour=hour%12;
      hour=(hour*Math.PI/6)+
      (minute*Math.PI/(6*60))+
      (second*Math.PI/(360*60));
      drawHand(ctx, hour, radius*0.5, radius*0.07);
      
      //minute
      minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
      drawHand(ctx, minute, radius*0.8, radius*0.07);
      
      // second
      second=(second*Math.PI/30);
      drawHand(ctx, second, radius*0.9, radius*0.02);
    }
    
    function drawHand(ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.strokeStyle = '#000';
      ctx.moveTo(0,0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.stroke();
      ctx.rotate(-pos);
    }
    
    // Draw clock immediately and then every second
    drawClock();
    setInterval(drawClock, 1000);
  }

  // Clock sticky image functionality
  function updateClockImages() {
    const y = window.scrollY || 0;
    const windowHeight = window.innerHeight;
    const clockSection = document.getElementById('clock-story');
    
    if (!clockSection) return;
    
    const clockTop = clockSection.offsetTop;
    const clockHeight = clockSection.offsetHeight;
    
    // Only activate if we're in the clock section
    if (y >= clockTop && y < clockTop + clockHeight) {
      // Calculate scroll progress within the clock section
      const scrollProgress = (y - clockTop) / clockHeight;
      
      // Phase 1: Main clock images (1-12) - first 50% of scroll
      if (scrollProgress < 0.5) {
        const mainImageZone = Math.floor(scrollProgress * 2 * 12); // 0-11 zones
        
        // Remove active class from all main images
        document.querySelectorAll('.image-overlay').forEach(img => {
          img.classList.remove('active');
        });
        
        // Add active class to main images up to current zone
        for (let i = 0; i <= Math.min(mainImageZone, 11); i++) {
          const imageNumber = (i % 12) + 1; // 1-12
          const activeImage = document.querySelector(`.image-overlay[data-number="${imageNumber}"]`);
          if (activeImage) {
            activeImage.classList.add('active');
          }
        }
        
        // Hide all additional images during main phase
        document.querySelectorAll('.additional-image').forEach(img => {
          img.classList.remove('active');
        });
        
        console.log(`Main clock phase - Progress: ${scrollProgress.toFixed(3)}, Main images active: ${Math.min(mainImageZone + 1, 12)}`);
        
      } else {
        // Phase 2: Additional images (13-24) - last 50% of scroll - FAST POPUP
        const additionalProgress = (scrollProgress - 0.5) * 2; // 0-1 range
        const additionalImageZone = Math.floor(additionalProgress * 12); // 0-11 zones
        
        // Keep all main images active
        document.querySelectorAll('.image-overlay').forEach(img => {
          img.classList.add('active');
        });
        
        // Remove active class from all additional images
        document.querySelectorAll('.additional-image').forEach(img => {
          img.classList.remove('active');
        });
        
        // Add active class to additional images up to current zone - FAST POPUP
        for (let i = 0; i <= Math.min(additionalImageZone, 11); i++) {
          const additionalNumber = i + 13; // 13-24
          const activeImage = document.querySelector(`.additional-image[data-additional-number="${additionalNumber}"]`);
          if (activeImage) {
            activeImage.classList.add('active');
          }
        }
        
        console.log(`Additional images phase - Progress: ${additionalProgress.toFixed(3)}, Additional images active: ${Math.min(additionalImageZone + 1, 12)}`);
      }
      
    } else {
      // Remove all active classes when not in clock section
      document.querySelectorAll('.image-overlay').forEach(img => {
        img.classList.remove('active');
      });
      document.querySelectorAll('.additional-image').forEach(img => {
        img.classList.remove('active');
      });
    }
  }

  function onScroll(){
    updateProgressBar();
    if (!ticking){
      requestAnimationFrame(() => {
        update();
        updateClockImagesSmoothExit();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  
  // Initialize canvas clock
  initCanvasClock();
  
  // initial paint
  update();
  updateClockImagesSmoothExit();
  
  console.log('Script loaded and initial update done');
  // Initial progress bar update
  updateProgressBar();})();


// Add debugging to see scroll progress
function debugScrollProgress() {
  const y = window.scrollY || 0;
  const clockSection = document.getElementById('clock-story');
  if (clockSection) {
    const clockTop = clockSection.offsetTop;
    const clockHeight = clockSection.offsetHeight;
    const scrollProgress = (y - clockTop) / clockHeight;
    console.log(`Scroll Y: ${y}, Clock Top: ${clockTop}, Clock Height: ${clockHeight}, Progress: ${scrollProgress.toFixed(3)}`);
  }
}

// Call debug function on scroll
window.addEventListener('scroll', debugScrollProgress, { passive: true });

// Enhanced smooth transitions for additional images
function smoothRemoveActiveClass(element, delay = 0) {
  setTimeout(() => {
    element.classList.remove('active');
  }, delay);
}

// Update the updateClockImages function to use smooth transitions
function updateClockImagesSmooth() {
  const y = window.scrollY || 0;
  const windowHeight = window.innerHeight;
  const clockSection = document.getElementById('clock-story');
  
  if (!clockSection) return;
  
  const clockTop = clockSection.offsetTop;
  const clockHeight = clockSection.offsetHeight;
  
  if (y >= clockTop && y < clockTop + clockHeight) {
    const scrollProgress = (y - clockTop) / clockHeight;
    
    if (scrollProgress < 0.5) {
      // Phase 1: Main images only
      const mainImageZone = Math.floor(scrollProgress * 2 * 12);
      
      // Remove active class from all main images
      document.querySelectorAll('.image-overlay').forEach(img => {
        img.classList.remove('active');
      });
      
      // Add active class to main images up to current zone
      for (let i = 0; i <= Math.min(mainImageZone, 11); i++) {
        const imageNumber = (i % 12) + 1;
        const activeImage = document.querySelector(`.image-overlay[data-number="${imageNumber}"]`);
        if (activeImage) {
          activeImage.classList.add('active');
        }
      }
      
      // Smoothly remove additional images with staggered timing
      document.querySelectorAll('.additional-image').forEach((img, index) => {
        smoothRemoveActiveClass(img, index * 50); // Stagger removal by 50ms each
      });
      
    } else {
      // Phase 2: Additional images with smooth transitions
      const additionalProgress = (scrollProgress - 0.5) * 2;
      const additionalImageZone = Math.floor(additionalProgress * 12);
      
      // Keep all main images active
      document.querySelectorAll('.image-overlay').forEach(img => {
        img.classList.add('active');
      });
      
      // Smoothly add additional images with staggered timing
      for (let i = 0; i <= Math.min(additionalImageZone, 11); i++) {
        const additionalNumber = i + 13;
        const activeImage = document.querySelector(`.additional-image[data-additional-number="${additionalNumber}"]`);
        if (activeImage) {
          setTimeout(() => {
            activeImage.classList.add('active');
          }, i * 100); // Stagger appearance by 100ms each
        }
      }
    }
  } else {
    // Smoothly remove all images when outside clock section
    document.querySelectorAll('.image-overlay').forEach(img => {
      smoothRemoveActiveClass(img, 0);
    });
    document.querySelectorAll('.additional-image').forEach((img, index) => {
      smoothRemoveActiveClass(img, index * 30); // Stagger removal
    });
  }
}

// Enhanced smooth fade-out when leaving clock section
function updateClockImagesSmoothExit() {
  const y = window.scrollY || 0;
  const windowHeight = window.innerHeight;
  const clockSection = document.getElementById('clock-story');
  
  if (!clockSection) return;
  
  const clockTop = clockSection.offsetTop;
  const clockHeight = clockSection.offsetHeight;
  const clockBottom = clockTop + clockHeight;
  
  // Calculate how far past the clock section we are
  const distancePastSection = y - clockBottom;
  const fadeOutDistance = windowHeight * 2; // Fade out over 2 viewport heights
  
  if (y >= clockTop && y < clockBottom) {
    // Inside clock section - normal behavior
    const scrollProgress = (y - clockTop) / clockHeight;
    
    if (scrollProgress < 0.5) {
      // Phase 1: Main images only
      const mainImageZone = Math.floor(scrollProgress * 2 * 12);
      
      document.querySelectorAll('.image-overlay').forEach(img => {
        img.classList.remove('active');
      });
      
      for (let i = 0; i <= Math.min(mainImageZone, 11); i++) {
        const imageNumber = (i % 12) + 1;
        const activeImage = document.querySelector(`.image-overlay[data-number="${imageNumber}"]`);
        if (activeImage) {
          activeImage.classList.add('active');
        }
      }
      
      // Remove additional images smoothly
      document.querySelectorAll('.additional-image').forEach((img, index) => {
        smoothRemoveActiveClass(img, index * 50);
      });
      
    } else {
      // Phase 2: Additional images
      const additionalProgress = (scrollProgress - 0.5) * 2;
      const additionalImageZone = Math.floor(additionalProgress * 12);
      
      document.querySelectorAll('.image-overlay').forEach(img => {
        img.classList.add('active');
      });
      
      for (let i = 0; i <= Math.min(additionalImageZone, 11); i++) {
        const additionalNumber = i + 13;
        const activeImage = document.querySelector(`.additional-image[data-additional-number="${additionalNumber}"]`);
        if (activeImage) {
          setTimeout(() => {
            activeImage.classList.add('active');
          }, i * 100);
        }
      }
    }
    
  } else if (y > clockBottom && distancePastSection < fadeOutDistance) {
    // Just past clock section - gradual fade out
    const fadeProgress = Math.min(distancePastSection / fadeOutDistance, 1);
    const remainingOpacity = 1 - fadeProgress;
    
    // Keep main images visible but fade additional images
    document.querySelectorAll('.image-overlay').forEach(img => {
      img.classList.add('active');
      img.style.opacity = remainingOpacity;
    });
    
    // Fade additional images more quickly
    document.querySelectorAll('.additional-image').forEach((img, index) => {
      const staggeredOpacity = Math.max(0, remainingOpacity - (index * 0.1));
      img.style.opacity = staggeredOpacity;
      if (staggeredOpacity <= 0) {
        img.classList.remove('active');
      }
    });
    
  } else {
    // Far past section - completely hidden
    document.querySelectorAll('.image-overlay').forEach(img => {
      img.classList.remove('active');
      img.style.opacity = '';
    });
    document.querySelectorAll('.additional-image').forEach(img => {
      img.classList.remove('active');
      img.style.opacity = '';
    });
  }
}

// Horizontal Progress Bar with Checkpoints
function updateProgressBar() {
  const y = window.scrollY || 0;
  const windowHeight = window.innerHeight;
  const progressFill = document.getElementById("progress-fill");
  const progressText = document.getElementById("progress-text");
  
  if (!progressFill || !progressText) return;
  
  // Get all sections
  const introStory = document.getElementById("intro-story");
  const firstStory = document.getElementById("first-story");
  const clockStory = document.getElementById("clock-story");
  const secondStory = document.getElementById("second-story");
  
  // Define checkpoint sections with your specific names
  const checkpoints = [
    { element: introStory, name: "RUN", height: 700, position: 0 },
    { element: firstStory, name: "GROW", height: 1000, position: 1 },
    { element: clockStory, name: "ALARM", height: 2400, position: 2 },
    { element: secondStory, name: "MORNING", height: 100, position: 3 }
  ];
  
  // Calculate checkpoint positions
  let checkpointPositions = [];
  let currentY = 0;
  
  for (let i = 0; i < checkpoints.length; i++) {
    const checkpoint = checkpoints[i];
    if (!checkpoint.element) continue;
    
    const sectionHeight = windowHeight * (checkpoint.height / 100);
    checkpointPositions.push({
      ...checkpoint,
      startY: currentY,
      endY: currentY + sectionHeight,
      centerY: currentY + (sectionHeight / 2)
    });
    
    currentY += sectionHeight;
  }
  
  // Find current checkpoint and progress within it
  let currentCheckpoint = null;
  let progressToNext = 0;
  let checkpointIndex = -1;
  
  for (let i = 0; i < checkpointPositions.length; i++) {
    const checkpoint = checkpointPositions[i];
    if (y >= checkpoint.startY && y < checkpoint.endY) {
      currentCheckpoint = checkpoint;
      checkpointIndex = i;
      
      // Calculate progress within current checkpoint (0 to 1)
      const checkpointProgress = (y - checkpoint.startY) / (checkpoint.endY - checkpoint.startY);
      progressToNext = checkpointProgress;
      break;
    }
  }
  
  // Update progress bar
  if (currentCheckpoint) {
    // Calculate overall progress including completed checkpoints
    const completedProgress = checkpointIndex / (checkpoints.length - 1);
    const currentProgress = progressToNext / (checkpoints.length - 1);
    const totalProgress = completedProgress + currentProgress;
    
    // Update progress fill
    progressFill.style.width = (totalProgress * 100) + "%";
    
    // Update text with current checkpoint name
    progressText.textContent = currentCheckpoint.name;
    
    // Update checkpoint visual states
    updateCheckpointStates(checkpointIndex, checkpointPositions.length);
    
    // Color progression based on checkpoint
    const colors = [
      "linear-gradient(90deg, #ece29f 0%, #f47070 50%, #ff6b6b 100%)",
      "linear-gradient(90deg, #f47070 0%, #ff6b6b 50%, #ff4444 100%)",
      "linear-gradient(90deg, #ff6b6b 0%, #ff4444 50%, #cc0000 100%)",
      "linear-gradient(90deg, #ff4444 0%, #cc0000 50%, #990000 100%)"
    ];
    
    progressFill.style.background = colors[checkpointIndex] || colors[0];
  } else {
    // If not in any section, reset progress bar
    progressFill.style.width = "0%";
    progressText.textContent = "";
  }
}

// Update checkpoint circle states
function updateCheckpointStates(currentIndex, totalCheckpoints) {
  // Remove existing checkpoints
  const existingCheckpoints = document.querySelectorAll('.checkpoint');
  existingCheckpoints.forEach(cp => cp.remove());
  
  // Create checkpoint circles
  for (let i = 0; i < totalCheckpoints; i++) {
    const checkpoint = document.createElement('div');
    checkpoint.className = 'checkpoint';
    
    // Set checkpoint states
    if (i < currentIndex) {
      checkpoint.classList.add('completed');
    } else if (i === currentIndex) {
      checkpoint.classList.add('active');
    }
    
    document.getElementById('progress-container').appendChild(checkpoint);
  }
}

// Initial progress bar update
updateProgressBar();

// Add scroll event listener for progress bar updates
window.addEventListener('scroll', updateProgressBar, { passive: true });