/**
 * Page Loader
 * Handles page refresh and image selection persistence
 */

document.addEventListener('DOMContentLoaded', () => {
    const storedImage = localStorage.getItem('selectedImage');
    const storedCategory = localStorage.getItem('selectedCategory');
    
    if (storedImage && storedCategory) {
        try {
            const selectedImage = JSON.parse(storedImage);
            
            // Image was already selected, hide selection interface and show main website
            const selectionContainer = document.getElementById('category-selection');
            const mainWebsite = document.getElementById('main-website');
            
            if (selectionContainer) {
                selectionContainer.style.display = 'none';
            }
            
            if (mainWebsite) {
                mainWebsite.style.display = 'block';
            }
            
            // Set the selected image and category for other scripts
            window.selectedImage = selectedImage;
            window.selectedCategory = storedCategory;
            
            console.log('Page loaded with stored image:', selectedImage);
            console.log('Page loaded with stored category:', storedCategory);
        } catch (error) {
            console.error('Error parsing stored image data:', error);
            // If there's an error, show selection interface
            console.log('Error parsing stored data, showing selection interface');
        }
    } else {
        // No image selected, show selection interface
        console.log('No image selected, showing selection interface');
    }
});
