/**
 * Error Handling Utilities
 * This file contains utility functions for handling missing images and resources
 */

/**
 * Default placeholder image paths for different content types
 */
const PLACEHOLDER_IMAGES = {
    product: 'images/placeholders/product-placeholder.jpg',
    category: 'images/placeholders/category-placeholder.jpg',
    thumbnail: 'images/placeholders/thumbnail-placeholder.jpg',
    banner: 'images/placeholders/banner-placeholder.jpg'
};

/**
 * Handle image loading errors by replacing with appropriate placeholder
 * @param {HTMLImageElement} img - The image element that failed to load
 * @param {string} type - The type of image (product, category, thumbnail, banner)
 */
function handleImageError(img, type = 'product') {
    // Set appropriate placeholder based on image type
    img.src = PLACEHOLDER_IMAGES[type] || PLACEHOLDER_IMAGES.product;
    
    // Add class for styling
    img.classList.add('placeholder-image');
    
    // Update alt text to indicate it's a placeholder
    if (!img.alt || img.alt.trim() === '') {
        img.alt = 'Image not available';
    } else if (!img.alt.includes('placeholder')) {
        img.alt += ' (placeholder)';
    }
    
    // Log error for debugging
    console.warn(`Image failed to load: ${img.src}`);
}

/**
 * Apply error handling to all images on the page
 */
function setupImageErrorHandling() {
    // Handle product images
    document.querySelectorAll('.product-card-image img, #main-product-image, .thumbnail img, .zoomed-image')
        .forEach(img => {
            img.onerror = () => handleImageError(img, 'product');
        });
    
    // Handle category images
    document.querySelectorAll('.category-image img')
        .forEach(img => {
            img.onerror = () => handleImageError(img, 'category');
        });
    
    // Handle banner images
    document.querySelectorAll('.banner-image img')
        .forEach(img => {
            img.onerror = () => handleImageError(img, 'banner');
        });
}

/**
 * Handle missing content with graceful degradation
 * @param {HTMLElement} container - The container element that should display content
 * @param {string} fallbackMessage - The message to display when content is missing
 * @param {string} fallbackClass - CSS class to apply to the fallback message
 */
function handleMissingContent(container, fallbackMessage = 'Information not available', fallbackClass = 'missing-content') {
    // Check if container is empty or has no visible content
    if (!container.innerHTML.trim() || container.offsetHeight === 0) {
        const fallbackElement = document.createElement('div');
        fallbackElement.className = fallbackClass;
        fallbackElement.textContent = fallbackMessage;
        container.appendChild(fallbackElement);
    }
}

/**
 * Create placeholder folders for images if they don't exist
 */
