/**
 * Global State Management for Booking.com Clone
 * Manages user preferences across all pages with enhanced flight classification
 */

class GlobalState {
    constructor() {
        this.state = {
            currency: 'ZAR',
            currencySymbol: 'R',
            language: 'en',
            tripType: 'round-trip', // round-trip, one-way, multi-city
            flightClass: 'economy',
            searchData: null,
            selectedFlight: null,
            bookingData: null,
            flightClassification: null, // Enhanced flight type classification
            userPreferences: {
                contactNumber: '+1 (888) 850-3958'
            },
            recentSearches: this.loadRecentSearches()
        };
        
        // Load comprehensive airport database
        this.airportData = this.loadAirportDatabase();
        
        this.init();
    }

    // Load comprehensive airport database
    loadAirportDatabase() {
        // Use the comprehensive database if available, otherwise fallback to basic data
        if (typeof window !== 'undefined' && window.AIRPORTS_DATABASE) {
            return window.AIRPORTS_DATABASE;
        }
        
        // Fallback basic airport data
        return this.initializeBasicAirportData();
    }

    // Initialize basic airport data as fallback
    initializeBasicAirportData() {
        return {
            // South African airports
            'JNB': { 
                iata: 'JNB', 
                city: 'Johannesburg', 
                country: 'ZA', 
                countryName: 'South Africa',
                domestic: true 
            },
            'CPT': { 
                iata: 'CPT', 
                city: 'Cape Town', 
                country: 'ZA', 
                countryName: 'South Africa',
                domestic: true 
            },
            'DUR': { 
                iata: 'DUR', 
                city: 'Durban', 
                country: 'ZA', 
                countryName: 'South Africa',
                domestic: true 
            },
            // International airports
            'LHR': { 
                iata: 'LHR', 
                city: 'London', 
                country: 'GB', 
                countryName: 'United Kingdom',
                domestic: false 
            },
            'JFK': { 
                iata: 'JFK', 
                city: 'New York', 
                country: 'US', 
                countryName: 'United States',
                domestic: false 
            },
            'LAX': { 
                iata: 'LAX', 
                city: 'Los Angeles', 
                country: 'US', 
                countryName: 'United States',
                domestic: false 
            },
            'CDG': { 
                iata: 'CDG', 
                city: 'Paris', 
                country: 'FR', 
                countryName: 'France',
                domestic: false 
            },
            'DXB': { 
                iata: 'DXB', 
                city: 'Dubai', 
                country: 'AE', 
                countryName: 'United Arab Emirates',
                domestic: false 
            }
        };
    }

    // Load recent searches from localStorage
    loadRecentSearches() {
        try {
            const saved = localStorage.getItem('recentSearches');
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.warn('Failed to load recent searches:', error);
            return [];
        }
    }

    // Save recent searches to localStorage
    saveRecentSearches() {
        try {
            localStorage.setItem('recentSearches', JSON.stringify(this.state.recentSearches));
        } catch (error) {
            console.warn('Failed to save recent searches:', error);
        }
    }

    // Add to recent searches
    addToRecentSearches(fromCode, toCode) {
        const searchItem = {
            from: fromCode,
            to: toCode,
            fromCity: this.airportData[fromCode]?.city || fromCode,
            toCity: this.airportData[toCode]?.city || toCode,
            timestamp: Date.now()
        };

        // Remove if already exists
        this.state.recentSearches = this.state.recentSearches.filter(
            item => !(item.from === fromCode && item.to === toCode)
        );

        // Add to beginning
        this.state.recentSearches.unshift(searchItem);

        // Keep only last 10 searches
        this.state.recentSearches = this.state.recentSearches.slice(0, 10);

        this.saveRecentSearches();
    }

    init() {
        // Load state from localStorage
        this.loadState();
        
        // Set up event listeners for state changes
        this.setupEventListeners();
        
        // Apply current state to page
        this.applyStateToPage();
    }

