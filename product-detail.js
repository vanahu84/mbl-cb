/**
 * Product Detail Page JavaScript
 * This file handles the dynamic population and interaction of the product detail page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Initialize the product detail page with the specified product
        initProductDetail(productId);
    } else {
        // Handle case where no product ID is provided
        handleProductNotFound();
    }
});

/**
 * Initialize the product detail page with the specified product
 * @param {string} productId - The ID of the product to display
 */
function initProductDetail(productId) {
    // Find the product in the products data
    const product = findProductById(productId);
    
    if (product) {
        // Update page title
        document.title = `${product.name} - Premium Mobile Accessories Shop`;
        
        // Update breadcrumb
        updateBreadcrumb(product);
        
        // Populate product information
        populateProductInfo(product);
        
        // Populate product gallery
        populateProductGallery(product);
        
        // Populate specifications
        populateSpecifications(product);
        
        // Populate compatibility
        populateCompatibility(product);
        
        // Set up image zoom functionality
        setupImageZoom();
        
        // Set up variant selection
        setupVariantSelection(product);
    } else {
        // Handle product not found
        handleProductNotFound();
    }
}

/**
 * Find a product by its ID
 * @param {string} productId - The ID of the product to find
 * @returns {Object|null} The product object or null if not found
 */
function findProductById(productId) {
    // Check if products data is available
    if (typeof products !== 'undefined') {
        return products.find(product => product.id === productId) || null;
    }
    return null;
}

/**
 * Update the breadcrumb navigation with product and category information
 * @param {Object} product - The product object
 */
function updateBreadcrumb(product) {
    const categoryLink = document.querySelector('.breadcrumb .category-link');
    const productNameElement = document.querySelector('.breadcrumb .product-name');
    
    // Find category information
    const category = categories.find(cat => cat.id === product.category);
    
    if (category) {
        categoryLink.textContent = category.name;
        categoryLink.href = `product-listing.html?category=${category.id}`;
    }
    
    productNameElement.textContent = product.name;
}

/**
 * Populate the product information section
 * @param {Object} product - The product object
 */
function populateProductInfo(product) {
    // Update product title
    document.querySelector('.product-title').textContent = product.name;
    
    // Update pricing
    const currentPriceElement = document.querySelector('.current-price');
    const originalPriceElement = document.querySelector('.original-price');
    const discountBadgeElement = document.querySelector('.discount-badge');
    
    // Set current price (sale price or regular price)
    currentPriceElement.textContent = `$${(product.salePrice || product.price).toFixed(2)}`;
    
    // Show original price and discount badge if there's a sale
    if (product.salePrice && product.price > product.salePrice) {
        originalPriceElement.textContent = `$${product.price.toFixed(2)}`;
        
        // Calculate discount percentage
        const discountPercentage = Math.round((1 - product.salePrice / product.price) * 100);
        discountBadgeElement.textContent = `-${discountPercentage}%`;
    } else {
        originalPriceElement.textContent = '';
        discountBadgeElement.textContent = '';
    }
    
    // Update stock status
    const stockStatusElement = document.querySelector('.stock-status');
    const stockStatusTextElement = document.querySelector('.stock-status-text');
    
    // Check if any variant is in stock
    const hasInStockVariant = product.variants.some(variant => variant.inStock);
    
    if (hasInStockVariant) {
        stockStatusElement.classList.add('in-stock');
        stockStatusElement.classList.remove('out-of-stock');
        stockStatusTextElement.textContent = 'In Stock';
    } else {
        stockStatusElement.classList.add('out-of-stock');
        stockStatusElement.classList.remove('in-stock');
        stockStatusTextElement.textContent = 'Out of Stock';
    }
    
    // Update product description
    document.querySelector('.product-description').innerHTML = `<p>${product.description}</p>`;
}

/**
 * Populate the product gallery with images
 * @param {Object} product - The product object
 */
