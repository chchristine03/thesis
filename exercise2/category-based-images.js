/**
 * Category-Based Image System
 * Filters all images on the page based on the user's selected category
 */

class CategoryBasedImages {
    constructor() {
        this.galleryData = null;
        this.selectedCategory = null;
        this.categoryImages = [];
        
        this.init();
    }

    async init() {
        try {
            // Get selected category from localStorage
            this.selectedCategory = localStorage.getItem('selectedCategory');
            
            if (!this.selectedCategory) {
                console.log('No category selected, using default images');
                return;
            }
            
            console.log('Selected category:', this.selectedCategory);
            
            // Load gallery data
            await this.loadGalleryData();
            
            // Filter images by category
            this.filterImagesByCategory();
            
            // Update all images on the page
            this.updatePageImages();
            
            // Update cursor trail
            this.updateCursorTrail();
            
            // Update category title
            this.updateCategoryTitle();
            
        } catch (error) {
            console.error('Error initializing category-based images:', error);
        }
    }

    async loadGalleryData() {
        const response = await fetch('gallery_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery data');
        }
        this.galleryData = await response.json();
        console.log('Gallery data loaded:', this.galleryData);
    }

    filterImagesByCategory() {
        if (!this.selectedCategory || !this.galleryData) return;
        
        this.categoryImages = this.galleryData.images.filter(
            img => img.category === this.selectedCategory
        );
        
        console.log(`Filtered ${this.categoryImages.length} images for category: ${this.selectedCategory}`);
    }

    updatePageImages() {
        if (this.categoryImages.length === 0) return;
        
        // Update clock images (1-12)
        this.updateClockImages();
        
        // Update additional images (13-24)
        this.updateAdditionalImages();
    }

    updateClockImages() {
        const clockImages = document.querySelectorAll('.clock-image');
        const shuffledImages = [...this.categoryImages].sort(() => 0.5 - Math.random());
        
        clockImages.forEach((imgElement, index) => {
            if (shuffledImages[index]) {
                imgElement.src = shuffledImages[index].path;
                imgElement.alt = shuffledImages[index].display_name;
                console.log(`Updated clock image ${index + 1} to:`, shuffledImages[index].path);
            }
        });
    }

    updateAdditionalImages() {
        const additionalImages = document.querySelectorAll('.additional-clock-image');
        const shuffledImages = [...this.categoryImages].sort(() => 0.5 - Math.random());
        
        additionalImages.forEach((imgElement, index) => {
            if (shuffledImages[index]) {
                imgElement.src = shuffledImages[index].path;
                imgElement.alt = shuffledImages[index].display_name;
                console.log(`Updated additional image ${index + 13} to:`, shuffledImages[index].path);
            }
        });
    }

    updateCursorTrail() {
        if (window.cursorTrail && this.categoryImages.length > 0) {
            window.cursorTrail.updateImages(this.categoryImages);
            console.log('Updated cursor trail with category images');
        }
    }

    updateCategoryTitle() {
        const categoryTitle = document.getElementById('category-title');
        if (categoryTitle && this.selectedCategory) {
            // Capitalize the first letter of the category
            const capitalizedCategory = this.selectedCategory.charAt(0).toUpperCase() + this.selectedCategory.slice(1);
            categoryTitle.textContent = capitalizedCategory;
            console.log('Updated category title to:', capitalizedCategory);
        }
    }

    // Public method to refresh images (can be called externally)
    refreshImages() {
        this.filterImagesByCategory();
        this.updatePageImages();
        this.updateCursorTrail();
        this.updateCategoryTitle();
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.categoryBasedImages = new CategoryBasedImages();
});

// Add debugging
console.log('Category-based-images.js loaded');
console.log('localStorage selectedCategory:', localStorage.getItem('selectedCategory'));