    // Load state from localStorage
    loadState() {
        try {
            const savedCurrency = localStorage.getItem('selectedCurrency');
            const savedCurrencySymbol = localStorage.getItem('currencySymbol');
            const savedTripType = localStorage.getItem('tripType');
            const savedFlightClass = localStorage.getItem('flightClass');
            const savedSearchData = localStorage.getItem('searchData');
            const savedSelectedFlight = localStorage.getItem('selectedFlight');
            const savedBookingData = localStorage.getItem('bookingData');
            const savedFlightClassification = localStorage.getItem('flightClassification');

            if (savedCurrency) this.state.currency = savedCurrency;
            if (savedCurrencySymbol) this.state.currencySymbol = savedCurrencySymbol;
            if (savedTripType) this.state.tripType = savedTripType;
            if (savedFlightClass) this.state.flightClass = savedFlightClass;
            if (savedSearchData) this.state.searchData = JSON.parse(savedSearchData);
            if (savedSelectedFlight) this.state.selectedFlight = JSON.parse(savedSelectedFlight);
            if (savedBookingData) this.state.bookingData = JSON.parse(savedBookingData);
            if (savedFlightClassification) this.state.flightClassification = JSON.parse(savedFlightClassification);
        } catch (error) {
            console.warn('Failed to load state from localStorage:', error);
        }
    }

    // Save state to localStorage
    saveState() {
        try {
            localStorage.setItem('selectedCurrency', this.state.currency);
            localStorage.setItem('currencySymbol', this.state.currencySymbol);
            localStorage.setItem('tripType', this.state.tripType);
            localStorage.setItem('flightClass', this.state.flightClass);
            if (this.state.searchData) {
                localStorage.setItem('searchData', JSON.stringify(this.state.searchData));
            }
            if (this.state.selectedFlight) {
                localStorage.setItem('selectedFlight', JSON.stringify(this.state.selectedFlight));
            }
            if (this.state.bookingData) {
                localStorage.setItem('bookingData', JSON.stringify(this.state.bookingData));
            }
            if (this.state.flightClassification) {
                localStorage.setItem('flightClassification', JSON.stringify(this.state.flightClassification));
            }
        } catch (error) {
            console.warn('Failed to save state to localStorage:', error);
        }
    }

    // Enhanced flight classification with comprehensive data
    classifyFlight(fromAirport, toAirport, tripType = null) {
        const fromData = this.airportData[fromAirport];
        const toData = this.airportData[toAirport];
        
        if (!fromData || !toData) {
            console.warn('Airport data not found for:', fromAirport, toAirport);
            return null;
        }

        const isDomestic = fromData.country === toData.country && fromData.country === 'ZA';
        const currentTripType = tripType || this.state.tripType;

        const classification = {
            type: currentTripType,
            isDomestic: isDomestic,
            category: this.getFlightCategory(currentTripType, isDomestic),
            description: this.getFlightDescription(currentTripType, isDomestic, fromData.city, toData.city),
            pricing: this.getFlightPricing(currentTripType, isDomestic),
            policies: this.getFlightPolicies(currentTripType, isDomestic),
            requirements: this.getFlightRequirements(isDomestic, fromData.country, toData.country),
            route: {
                from: {
                    code: fromAirport,
                    city: fromData.city,
                    country: fromData.countryName || fromData.country,
                    timezone: fromData.timezone
                },
                to: {
                    code: toAirport,
                    city: toData.city,
                    country: toData.countryName || toData.country,
                    timezone: toData.timezone
                }
            }
        };

        this.state.flightClassification = classification;
        this.saveState();
        this.notifyStateChange('flightClassification', classification);

        return classification;
    }

    // Get flight category
    getFlightCategory(tripType, isDomestic) {
        if (isDomestic) {
            return tripType === 'one-way' ? 'Domestic One-way' : 
                   tripType === 'multi-city' ? 'Domestic Multi-city' : 'Domestic Round-trip';
        } else {
            return tripType === 'one-way' ? 'International One-way' : 
                   tripType === 'multi-city' ? 'International Multi-city' : 'International Round-trip';
        }
    }

    // Get flight description
    getFlightDescription(tripType, isDomestic, fromCity, toCity) {
        const routeDesc = `${fromCity} to ${toCity}`;
        if (isDomestic) {
            return `Domestic ${tripType} flight: ${routeDesc}`;
        } else {
            return `International ${tripType} flight: ${routeDesc}`;
        }
    }