function populateProductGallery(product) {
    const mainImageElement = document.getElementById('main-product-image');
    const thumbnailStripElement = document.querySelector('.thumbnail-strip');
    const zoomedImage = document.querySelector('.zoomed-image');
    
    // Clear existing thumbnails
    thumbnailStripElement.innerHTML = '';
    
    // Find primary image or use first image
    const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
    
    // Set main image
    mainImageElement.src = primaryImage.url;
    mainImageElement.alt = primaryImage.alt;
    
    // Set zoomed image initially
    zoomedImage.src = primaryImage.url;
    zoomedImage.alt = primaryImage.alt;
    
    // Create thumbnails for all images
    product.images.forEach((image, index) => {
        const thumbnailElement = document.createElement('div');
        thumbnailElement.className = `thumbnail ${image === primaryImage ? 'active' : ''}`;
        thumbnailElement.innerHTML = `<img src="${image.url}" alt="${image.alt}">`;
        thumbnailElement.setAttribute('data-index', index);
        
        // Add click event to switch main image
        thumbnailElement.addEventListener('click', function() {
            // Update main image
            mainImageElement.src = image.url;
            mainImageElement.alt = image.alt;
            
            // Update zoomed image
            zoomedImage.src = image.url;
            zoomedImage.alt = image.alt;
            
            // Update active thumbnail
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            this.classList.add('active');
        });
        
        thumbnailStripElement.appendChild(thumbnailElement);
    });
    
    // Add navigation buttons if there are multiple images
    if (product.images.length > 1) {
        // Add previous button
        const prevButton = document.createElement('button');
        prevButton.className = 'gallery-nav prev-image';
        prevButton.innerHTML = '&#10094;';
        prevButton.setAttribute('aria-label', 'Previous image');
        
        // Add next button
        const nextButton = document.createElement('button');
        nextButton.className = 'gallery-nav next-image';
        nextButton.innerHTML = '&#10095;';
        nextButton.setAttribute('aria-label', 'Next image');

        // Append buttons to the main image container
        mainImageElement.parentNode.insertBefore(prevButton, mainImageElement);
        mainImageElement.parentNode.appendChild(nextButton);

        let currentImageIndex = product.images.findIndex(img => img.isPrimary) || 0;

        const updateImage = (index) => {
            const image = product.images[index];
            mainImageElement.src = image.url;
            mainImageElement.alt = image.alt;
            zoomedImage.src = image.url;
            zoomedImage.alt = image.alt;

            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            document.querySelector(`.thumbnail[data-index="${index}"]`).classList.add('active');

            // Update image counter in modal
            document.querySelector('.image-counter').textContent = `${index + 1} / ${product.images.length}`;
        };

        prevButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex - 1 + product.images.length) % product.images.length;
            updateImage(currentImageIndex);
        });

        nextButton.addEventListener('click', () => {
            currentImageIndex = (currentImageIndex + 1) % product.images.length;
            updateImage(currentImageIndex);
        });

        // Initialize image counter for the modal
        document.querySelector('.image-counter').textContent = `${currentImageIndex + 1} / ${product.images.length}`;
    }
}

/**
 * Set up image zoom functionality
 */
function setupImageZoom() {
    const mainImage = document.getElementById('main-product-image');
    const zoomModal = document.querySelector('.image-zoom-modal');
    const closeZoom = document.querySelector('.close-zoom');
    const zoomedImage = document.querySelector('.zoomed-image');

    mainImage.addEventListener('click', () => {
        zoomModal.style.display = 'flex';
        zoomedImage.src = mainImage.src;
        zoomedImage.alt = mainImage.alt;
    });

    closeZoom.addEventListener('click', () => {
        zoomModal.style.display = 'none';
    });

    zoomModal.addEventListener('click', (e) => {
        if (e.target === zoomModal) {
            zoomModal.style.display = 'none';
        }
    });
}

/**
 * Populate specifications table
 * @param {Object} product - The product object
 */
