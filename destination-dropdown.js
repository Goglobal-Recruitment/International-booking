/**
 * Universal Destination Dropdown Component
 * Works across all pages with Booking.com-like functionality
 */

class DestinationDropdown {
    constructor(inputElement, options = {}) {
        this.input = inputElement;
        this.options = {
            placeholder: options.placeholder || 'Enter destination',
            showRecent: options.showRecent !== false,
            showPopular: options.showPopular !== false,
            maxResults: options.maxResults || 8,
            onSelect: options.onSelect || null,
            type: options.type || 'flight', // 'flight' or 'hotel'
            ...options
        };
        
        this.dropdown = null;
        this.isOpen = false;
        this.selectedIndex = -1;
        
        this.init();
    }

    init() {
        this.createDropdown();
        this.setupEventListeners();
        this.input.setAttribute('autocomplete', 'off');
        this.input.setAttribute('placeholder', this.options.placeholder);
    }

    createDropdown() {
        // Create dropdown container
        this.dropdown = document.createElement('div');
        this.dropdown.className = 'destination-dropdown';
        this.dropdown.style.display = 'none';
        
        // Insert after input
        this.input.parentNode.insertBefore(this.dropdown, this.input.nextSibling);
        
        // Add positioning styles
        this.dropdown.style.position = 'absolute';
        this.dropdown.style.top = '100%';
        this.dropdown.style.left = '0';
        this.dropdown.style.right = '0';
        this.dropdown.style.zIndex = '1000';
        this.dropdown.style.backgroundColor = 'white';
        this.dropdown.style.border = '1px solid #ddd';
        this.dropdown.style.borderRadius = '8px';
        this.dropdown.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        this.dropdown.style.maxHeight = '400px';
        this.dropdown.style.overflowY = 'auto';
        
        // Make input container relative
        const inputContainer = this.input.parentNode;
        if (getComputedStyle(inputContainer).position === 'static') {
            inputContainer.style.position = 'relative';
        }
    }

    setupEventListeners() {
        // Input events
        this.input.addEventListener('input', (e) => this.handleInput(e));
        this.input.addEventListener('focus', (e) => this.handleFocus(e));
        this.input.addEventListener('blur', (e) => this.handleBlur(e));
        this.input.addEventListener('keydown', (e) => this.handleKeydown(e));
        
        // Dropdown events
        this.dropdown.addEventListener('mousedown', (e) => e.preventDefault());
        this.dropdown.addEventListener('click', (e) => this.handleDropdownClick(e));
    }

    handleInput(e) {
        const query = e.target.value.trim();
        this.search(query);
    }

    handleFocus(e) {
        const query = e.target.value.trim();
        if (query.length > 0) {
            this.search(query);
        } else {
            this.showDefault();
        }
    }

    handleBlur(e) {
        // Delay hiding to allow for dropdown clicks
        setTimeout(() => {
            this.hide();
        }, 200);
    }

    handleKeydown(e) {
        if (!this.isOpen) return;
        
        const options = this.dropdown.querySelectorAll('.destination-option');
        
        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, options.length - 1);
                this.updateSelection();
                break;
                
            case 'ArrowUp':
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, -1);
                this.updateSelection();
                break;
                
            case 'Enter':
                e.preventDefault();
                if (this.selectedIndex >= 0 && options[this.selectedIndex]) {
                    this.selectOption(options[this.selectedIndex]);
                }
                break;
                
            case 'Escape':
                this.hide();
                break;
        }
    }

    handleDropdownClick(e) {
        const option = e.target.closest('.destination-option');
        if (option) {
            this.selectOption(option);
        }
    }

    search(query) {
        if (query.length < 2) {
            this.showDefault();
            return;
        }

        let results = [];
        
        if (this.options.type === 'flight' && window.globalState) {
            results = window.globalState.searchAirports(query);
        } else {
            // Fallback search for hotels or basic destinations
            results = this.searchDestinations(query);
        }

        this.showResults(results, 'Search Results');
    }

    searchDestinations(query) {
        // Basic destination search for hotels
        const destinations = [
            { city: 'Cape Town', country: 'South Africa', code: 'CPT' },
            { city: 'Johannesburg', country: 'South Africa', code: 'JNB' },
            { city: 'Durban', country: 'South Africa', code: 'DUR' },
            { city: 'London', country: 'United Kingdom', code: 'LHR' },
            { city: 'New York', country: 'United States', code: 'JFK' },
            { city: 'Paris', country: 'France', code: 'CDG' },
            { city: 'Dubai', country: 'United Arab Emirates', code: 'DXB' },
            { city: 'Singapore', country: 'Singapore', code: 'SIN' },
            { city: 'Tokyo', country: 'Japan', code: 'NRT' },
            { city: 'Sydney', country: 'Australia', code: 'SYD' }
        ];

        const searchTerm = query.toLowerCase();
        return destinations.filter(dest => 
            dest.city.toLowerCase().includes(searchTerm) ||
            dest.country.toLowerCase().includes(searchTerm) ||
            (dest.code && dest.code.toLowerCase().includes(searchTerm))
        ).slice(0, this.options.maxResults);
    }

    showDefault() {
        const sections = [];
        
        // Recent searches
        if (this.options.showRecent && window.globalState) {
            const recent = window.globalState.getRecentSearches();
            if (recent.length > 0) {
                sections.push({
                    title: 'Recent searches',
                    items: recent.map(item => ({
                        city: item.toCity,
                        country: this.getCountryName(item.to),
                        code: item.to,
                        type: 'recent'
                    }))
                });
            }
        }
        
        // Popular destinations
        if (this.options.showPopular) {
            let popular = [];
            if (window.globalState) {
                popular = window.globalState.getPopularAir