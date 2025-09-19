/**
 * Category Descriptions System
 * Displays descriptions for each category at the end of the section
 */

class CategoryDescriptions {
    constructor() {
        this.categoryDescriptions = {
            'control': {
                title: 'Control',
                description: "You try to hold it all together\nbut life keeps moving in its own way\nthe more you fight the less it listens\njust let it happen and breathe"
            },
            'fun': {
                title: 'Fun',
                description: "Fun doesn't need to be chased\nit comes quietly when you least expect\nlet it happen and let the moments find you"
            },
            'materialism': {
                title: 'Materialism',
                description: "Things are easy to admire for how they look\nbut their meaning lingers longer than their shine\nlet it happen and enjoy what they give you beyond the surface"
            },
            'reputation': {
                title: 'Reputation',
                description: "We all want to be seen a certain way\nbut people's eyes are always shifting\nwhat matters is the life you carry within\nlet it happen and the right ones will notice"
            }
        };
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.displayDescription());
        } else {
            this.displayDescription();
        }
    }

    displayDescription() {
        // Get the selected category from localStorage
        const selectedCategory = localStorage.getItem('selectedCategory');
        
        if (!selectedCategory) {
            console.log('No category selected, showing default message');
            this.showDefaultMessage();
            return;
        }

        const categoryData = this.categoryDescriptions[selectedCategory];
        
        if (!categoryData) {
            console.log('Category not found:', selectedCategory);
            this.showDefaultMessage();
            return;
        }

        // Find the category description container
        const container = document.getElementById('category-description-container');
        
        if (!container) {
            console.error('Category description container not found');
            return;
        }

        // Display the description with line breaks preserved
        container.innerHTML = `
            <div class="category-description">
                <h2 class="category-title">${categoryData.title}</h2>
                <p class="category-text">${categoryData.description.replace(/\n/g, '<br>')}</p>
            </div>
        `;

        console.log('Category description displayed for:', selectedCategory);
    }

    showDefaultMessage() {
        const container = document.getElementById('category-description-container');
        
        if (!container) {
            console.error('Category description container not found');
            return;
        }

        container.innerHTML = `
            <div class="category-description">
                <h2 class="category-title">Let It Happen</h2>
                <p class="category-text">Sometimes the most profound moments come when we stop trying to control everything and simply allow life to unfold. In the space between intention and outcome, we find the beauty of surrender.</p>
            </div>
        `;
    }
}

// Initialize the category descriptions system
new CategoryDescriptions();