    // Get flight pricing information
    getFlightPricing(tripType, isDomestic) {
        const basePrice = isDomestic ? 1500 : 8500;
        const multiplier = tripType === 'round-trip' ? 1.8 : tripType === 'multi-city' ? 2.2 : 1;
        
        return {
            estimatedPrice: Math.round(basePrice * multiplier),
            currency: this.state.currency,
            priceRange: {
                min: Math.round(basePrice * multiplier * 0.8),
                max: Math.round(basePrice * multiplier * 1.5)
            },
            factors: isDomestic ? 
                ['Distance', 'Airline', 'Time of booking', 'Season'] :
                ['Distance', 'Airline', 'Time of booking', 'Season', 'Visa requirements', 'Airport taxes']
        };
    }

    // Get flight policies
    getFlightPolicies(tripType, isDomestic) {
        return {
            baggage: isDomestic ? 
                { checkedBag: '20kg', carryOn: '7kg', personal: '2kg' } :
                { checkedBag: '23kg', carryOn: '7kg', personal: '2kg' },
            cancellation: tripType === 'round-trip' ? 
                'Free cancellation up to 24 hours before departure' :
                'Cancellation fees may apply',
            changes: 'Flight changes allowed with fees',
            checkIn: isDomestic ? 
                'Check-in opens 24 hours before departure' :
                'Check-in opens 24 hours before departure. Arrive 3 hours early for international flights'
        };
    }

    // Get flight requirements
    getFlightRequirements(isDomestic, fromCountry, toCountry) {
        if (isDomestic) {
            return {
                documents: ['Valid South African ID or passport'],
                visa: false,
                vaccination: false,
                checkInTime: '1 hour before departure'
            };
        } else {
            return {
                documents: ['Valid passport', 'Visa (if required)', 'Return ticket (if required)'],
                visa: this.requiresVisa(fromCountry, toCountry),
                vaccination: this.requiresVaccination(toCountry),
                checkInTime: '3 hours before departure'
            };
        }
    }

    // Simplified visa requirement check
    requiresVisa(fromCountry, toCountry) {
        // This is a simplified check - in reality, this would be much more complex
        const visaFreeCountries = ['GB', 'US', 'DE', 'FR', 'NL', 'AU', 'CA'];
        if (fromCountry === 'ZA' && !visaFreeCountries.includes(toCountry)) {
            return true;
        }
        return false;
    }

    // Simplified vaccination requirement check
    requiresVaccination(toCountry) {
        const vaccinationRequiredCountries = ['BR', 'PE', 'CO', 'VE', 'GF', 'SR', 'GY'];
        return vaccinationRequiredCountries.includes(toCountry);
    }

    // Enhanced airport search with comprehensive data
    searchAirports(query) {
        if (!query || query.length < 2) {
            return this.getPopularAirports();
        }

        const searchTerm = query.toLowerCase();
        const results = [];

        // Search through all airports
        Object.keys(this.airportData).forEach(code => {
            const airport = this.airportData[code];
            const matchScore = this.calculateMatchScore(airport, searchTerm);
            
            if (matchScore > 0) {
                results.push({
                    ...airport,
                    code: code,
                    matchScore: matchScore
                });
            }
        });

        // Sort by match score (higher is better) and limit results
        return results
            .sort((a, b) => b.matchScore - a.matchScore)
            .slice(0, 12);
    }

    // Calculate match score for search results
    calculateMatchScore(airport, searchTerm) {
        let score = 0;
        
        // Exact code match gets highest score
        if (airport.iata && airport.iata.toLowerCase() === searchTerm) {
            score += 100;
        } else if (airport.iata && airport.iata.toLowerCase().includes(searchTerm)) {
            score += 80;
        }
        
        // City name matches
        if (airport.city && airport.city.toLowerCase() === searchTerm) {
            score += 90;
        } else if (airport.city && airport.city.toLowerCase().includes(searchTerm)) {
            score += 70;
        }
        
        // Country name matches
        if (airport.countryName && airport.countryName.toLowerCase().includes(searchTerm)) {
            score += 50;
        }
        
        // Airport name matches
        if (airport.name && airport.name.toLowerCase().includes(searchTerm)) {
            score += 60;
        }
        
        // Boost domestic airports slightly
        if (airport.domestic) {
            score += 5;
        }
        
        return score;
    }

