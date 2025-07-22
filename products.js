/**
 * Premium Mobile Accessories Shop - Product Data
 * 
 * This file contains the data structure for products and categories
 * as defined in the design document.
 */

/**
 * Categories data structure
 * Contains information about product categories and subcategories
 */
const categories = [
  {
    id: "cases",
    name: "Phone Cases",
    slug: "phone-cases",
    description: "Protective and stylish cases for your smartphone",
    image: "images/categories/phone-cases.jpg",
    subcategories: [
      {
        id: "rugged-cases",
        name: "Rugged Cases",
        slug: "rugged-cases"
      },
      {
        id: "slim-cases",
        name: "Slim Cases",
        slug: "slim-cases"
      },
      {
        id: "wallet-cases",
        name: "Wallet Cases",
        slug: "wallet-cases"
      }
    ]
  },
  {
    id: "chargers",
    name: "Chargers",
    slug: "chargers",
    description: "Fast and reliable charging solutions for all your devices",
    image: "images/categories/chargers.jpg",
    subcategories: [
      {
        id: "wireless-chargers",
        name: "Wireless Chargers",
        slug: "wireless-chargers"
      },
      {
        id: "wall-chargers",
        name: "Wall Chargers",
        slug: "wall-chargers"
      },
      {
        id: "car-chargers",
        name: "Car Chargers",
        slug: "car-chargers"
      }
    ]
  },
  {
    id: "audio",
    name: "Audio Accessories",
    slug: "audio-accessories",
    description: "Enhance your audio experience with premium headphones and speakers",
    image: "images/categories/audio.jpg",
    subcategories: [
      {
        id: "wireless-earbuds",
        name: "Wireless Earbuds",
        slug: "wireless-earbuds"
      },
      {
        id: "headphones",
        name: "Headphones",
        slug: "headphones"
      },
      {
        id: "bluetooth-speakers",
        name: "Bluetooth Speakers",
        slug: "bluetooth-speakers"
      }
    ]
  },
  {
    id: "screen-protection",
    name: "Screen Protection",
    slug: "screen-protection",
    description: "Keep your device screen safe from scratches and impacts",
    image: "images/categories/screen-protection.jpg",
    subcategories: [
      {
        id: "tempered-glass",
        name: "Tempered Glass",
        slug: "tempered-glass"
      },
      {
        id: "privacy-screens",
        name: "Privacy Screens",
        slug: "privacy-screens"
      }
    ]
  }
];

/**
 * Products data structure
 * Contains detailed information about each product according to the design document
 */