function populateSpecifications(product) {
    const specificationsContainer = document.querySelector('.specifications-container');
    specificationsContainer.innerHTML = ''; // Clear previous specifications

    if (product.specifications && product.specifications.length > 0) {
        product.specifications.forEach(group => {
            const specGroupDiv = document.createElement('div');
            specGroupDiv.className = 'spec-group';
            specGroupDiv.innerHTML = `<h3>${group.groupName}</h3>`;

            const specTable = document.createElement('table');
            specTable.className = 'spec-table';

            group.details.forEach(detail => {
                const row = specTable.insertRow();
                const th = document.createElement('th');
                th.textContent = detail.name;
                const td = row.insertCell();
                td.textContent = detail.value;
                row.appendChild(th);
                row.appendChild(td);
            });
            specGroupDiv.appendChild(specTable);
            specificationsContainer.appendChild(specGroupDiv);
        });
    } else {
        specificationsContainer.innerHTML = '<p>No specifications available for this product.</p>';
    }
}

/**
 * Populate compatibility list
 * @param {Object} product - The product object
 */
function populateCompatibility(product) {
    const compatibilityContainer = document.querySelector('.compatibility-container');
    compatibilityContainer.innerHTML = ''; // Clear previous compatibility info

    if (product.compatibility && product.compatibility.length > 0) {
        const ul = document.createElement('ul');
        product.compatibility.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
        compatibilityContainer.appendChild(ul);
    } else {
        compatibilityContainer.innerHTML = '<p>No compatibility information available for this product.</p>';
    }
}

/**
 * Handle product not found scenario
 */
function handleProductNotFound() {
    const productDetailMain = document.querySelector('.product-detail-main');
    if (productDetailMain) {
        productDetailMain.innerHTML = '<div class="container"><p>Product not found. Please return to the <a href="product-listing.html">product listing page</a>.</p></div>';
    }
    document.title = 'Product Not Found - Premium Mobile Accessories Shop';
    // Optionally hide other elements or show a specific error page
}

/**
 * Set up variant selection controls and logic
 * @param {Object} product - The product object
 */
function setupVariantSelection(product) {
    const variantSelectionContainer = document.querySelector('.variant-selection');
    if (!variantSelectionContainer || !product.variants || product.variants.length === 0) return;

    variantSelectionContainer.innerHTML = ''; // Clear existing content

    // Determine all unique option types (e.g., 'Color', 'Size') from all variants
    const allOptionTypes = new Set();
    product.variants.forEach(variant => {
        if (variant.options) {
            variant.options.forEach(option => allOptionTypes.add(option.name));
        }
    });

    const optionControls = {}; // To store references to select elements

    allOptionTypes.forEach(optionType => {
        const optionGroupDiv = document.createElement('div');
        optionGroupDiv.classList.add('variant-option-group');
        optionGroupDiv.innerHTML = `<label>${optionType}:</label>`;

        const selectElement = document.createElement('select');
        selectElement.classList.add('variant-select');
        selectElement.setAttribute('data-option-type', optionType);

        // Populate options for the current option type
        const uniqueOptionValues = new Set();
        product.variants.forEach(variant => {
            const option = variant.options.find(opt => opt.name === optionType);
            if (option) {
                uniqueOptionValues.add(option.value);
            }
        });

        Array.from(uniqueOptionValues).sort().forEach(optionValue => {
            const optionElement = document.createElement('option');
            optionElement.value = optionValue;
            optionElement.textContent = optionValue;
            selectElement.appendChild(optionElement);
        });

        optionGroupDiv.appendChild(selectElement);
        variantSelectionContainer.appendChild(optionGroupDiv);
        optionControls[optionType] = selectElement; // Store reference

        selectElement.addEventListener('change', () => {
            updateProductDetailsBasedOnVariant(product, optionControls);
        });
    });

    // Initial update based on default selections (first variant's options)
    updateProductDetailsBasedOnVariant(product, optionControls);
}

/**
 * Update product details (price, stock, image) based on selected variant(s)
 * @param {Object} product - The main product object
 */
