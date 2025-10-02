// Flight Search JavaScript - Pixel Perfect Booking.com Clone

class FlightSearch {
    constructor() {
        this.tripType = 'return';
        this.passengers = {
            adults: 1,
            children: 0
        };
        this.travelClass = 'economy';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setDefaultDates();
        this.updatePassengerDisplay();
        this.loadAirportData();
        this.setupAccessibility();
    }

    setupEventListeners() {
        // Trip type tabs
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.addEventListener('click', (e) => this.handleTripTypeChange(e));
            tab.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.handleTripTypeChange(e);
                }
            });
        });

        // Form submission
        document.getElementById('flightSearchForm').addEventListener('submit', (e) => {
            this.handleFormSubmit(e);
        });

        // Airport search inputs
        document.getElementById('fromInput').addEventListener('input', (e) => {
            this.handleAirportSearch(e, 'fromDropdown');
        });

        document.getElementById('toInput').addEventListener('input', (e) => {
            this.handleAirportSearch(e, 'toDropdown');
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.field-input-wrapper')) {
                this.closeAllDropdowns();
            }
        });

        // Passenger dropdown
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-field')) {
                document.getElementById('passengerDropdown').classList.remove('show');
                this.updateDropdownArrow(false);
            }
        });

        // Keyboard navigation for dropdowns
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllDropdowns();
                document.getElementById('passengerDropdown').classList.remove('show');
                this.updateDropdownArrow(false);
            }
        });

        // Date validation
        document.getElementById('departureDate').addEventListener('change', (e) => {
            this.validateDates();
        });

        document.getElementById('returnDate').addEventListener('change', (e) => {
            this.validateDates();
        });
    }

    setupAccessibility() {
        // Add ARIA labels and roles
        document.querySelectorAll('.tab-btn').forEach((tab, index) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
        });

        // Add keyboard navigation for airport results
        document.addEventListener('keydown', (e) => {
            const activeDropdown = document.querySelector('.dropdown-results[style*="block"]');
            if (activeDropdown && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
                e.preventDefault();
                this.navigateAirportResults(activeDropdown, e.key === 'ArrowDown');
            }
        });
    }

    handleTripTypeChange(e) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(tab => {
            tab.classList.remove('active');
            tab.setAttribute('tabindex', '-1');
        });
        e.target.classList.add('active');
        e.target.setAttribute('tabindex', '0');
        
        this.tripType = e.target.dataset.type;
        
        // Show/hide return date field with animation
        const returnDateField = document.getElementById('returnDateField');
        if (this.tripType === 'one-way') {
            returnDateField.style.opacity = '0.5';
            returnDateField.style.pointerEvents = 'none';
            document.getElementById('returnDate').removeAttribute('required');
        } else {
            returnDateField.style.opacity = '1';
            returnDateField.style.pointerEvents = 'auto';
            document.getElementById('returnDate').setAttribute('required', 'required');
        }
    }

    setDefaultDates() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        // Set minimum date to today
        const todayString = today.toISOString().split('T')[0];
        document.getElementById('departureDate').setAttribute('min', todayString);
        document.getElementById('returnDate').setAttribute('min', todayString);

        document.getElementById('departureDate').value = tomorrow.toISOString().split('T')[0];
        document.getElementById('returnDate').value = nextWeek.toISOString().split('T')[0];
    }

    validateDates() {
        const departureDate = new Date(document.getElementById('departureDate').value);
        const returnDate = new Date(document.getElementById('returnDate').value);
        
        if (this.tripType === 'return' && returnDate <= departureDate) {
            const newReturnDate = new Date(departureDate);
            newReturnDate.setDate(newReturnDate.getDate() + 1);
            document.getElementById('returnDate').value = newReturnDate.toISOString().split('T')[0];
        }
    }

    loadAirportData() {
        // Enhanced airport data with more realistic information
        this.airports = [
            { code: 'JNB', name: 'OR Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
            { code: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa' },
            { code: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa' },
            { code: 'PLZ', name: 'Port Elizabeth Airport', city: 'Port Elizabeth', country: 'South Africa' },
            { code: 'BFN', name: 'Bram Fischer International Airport', city: 'Bloemfontein', country: 'South Africa' },
            { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
            { code: 'LGW', name: 'Gatwick Airport', city: 'London', country: 'United Kingdom' },
            { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
            { code: 'ORY', name: 'Orly Airport', city: 'Paris', country: 'France' },
            { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'United Arab Emirates' },
            { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'United States' },
            { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'United States' },
            { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
            { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
            { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
            { code: 'HND', name: 'Haneda Airport', city: 'Tokyo', country: 'Japan' },
            { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
            { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
            { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
            { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' }
        ];
    }

    handleAirportSearch(e, dropdownId) {
        const query = e.target.value.toLowerCase().trim();
        const dropdown = document.getElementById(dropdownId);
        
        if (query.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        const filteredAirports = this.airports.filter(airport => 
            airport.city.toLowerCase().includes(query) ||
            airport.name.toLowerCase().includes(query) ||
            airport.code.toLowerCase().includes(query) ||
            airport.country.toLowerCase().includes(query)
        ).slice(0, 8); // Limit to 8 results for better UX

        this.displayAirportResults(filteredAirports, dropdown, e.target);
    }

    displayAirportResults(airports, dropdown, input) {
        if (airports.length === 0) {
            dropdown.innerHTML = '<div class="no-results">No airports found</div>';
            dropdown.style.display = 'block';
            return;
        }

        dropdown.innerHTML = airports.map((airport, index) => `
            <div class="airport-result" 
                 onclick="selectAirport('${airport.code}', '${airport.city}', '${input.id}')"
                 data-index="${index}"
                 role="option"
                 tabindex="-1">
                <div class="airport-code">${airport.code}</div>
                <div class="airport-info">
                    <div class="airport-name">${airport.name}</div>
                    <div class="airport-location">${airport.city}, ${airport.country}</div>
                </div>
            </div>
        `).join('');

        dropdown.style.display = 'block';
    }

    navigateAirportResults(dropdown, isDown) {
        const results = dropdown.querySelectorAll('.airport-result');
        const current = dropdown.querySelector('.airport-result.highlighted');
        let newIndex = 0;

        if (current) {
            current.classList.remove('highlighted');
            const currentIndex = parseInt(current.dataset.index);
            newIndex = isDown ? 
                Math.min(currentIndex + 1, results.length - 1) : 
                Math.max(currentIndex - 1, 0);
        }

        if (results[newIndex]) {
            results[newIndex].classList.add('highlighted');
            results[newIndex].scrollIntoView({ block: 'nearest' });
        }
    }

    closeAllDropdowns() {
        document.querySelectorAll('.dropdown-results').forEach(dropdown => {
            dropdown.style.display = 'none';
        });
    }

    updateDropdownArrow(isOpen) {
        const arrow = document.querySelector('.dropdown-arrow');
        if (arrow) {
            arrow.style.transform = isOpen ? 
                'translateY(-50%) rotate(180deg)' : 
                'translateY(-50%) rotate(0deg)';
        }
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = {
            from: document.getElementById('fromInput').value,
            to: document.getElementById('toInput').value,
            departure: document.getElementById('departureDate').value,
            return: document.getElementById('returnDate').value,
            passengers: this.passengers,
            class: this.travelClass,
            tripType: this.tripType
        };

        // Enhanced validation
        if (!this.validateFormData(formData)) {
            return;
        }

        // Add loading state
        const searchBtn = document.querySelector('.search-btn');
        searchBtn.classList.add('loading');
        searchBtn.disabled = true;

        // Save search data to localStorage and global state
        localStorage.setItem('flightSearchData', JSON.stringify(formData));
        if (window.globalState) {
            window.globalState.setSearchData(formData);
        }
        
        this.showNotification('Searching for flights...', 'info');
        
        // Navigate to flight results
        setTimeout(() => {
            window.location.href = 'flight-selection.html';
        }, 1500);
    }

    validateFormData(formData) {
        // Check required fields
        if (!formData.from || !formData.to || !formData.departure) {
            this.showNotification('Please fill in all required fields', 'error');
            return false;
        }

        // Check if same origin and destination
        if (formData.from === formData.to) {
            this.showNotification('Origin and destination cannot be the same', 'error');
            return false;
        }

        // Check return date for return trips
        if (this.tripType === 'return' && !formData.return) {
            this.showNotification('Please select a return date', 'error');
            return false;
        }

        // Check if departure is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const departureDate = new Date(formData.departure);
        if (departureDate < today) {
            this.showNotification('Departure date cannot be in the past', 'error');
            return false;
        }

        // Check if return date is after departure
        if (this.tripType === 'return') {
            const returnDate = new Date(formData.return);
            if (returnDate <= departureDate) {
                this.showNotification('Return date must be after departure date', 'error');
                return false;
            }
        }

        return true;
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        document.querySelectorAll('.notification').forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    updatePassengerDisplay() {
        const totalPassengers = this.passengers.adults + this.passengers.children;
        let passengerText = '';
        
        if (this.passengers.adults > 0) {
            passengerText += `${this.passengers.adults} Adult${this.passengers.adults > 1 ? 's' : ''}`;
        }
        
        if (this.passengers.children > 0) {
            if (passengerText) passengerText += ', ';
            passengerText += `${this.passengers.children} Child${this.passengers.children > 1 ? 'ren' : ''}`;
        }
        
        const classText = this.travelClass.charAt(0).toUpperCase() + this.travelClass.slice(1);
        if (this.travelClass === 'premium') {
            classText = 'Premium Economy';
        } else if (this.travelClass === 'first') {
            classText = 'First Class';
        }
        
        document.getElementById('passengerDisplay').value = `${passengerText}, ${classText}`;
    }
}

// Global functions
function swapLocations() {
    const fromInput = document.getElementById('fromInput');
    const toInput = document.getElementById('toInput');
    
    const temp = fromInput.value;
    fromInput.value = toInput.value;
    toInput.value = temp;
    
    // Add visual feedback
    const swapBtn = document.querySelector('.swap-btn');
    swapBtn.style.transform = 'rotate(180deg)';
    setTimeout(() => {
        swapBtn.style.transform = '';
    }, 300);
}

function selectAirport(code, city, inputId) {
    document.getElementById(inputId).value = `${city} (${code})`;
    flightSearch.closeAllDropdowns();
    
    // Focus next field for better UX
    const currentField = document.getElementById(inputId);
    const allFields = ['fromInput', 'toInput', 'departureDate', 'returnDate'];
    const currentIndex = allFields.indexOf(inputId);
    if (currentIndex < allFields.length - 1) {
        document.getElementById(allFields[currentIndex + 1]).focus();
    }
}

function selectDestination(fromCode, toCode) {
    const fromAirport = flightSearch.airports.find(a => a.code === fromCode);
    const toAirport = flightSearch.airports.find(a => a.code === toCode);
    
    if (fromAirport) {
        document.getElementById('fromInput').value = `${fromAirport.city} (${fromAirport.code})`;
    }
    if (toAirport) {
        document.getElementById('toInput').value = `${toAirport.city} (${toAirport.code})`;
    }
    
    // Scroll to search form
    document.querySelector('.search-section').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

function togglePassengerDropdown() {
    const dropdown = document.getElementById('passengerDropdown');
    const isShowing = dropdown.classList.contains('show');
    
    dropdown.classList.toggle('show');
    flightSearch.updateDropdownArrow(!isShowing);
    
    if (!isShowing) {
        // Focus first button for accessibility
        const firstBtn = dropdown.querySelector('.qty-btn');
        if (firstBtn) firstBtn.focus();
    }
}

function changePassengers(type, change) {
    const currentQty = flightSearch.passengers[type];
    const newQty = Math.max(0, currentQty + change);
    
    // Ensure at least 1 adult
    if (type === 'adults' && newQty < 1) {
        return;
    }
    
    // Maximum 9 passengers total
    const totalPassengers = Object.values(flightSearch.passengers).reduce((sum, qty) => sum + qty, 0);
    if (change > 0 && totalPassengers >= 9) {
        flightSearch.showNotification('Maximum 9 passengers allowed', 'error');
        return;
    }
    
    flightSearch.passengers[type] = newQty;
    document.getElementById(`${type}Qty`).textContent = newQty;
    
    // Update button states
    updatePassengerButtons();
    flightSearch.updatePassengerDisplay();
}

function updatePassengerButtons() {
    const totalPassengers = Object.values(flightSearch.passengers).reduce((sum, qty) => sum + qty, 0);
    
    // Adults buttons
    const adultsMinusBtn = document.querySelector(`[onclick="changePassengers('adults', -1)"]`);
    const adultsPlusBtn = document.querySelector(`[onclick="changePassengers('adults', 1)"]`);
    adultsMinusBtn.disabled = flightSearch.passengers.adults <= 1;
    adultsPlusBtn.disabled = totalPassengers >= 9;
    
    // Children buttons
    const childrenMinusBtn = document.querySelector(`[onclick="changePassengers('children', -1)"]`);
    const childrenPlusBtn = document.querySelector(`[onclick="changePassengers('children', 1)"]`);
    childrenMinusBtn.disabled = flightSearch.passengers.children <= 0;
    childrenPlusBtn.disabled = totalPassengers >= 9;
}

function updatePassengerDisplay() {
    flightSearch.travelClass = document.getElementById('travelClass').value;
    flightSearch.updatePassengerDisplay();
}

// Initialize when DOM is loaded
let flightSearch;
document.addEventListener('DOMContentLoaded', () => {
    flightSearch = new FlightSearch();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add additional CSS for enhanced styling
const additionalStyles = `
    .no-results {
        padding: 12px 16px;
        color: var(--booking-gray-dark);
        font-style: italic;
        text-align: center;
    }
    
    .airport-result.highlighted {
        background-color: #e3f2fd;
    }
    
    .search-field:focus-within .field-label {
        color: var(--booking-blue-light);
    }
    
    .destination-card:focus {
        outline: 2px solid var(--booking-blue-light);
        outline-offset: 2px;
    }
    
    .tab-btn:focus {
        outline: 2px solid var(--booking-blue-light);
        outline-offset: -2px;
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);