const products = [
  // Phone Cases
  {
    id: "rugged-armor-case-iphone13",
    name: "Rugged Armor Case for iPhone 13",
    slug: "rugged-armor-case-iphone13",
    category: "cases",
    subcategory: "rugged-cases",
    price: 29.99,
    salePrice: 24.99,
    description: "The Rugged Armor Case provides military-grade drop protection while maintaining a slim profile. Featuring air-cushion technology in all corners and a spider-web pattern interior for shock absorption, this case offers premium protection without adding bulk. The carbon fiber design accents give it a sophisticated, modern look.",
    shortDescription: "Military-grade protection with carbon fiber accents",
    images: [
      {
        url: "images/products/rugged-armor-iphone13-black.jpg",
        alt: "Black Rugged Armor Case for iPhone 13",
        isPrimary: true
      },
      {
        url: "images/products/rugged-armor-iphone13-detail1.jpg",
        alt: "Close-up of carbon fiber detail",
        isPrimary: false
      },
      {
        url: "images/products/rugged-armor-iphone13-detail2.jpg",
        alt: "Side view showing button covers",
        isPrimary: false
      }
    ],
    specifications: [
      {
        group: "Physical",
        specs: [
          { name: "Dimensions", value: "146.7 x 71.5 x 10.4 mm" },
          { name: "Weight", value: "45g" },
          { name: "Materials", value: "TPU, Polycarbonate" }
        ]
      },
      {
        group: "Features",
        specs: [
          { name: "Drop Protection", value: "Military-grade (MIL-STD 810G-516.6)" },
          { name: "Wireless Charging", value: "Compatible" },
          { name: "Screen Protection", value: "Raised edges (1.2mm)" }
        ]
      }
    ],
    compatibility: [
      {
        brand: "Apple",
        models: ["iPhone 13", "iPhone 13 Pro"]
      }
    ],
    variants: [
      {
        id: "rugged-armor-iphone13-black",
        name: "Black",
        price: 29.99,
        salePrice: 24.99,
        imageUrl: "images/products/rugged-armor-iphone13-black.jpg",
        inStock: true,
        options: [
          { name: "Color", value: "Black" }
        ]
      },
      {
        id: "rugged-armor-iphone13-navy",
        name: "Navy Blue",
        price: 29.99,
        salePrice: 24.99,
        imageUrl: "images/products/rugged-armor-iphone13-navy.jpg",
        inStock: true,
        options: [
          { name: "Color", value: "Navy Blue" }
        ]
      },
      {
        id: "rugged-armor-iphone13-red",
        name: "Red",
        price: 29.99,
        salePrice: 24.99,
        imageUrl: "images/products/rugged-armor-iphone13-red.jpg",
        inStock: false,
        options: [
          { name: "Color", value: "Red" }
        ]
      }
    ],
    relatedProducts: ["slim-case-iphone13", "tempered-glass-iphone13", "magsafe-charger"],
    tags: ["rugged", "protective", "iphone13", "case"]
  },
  
  {
    id: "slim-case-iphone13",
    name: "Ultra Slim Case for iPhone 13",
    slug: "slim-case-iphone13",
    category: "cases",
    subcategory: "slim-cases",
    price: 19.99,
    salePrice: null,
    description: "The Ultra Slim Case offers sleek protection without adding bulk to your iPhone 13. At just 0.5mm thick, this case preserves the original look and feel of your device while providing scratch protection and improved grip. The precision cutouts ensure easy access to all ports and buttons.",
    shortDescription: "Sleek, minimalist protection for your iPhone",
    images: [
      {
        url: "images/products/slim-case-iphone13-clear.jpg",
        alt: "Clear Ultra Slim Case for iPhone 13",
        isPrimary: true
      },
      {
        url: "images/products/slim-case-iphone13-detail1.jpg",
        alt: "Profile view showing slim design",
        isPrimary: false
      }
    ],
    specifications: [
      {
        group: "Physical",
        specs: [
          { name: "Dimensions", value: "146.7 x 71.5 x 7.9 mm" },
          { name: "Weight", value: "15g" },
          { name: "Materials", value: "Polycarbonate" }
        ]
      },
      {
        group: "Features",
        specs: [
          { name: "Thickness", value: "0.5mm" },
          { name: "Wireless Charging", value: "Compatible" },
          { name: "Finish", value: "Anti-yellowing coating" }
        ]
      }
    ],
    compatibility: [
      {
        brand: "Apple",
        models: ["iPhone 13", "iPhone 13 Pro"]
      }
    ],
    variants: [
      {
        id: "slim-case-iphone13-clear",
        name: "Clear",
        price: 19.99,
        imageUrl: "images/products/slim-case-iphone13-clear.jpg",
        inStock: true
      },
      {
        id: "slim-case-iphone13-black",
        name: "Matte Black",
        price: 19.99,
        imageUrl: "images/products/slim-case-iphone13-black.jpg",
        inStock: true
      }
    ],
    relatedProducts: ["rugged-armor-case-iphone13", "tempered-glass-iphone13", "magsafe-charger"],
    tags: ["slim", "lightweight", "iphone13", "case"]
  },
  
  // Chargers
  {
    id: "magsafe-charger",
    name: "MagSafe Wireless Charger",
    slug: "magsafe-wireless-charger",
    category: "chargers",
    subcategory: "wireless-chargers",
    price: 39.99,
    salePrice: null,
    description: "Experience the convenience of magnetic wireless charging with our MagSafe-compatible charger. Delivering up to 15W of power, this charger automatically aligns with your device for optimal charging efficiency. The sleek, minimalist design features a non-slip surface and a braided cable for durability.",
    shortDescription: "Fast 15W magnetic wireless charging",
    images: [
      {
        url: "images/products/magsafe-charger-main.jpg",
        alt: "MagSafe Wireless Charger",
        isPrimary: true
      },
      {
        url: "images/products/magsafe-charger-detail1.jpg",
        alt: "Charger with iPhone attached",
        isPrimary: false
      },
      {
        url: "images/products/magsafe-charger-detail2.jpg",
        alt: "Close-up of magnetic connection",
        isPrimary: false
      }
    ],
    specifications: [
      {
        group: "Technical",
        specs: [
          { name: "Output Power", value: "Up to 15W" },
          { name: "Input", value: "USB-C PD 3.0" },
          { name: "Cable Length", value: "1.5m" }
        ]
      },
      {
        group: "Physical",
        specs: [
          { name: "Dimensions", value: "58mm diameter x 6mm height" },
          { name: "Weight", value: "45g" },
          { name: "Materials", value: "Aluminum, Silicone" }
        ]
      }
    ],
    compatibility: [
      {
        brand: "Apple",
        models: ["iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini", "iPhone 12 Series"]
      }
    ],
    variants: [
      {
        id: "magsafe-charger-white",
        name: "White",
        price: 39.99,
        imageUrl: "images/products/magsafe-charger-white.jpg",
        inStock: true
      },
      {
        id: "magsafe-charger-black",
        name: "Black",
        price: 39.99,
        imageUrl: "images/products/magsafe-charger-black.jpg",
        inStock: true
      }
    ],
    relatedProducts: ["wall-charger-30w", "car-charger-dual", "rugged-armor-case-iphone13"],
    tags: ["wireless", "charging", "magsafe", "magnetic"]
  },
  
  // Screen Protection
  {
    id: "tempered-glass-iphone13",
    name: "Premium Tempered Glass Screen Protector for iPhone 13",
    slug: "tempered-glass-screen-protector-iphone13",
    category: "screen-protection",
    subcategory: "tempered-glass",
    price: 14.99,
    salePrice: 11.99,
    description: "Protect your iPhone 13 screen with our premium tempered glass screen protector. Featuring 9H hardness for superior scratch resistance and an oleophobic coating to reduce fingerprints, this screen protector offers crystal-clear transparency and maintains the original touch sensitivity of your device. The installation kit includes an alignment frame for bubble-free application.",
    shortDescription: "9H hardness with oleophobic coating for iPhone 13",
    images: [
      {
        url: "images/products/tempered-glass-iphone13-main.jpg",
        alt: "Tempered Glass Screen Protector for iPhone 13",
        isPrimary: true
      },
      {
        url: "images/products/tempered-glass-iphone13-detail1.jpg",
        alt: "Edge-to-edge coverage demonstration",
        isPrimary: false
      },
      {
        url: "images/products/tempered-glass-iphone13-detail2.jpg",
        alt: "Installation kit contents",
        isPrimary: false
      }
    ],
    specifications: [
      {
        group: "Physical",
        specs: [
          { name: "Thickness", value: "0.33mm" },
          { name: "Hardness", value: "9H" },
          { name: "Edge", value: "2.5D rounded edge" }
        ]
      },
      {
        group: "Features",
        specs: [
          { name: "Oleophobic Coating", value: "Yes" },
          { name: "Installation", value: "Includes alignment frame" },
          { name: "Pack Contents", value: "2 screen protectors, installation kit" }
        ]
      }
    ],
    compatibility: [
      {
        brand: "Apple",
        models: ["iPhone 13", "iPhone 13 Pro"]
      }
    ],
    variants: [
      {
        id: "tempered-glass-iphone13-standard",
        name: "Standard",
        price: 14.99,
        salePrice: 11.99,
        imageUrl: "images/products/tempered-glass-iphone13-standard.jpg",
        inStock: true
      },
      {
        id: "tempered-glass-iphone13-privacy",
        name: "Privacy Filter",
        price: 19.99,
        salePrice: 16.99,
        imageUrl: "images/products/tempered-glass-iphone13-privacy.jpg",
        inStock: true
      }
    ],
    relatedProducts: ["rugged-armor-case-iphone13", "slim-case-iphone13", "screen-cleaning-kit"],
    tags: ["screen protector", "tempered glass", "iphone13", "protection"]
  },
  
  // Audio
  {
    id: "wireless-earbuds-pro",
    name: "SoundPro Wireless Earbuds",
    slug: "soundpro-wireless-earbuds",
    category: "audio",
    subcategory: "wireless-earbuds",
    price: 89.99,
    salePrice: 79.99,
    description: "Experience premium sound quality with our SoundPro Wireless Earbuds. Featuring active noise cancellation, transparency mode, and up to 8 hours of battery life (24 hours with the charging case), these earbuds deliver an immersive audio experience. The ergonomic design ensures a comfortable fit, while IPX5 water resistance makes them perfect for workouts.",
    shortDescription: "Active noise cancellation with 8-hour battery life",
    images: [
      {
        url: "images/products/wireless-earbuds-pro-main.jpg",
        alt: "SoundPro Wireless Earbuds",
        isPrimary: true
      },
      {
        url: "images/products/wireless-earbuds-pro-detail1.jpg",
        alt: "Earbuds with charging case",
        isPrimary: false
      },
      {
        url: "images/products/wireless-earbuds-pro-detail2.jpg",
        alt: "Earbud fit demonstration",
        isPrimary: false
      }
    ],
    specifications: [
      {
        group: "Audio",
        specs: [
          { name: "Driver Size", value: "10mm dynamic drivers" },
          { name: "Frequency Response", value: "20Hz - 20kHz" },
          { name: "Noise Cancellation", value: "Active, up to 25dB reduction" }
        ]
      },
      {
        group: "Battery",
        specs: [
          { name: "Earbud Battery Life", value: "8 hours (ANC off), 6 hours (ANC on)" },
          { name: "Case Battery Life", value: "Additional 16 hours" },
          { name: "Charging", value: "USB-C, Wireless Qi compatible" }
        ]
      },
      {
        group: "Connectivity",
        specs: [
          { name: "Bluetooth Version", value: "5.2" },
          { name: "Codec Support", value: "SBC, AAC, aptX" },
          { name: "Range", value: "Up to 10m (33ft)" }
        ]
      },
      {
        group: "Physical",
        specs: [
          { name: "Water Resistance", value: "IPX5" },
          { name: "Earbud Weight", value: "5.6g each" },
          { name: "Case Weight", value: "45g" }
        ]
      }
    ],
    compatibility: [
      {
        brand: "Apple",
        models: ["iPhone 13 Series", "iPhone 12 Series", "iPhone 11 Series", "iPad Pro", "iPad Air", "iPad", "MacBook Pro", "MacBook Air", "iMac"]
      },
      {
        brand: "Samsung",
        models: ["Galaxy S22 Series", "Galaxy S21 Series", "Galaxy Note 20 Series", "Galaxy Tab S8 Series", "Galaxy Book"]
      },
      {
        brand: "Other",
        models: ["All Bluetooth 5.0+ devices"]
      }
    ],
    variants: [
      {
        id: "wireless-earbuds-pro-black",
        name: "Black",
        price: 89.99,
        salePrice: 79.99,
        imageUrl: "images/products/wireless-earbuds-pro-black.jpg",
        inStock: true
      },
      {
        id: "wireless-earbuds-pro-white",
        name: "White",
        price: 89.99,
        salePrice: 79.99,
        imageUrl: "images/products/wireless-earbuds-pro-white.jpg",
        inStock: true
      },
      {
        id: "wireless-earbuds-pro-blue",
        name: "Navy Blue",
        price: 89.99,
        salePrice: 79.99,
        imageUrl: "images/products/wireless-earbuds-pro-blue.jpg",
        inStock: false
      }
    ],
    relatedProducts: ["over-ear-headphones", "bluetooth-speaker-mini", "wireless-charger-stand"],
    tags: ["wireless", "earbuds", "audio", "noise cancellation", "bluetooth"]
  }
];

/**
 * Export the data structures for use in other files
 */
// For ES modules
export { products, categories };

// For CommonJS or direct browser use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { products, categories };
}

// Make available globally for direct script inclusion
if (typeof window !== 'undefined') {
  window.productData = { products, categories };
}