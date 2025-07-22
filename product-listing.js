/**
 * Product Listing Page JavaScript
 * This file handles the dynamic population and interaction of the product listing page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the product listing page
    initProductListing();
});

/**
 * Initialize the product listing page
 */
function initProductListing() {
    // Populate category tabs
    populateCategoryTabs();
    
    // Add mobile filter toggle functionality
    setupMobileFilters();
    
    // Check for category hash in URL
    checkUrlCategoryHash();
    
    // Render product cards
    renderProductCards();
    
    // Update product count
    updateProductCount();
    
    // Set up event listeners for filter controls
    setupFilterControls();
}

/**
 * Check for category hash in URL and select the appropriate category tab
 */
function checkUrlCategoryHash() {
    // Get the hash from the URL (e.g., #category-audio)
    const hash = window.location.hash;
    
    if (hash && hash.startsWith('#category-')) {
        // Extract the category ID from the hash
        const categoryId = hash.substring(10); // Remove '#category-' prefix
        
        // Find the corresponding category tab
        const categoryTab = document.querySelector(`.category-tab[data-category="${categoryId}"]`);
        
        // If the category tab exists, activate it
        if (categoryTab) {
            // Remove active class from all tabs
            document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to the selected tab
            categoryTab.classList.add('active');
            
            // Apply filters to show only products from this category
            applyFilters();
        }
    }
}

/**
 * Populate category tabs from the categories data
 */
function populateCategoryTabs() {
    const categoryTabs = document.querySelector('.category-tabs');
    
    // Check if categories data is available
    if (typeof categories !== 'undefined') {
        // Add category tabs
        categories.forEach(category => {
            const tab = document.createElement('button');
            tab.className = 'category-tab';
            tab.setAttribute('data-category', category.id);
            tab.textContent = category.name;
            categoryTabs.appendChild(tab);
        });
        
        // Add event listeners to category tabs
        const tabs = document.querySelectorAll('.category-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Filter products by category
                applyFilters();
            });
        });
    }
}

/**
 * Set up mobile filter functionality
 */
function setupMobileFilters() {
    // Create mobile filter toggle button
    const productGridContainer = document.querySelector('.product-grid-container');
    const filterToggleBtn = document.createElement('button');
    filterToggleBtn.className = 'filter-toggle-btn';
    filterToggleBtn.innerHTML = '<span>Filters</span> <span>&#9776;</span>';
    
    // Create filter overlay
    const filterOverlay = document.createElement('div');
    filterOverlay.className = 'filter-overlay';
    
    // Create close button for mobile filter
    const filterControls = document.querySelector('.filter-controls');
    const closeBtn = document.createElement('button');
    closeBtn.className = 'filter-close-btn';
    closeBtn.innerHTML = '&times;';
    filterControls.prepend(closeBtn);
    
    // Insert elements into the DOM
    productGridContainer.prepend(filterToggleBtn);
    document.body.appendChild(filterOverlay);
    
    // Add event listeners
    filterToggleBtn.addEventListener('click', function() {
        filterControls.classList.add('active');
        filterOverlay.classList.add('active');
    });
    
    closeBtn.addEventListener('click', function() {
        filterControls.classList.remove('active');
        filterOverlay.classList.remove('active');
    });
    
    filterOverlay.addEventListener('click', function() {
        filterControls.classList.remove('active');
        filterOverlay.classList.remove('active');
    });
}

/**
 * Render product cards in the product grid
 */
