/**
 * Gallery JavaScript
 * Handles loading and displaying images from JSON data
 * Organized by Control, Fun, Materialism, and Reputation folders
 */

class Gallery {
    constructor() {
        this.galleryGrid = document.getElementById('galleryGrid');
        this.categoryFilter = document.getElementById('categoryFilter');
        this.imageCount = document.getElementById('imageCount');
        this.loading = document.getElementById('loading');
        this.galleryData = null;
        this.filteredImages = [];
        
        this.init();
    }

    async init() {
        try {
            this.showLoading();
            await this.loadGalleryData();
            this.populateCategoryFilter();
            this.renderGallery();
            this.setupEventListeners();
        } catch (error) {
            console.error('Error initializing gallery:', error);
            this.showError('Failed to load gallery data');
        } finally {
            this.hideLoading();
        }
    }

    async loadGalleryData() {
        const response = await fetch('gallery_data.json');
        if (!response.ok) {
            throw new Error('Failed to fetch gallery data');
        }
        this.galleryData = await response.json();
        this.filteredImages = [...this.galleryData.images];
    }

    populateCategoryFilter() {
        const categories = this.galleryData.categories;
        
        // Add category descriptions
        const categoryDescriptions = {
            'control': 'Control - Power, Authority, Structure',
            'fun': 'Fun - Joy, Playfulness, Entertainment',
            'materialism': 'Materialism - Products, Possessions, Consumption',
            'reputation': 'Reputation - Social Status, Identity, Perception'
        };
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = categoryDescriptions[category] || category;
            this.categoryFilter.appendChild(option);
        });
    }

    renderGallery() {
        this.galleryGrid.innerHTML = '';
        
        this.filteredImages.forEach(image => {
            const galleryItem = this.createGalleryItem(image);
            this.galleryGrid.appendChild(galleryItem);
        });

        this.updateImageCount();
    }

    createGalleryItem(image) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.category = image.category;

        const img = document.createElement('img');
        img.src = image.path;
        img.alt = image.display_name;
        img.loading = 'lazy';

        const info = document.createElement('div');
        info.className = 'gallery-item-info';
        
        const title = document.createElement('div');
        title.className = 'gallery-item-title';
        title.textContent = image.display_name;
        
        const category = document.createElement('div');
        category.className = 'gallery-item-category';
        category.textContent = image.category.charAt(0).toUpperCase() + image.category.slice(1);

        info.appendChild(title);
        info.appendChild(category);
        
        item.appendChild(img);
        item.appendChild(info);

        // Add click handler for image preview
        item.addEventListener('click', () => {
            this.showImagePreview(image);
        });

        return item;
    }

    showImagePreview(image) {
        const modal = document.createElement('div');
        modal.className = 'image-preview-modal';
        
        const img = document.createElement('img');
        img.src = image.path;
        img.alt = image.display_name;
        
        const closeBtn = document.createElement('span');
        closeBtn.className = 'close-btn';
        closeBtn.innerHTML = '&times;';
        
        // Add image info
        const imageInfo = document.createElement('div');
        imageInfo.className = 'image-preview-info';
        imageInfo.innerHTML = `
            <h3>${image.display_name}</h3>
            <p><strong>Category:</strong> ${image.category.charAt(0).toUpperCase() + image.category.slice(1)}</p>
        `;
        
        modal.appendChild(img);
        modal.appendChild(imageInfo);
        modal.appendChild(closeBtn);
        document.body.appendChild(modal);
        
        // Close modal when clicking outside image or on close button
        const closeModal = () => {
            document.body.removeChild(modal);
        };
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target === closeBtn) {
                closeModal();
            }
        });
        
        // Close modal with Escape key
        const handleKeyPress = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', handleKeyPress);
            }
        };
        
        document.addEventListener('keydown', handleKeyPress);
    }

    setupEventListeners() {
        this.categoryFilter.addEventListener('change', (e) => {
            this.filterByCategory(e.target.value);
        });
    }

    filterByCategory(category) {
        if (category === '') {
            this.filteredImages = [...this.galleryData.images];
        } else {
            this.filteredImages = this.galleryData.images.filter(img => img.category === category);
        }
        this.renderGallery();
    }

    updateImageCount() {
        const total = this.filteredImages.length;
        const category = this.categoryFilter.value;
        
        if (category === '') {
            this.imageCount.textContent = `${total} images total`;
        } else {
            this.imageCount.textContent = `${total} images in ${category}`;
        }
    }

    showLoading() {
        this.loading.classList.add('show');
    }

    hideLoading() {
        this.loading.classList.remove('show');
    }

    showError(message) {
        this.galleryGrid.innerHTML = `<div style="text-align: center; padding: 40px; color: #666;">${message}</div>`;
    }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
});
