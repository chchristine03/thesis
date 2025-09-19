/**
 * Section-Based Audio System
 * Plays different songs automatically for each section
 */

class SectionAudio {
    constructor() {
        this.currentSection = null;
        this.audioElements = {
            intro: document.getElementById('introMusic'),
            firstStory: document.getElementById('firstStoryMusic'),
            clockStory: document.getElementById('clockStoryMusic'),
            secondStory: document.getElementById('secondStoryMusic')
        };
        
        this.init();
    }

    init() {
        // Set up all audio elements
        Object.keys(this.audioElements).forEach(section => {
            const audio = this.audioElements[section];
            if (audio) {
                audio.volume = 0.5;
                console.log(`${section} music element found`);
            } else {
                console.log(`${section} music element not found`);
            }
        });

        // Listen for scroll events to detect section changes
        window.addEventListener('scroll', () => {
            this.checkCurrentSection();
        });

        // Initial check
        this.checkCurrentSection();
        
        // Handle autoplay restrictions
        this.handleAutoplay();
    }

    checkCurrentSection() {
        const sections = {
            intro: document.getElementById('intro-story'),
            firstStory: document.getElementById('first-story'),
            clockStory: document.getElementById('clock-story'),
            secondStory: document.getElementById('second-story')
        };

        let newSection = null;

        // Check which section is currently in view
        Object.keys(sections).forEach(sectionName => {
            const section = sections[sectionName];
            if (section) {
                const rect = section.getBoundingClientRect();
                
                // Check if section is visible in viewport (more lenient detection)
                if (rect.top <= window.innerHeight && rect.bottom >= 0) {
                    // If this section takes up more than 50% of the viewport, it's the current section
                    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
                    const sectionRatio = visibleHeight / window.innerHeight;
                    
                    if (sectionRatio > 0.5) {
                        newSection = sectionName;
                        console.log(`${sectionName} is dominant section (${(sectionRatio * 100).toFixed(1)}% visible)`);
                    }
                }
            }
        });

        // If section changed, update music
        if (newSection !== this.currentSection) {
            if (this.currentSection) {
                console.log(`Left ${this.currentSection} section`);
                this.stopMusic(this.currentSection);
            }
            
            if (newSection) {
                console.log(`Entered ${newSection} section`);
                this.playMusic(newSection);
            }
            
            this.currentSection = newSection;
        }
    }

    playMusic(sectionName) {
        const audio = this.audioElements[sectionName];
        if (audio) {
            // Stop all other music first
            Object.keys(this.audioElements).forEach(section => {
                if (section !== sectionName) {
                    this.stopMusic(section);
                }
            });
            
            // Play the new music
            audio.play().then(() => {
                console.log(`${sectionName} music started playing`);
            }).catch(error => {
                console.log(`Failed to play ${sectionName} music:`, error);
                // Try again after user interaction
                this.setupUserInteractionFallback(sectionName);
            });
        }
    }

    stopMusic(sectionName) {
        const audio = this.audioElements[sectionName];
        if (audio) {
            audio.pause();
            audio.currentTime = 0; // Reset to beginning
            console.log(`${sectionName} music stopped`);
        }
    }

    handleAutoplay() {
        // Try to play music immediately if in a section
        setTimeout(() => {
            if (this.currentSection) {
                this.playMusic(this.currentSection);
            }
        }, 1000);
    }

    setupUserInteractionFallback(sectionName) {
        // Set up one-time listeners for user interaction
        const playOnInteraction = () => {
            this.playMusic(sectionName);
        };
        
        document.addEventListener('click', playOnInteraction, { once: true });
        document.addEventListener('keydown', playOnInteraction, { once: true });
        document.addEventListener('touchstart', playOnInteraction, { once: true });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.sectionAudio = new SectionAudio();
});
