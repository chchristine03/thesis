/**
 * Reset Selection System
 * Adds a reset button to go back to image selection
 */

document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the main website (not selection page)
    const mainWebsite = document.getElementById('main-website');
    const isIndexPage = window.location.pathname.includes('index.html') || window.location.pathname === '/';
    
    if ((mainWebsite && mainWebsite.style.display !== 'none') || isIndexPage) {
        addResetButton();
    }
});

function addResetButton() {
    // Create reset button
    const resetButton = document.createElement('button');
    resetButton.id = 'reset-selection-btn';
    resetButton.innerHTML = '↻';
    resetButton.title = 'Reset Selection';
    resetButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: rgba(0,0,0,0.7);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 20px;
        font-weight: bold;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    // Add hover effect
    resetButton.addEventListener('mouseenter', () => {
        resetButton.style.background = 'rgba(0,0,0,0.9)';
        resetButton.style.transform = 'translateY(-2px) scale(1.1)';
        resetButton.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)';
    });
    
    resetButton.addEventListener('mouseleave', () => {
        resetButton.style.background = 'rgba(0,0,0,0.7)';
        resetButton.style.transform = 'translateY(0) scale(1)';
        resetButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
    });
    
    // Add click handler
    resetButton.addEventListener('click', () => {
        // Clear stored selection
        localStorage.removeItem('selectedImage');
        localStorage.removeItem('selectedCategory');
        localStorage.removeItem('selectionTimestamp');
        
        // Redirect to image selection page
        window.location.href = 'image-selection.html';
    });
    
    // Add to page
    document.body.appendChild(resetButton);
}