function renderProductCards(filteredProducts = null) {
    const productGrid = document.querySelector('.product-grid');
    
    // Clear existing product cards
    productGrid.innerHTML = '';
    
    // Use filtered products if provided, otherwise use all products
    const productsToRender = filteredProducts || (typeof products !== 'undefined' ? products : []);
    
    // Check if there are products to render
    if (productsToRender.length === 0) {
        document.querySelector('.no-results').style.display = 'block';
        return;
    }
    
    document.querySelector('.no-results').style.display = 'none';
    
    // Render each product card
    productsToRender.forEach(product => {
        // Find the primary image
        const primaryImage = product.images.find(img => img.isPrimary) || product.images[0];
        
        // Find the category name
        const category = categories.find(cat => cat.id === product.category);
        const categoryName = category ? category.name : '';
        
        // Calculate discount percentage if there's a sale price
        let discountPercentage = null;
        if (product.salePrice && product.price > product.salePrice) {
            discountPercentage = Math.round((1 - product.salePrice / product.price) * 100);
        }
        
        // Check if any variant is in stock
        const hasInStockVariant = product.variants.some(variant => variant.inStock);
        
        // Create product card HTML
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.setAttribute('data-product-id', product.id);
        productCard.setAttribute('data-category', product.category);
        productCard.setAttribute('data-subcategory', product.subcategory);
        
        // Build the HTML content
        let cardHTML = `
            <div class="product-card-image">
                <img src="${primaryImage.url}" alt="${primaryImage.alt}">
                ${discountPercentage ? `<span class="product-card-badge">-${discountPercentage}%</span>` : ''}
            </div>
            <div class="product-card-content">
                <div class="product-card-category">${categoryName}</div>
                <h3 class="product-card-title">${product.name}</h3>
                <p class="product-card-description">${product.shortDescription}</p>
                <div class="product-card-price">
                    <span class="current-price">$${product.salePrice || product.price}</span>
                    ${product.salePrice ? `<span class="original-price">$${product.price}</span>` : ''}
                </div>
                <div class="stock-status ${hasInStockVariant ? 'in-stock' : 'out-of-stock'}">
                    <span class="stock-status-dot"></span>
                    <span>${hasInStockVariant ? 'In Stock' : 'Out of Stock'}</span>
                </div>
                <div class="product-card-footer">
                    <button class="product-card-button ${!hasInStockVariant ? 'out-of-stock' : ''}" ${!hasInStockVariant ? 'disabled' : ''}>
                        ${hasInStockVariant ? 'View Details' : 'Out of Stock'}
                    </button>
                </div>
            </div>
        `;
        
        productCard.innerHTML = cardHTML;
        
        // Add click event to the product card
        productCard.addEventListener('click', function() {
            // This will be implemented in task 4.1
            console.log('Product clicked:', product.id);
            // For now, just log the product ID
        });
        
        // Add the product card to the grid
        productGrid.appendChild(productCard);
    });
}

/**
 * Update the product count display
 */
function updateProductCount(filteredProducts = null) {
    const productCountElement = document.getElementById('product-count-number');
    
    // Use filtered products count if provided, otherwise use all products count
    if (filteredProducts) {
        productCountElement.textContent = filteredProducts.length;
    } else if (typeof products !== 'undefined') {
        productCountElement.textContent = products.length;
    } else {
        productCountElement.textContent = 0;
    }
}

/**
 * Set up event listeners for filter controls
 */
function setupFilterControls() {
    // Price range inputs
    const priceMinRange = document.getElementById('price-min');
    const priceMaxRange = document.getElementById('price-max');
    const priceMinInput = document.getElementById('price-min-input');
    const priceMaxInput = document.getElementById('price-max-input');
    
    // Set initial price range based on products
    if (typeof products !== 'undefined' && products.length > 0) {
        // Find min and max prices
        let minPrice = Number.MAX_VALUE;
        let maxPrice = 0;
        
        products.forEach(product => {
            const price = product.salePrice || product.price;
            if (price < minPrice) minPrice = price;
            if (price > maxPrice) maxPrice = price;
        });
        
        // Round to nearest whole numbers
        minPrice = Math.floor(minPrice);
        maxPrice = Math.ceil(maxPrice);
        
        // Set range inputs
        priceMinRange.min = minPrice;
        priceMinRange.max = maxPrice;
        priceMinRange.value = minPrice;
        
        priceMaxRange.min = minPrice;
        priceMaxRange.max = maxPrice;
        priceMaxRange.value = maxPrice;
        
        // Set number inputs
        priceMinInput.min = minPrice;
        priceMinInput.max = maxPrice;
        priceMinInput.value = minPrice;
        
        priceMaxInput.min = minPrice;
        priceMaxInput.max = maxPrice;
        priceMaxInput.value = maxPrice;
    }
    
    // Sync range and number inputs
    priceMinRange.addEventListener('input', function() {
        priceMinInput.value = this.value;
    });
    
    priceMaxRange.addEventListener('input', function() {
        priceMaxInput.value = this.value;
    });
    
    priceMinInput.addEventListener('input', function() {
        priceMinRange.value = this.value;
    });
    
    priceMaxInput.addEventListener('input', function() {
        priceMaxRange.value = this.value;
    });
    
    // Populate brand checkboxes
    populateBrandFilters();
    
    // Populate compatibility checkboxes
    populateCompatibilityFilters();
    
    // Apply filters button
    const applyFiltersBtn = document.querySelector('.filter-apply-btn');
    applyFiltersBtn.addEventListener('click', applyFilters);
    
    // Reset filters button
    const resetFiltersBtn = document.querySelector('.filter-reset-btn');
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Reset filters button in no results section
    const noResultsResetBtn = document.querySelector('.no-results .reset-filters-btn');
    noResultsResetBtn.addEventListener('click', resetFilters);
    
    // Sort select
    const sortSelect = document.getElementById('sort-select');
    sortSelect.addEventListener('change', function() {
        applyFilters();
    });
}

