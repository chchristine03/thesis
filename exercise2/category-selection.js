/**
 * Category Selection System
 * Randomly selects 3 images from each category for user selection
 */

class CategorySelection {
    constructor() {
        this.galleryData = null;
        this.selectedImage = null;
        this.selectionImages = [];
        
        this.init();
    }

    async init() {
        try {
            await this.loadGalleryData();
            this.selectRandomImages();
            this.renderSelectionGrid();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing category selection:', error);
        }
    }

    async loadGalleryData() {
        const response = await fetch('gallery_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery data');
        }
        this.galleryData = await response.json();
    }

    selectRandomImages() {
        // Select 3 random images from each category
        const categories = ['control', 'fun', 'materialism', 'reputation'];
        this.selectionImages = [];
        
        categories.forEach(category => {
            const categoryImages = this.galleryData.images.filter(img => img.category === category);
            
            // Shuffle and take first 3
            const shuffled = categoryImages.sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            
            this.selectionImages.push(...selected);
        });
        
        // Shuffle the final array to randomize order
        this.selectionImages = this.selectionImages.sort(() => 0.5 - Math.random());
    }

    renderSelectionGrid() {
        const container = document.getElementById('category-selection');
        if (!container) return;
        
        container.innerHTML = `
            <div class="selection-header">
                <h1>Choose Your Image</h1>
                <p>Click an image to select it, then click the select button</p>
            </div>
            
            <div class="selection-grid" id="selectionGrid">
                <!-- Images will be rendered here -->
            </div>
            
            <div class="selection-controls">
                <button id="shuffleImages" class="shuffle-btn">
                    Shuffle Images
                </button>
            </div>
        `;
        
        const grid = document.getElementById('selectionGrid');
        
        this.selectionImages.forEach((image, index) => {
            const item = document.createElement('div');
            item.className = 'selection-item';
            item.dataset.imageIndex = index;
            item.dataset.category = image.category;
            
            const img = document.createElement('img');
            img.src = image.path;
            img.alt = image.display_name;
            
            const overlay = document.createElement('div');
            overlay.className = 'selection-overlay';
            
            const selectionCircle = document.createElement('div');
            selectionCircle.className = 'selection-circle';
            selectionCircle.innerHTML = '<span>SELECT</span>';
            
            overlay.appendChild(selectionCircle);
            
            item.appendChild(img);
            item.appendChild(overlay);
            grid.appendChild(item);
        });
    }

    setupEventListeners() {
        const grid = document.getElementById('selectionGrid');
        const shuffleBtn = document.getElementById('shuffleImages');
        
        if (grid) {
            grid.addEventListener('click', (e) => {
                const item = e.target.closest('.selection-item');
                const circle = e.target.closest('.selection-circle');
                
                if (circle) {
                    // Clicked on the select circle - proceed to main page
                    this.finalizeSelection();
                } else if (item) {
                    // Clicked on the image - select it
                    this.selectImage(item);
                }
            });
        }
        
        if (shuffleBtn) {
            shuffleBtn.addEventListener('click', () => {
                this.selectRandomImages();
                this.renderSelectionGrid();
                this.setupEventListeners();
            });
        }
    }

    selectImage(item) {
        // Remove previous selection
        document.querySelectorAll('.selection-item').forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selection to clicked item
        item.classList.add('selected');
        
        const imageIndex = parseInt(item.dataset.imageIndex);
        this.selectedImage = this.selectionImages[imageIndex];
        
        console.log('Selected image:', this.selectedImage);
    }

    finalizeSelection() {
        if (!this.selectedImage) {
            alert('Please select an image first by clicking on it');
            return;
        }
        
        // Store selected image data in localStorage
        localStorage.setItem('selectedImage', JSON.stringify(this.selectedImage));
        localStorage.setItem('selectedCategory', this.selectedImage.category);
        
        // Hide selection interface
        const selectionContainer = document.getElementById('category-selection');
        if (selectionContainer) {
            selectionContainer.style.display = 'none';
        }
        
        // Show main website
        const mainWebsite = document.getElementById('main-website');
        if (mainWebsite) {
            mainWebsite.style.display = 'block';
        }
        
        // Initialize main website with selected image/category
        this.initializeMainWebsite();
    }

    initializeMainWebsite() {
        // This will be called to set up the main website with the selected image/category
        console.log(`Main website initialized with image:`, this.selectedImage);
        
        // Set global variables for other scripts
        window.selectedImage = this.selectedImage;
        window.selectedCategory = this.selectedImage.category;
        
        // Dispatch custom event for other scripts to listen to
        window.dispatchEvent(new CustomEvent('imageSelected', {
            detail: { 
                image: this.selectedImage,
                category: this.selectedImage.category 
            }
        }));
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CategorySelection();
});
