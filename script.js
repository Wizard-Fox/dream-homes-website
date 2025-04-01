const properties = [
    {
        id: 1,
        title: "Modern Luxury Villa",
        price: 750000,
        bedrooms: 4,
        bathrooms: 3,
        squareFeet: 2800,
        yearBuilt: 2020,
        propertyType: "Single Family",
        location: "123 Luxury Lane, Beverly Hills, CA",
        description: "Stunning modern villa with high-end finishes and panoramic views.",
        images: [
            "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "https://images.unsplash.com/photo-1600596542815-ffad4c3a0f9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        ],
        features: ["Pool", "Smart Home", "Wine Cellar", "Home Theater"]
    },
    {
        id: 2,
        title: "Cozy Downtown Condo",
        price: 450000,
        bedrooms: 2,
        bathrooms: 2,
        squareFeet: 1200,
        yearBuilt: 2018,
        propertyType: "Condo",
        location: "456 Urban Street, Downtown, CA",
        description: "Modern condo in the heart of downtown with amazing city views.",
        images: [
            "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        ],
        features: ["Gym", "Rooftop Garden", "24/7 Security", "Parking"]
    }
];

// Function to create property cards
function createPropertyCard(property) {
    return `
        <div class="property-card">
            <img src="${property.images[0]}" alt="${property.title}">
            <div class="property-info">
                <h3>${property.title}</h3>
                <p class="price">$${property.price.toLocaleString()}</p>
                <p class="location">${property.location}</p>
                <div class="property-details">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms}</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms}</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.squareFeet} sq ft</span>
                </div>
                <button onclick="showPropertyDetails(${property.id})">View Details</button>
            </div>
        </div>
    `;
}

// Function to show property details
function showPropertyDetails(propertyId) {
    const property = properties.find(p => p.id === propertyId);
    if (!property) return;

    const detailsSection = document.querySelector('.property-details');
    detailsSection.innerHTML = `
        <div class="property-info">
            <h2>${property.title}</h2>
            <div class="property-gallery">
                ${property.images.map(img => `<img src="${img}" alt="${property.title}">`).join('')}
            </div>
            <div class="property-description">
                <p>${property.description}</p>
                <p class="price">$${property.price.toLocaleString()}</p>
                <p class="location">${property.location}</p>
            </div>
            <div class="details-grid">
                <div class="detail-item">
                    <i class="fas fa-bed"></i>
                    <span>${property.bedrooms} Bedrooms</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-bath"></i>
                    <span>${property.bathrooms} Bathrooms</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-ruler-combined"></i>
                    <span>${property.squareFeet} Square Feet</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>Built in ${property.yearBuilt}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-home"></i>
                    <span>${property.propertyType}</span>
                </div>
            </div>
            <div class="features">
                <h3>Features</h3>
                <ul>
                    ${property.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
            </div>
        </div>
    `;
}

// Function to filter properties
function filterProperties() {
    const priceMin = document.querySelector('input[placeholder="Min"]').value;
    const priceMax = document.querySelector('input[placeholder="Max"]').value;
    const bedrooms = document.querySelector('select').value;
    const bathrooms = document.querySelectorAll('select')[1].value;
    const squareFeetMin = document.querySelectorAll('input[placeholder="Min"]')[1].value;
    const squareFeetMax = document.querySelectorAll('input[placeholder="Max"]')[1].value;
    const propertyType = document.querySelectorAll('select')[2].value;
    const yearBuiltMin = document.querySelectorAll('input[placeholder="Min"]')[2].value;
    const yearBuiltMax = document.querySelectorAll('input[placeholder="Max"]')[2].value;

    let filteredProperties = properties.filter(property => {
        const priceMatch = (!priceMin || property.price >= priceMin) && 
                          (!priceMax || property.price <= priceMax);
        const bedroomsMatch = !bedrooms || property.bedrooms >= parseInt(bedrooms);
        const bathroomsMatch = !bathrooms || property.bathrooms >= parseInt(bathrooms);
        const squareFeetMatch = (!squareFeetMin || property.squareFeet >= squareFeetMin) && 
                               (!squareFeetMax || property.squareFeet <= squareFeetMax);
        const propertyTypeMatch = !propertyType || property.propertyType === propertyType;
        const yearBuiltMatch = (!yearBuiltMin || property.yearBuilt >= yearBuiltMin) && 
                              (!yearBuiltMax || property.yearBuilt <= yearBuiltMax);

        return priceMatch && bedroomsMatch && bathroomsMatch && squareFeetMatch && 
               propertyTypeMatch && yearBuiltMatch;
    });

    const propertyGrid = document.querySelector('.property-grid');
    propertyGrid.innerHTML = filteredProperties.map(createPropertyCard).join('');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    const propertyGrid = document.querySelector('.property-grid');
    propertyGrid.innerHTML = properties.map(createPropertyCard).join('');

    // Add event listeners to filter inputs
    const filterInputs = document.querySelectorAll('.filter-group input, .filter-group select');
    filterInputs.forEach(input => {
        input.addEventListener('change', filterProperties);
    });

    // Generate QR Code with a specific URL
    const qrcodeElement = document.getElementById('qrcode');
    new QRCode(qrcodeElement, {
        text: "https://www.zillow.com", // Changed to Zillow as an example
        width: 128,
        height: 128,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
}); 