    // Get popular airports for default display
    getPopularAirports() {
        const popularCodes = typeof window !== 'undefined' && window.POPULAR_DESTINATIONS ? 
            window.POPULAR_DESTINATIONS : 
            ['JNB', 'CPT', 'DUR', 'LHR', 'JFK', 'LAX', 'CDG', 'DXB'];
        
        return popularCodes
            .filter(code => this.airportData[code])
            .map(code => ({
                ...this.airportData[code],
                code: code
            }));
    }

    // Get recent searches for dropdown
    getRecentSearches() {
        return this.state.recentSearches.slice(0, 5);
    }

    // Get all available airports
    getAvailableAirports() {
        return Object.keys(this.airportData).map(code => ({
            code: code,
            ...this.airportData[code]
        }));
    }

    // Enhanced search data setter
    setSearchData(searchData) {
        this.state.searchData = searchData;
        
        // Add to recent searches if we have from/to codes
        if (searchData.from && searchData.to) {
            this.addToRecentSearches(searchData.from, searchData.to);
        }
        
        this.saveState();
        this.notifyStateChange('searchData', searchData);
    }

    setCurrency(currency, symbol) {
        this.state.currency = currency;
        this.state.currencySymbol = symbol;
        this.saveState();
        this.updateCurrencyDisplay();
        this.updatePrices();
        this.notifyStateChange('currency', { currency, symbol });
    }

    setTripType(tripType) {
        this.state.tripType = tripType;
        this.saveState();
        this.updateTripTypeDisplay();
        
        // Re-classify flight if we have route data
        if (this.state.searchData && this.state.searchData.from && this.state.searchData.to) {
            this.classifyFlight(this.state.searchData.from, this.state.searchData.to, tripType);
        }
        
        this.notifyStateChange('tripType', tripType);
    }

    setFlightClass(flightClass) {
        this.state.flightClass = flightClass;
        this.saveState();
        this.updateFlightClassDisplay();
        this.notifyStateChange('flightClass', flightClass);
    }

    setSelectedFlight(flight) {
        this.state.selectedFlight = flight;
        this.saveState();
        this.notifyStateChange('selectedFlight', flight);
        
        // Update booking data if it exists
        if (this.state.bookingData) {
            this.state.bookingData.flight = flight;
            this.saveState();
        }
    }

    setBookingData(bookingData) {
        this.state.bookingData = bookingData;
        this.saveState();
        this.notifyStateChange('bookingData', bookingData);
    }

    // Getters
    getState() {
        return { ...this.state };
    }

    getFlightClassification() {
        return this.state.flightClassification;
    }

    // Apply state to current page
    applyStateToPage() {
        this.updateCurrencyDisplay();
        this.updateTripTypeDisplay();
        this.updateFlightClassDisplay();
        this.updateFlightClassificationDisplay();
        this.updateContactNumbers();
    }

    // Update currency display elements
    updateCurrencyDisplay() {
        const currencyElements = document.querySelectorAll('[data-currency]');
        currencyElements.forEach(element => {
            element.textContent = this.state.currency;
        });

        const currencySymbolElements = document.querySelectorAll('[data-currency-symbol]');
        currencySymbolElements.forEach(element => {
            element.textContent = this.state.currencySymbol;
        });
    }