function createPlaceholderImages() {
    // Create placeholder directory if it doesn't exist
    const placeholderDir = 'images/placeholders';
    
    // Create product placeholder
    const productPlaceholder = document.createElement('canvas');
    productPlaceholder.width = 400;
    productPlaceholder.height = 400;
    const productCtx = productPlaceholder.getContext('2d');
    productCtx.fillStyle = '#f0f0f0';
    productCtx.fillRect(0, 0, 400, 400);
    productCtx.font = 'bold 24px Arial';
    productCtx.fillStyle = '#999999';
    productCtx.textAlign = 'center';
    productCtx.textBaseline = 'middle';
    productCtx.fillText('Product Image', 200, 200);
    
    // Create thumbnail placeholder
    const thumbnailPlaceholder = document.createElement('canvas');
    thumbnailPlaceholder.width = 100;
    thumbnailPlaceholder.height = 100;
    const thumbnailCtx = thumbnailPlaceholder.getContext('2d');
    thumbnailCtx.fillStyle = '#f0f0f0';
    thumbnailCtx.fillRect(0, 0, 100, 100);
    thumbnailCtx.font = 'bold 14px Arial';
    thumbnailCtx.fillStyle = '#999999';
    thumbnailCtx.textAlign = 'center';
    thumbnailCtx.textBaseline = 'middle';
    thumbnailCtx.fillText('Thumbnail', 50, 50);
    
    // Create category placeholder
    const categoryPlaceholder = document.createElement('canvas');
    categoryPlaceholder.width = 300;
    categoryPlaceholder.height = 200;
    const categoryCtx = categoryPlaceholder.getContext('2d');
    categoryCtx.fillStyle = '#f0f0f0';
    categoryCtx.fillRect(0, 0, 300, 200);
    categoryCtx.font = 'bold 20px Arial';
    categoryCtx.fillStyle = '#999999';
    categoryCtx.textAlign = 'center';
    categoryCtx.textBaseline = 'middle';
    categoryCtx.fillText('Category Image', 150, 100);
    
    // Create banner placeholder
    const bannerPlaceholder = document.createElement('canvas');
    bannerPlaceholder.width = 800;
    bannerPlaceholder.height = 300;
    const bannerCtx = bannerPlaceholder.getContext('2d');
    bannerCtx.fillStyle = '#f0f0f0';
    bannerCtx.fillRect(0, 0, 800, 300);
    bannerCtx.font = 'bold 32px Arial';
    bannerCtx.fillStyle = '#999999';
    bannerCtx.textAlign = 'center';
    bannerCtx.textBaseline = 'middle';
    bannerCtx.fillText('Banner Image', 400, 150);
    
    // Store placeholders in localStorage for future use
    try {
        localStorage.setItem('product-placeholder', productPlaceholder.toDataURL('image/jpeg'));
        localStorage.setItem('thumbnail-placeholder', thumbnailPlaceholder.toDataURL('image/jpeg'));
        localStorage.setItem('category-placeholder', categoryPlaceholder.toDataURL('image/jpeg'));
        localStorage.setItem('banner-placeholder', bannerPlaceholder.toDataURL('image/jpeg'));
    } catch (e) {
        console.warn('Failed to store placeholder images in localStorage:', e);
    }
}

/**
 * Get placeholder image URL from localStorage or use default
 * @param {string} type - The type of placeholder (product, category, thumbnail, banner)
 * @returns {string} The URL of the placeholder image
 */
function getPlaceholderImage(type = 'product') {
    try {
        const storedPlaceholder = localStorage.getItem(`${type}-placeholder`);
        if (storedPlaceholder) {
            return storedPlaceholder;
        }
    } catch (e) {
        console.warn('Failed to retrieve placeholder from localStorage:', e);
    }
    
    return PLACEHOLDER_IMAGES[type] || PLACEHOLDER_IMAGES.product;
}

/**
 * Initialize error handling for the page
 */
function initErrorHandling() {
    // Create placeholder images
    createPlaceholderImages();
    
    // Set up image error handling
    setupImageErrorHandling();
    
    // Handle missing content in key containers
    document.addEventListener('DOMContentLoaded', () => {
        // Product listing page
        const productGrid = document.querySelector('.product-grid');
        if (productGrid) {
            handleMissingContent(productGrid, 'No products available', 'no-products');
        }
        
        // Product detail page
        const specContainer = document.querySelector('.specifications-container');
        if (specContainer) {
            handleMissingContent(specContainer, 'No specifications available', 'no-specs');
        }
        
        const compatContainer = document.querySelector('.compatibility-container');
        if (compatContainer) {
            handleMissingContent(compatContainer, 'No compatibility information available', 'no-compat');
        }
        
        const relatedContainer = document.querySelector('.related-products');
        if (relatedContainer) {
            handleMissingContent(relatedContainer, 'No related products available', 'no-related');
        }
    });
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        handleImageError,
        handleMissingContent,
        setupImageErrorHandling,
        initErrorHandling,
        getPlaceholderImage
    };
}

// Make available globally for direct script inclusion
if (typeof window !== 'undefined') {
    window.errorHandling = {
        handleImageError,
        handleMissingContent,
        setupImageErrorHandling,
        initErrorHandling,
        getPlaceholderImage
    };
}