function updateProductDetailsBasedOnVariant(product, optionControls) {
    let matchingVariant = null;

    // Get selected options from the dynamically created select elements using optionControls
    const selectedOptions = {};
    for (const type in optionControls) {
        const selectElement = optionControls[type];
        if (selectElement && selectElement.value) {
            selectedOptions[type] = selectElement.value;
        }
    }

    // Find a matching variant based on selected options
    if (Object.keys(selectedOptions).length > 0) {
        matchingVariant = product.variants.find(variant => {
            if (!variant.options) return false;
            return Object.keys(selectedOptions).every(selectedOptionType => {
                const variantOption = variant.options.find(opt => opt.name === selectedOptionType);
                return variantOption && variantOption.value === selectedOptions[selectedOptionType];
            });
        });
    }

    const currentPriceElement = document.querySelector('.current-price');
    const originalPriceElement = document.querySelector('.original-price');
    const discountBadgeElement = document.querySelector('.discount-badge');
    const stockStatusElement = document.querySelector('.stock-status');
    const stockStatusTextElement = document.querySelector('.stock-status-text');
    const mainImageElement = document.getElementById('main-product-image');
    const zoomedImage = document.querySelector('.zoomed-image');

    if (matchingVariant) {
        // Update pricing
        currentPriceElement.textContent = `$${(matchingVariant.salePrice || matchingVariant.price).toFixed(2)}`;
        if (matchingVariant.salePrice && matchingVariant.price > matchingVariant.salePrice) {
            originalPriceElement.textContent = `$${matchingVariant.price.toFixed(2)}`;
            const discountPercentage = Math.round((1 - matchingVariant.salePrice / matchingVariant.price) * 100);
            discountBadgeElement.textContent = `-${discountPercentage}%`;
        } else {
            originalPriceElement.textContent = '';
            discountBadgeElement.textContent = '';
        }

        // Update stock status
        if (matchingVariant.inStock) {
            stockStatusElement.classList.add('in-stock');
            stockStatusElement.classList.remove('out-of-stock');
            stockStatusTextElement.textContent = 'In Stock';
        } else {
            stockStatusElement.classList.add('out-of-stock');
            stockStatusElement.classList.remove('in-stock');
            stockStatusTextElement.textContent = 'Out of Stock';
        }

        // Update image if variant has a specific image
        if (matchingVariant.image) {
            mainImageElement.src = matchingVariant.image.url;
            mainImageElement.alt = matchingVariant.image.alt;
            zoomedImage.src = matchingVariant.image.url;
            zoomedImage.alt = matchingVariant.image.alt;
            // Also update active thumbnail if applicable
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            const matchingThumbnail = document.querySelector(`.thumbnail img[src="${matchingVariant.image.url}"]`);
            if (matchingThumbnail) {
                matchingThumbnail.parentNode.classList.add('active');
            }
        } else {
            // Revert to primary product image if variant has no specific image
            const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
            mainImageElement.src = primaryImage.url;
            mainImageElement.alt = primaryImage.alt;
            zoomedImage.src = primaryImage.url;
            zoomedImage.alt = primaryImage.alt;
            document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
            const primaryThumbnail = document.querySelector(`.thumbnail img[src="${primaryImage.url}"]`);
            if (primaryThumbnail) {
                primaryThumbnail.parentNode.classList.add('active');
            }
        }
    } else {
        // If no matching variant, display base product info or a "select options" state
        // For now, revert to base product info and indicate out of stock/select options
        currentPriceElement.textContent = `$${(product.salePrice || product.price).toFixed(2)}`;
        originalPriceElement.textContent = '';
        discountBadgeElement.textContent = '';

        stockStatusElement.classList.remove('in-stock');
        stockStatusElement.classList.add('out-of-stock');
        stockStatusTextElement.textContent = 'Select Options'; // Or 'Out of Stock' if no base variant is in stock

        const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
        mainImageElement.src = primaryImage.url;
        mainImageElement.alt = primaryImage.alt;
        zoomedImage.src = primaryImage.url;
        zoomedImage.alt = primaryImage.alt;
        document.querySelectorAll('.thumbnail').forEach(thumb => thumb.classList.remove('active'));
        const primaryThumbnail = document.querySelector(`.thumbnail img[src="${primaryImage.url}"]`);
        if (primaryThumbnail) {
            primaryThumbnail.parentNode.classList.add('active');
        }
    }
}

        // Add navigation functionality
        prevButton.addEventListener('click', function() {
            navigateGallery('prev', product.images.length);
        });
        
        nextButton.addEventListener('click', function() {
            navigateGallery('next', product.images.length);
        });
        
        // Add buttons to gallery
        const galleryElement = document.querySelector('.product-gallery');
        galleryElement.appendChild(prevButton);
        galleryElement.appendChild(nextButton);
    } elseif (!product) {
        // Handle case where no product ID is provided
        handleProductNotFound();
    }
}

