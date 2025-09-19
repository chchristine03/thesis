/**
 * Image Selection JavaScript
 * Handles loading, displaying, and selecting images from the gallery data
 */

class ImageSelection {
    constructor() {
        this.galleryData = null;
        this.selectedImage = null;
        this.selectionImages = [];
        
        // DOM elements
        this.selectionGrid = document.getElementById('selectionGrid');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        
        this.init();
    }

    async init() {
        try {
            await this.loadGalleryData();
            this.selectRandomImages();
            this.renderSelectionGrid();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing image selection:', error);
            this.showError('Failed to load images. Please refresh the page.');
        }
    }

    async loadGalleryData() {
        try {
            const response = await fetch('gallery_data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            this.galleryData = await response.json();
            console.log('Gallery data loaded:', this.galleryData);
        } catch (error) {
            console.error('Error loading gallery data:', error);
            // If fetch fails (likely CORS issue), try to load from a local server
            if (error.message.includes('fetch')) {
                throw new Error('Cannot load gallery data. Please run a local server or open via http://localhost:8001/image-selection.html');
            }
            throw error;
        }
    }

    selectRandomImages() {
        // Select 3 random images from each category
        const categories = ['control', 'fun', 'materialism', 'reputation'];
        this.selectionImages = [];
        
        categories.forEach(category => {
            const categoryImages = this.galleryData.images.filter(img => img.category === category);
            console.log(`Found ${categoryImages.length} images in ${category} category`);
            
            // Shuffle and take first 3
            const shuffled = [...categoryImages].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 3);
            
            this.selectionImages.push(...selected);
        });
        
        // Shuffle the final array to randomize order
        this.selectionImages = this.selectionImages.sort(() => 0.5 - Math.random());
        console.log('Selected images:', this.selectionImages);
    }

    renderSelectionGrid() {
        this.selectionGrid.innerHTML = '';
        
        this.selectionImages.forEach((image, index) => {
            const item = this.createSelectionItem(image, index);
            this.selectionGrid.appendChild(item);
        });
    }

    createSelectionItem(image, index) {
        const item = document.createElement('div');
        item.className = 'selection-item';
        item.dataset.imageIndex = index;
        item.dataset.category = image.category;
        
        const img = document.createElement('img');
        img.src = image.path;
        img.alt = image.display_name;
        
        // Add error handling for images
        img.onerror = () => {
            console.error('Failed to load image:', image.path);
            item.innerHTML = `<div style="display: flex; align-items: center; justify-content: center; height: 100%; background: rgba(255,255,255,0.1); color: white; font-size: 0.8rem;">Image not found</div>`;
        };
        
        img.onload = () => {
            console.log('Image loaded successfully:', image.path);
        };
        
        const overlay = document.createElement('div');
        overlay.className = 'selection-overlay';
        
        const selectionCircle = document.createElement('div');
        selectionCircle.className = 'selection-circle';
        selectionCircle.innerHTML = '<span>SELECT</span>';
        
        overlay.appendChild(selectionCircle);
        
        item.appendChild(img);
        item.appendChild(overlay);
        
        return item;
    }

    setupEventListeners() {
        // Grid click handler - clicking anywhere on an image selects it
        this.selectionGrid.addEventListener('click', (e) => {
            const item = e.target.closest('.selection-item');
            
            if (item) {
                // Clicked on the image - select it
                this.selectImage(item);
            }
        });
        
        // Shuffle button
        this.shuffleBtn.addEventListener('click', () => {
            this.shuffleImages();
        });
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
        
        // Auto-redirect after a short delay
        setTimeout(() => {
            this.finalizeSelection();
        }, 500);
    }

    shuffleImages() {
        this.selectRandomImages();
        this.renderSelectionGrid();
        this.setupEventListeners();
        
        // Reset selection
        this.selectedImage = null;
    }

    finalizeSelection() {
        if (!this.selectedImage) {
            return;
        }
        
        // Store selected image data
        this.storeSelection();
        
        // Redirect to index.html with the selected category
        this.redirectToIndex();
    }

    storeSelection() {
        try {
            localStorage.setItem('selectedImage', JSON.stringify(this.selectedImage));
            localStorage.setItem('selectedCategory', this.selectedImage.category);
            localStorage.setItem('selectionTimestamp', Date.now().toString());
            
            console.log('Selection stored:', this.selectedImage);
        } catch (error) {
            console.error('Error storing selection:', error);
        }
    }

    redirectToIndex() {
        // Redirect to index.html
        window.location.href = 'index.html';
    }

    showError(message) {
        this.selectionGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <div style="font-size: 3rem; margin-bottom: 20px;">⚠️</div>
                <h3 style="margin-bottom: 15px; font-size: 1.5rem;">Error Loading Images</h3>
                <p style="opacity: 0.8; margin-bottom: 30px;">${message}</p>
                <p style="opacity: 0.6; margin-bottom: 30px; font-size: 0.9rem;">
                    If you're opening this file directly, please run a local server:<br>
                    <code style="background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 4px;">python3 -m http.server 8001</code><br>
                    Then visit: <code style="background: rgba(255,255,255,0.1); padding: 5px 10px; border-radius: 4px;">http://localhost:8001/image-selection.html</code>
                </p>
                <button onclick="location.reload()" style="
                    padding: 12px 24px;
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: 2px solid rgba(255,255,255,0.3);
                    border-radius: 8px;
                    cursor: pointer;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                " onmouseover="this.style.background='rgba(255,255,255,0.3)'" 
                   onmouseout="this.style.background='rgba(255,255,255,0.2)'">
                    Try Again
                </button>
            </div>
        `;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ImageSelection();
});