    // Update trip type display elements
    updateTripTypeDisplay() {
        const tripTypeElements = document.querySelectorAll('[data-trip-type]');
        tripTypeElements.forEach(element => {
            element.textContent = this.state.tripType;
        });

        // Update active tab if exists
        const tabButtons = document.querySelectorAll('.tab-btn');
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.tab === this.state.tripType) {
                btn.classList.add('active');
            }
        });
    }

    // Update flight class display elements
    updateFlightClassDisplay() {
        const flightClassElements = document.querySelectorAll('[data-flight-class]');
        flightClassElements.forEach(element => {
            element.textContent = this.state.flightClass;
        });
    }

    // Update flight classification display
    updateFlightClassificationDisplay() {
        if (!this.state.flightClassification) return;

        const classificationElement = document.getElementById('flight-classification');
        if (classificationElement) {
            const classification = this.state.flightClassification;
            classificationElement.innerHTML = `
                <div class="flight-classification-info">
                    <h3>${classification.category}</h3>
                    <p>${classification.description}</p>
                    <div class="flight-details">
                        <div class="route-info">
                            <span class="route-from">${classification.route.from.city} (${classification.route.from.code})</span>
                            <i class="fas fa-arrow-right"></i>
                            <span class="route-to">${classification.route.to.city} (${classification.route.to.code})</span>
                        </div>
                        <div class="price-estimate">
                            Estimated: ${this.state.currencySymbol}${classification.pricing.estimatedPrice}
                        </div>
                    </div>
                    ${!classification.isDomestic ? `
                        <div class="international-requirements">
                            <p><i class="fas fa-passport"></i> International flight requirements apply</p>
                            ${classification.requirements.visa ? '<p><i class="fas fa-exclamation-triangle"></i> Visa may be required</p>' : ''}
                        </div>
                    ` : ''}
                </div>
            `;
        }
    }

    // Update prices based on current currency
    updatePrices() {
        const priceElements = document.querySelectorAll('[data-price]');
        priceElements.forEach(element => {
            const basePrice = parseFloat(element.dataset.price);
            if (!isNaN(basePrice)) {
                const convertedPrice = this.convertPrice(basePrice);
                element.textContent = this.formatPrice(convertedPrice);
            }
        });
    }

    // Convert price to current currency
    convertPrice(amount) {
        const rates = this.getCurrencyRates();
        const rate = rates[this.state.currency] || 1;
        return Math.round(amount * rate);
    }

    // Update contact numbers
    updateContactNumbers() {
        const contactElements = document.querySelectorAll('[data-contact-number]');
        contactElements.forEach(element => {
            element.textContent = this.state.userPreferences.contactNumber;
        });
    }

    // Set up event listeners for state changes
    setupEventListeners() {
        // Listen for currency changes
        document.addEventListener('currencyChanged', (event) => {
            this.setCurrency(event.detail.currency, event.detail.symbol);
        });

        // Listen for trip type changes
        document.addEventListener('tripTypeChanged', (event) => {
            this.setTripType(event.detail.tripType);
        });

        // Listen for flight class changes
        document.addEventListener('flightClassChanged', (event) => {
            this.setFlightClass(event.detail.flightClass);
        });

        // Listen for storage changes from other tabs
        window.addEventListener('storage', (event) => {
            if (event.key && event.key.startsWith('selectedCurrency') || 
                event.key.startsWith('tripType') || 
                event.key.startsWith('flightClass')) {
                this.loadState();
                this.applyStateToPage();
            }
        });
    }

    // Notify other components of state changes
    notifyStateChange(type, data) {
        const event = new CustomEvent('globalStateChanged', {
            detail: { type, data, state: this.getState() }
        });
        document.dispatchEvent(event);
    }

    // Format price with currency symbol
    formatPrice(amount) {
        return `${this.state.currencySymbol}${amount.toLocaleString()}`;
    }

    // Get currency conversion rates (simplified)
    getCurrencyRates() {
        return {
            'ZAR': 1,
            'USD': 0.055,
            'EUR': 0.051,
            'GBP': 0.043,
            'AUD': 0.082,
            'CAD': 0.074,
            'JPY': 8.2,
            'CNY': 0.39,
            'INR': 4.6,
            'AED': 0.20,
            'QAR': 0.20,
            'SGD': 0.074,
            'HKD': 0.43,
            'THB': 1.9,
            'MYR': 0.25
        };
    }
}

// Initialize global state
window.globalState = new GlobalState();

// Helper functions for backward compatibility and new features
window.selectCurrency = function(currency, symbol) {
    window.globalState.setCurrency(currency, symbol);
};

window.setTripType = function(tripType) {
    window.globalState.setTripType(tripType);
};

window.setFlightClass = function(flightClass) {
    window.globalState.setFlightClass(flightClass);
};

// New helper functions for flight classification
window.classifyFlight = function(from, to, tripType) {
    return window.globalState.classifyFlight(from, to, tripType);
};

window.getFlightClassification = function() {
    return window.globalState.getFlightClassification();
};

window.searchAirports = function(query) {
    return window.globalState.searchAirports(query);
};

window.getPopularAirports = function() {
    return window.globalState.getPopularAirports();
};

window.getRecentSearches = function() {
    return window.globalState.getRecentSearches();
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GlobalState;
}