/**
 * Populate the specifications table
 * @param {Object} product - The product object
 */
function populateSpecifications(product) {
    const specificationsContainer = document.querySelector('.specifications-container');
    
    // Clear existing specifications
    specificationsContainer.innerHTML = '';
    
    // Check if product has specifications
    if (product.specifications && product.specifications.length > 0) {
        // Create a section for each specification group
        product.specifications.forEach(specGroup => {
            const specGroupElement = document.createElement('div');
            specGroupElement.className = 'spec-group';
            
            // Create group header
            const headerElement = document.createElement('div');
            headerElement.className = 'spec-group-header';
            headerElement.textContent = specGroup.group;
            
            // Create specification table
            const tableElement = document.createElement('table');
            tableElement.className = 'spec-table';
            
            // Add rows for each specification
            specGroup.specs.forEach(spec => {
                const rowElement = document.createElement('tr');
                
                const nameCell = document.createElement('td');
                nameCell.className = 'spec-name';
                nameCell.textContent = spec.name;
                
                const valueCell = document.createElement('td');
                valueCell.className = 'spec-value';
                valueCell.textContent = spec.value;
                
                rowElement.appendChild(nameCell);
                rowElement.appendChild(valueCell);
                tableElement.appendChild(rowElement);
            });
            
            // Assemble the spec group
            specGroupElement.appendChild(headerElement);
            specGroupElement.appendChild(tableElement);
            
            // Add to container
            specificationsContainer.appendChild(specGroupElement);
        });
    } else {
        // Display message if no specifications are available
        specificationsContainer.innerHTML = '<p>No specifications available for this product.</p>';
    }
}

/**
 * Populate the compatibility list
 * @param {Object} product - The product object
 */
function populateCompatibility(product) {
    const compatibilityContainer = document.querySelector('.compatibility-container');
    
    // Clear existing compatibility information
    compatibilityContainer.innerHTML = '';
    
    // Check if product has compatibility information
    if (product.compatibility && product.compatibility.length > 0) {
        // Create a section for each brand
        product.compatibility.forEach(compat => {
            const brandElement = document.createElement('div');
            brandElement.className = 'compatibility-brand';
            
            // Create brand header
            const headerElement = document.createElement('div');
            headerElement.className = 'brand-header';
            headerElement.innerHTML = `
                <span>${compat.brand}</span>
                <button class="toggle-models">-</button>
            `;
            
            // Create models list
            const modelsListElement = document.createElement('ul');
            modelsListElement.className = 'models-list';
            
            // Add each model to the list
            compat.models.forEach(model => {
                const modelItem = document.createElement('li');
                modelItem.textContent = model;
                modelsListElement.appendChild(modelItem);
            });
            
            // Add toggle functionality
            const toggleButton = headerElement.querySelector('.toggle-models');
            toggleButton.addEventListener('click', function() {
                modelsListElement.style.display = modelsListElement.style.display === 'none' ? 'block' : 'none';
                this.textContent = modelsListElement.style.display === 'none' ? '+' : '-';
            });
            
            // Assemble the compatibility brand section
            brandElement.appendChild(headerElement);
            brandElement.appendChild(modelsListElement);
            
            // Add to container
            compatibilityContainer.appendChild(brandElement);
        });
    } else {
        // Display message if no compatibility information is available
        compatibilityContainer.innerHTML = '<p>No compatibility information available for this product.</p>';
    }
}