/**
 * Populate brand filter checkboxes
 */
function populateBrandFilters() {
    const brandCheckboxGroup = document.querySelector('.filter-group:nth-of-type(2) .checkbox-group');
    
    // Clear existing checkboxes except "All Brands"
    const allBrandsCheckbox = brandCheckboxGroup.querySelector('#brand-all').parentElement;
    brandCheckboxGroup.innerHTML = '';
    brandCheckboxGroup.appendChild(allBrandsCheckbox);
    
    // Get unique brands from product compatibility
    if (typeof products !== 'undefined' && products.length > 0) {
        const brands = new Set();
        
        products.forEach(product => {
            if (product.compatibility && product.compatibility.length > 0) {
                product.compatibility.forEach(compat => {
                    brands.add(compat.brand);
                });
            }
        });
        
        // Add brand checkboxes
        brands.forEach(brand => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            
            const id = `brand-${brand.toLowerCase().replace(/\s+/g, '-')}`;
            
            checkboxItem.innerHTML = `
                <input type="checkbox" id="${id}" name="brand" value="${brand}">
                <label for="${id}">${brand}</label>
            `;
            
            brandCheckboxGroup.appendChild(checkboxItem);
        });
    }
    
    // Add event listener to "All Brands" checkbox
    const allBrandsCheck = document.getElementById('brand-all');
    allBrandsCheck.addEventListener('change', function() {
        const brandCheckboxes = brandCheckboxGroup.querySelectorAll('input[name="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = this.checked;
        });
    });
}

/**
 * Populate compatibility filter checkboxes
 */
function populateCompatibilityFilters() {
    const compatibilityCheckboxGroup = document.querySelector('.filter-group:nth-of-type(3) .checkbox-group');
    
    // Clear existing checkboxes except "All Devices"
    const allDevicesCheckbox = compatibilityCheckboxGroup.querySelector('#compatibility-all').parentElement;
    compatibilityCheckboxGroup.innerHTML = '';
    compatibilityCheckboxGroup.appendChild(allDevicesCheckbox);
    
    // Get unique device models from product compatibility
    if (typeof products !== 'undefined' && products.length > 0) {
        const devices = new Set();
        
        products.forEach(product => {
            if (product.compatibility && product.compatibility.length > 0) {
                product.compatibility.forEach(compat => {
                    compat.models.forEach(model => {
                        devices.add(model);
                    });
                });
            }
        });
        
        // Add device checkboxes
        devices.forEach(device => {
            const checkboxItem = document.createElement('div');
            checkboxItem.className = 'checkbox-item';
            
            const id = `device-${device.toLowerCase().replace(/\s+/g, '-')}`;
            
            checkboxItem.innerHTML = `
                <input type="checkbox" id="${id}" name="compatibility" value="${device}">
                <label for="${id}">${device}</label>
            `;
            
            compatibilityCheckboxGroup.appendChild(checkboxItem);
        });
    }
    
    // Add event listener to "All Devices" checkbox
    const allDevicesCheck = document.getElementById('compatibility-all');
    allDevicesCheck.addEventListener('change', function() {
        const deviceCheckboxes = compatibilityCheckboxGroup.querySelectorAll('input[name="compatibility"]');
        deviceCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
            checkbox.disabled = this.checked;
        });
    });
}

/**
 * Apply filters to products
 */
