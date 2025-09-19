/**
 * Category Filter System
 * Updates website images based on selected image/category
 */

class CategoryFilter {
    constructor() {
        this.galleryData = null;
        this.selectedImage = null;
        this.selectedCategory = null;
        this.categoryImages = [];
        
        this.init();
    }

    async init() {
        try {
            await this.loadGalleryData();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing category filter:', error);
        }
    }

    async loadGalleryData() {
        const response = await fetch('gallery_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery data');
        }
        this.galleryData = await response.json();
    }

    setupEventListeners() {
        // Listen for image selection
        window.addEventListener('imageSelected', (event) => {
            this.selectedImage = event.detail.image;
            this.selectedCategory = event.detail.category;
            this.filterImagesByCategory();
            this.updateWebsiteImages();
        });

        // Check if image was already selected (page refresh)
        const storedImage = localStorage.getItem('selectedImage');
        const storedCategory = localStorage.getItem('selectedCategory');
        
        if (storedImage && storedCategory) {
            try {
                this.selectedImage = JSON.parse(storedImage);
                this.selectedCategory = storedCategory;
                this.filterImagesByCategory();
                this.updateWebsiteImages();
            } catch (error) {
                console.error('Error parsing stored image data:', error);
            }
        }
    }

    filterImagesByCategory() {
        if (!this.selectedCategory || !this.galleryData) return;
        
        this.categoryImages = this.galleryData.images.filter(
            img => img.category === this.selectedCategory
        );
        
        console.log(`Filtered ${this.categoryImages.length} images for category: ${this.selectedCategory}`);
    }

    updateWebsiteImages() {
        if (!this.categoryImages.length) return;

        // Update clock images
        this.updateClockImages();
        
        // Update cursor trail images
        this.updateCursorTrailImages();
        
        // Update any other images that should be filtered
        this.updateOtherImages();
    }

    updateClockImages() {
        const clockImages = document.querySelectorAll('.clock-image, .additional-clock-image');
        
        clockImages.forEach((imgElement, index) => {
            if (index < this.categoryImages.length) {
                const newImage = this.categoryImages[index];
                imgElement.src = newImage.path;
                imgElement.alt = newImage.display_name;
            }
        });
    }

    updateCursorTrailImages() {
        // Update cursor trail images if the cursor trail system exists
        if (window.cursorTrail && window.cursorTrail.updateImages) {
            window.cursorTrail.updateImages(this.categoryImages);
        }
    }

    updateOtherImages() {
        // Update any other images on the page that should be filtered
        // This could include background images, decorative elements, etc.
        
        // Example: Update any images with data-category attribute
        const categoryImages = document.querySelectorAll('[data-category]');
        categoryImages.forEach(img => {
            const category = img.dataset.category;
            if (category === this.selectedCategory) {
                // Find a random image from the selected category
                const randomImage = this.getRandomImageFromCategory();
                if (randomImage) {
                    img.src = randomImage.path;
                    img.alt = randomImage.display_name;
                }
            }
        });
    }

    getRandomImageFromCategory() {
        if (!this.categoryImages.length) return null;
        
        const randomIndex = Math.floor(Math.random() * this.categoryImages.length);
        return this.categoryImages[randomIndex];
    }

    // Method to get all images from selected category
    getCategoryImages() {
        return this.categoryImages;
    }

    // Method to get the selected image
    getSelectedImage() {
        return this.selectedImage;
    }

    // Method to get a specific number of random images
    getRandomImages(count = 1) {
        if (!this.categoryImages.length) return [];
        
        const shuffled = [...this.categoryImages].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.categoryFilter = new CategoryFilter();
});