/**
 * Set up image zoom functionality
 */
function setupImageZoom() {
    const mainImage = document.getElementById('main-product-image');
    const zoomModal = document.querySelector('.image-zoom-modal');
    const zoomedImage = document.querySelector('.zoomed-image');
    const closeZoom = document.querySelector('.close-zoom');
    const zoomOverlay = document.querySelector('.image-zoom-overlay');
    const imageCounter = document.querySelector('.image-counter');
    
    // Open zoom modal when clicking on main image or zoom overlay
    mainImage.addEventListener('click', openZoomModal);
    zoomOverlay.addEventListener('click', openZoomModal);
    
    function openZoomModal() {
        zoomModal.style.display = 'flex';
        
        // Add a small delay before adding active class for transition effect
        setTimeout(() => {
            zoomModal.classList.add('active');
            zoomedImage.classList.add('active');
        }, 10);
        
        zoomedImage.src = mainImage.src;
        zoomedImage.alt = mainImage.alt;
        
        // Update image counter
        updateImageCounter();
        
        // Add keyboard navigation for the modal
        document.addEventListener('keydown', handleKeyboardNavigation);
        
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    }
    
    // Close zoom modal when clicking on close button
    closeZoom.addEventListener('click', closeZoomModal);
    
    // Close zoom modal when clicking outside the image
    zoomModal.addEventListener('click', function(event) {
        if (event.target === zoomModal) {
            closeZoomModal();
        }
    });
    
    function closeZoomModal() {
        zoomModal.classList.remove('active');
        zoomedImage.classList.remove('active');
        
        // Wait for transition to complete before hiding
        setTimeout(() => {
            zoomModal.style.display = 'none';
        }, 300);
        
        // Remove keyboard event listener when modal is closed
        document.removeEventListener('keydown', handleKeyboardNavigation);
        
        // Restore body scrolling
        document.body.style.overflow = '';
    }
    
    // Add hover zoom effect on main image
    const mainImageContainer = document.querySelector('.main-image');
    
    mainImageContainer.addEventListener('mousemove', function(e) {
        if (window.innerWidth < 768) return; // Disable on mobile
        
        // Get position of mouse relative to the image
        const rect = mainImageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Calculate percentage position
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        
        // Apply transform to the image for zoom effect
        mainImage.style.transformOrigin = `${xPercent}% ${yPercent}%`;
        mainImage.style.transform = 'scale(1.5)';
    });
    
    mainImageContainer.addEventListener('mouseleave', function() {
        // Reset transform when mouse leaves
        mainImage.style.transform = 'scale(1)';
    });
    
    // Add navigation arrows to zoom modal
    const prevArrow = document.createElement('button');
    prevArrow.className = 'zoom-nav prev-zoom';
    prevArrow.innerHTML = '&#10094;';
    prevArrow.setAttribute('aria-label', 'Previous image');
    
    const nextArrow = document.createElement('button');
    nextArrow.className = 'zoom-nav next-zoom';
    nextArrow.innerHTML = '&#10095;';
    nextArrow.setAttribute('aria-label', 'Next image');
    
    zoomModal.appendChild(prevArrow);
    zoomModal.appendChild(nextArrow);
    
    // Add navigation functionality to zoom modal
    prevArrow.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing the modal
        const totalImages = document.querySelectorAll('.thumbnail').length;
        navigateGallery('prev', totalImages);
        
        // Animate image change
        zoomedImage.classList.remove('active');
        setTimeout(() => {
            zoomedImage.src = mainImage.src;
            zoomedImage.alt = mainImage.alt;
            zoomedImage.classList.add('active');
            updateImageCounter();
        }, 150);
    });
    
    nextArrow.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent closing the modal
        const totalImages = document.querySelectorAll('.thumbnail').length;
        navigateGallery('next', totalImages);
        
        // Animate image change
        zoomedImage.classList.remove('active');
        setTimeout(() => {
            zoomedImage.src = mainImage.src;
            zoomedImage.alt = mainImage.alt;
            zoomedImage.classList.add('active');
            updateImageCounter();
        }, 150);
    });
    
    // Handle keyboard navigation
    function handleKeyboardNavigation(e) {
        const totalImages = document.querySelectorAll('.thumbnail').length;
        
        switch (e.key) {
            case 'ArrowLeft':
                navigateGallery('prev', totalImages);
                
                // Animate image change
                zoomedImage.classList.remove('active');
                setTimeout(() => {
                    zoomedImage.src = mainImage.src;
                    zoomedImage.alt = mainImage.alt;
                    zoomedImage.classList.add('active');
                    updateImageCounter();
                }, 150);
                break;
                
            case 'ArrowRight':
                navigateGallery('next', totalImages);
                
                // Animate image change
                zoomedImage.classList.remove('active');
                setTimeout(() => {
                    zoomedImage.src = mainImage.src;
                    zoomedImage.alt = mainImage.alt;
                    zoomedImage.classList.add('active');
                    updateImageCounter();
                }, 150);
                break;
                
            case 'Escape':
                closeZoomModal();
                break;
        }
    }
    
    // Update image counter
    function updateImageCounter() {
        const activeThumbnail = document.querySelector('.thumbnail.active');
        if (!activeThumbnail) return;
        
        const currentIndex = parseInt(activeThumbnail.getAttribute('data-index')) + 1;
        const totalImages = document.querySelectorAll('.thumbnail').length;
        
        imageCounter.textContent = `${currentIndex} / ${totalImages}`;
    }
    
    // Add pinch zoom functionality for touch devices
    let initialDistance = 0;
    let currentScale = 1;
    
    zoomedImage.addEventListener('touchstart', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            initialDistance = getDistance(e.touches[0], e.touches[1]);
        }
    }, { passive: false });
    
    zoomedImage.addEventListener('touchmove', function(e) {
        if (e.touches.length === 2) {
            e.preventDefault();
            const currentDistance = getDistance(e.touches[0], e.touches[1]);
            const scaleChange = currentDistance / initialDistance;
            
            // Limit scale between 1 and 3
            const newScale = Math.min(Math.max(currentScale * scaleChange, 1), 3);
            
            zoomedImage.style.transform = `scale(${newScale})`;
            initialDistance = currentDistance;
            currentScale = newScale;
        }
    }, { passive: false });
    
    zoomedImage.addEventListener('touchend', function() {
        // Reset scale gradually when touch ends
        if (currentScale !== 1) {
            zoomedImage.style.transition = 'transform 0.3s ease';
            zoomedImage.style.transform = 'scale(1)';
            setTimeout(() => {
                zoomedImage.style.transition = '';
                currentScale = 1;
            }, 300);
        }
    });
    
    // Helper function to calculate distance between two touch points
    function getDistance(touch1, touch2) {
        const dx = touch1.clientX - touch2.clientX;
        const dy = touch1.clientY - touch2.clientY;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

/**
 * Set up variant selection functionality
 * @param {Object} product - The product object
 */
function setupVariantSelection(product) {
    const variantOptionsContainer = document.querySelector('.variant-options');
    
    // Clear existing variant options
    variantOptionsContainer.innerHTML = '';
    
    // Check if product has variants
    if (product.variants && product.variants.length > 0) {
        // Create a button for each variant
        product.variants.forEach(variant => {
            const variantElement = document.createElement('div');
            variantElement.className = `variant-option ${!variant.inStock ? 'disabled' : ''}`;
            variantElement.setAttribute('data-variant-id', variant.id);
            variantElement.textContent = variant.name;
            
            // Add click event for selecting variant
            if (variant.inStock) {
                variantElement.addEventListener('click', function() {
                    // Remove active class from all variants
                    document.querySelectorAll('.variant-option').forEach(v => v.classList.remove('active'));
                    
                    // Add active class to selected variant
                    this.classList.add('active');
                    
                    // Update product information based on selected variant
                    updateProductForVariant(product, variant);
                });
            }
            
            variantOptionsContainer.appendChild(variantElement);
        });
        
        // Select the first in-stock variant by default
        const firstInStockVariant = product.variants.find(variant => variant.inStock);
        if (firstInStockVariant) {
            const firstVariantElement = document.querySelector(`.variant-option[data-variant-id="${firstInStockVariant.id}"]`);
            if (firstVariantElement) {
                firstVariantElement.classList.add('active');
                updateProductForVariant(product, firstInStockVariant);
            }
        }
    } else {
        // Hide variant selection if no variants are available
        document.querySelector('.variant-selection').style.display = 'none';
    }
}

/**
 * Update product information based on selected variant
 * @param {Object} product - The product object
 * @param {Object} variant - The selected variant object
 */
function updateProductForVariant(product, variant) {
    // Update price
    const currentPriceElement = document.querySelector('.current-price');
    const originalPriceElement = document.querySelector('.original-price');
    const discountBadgeElement = document.querySelector('.discount-badge');
    
    // Set current price (variant sale price or regular price)
    const currentPrice = variant.salePrice || variant.price;
    currentPriceElement.textContent = `$${currentPrice.toFixed(2)}`;
    
    // Show original price and discount badge if there's a sale
    if (variant.salePrice && variant.price > variant.salePrice) {
        originalPriceElement.textContent = `$${variant.price.toFixed(2)}`;
        
        // Calculate discount percentage
        const discountPercentage = Math.round((1 - variant.salePrice / variant.price) * 100);
        discountBadgeElement.textContent = `-${discountPercentage}%`;
    } else {
        originalPriceElement.textContent = '';
        discountBadgeElement.textContent = '';
    }
    
    // Update main image if variant has an image
    if (variant.imageUrl) {
        const mainImageElement = document.getElementById('main-product-image');
        mainImageElement.src = variant.imageUrl;
        
        // Update active thumbnail
        document.querySelectorAll('.thumbnail').forEach(thumb => {
            const thumbImg = thumb.querySelector('img');
            if (thumbImg && thumbImg.src === variant.imageUrl) {
                document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            }
        });
    }
}

/**
 * Handle case where product is not found
 */
function handleProductNotFound() {
    // Update page title
    document.title = 'Product Not Found - Premium Mobile Accessories Shop';
    
    // Display error message
    const productDetailContent = document.querySelector('.product-detail-content');
    productDetailContent.innerHTML = `
        <div class="product-not-found">
            <h1>Product Not Found</h1>
            <p>The product you are looking for does not exist or has been removed.</p>
            <a href="product-listing.html" class="back-to-products-btn">Back to Products</a>
        </div>
    `;
    
    // Hide other sections
    document.querySelector('.product-specifications').style.display = 'none';
    document.querySelector('.product-compatibility').style.display = 'none';
    document.querySelector('.related-products').style.display = 'none';
}
/**
 
* Navigate through product gallery images
 * @param {string} direction - Direction to navigate ('prev' or 'next')
 * @param {number} totalImages - Total number of images in the gallery
 */
function navigateGallery(direction, totalImages) {
    // Find the currently active thumbnail
    const activeThumbnail = document.querySelector('.thumbnail.active');
    if (!activeThumbnail) return;
    
    // Get the current index
    const currentIndex = parseInt(activeThumbnail.getAttribute('data-index'));
    
    // Calculate the new index based on direction
    let newIndex;
    if (direction === 'prev') {
        newIndex = (currentIndex - 1 + totalImages) % totalImages;
    } else {
        newIndex = (currentIndex + 1) % totalImages;
    }
    
    // Find the thumbnail with the new index
    const newThumbnail = document.querySelector(`.thumbnail[data-index="${newIndex}"]`);
    if (newThumbnail) {
        // Trigger a click on the new thumbnail to switch the image
        newThumbnail.click();
        
        // Scroll the thumbnail into view if needed
        newThumbnail.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
}