function applyFilters() {
    // Get filter values
    const selectedCategory = document.querySelector('.category-tab.active').getAttribute('data-category');
    
    const minPrice = parseFloat(document.getElementById('price-min-input').value);
    const maxPrice = parseFloat(document.getElementById('price-max-input').value);
    
    const allBrandsSelected = document.getElementById('brand-all').checked;
    const selectedBrands = allBrandsSelected ? [] : 
        Array.from(document.querySelectorAll('input[name="brand"]:checked'))
            .map(checkbox => checkbox.value);
    
    const allDevicesSelected = document.getElementById('compatibility-all').checked;
    const selectedDevices = allDevicesSelected ? [] :
        Array.from(document.querySelectorAll('input[name="compatibility"]:checked'))
            .map(checkbox => checkbox.value);
    
    const sortBy = document.getElementById('sort-select').value;
    
    // Filter products
    let filteredProducts = [];
    
    if (typeof products !== 'undefined') {
        filteredProducts = products.filter(product => {
            // Filter by category
            if (selectedCategory !== 'all' && product.category !== selectedCategory) {
                return false;
            }
            
            // Filter by price
            const price = product.salePrice || product.price;
            if (price < minPrice || price > maxPrice) {
                return false;
            }
            
            // Filter by brand
            if (!allBrandsSelected && selectedBrands.length > 0) {
                const productBrands = product.compatibility ? 
                    product.compatibility.map(compat => compat.brand) : [];
                
                if (!selectedBrands.some(brand => productBrands.includes(brand))) {
                    return false;
                }
            }
            
            // Filter by device compatibility
            if (!allDevicesSelected && selectedDevices.length > 0) {
                const productDevices = [];
                if (product.compatibility) {
                    product.compatibility.forEach(compat => {
                        productDevices.push(...compat.models);
                    });
                }
                
                if (!selectedDevices.some(device => productDevices.includes(device))) {
                    return false;
                }
            }
            
            return true;
        });
        
        // Sort products
        filteredProducts.sort((a, b) => {
            const priceA = a.salePrice || a.price;
            const priceB = b.salePrice || b.price;
            
            switch (sortBy) {
                case 'price-low':
                    return priceA - priceB;
                case 'price-high':
                    return priceB - priceA;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'featured':
                default:
                    // For featured, we'll just use the original order
                    return 0;
            }
        });
    }
    
    // Update product display
    renderProductCards(filteredProducts);
    updateProductCount(filteredProducts);
    
    // Close mobile filters if open
    const filterControls = document.querySelector('.filter-controls');
    const filterOverlay = document.querySelector('.filter-overlay');
    if (filterControls.classList.contains('active')) {
        filterControls.classList.remove('active');
        filterOverlay.classList.remove('active');
    }
}

/**
 * Reset all filters to default values
 */
function resetFilters() {
    // Reset category tabs
    const allCategoryTab = document.querySelector('.category-tab[data-category="all"]');
    if (allCategoryTab) {
        document.querySelectorAll('.category-tab').forEach(tab => tab.classList.remove('active'));
        allCategoryTab.classList.add('active');
    }
    
    // Reset price range
    if (typeof products !== 'undefined' && products.length > 0) {
        // Find min and max prices
        let minPrice = Number.MAX_VALUE;
        let maxPrice = 0;
        
        products.forEach(product => {
            const price = product.salePrice || product.price;
            if (price < minPrice) minPrice = price;
            if (price > maxPrice) maxPrice = price;
        });
        
        // Round to nearest whole numbers
        minPrice = Math.floor(minPrice);
        maxPrice = Math.ceil(maxPrice);
        
        // Set range inputs
        document.getElementById('price-min').value = minPrice;
        document.getElementById('price-max').value = maxPrice;
        
        // Set number inputs
        document.getElementById('price-min-input').value = minPrice;
        document.getElementById('price-max-input').value = maxPrice;
    }
    
    // Reset brand checkboxes
    document.getElementById('brand-all').checked = true;
    document.querySelectorAll('input[name="brand"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = true;
    });
    
    // Reset compatibility checkboxes
    document.getElementById('compatibility-all').checked = true;
    document.querySelectorAll('input[name="compatibility"]').forEach(checkbox => {
        checkbox.checked = false;
        checkbox.disabled = true;
    });
    
    // Reset sort select
    document.getElementById('sort-select').value = 'featured';
    
    // Apply reset filters
    applyFilters();
}