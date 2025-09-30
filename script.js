// Flight booking application - Booking.com clone
class FlightBookingApp {
    constructor() {
        this.airports = [
            { code: 'JNB', name: 'O.R. Tambo International Airport', city: 'Johannesburg', country: 'South Africa' },
            { code: 'CPT', name: 'Cape Town International Airport', city: 'Cape Town', country: 'South Africa' },
            { code: 'DUR', name: 'King Shaka International Airport', city: 'Durban', country: 'South Africa' },
            { code: 'LHR', name: 'Heathrow Airport', city: 'London', country: 'United Kingdom' },
            { code: 'CDG', name: 'Charles de Gaulle Airport', city: 'Paris', country: 'France' },
            { code: 'FRA', name: 'Frankfurt Airport', city: 'Frankfurt', country: 'Germany' },
            { code: 'AMS', name: 'Amsterdam Airport Schiphol', city: 'Amsterdam', country: 'Netherlands' },
            { code: 'DXB', name: 'Dubai International Airport', city: 'Dubai', country: 'UAE' },
            { code: 'DOH', name: 'Hamad International Airport', city: 'Doha', country: 'Qatar' },
            { code: 'IST', name: 'Istanbul Airport', city: 'Istanbul', country: 'Turkey' },
            { code: 'JFK', name: 'John F. Kennedy International Airport', city: 'New York', country: 'USA' },
            { code: 'LAX', name: 'Los Angeles International Airport', city: 'Los Angeles', country: 'USA' },
            { code: 'SYD', name: 'Sydney Kingsford Smith Airport', city: 'Sydney', country: 'Australia' },
            { code: 'MEL', name: 'Melbourne Airport', city: 'Melbourne', country: 'Australia' },
            { code: 'SIN', name: 'Singapore Changi Airport', city: 'Singapore', country: 'Singapore' },
            { code: 'HKG', name: 'Hong Kong International Airport', city: 'Hong Kong', country: 'Hong Kong' },
            { code: 'NRT', name: 'Narita International Airport', city: 'Tokyo', country: 'Japan' },
            { code: 'ICN', name: 'Incheon International Airport', city: 'Seoul', country: 'South Korea' },
            { code: 'BKK', name: 'Suvarnabhumi Airport', city: 'Bangkok', country: 'Thailand' },
            { code: 'KUL', name: 'Kuala Lumpur International Airport', city: 'Kuala Lumpur', country: 'Malaysia' }
        ];

        this.airlines = [
            { code: 'SA', name: 'South African Airways', logo: 'SA' },
            { code: 'BA', name: 'British Airways', logo: 'BA' },
            { code: 'EK', name: 'Emirates', logo: 'EK' },
            { code: 'QR', name: 'Qatar Airways', logo: 'QR' },
            { code: 'TK', name: 'Turkish Airlines', logo: 'TK' },
            { code: 'LH', name: 'Lufthansa', logo: 'LH' },
            { code: 'KL', name: 'KLM', logo: 'KL' },
            { code: 'AF', name: 'Air France', logo: 'AF' },
            { code: 'SQ', name: 'Singapore Airlines', logo: 'SQ' },
            { code: 'CX', name: 'Cathay Pacific', logo: 'CX' }
        ];

        this.passengers = {
            adults: 1,
            children: 0,
            infants: 0,
            class: 'economy'
        };

        this.currentTab = 'roundtrip';
        this.searchResults = [];
        this.selectedFlight = null;
        this.multiCityFlights = [{ from: '', to: '', departure: '' }];
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setMinDate();
        this.loadPopularDestinations();
        this.updatePassengersDisplay();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Location inputs
        const fromInput = document.getElementById('from-location');
        const toInput = document.getElementById('to-location');
        
        if (fromInput) {
            fromInput.addEventListener('input', (e) => this.handleLocationInput(e, 'from'));
            fromInput.addEventListener('focus', () => this.showLocationDropdown('from'));
            fromInput.addEventListener('blur', () => {
                setTimeout(() => this.hideLocationDropdown('from'), 200);
            });
        }
        
        if (toInput) {
            toInput.addEventListener('input', (e) => this.handleLocationInput(e, 'to'));
            toInput.addEventListener('focus', () => this.showLocationDropdown('to'));
            toInput.addEventListener('blur', () => {
                setTimeout(() => this.hideLocationDropdown('to'), 200);
            });
        }

        // Swap locations
        const swapBtn = document.getElementById('swap-locations');
        if (swapBtn) {
            swapBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.swapLocations();
            });
        }

        // Passengers dropdown
        const passengersInput = document.getElementById('passengers-display');
        if (passengersInput) {
            passengersInput.addEventListener('click', (e) => {
                e.preventDefault();
                this.togglePassengersDropdown();
            });
        }

        // Passenger counters
        document.querySelectorAll('.counter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const type = e.target.dataset.type;
                const action = e.target.dataset.action;
                this.updatePassengerCount(type, action);
            });
        });

        // Class selection
        document.querySelectorAll('input[name="class"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.passengers.class = e.target.value;
                this.updatePassengersDisplay();
            });
        });

        // Done button
        const doneBtn = document.getElementById('passengers-done');
        if (doneBtn) {
            doneBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.closePassengersDropdown();
            });
        }

        // Form submission
        const searchForm = document.getElementById('flight-search-form');
        if (searchForm) {
            searchForm.addEventListener('submit', (e) => this.handleSearch(e));
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', this.handleOutsideClick.bind(this));
    }

    setMinDate() {
        const today = new Date().toISOString().split('T')[0];
        const departureInput = document.getElementById('departure-date');
        const returnInput = document.getElementById('return-date');
        
        // Set minimum dates to prevent past date selection
        if (departureInput) {
            departureInput.min = today;
            departureInput.addEventListener('change', this.validateFlightDate.bind(this));
        }
        if (returnInput) {
            returnInput.min = today;
            returnInput.addEventListener('change', this.validateFlightDate.bind(this));
        }
    }

    validateFlightDate(event) {
        const today = new Date().toISOString().split('T')[0];
        const inputDate = event.target.value;
        
        if (inputDate < today) {
            event.target.value = today;
            alert('You cannot select a date in the past. Please choose today or a future date.');
        }
        
        // Update return date minimum if departure date changes
        if (event.target.id === 'departure-date') {
            const returnInput = document.getElementById('return-date');
            if (returnInput) {
                const departureDate = new Date(inputDate);
                departureDate.setDate(departureDate.getDate() + 1);
                const minReturnDate = departureDate.toISOString().split('T')[0];
                returnInput.min = minReturnDate;
                
                // Update return date if it's before the new minimum
                if (returnInput.value && returnInput.value < minReturnDate) {
                    returnInput.value = minReturnDate;
                }
            }
        }
    }

    switchTab(tab) {
        this.currentTab = tab;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        
        // Show/hide return date
        const returnDateGroup = document.querySelector('.return-date-group');
        if (returnDateGroup) {
            if (tab === 'oneway' || tab === 'multicity') {
                returnDateGroup.style.display = 'none';
            } else {
                returnDateGroup.style.display = 'block';
            }
        }
    }

    handleLocationInput(e, type) {
        const query = e.target.value.toLowerCase();
        const dropdown = document.getElementById(`${type}-dropdown`);
        
        if (query.length > 0) {
            const filteredAirports = this.airports.filter(airport => 
                airport.city.toLowerCase().includes(query) ||
                airport.name.toLowerCase().includes(query) ||
                airport.code.toLowerCase().includes(query)
            );
            this.populateLocationDropdown(dropdown, filteredAirports);
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    }

    showLocationDropdown(type) {
        const dropdown = document.getElementById(`${type}-dropdown`);
        this.populateLocationDropdown(dropdown, this.airports);
        dropdown.style.display = 'block';
    }

    populateLocationDropdown(dropdown, airports) {
        dropdown.innerHTML = '';
        airports.forEach(airport => {
            const item = document.createElement('div');
            item.className = 'dropdown-item';
            item.innerHTML = `
                <div class="airport-info">
                    <div class="airport-main">
                        <span class="airport-code">${airport.code}</span>
                        <span class="airport-name">${airport.name}</span>
                    </div>
                    <div class="airport-location">${airport.city}, ${airport.country}</div>
                </div>
            `;
            item.addEventListener('click', () => {
                const input = dropdown.id.includes('from') ? 
                    document.getElementById('from-location') : 
                    document.getElementById('to-location');
                input.value = `${airport.city} (${airport.code})`;
                dropdown.style.display = 'none';
            });
            dropdown.appendChild(item);
        });
    }

    // Global variables for passenger counts
    let passengerCounts = {
        adults: 1,
        children: 0
    };
    
    // Global functions for HTML onclick events
    function toggleLocationDropdown(type) {
        try {
            // Close other dropdowns first
            const allDropdowns = document.querySelectorAll('.location-dropdown');
            allDropdowns.forEach(dropdown => {
                if (dropdown.id !== `${type}-dropdown`) {
                    dropdown.style.display = 'none';
                }
            });
            
            const dropdown = document.getElementById(`${type}-dropdown`);
            if (dropdown) {
                const isVisible = dropdown.style.display === 'block';
                dropdown.style.display = isVisible ? 'none' : 'block';
                
                if (!isVisible) {
                    // Populate dropdown with airports
                    populateLocationDropdown(dropdown, type);
                }
            }
        } catch (error) {
            console.error('Error toggling location dropdown:', error);
        }
    }
    
    function populateLocationDropdown(dropdown, type) {
        if (!window.airports) return;
        
        dropdown.innerHTML = '';
        window.airports.forEach(airport => {
            const item = document.createElement('div');
            item.className = 'airport-option';
            item.innerHTML = `
                <div class="airport-code">${airport.code}</div>
                <div class="airport-name">${airport.name}, ${airport.city}</div>
            `;
            item.addEventListener('click', () => {
                const input = document.getElementById(type);
                if (input) {
                    input.value = `${airport.city} (${airport.code})`;
                    dropdown.style.display = 'none';
                }
            });
            dropdown.appendChild(item);
        });
    }
    
    function swapLocations() {
        try {
            const fromInput = document.getElementById('from');
            const toInput = document.getElementById('to');
            if (fromInput && toInput) {
                const temp = fromInput.value;
                fromInput.value = toInput.value;
                toInput.value = temp;
            }
        } catch (error) {
            console.error('Error swapping locations:', error);
        }
    }
    
    function togglePassengersDropdown() {
        try {
            const dropdown = document.getElementById('passengers-dropdown');
            if (dropdown) {
                const isVisible = dropdown.style.display === 'block';
                dropdown.style.display = isVisible ? 'none' : 'block';
            }
        } catch (error) {
            console.error('Error toggling passengers dropdown:', error);
        }
    }
    
    function updatePassengerCount(type, action) {
        try {
            if (action === 'increment') {
                if (type === 'adults' && passengerCounts.adults < 9) {
                    passengerCounts.adults++;
                } else if (type === 'children' && passengerCounts.children < 8) {
                    passengerCounts.children++;
                }
            } else if (action === 'decrement') {
                if (type === 'adults' && passengerCounts.adults > 1) {
                    passengerCounts.adults--;
                } else if (type === 'children' && passengerCounts.children > 0) {
                    passengerCounts.children--;
                }
            }
            
            // Update display
            updatePassengerDisplay();
        } catch (error) {
            console.error('Error updating passenger count:', error);
        }
    }
    
    function updatePassengerDisplay() {
        try {
            // Update counters
            const adultsCount = document.getElementById('adults-count');
            const childrenCount = document.getElementById('children-count');
            
            if (adultsCount) adultsCount.textContent = passengerCounts.adults;
            if (childrenCount) childrenCount.textContent = passengerCounts.children;
            
            // Update main input
            const passengersInput = document.getElementById('passengers');
            if (passengersInput) {
                let text = `${passengerCounts.adults} adult${passengerCounts.adults > 1 ? 's' : ''}`;
                if (passengerCounts.children > 0) {
                    text += `, ${passengerCounts.children} child${passengerCounts.children > 1 ? 'ren' : ''}`;
                }
                
                // Get selected class
                const selectedClass = document.querySelector('input[name="class"]:checked');
                if (selectedClass) {
                    const className = selectedClass.value.charAt(0).toUpperCase() + selectedClass.value.slice(1);
                    text += `, ${className}`;
                }
                
                passengersInput.value = text;
            }
        } catch (error) {
            console.error('Error updating passenger display:', error);
        }
    }
    
    function closePassengersDropdown() {
        try {
            const dropdown = document.getElementById('passengers-dropdown');
            if (dropdown) {
                dropdown.style.display = 'none';
            }
            updatePassengerDisplay();
        } catch (error) {
            console.error('Error closing passengers dropdown:', error);
        }
    }
    
    function searchFlights() {
        try {
            // Basic validation
            const fromInput = document.getElementById('from');
            const toInput = document.getElementById('to');
            const departureInput = document.getElementById('departure');
            
            if (!fromInput?.value || !toInput?.value || !departureInput?.value) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show loading
            const loadingOverlay = document.getElementById('loading-overlay');
            if (loadingOverlay) {
                loadingOverlay.style.display = 'flex';
            }
            
            // Simulate search delay then redirect
            setTimeout(() => {
                window.location.href = 'flight-selection.html';
            }, 1500);
        } catch (error) {
            console.error('Error searching flights:', error);
            alert('An error occurred while searching for flights. Please try again.');
        }
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(event) {
        const dropdowns = document.querySelectorAll('.location-dropdown, .passengers-dropdown');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(event.target) && !dropdown.previousElementSibling.contains(event.target)) {
                dropdown.style.display = 'none';
            }
        });
    });
    
    // Initialize when DOM is loaded
    document.addEventListener('DOMContentLoaded', function() {
        try {
            // Set minimum date to today
            const today = new Date().toISOString().split('T')[0];
            const departureInput = document.getElementById('departure');
            const returnInput = document.getElementById('return');
            
            if (departureInput) {
                departureInput.min = today;
                departureInput.value = today;
            }
            
            if (returnInput) {
                returnInput.min = today;
                // Set return date to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                returnInput.value = tomorrow.toISOString().split('T')[0];
            }
            
            // Initialize passenger display
            updatePassengerDisplay();
            
            // Initialize FlightBookingApp if it exists
            if (typeof FlightBookingApp !== 'undefined') {
                window.flightApp = new FlightBookingApp();
            }
        } catch (error) {
            console.error('Error initializing page:', error);
        }
    });

    function updatePassengerCounters() {
        document.getElementById('adults-count').textContent = this.passengers.adults;
        document.getElementById('children-count').textContent = this.passengers.children;
        document.getElementById('infants-count').textContent = this.passengers.infants;
        
        // Update button states
        document.querySelector('[data-type="adults"][data-action="decrement"]').disabled = this.passengers.adults <= 1;
        document.querySelector('[data-type="children"][data-action="decrement"]').disabled = this.passengers.children <= 0;
        document.querySelector('[data-type="infants"][data-action="decrement"]').disabled = this.passengers.infants <= 0;
        document.querySelector('[data-type="adults"][data-action="increment"]').disabled = this.passengers.adults >= 9;
        document.querySelector('[data-type="children"][data-action="increment"]').disabled = this.passengers.children >= 8;
        document.querySelector('[data-type="infants"][data-action="increment"]').disabled = this.passengers.infants >= this.passengers.adults;
    }

    updatePassengersDisplay() {
        const total = this.passengers.adults + this.passengers.children + this.passengers.infants;
        const classText = this.passengers.class.charAt(0).toUpperCase() + this.passengers.class.slice(1);
        
        let passengerText = `${total} passenger${total > 1 ? 's' : ''}`;
        if (this.passengers.children > 0 || this.passengers.infants > 0) {
            const parts = [];
            if (this.passengers.adults > 0) parts.push(`${this.passengers.adults} adult${this.passengers.adults > 1 ? 's' : ''}`);
            if (this.passengers.children > 0) parts.push(`${this.passengers.children} child${this.passengers.children > 1 ? 'ren' : ''}`);
            if (this.passengers.infants > 0) parts.push(`${this.passengers.infants} infant${this.passengers.infants > 1 ? 's' : ''}`);
            passengerText = parts.join(', ');
        }
        
        const displayElement = document.getElementById('passengers-display');
        if (displayElement) {
            displayElement.innerHTML = `${passengerText}, ${classText}`;
        }
    }

    validateDates() {
        const departureDate = new Date(document.getElementById('departure-date').value);
        const returnDate = new Date(document.getElementById('return-date').value);
        
        if (returnDate <= departureDate) {
            this.showNotification('Return date must be after departure date', 'error');
            return false;
        }
        return true;
    }

    handleOutsideClick(e) {
        // Close location dropdowns
        if (!e.target.closest('.location-input-group')) {
            document.querySelectorAll('.location-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }
        
        // Close passengers dropdown
        if (!e.target.closest('.passengers-input-group')) {
            document.getElementById('passengers-dropdown').style.display = 'none';
        }
    }

    async handleSearch(e) {
        e.preventDefault();
        
        // Validate required fields
        const from = document.getElementById('from-location').value.trim();
        const to = document.getElementById('to-location').value.trim();
        const departureDate = document.getElementById('departure-date').value;
        
        if (!from || !to || !departureDate) {
            this.showNotification('Please fill in all required fields', 'error');
            return;
        }
        
        if (!this.validateDates()) return;
        
        const searchData = {
            from: document.getElementById('from-location').value,
            to: document.getElementById('to-location').value,
            departureDate: document.getElementById('departure-date').value,
            returnDate: this.currentTab === 'roundtrip' ? document.getElementById('return-date').value : null,
            passengers: this.passengers,
            tripType: this.currentTab
        };
        
        if (!searchData.from || !searchData.to || !searchData.departureDate) {
            alert('Please fill in all required fields');
            return;
        }
        
        this.showLoadingAnimation();
        
        try {
            await this.searchFlights(searchData);
        } catch (error) {
            console.error('Search failed:', error);
            this.showNotification('Search failed. Please try again.', 'error');
        } finally {
            this.hideLoadingAnimation();
        }
    }

    // Add notification system
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    showLoadingAnimation() {
        const loadingOverlay = document.createElement('div');
        loadingOverlay.id = 'loading-overlay';
        loadingOverlay.innerHTML = `
            <div class="loading-content">
                <div class="loading-animation">
                    <div class="plane-animation">
                        <i class="fas fa-plane"></i>
                    </div>
                </div>
                <h3>Searching for flights...</h3>
                <p>We're comparing prices from hundreds of airlines</p>
            </div>
        `;
        document.body.appendChild(loadingOverlay);
    }

    hideLoadingAnimation() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.remove();
        }
    }

    async searchFlights(searchData) {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        this.searchResults = this.generateMockFlights(searchData);
        this.displayResults(searchData);
    }

    generateMockFlights(searchData) {
        const flights = [];
        const fromCode = this.extractAirportCode(searchData.from);
        const toCode = this.extractAirportCode(searchData.to);
        
        // Generate 8-12 mock flights
        const numFlights = Math.floor(Math.random() * 5) + 8;
        
        for (let i = 0; i < numFlights; i++) {
            const airline = this.airlines[Math.floor(Math.random() * this.airlines.length)];
            const departureTime = this.generateRandomTime();
            const flightDuration = Math.floor(Math.random() * 8) + 4; // 4-12 hours
            const arrivalTime = this.addHours(departureTime, flightDuration);
            const basePrice = Math.floor(Math.random() * 500) + 200; // Base economy price
            
            // Generate cabin class options with different prices
            const cabinClasses = [
                {
                    type: 'economy',
                    name: 'Economy',
                    price: basePrice,
                    features: ['Standard seat', 'Meal included', 'Carry-on bag'],
                    available: Math.random() > 0.1 // 90% availability
                },
                {
                    type: 'premium',
                    name: 'Premium Economy',
                    price: Math.floor(basePrice * 1.5),
                    features: ['Extra legroom', 'Premium meal', 'Priority boarding', 'Carry-on + checked bag'],
                    available: Math.random() > 0.3 // 70% availability
                },
                {
                    type: 'business',
                    name: 'Business',
                    price: Math.floor(basePrice * 3),
                    features: ['Lie-flat seat', 'Gourmet dining', 'Lounge access', 'Priority check-in', '2 checked bags'],
                    available: Math.random() > 0.5 // 50% availability
                },
                {
                    type: 'first',
                    name: 'First Class',
                    price: Math.floor(basePrice * 5),
                    features: ['Private suite', 'Chef-prepared meals', 'Chauffeur service', 'Unlimited baggage'],
                    available: Math.random() > 0.7 // 30% availability
                }
            ];

            flights.push({
                id: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
                airline: airline.name,
                airlineCode: airline.code,
                flightNumber: `${airline.code}${Math.floor(Math.random() * 9000) + 1000}`,
                from: fromCode,
                to: toCode,
                departure: {
                    time: departureTime,
                    date: searchData.departureDate
                },
                arrival: {
                    time: arrivalTime,
                    date: searchData.departureDate
                },
                duration: this.formatDuration(flightDuration),
                stops: Math.random() > 0.6 ? 'Direct' : '1 stop',
                cabinClasses: cabinClasses,
                aircraft: this.getRandomAircraft()
            });
        }
        
        return flights.sort((a, b) => a.cabinClasses[0].price - b.cabinClasses[0].price);
    }

    getRandomAircraft() {
        const aircraftTypes = [
            'Boeing 777-300ER',
            'Airbus A350-900',
            'Boeing 787-9',
            'Airbus A380-800',
            'Boeing 747-8',
            'Airbus A330-300',
            'Boeing 737-800',
            'Embraer E190'
        ];
        return aircraftTypes[Math.floor(Math.random() * aircraftTypes.length)];
    }

    displayFlights() {
        const flightsContainer = document.querySelector('.flights-list');
        if (!flightsContainer) return;
        
        flightsContainer.innerHTML = '';
        
        this.searchResults.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card';
            flightCard.innerHTML = `
                <div class="flight-header">
                    <div class="flight-basic-info">
                        <div class="airline-section">
                            <div class="airline-logo">${flight.airlineCode}</div>
                            <div class="airline-details">
                                <div class="airline-name">${flight.airline}</div>
                                <div class="flight-number">${flight.flightNumber}</div>
                                <div class="aircraft-type">${flight.aircraft}</div>
                            </div>
                        </div>
                        <div class="route-section">
                            <div class="departure">
                                <div class="time">${flight.departure.time}</div>
                                <div class="airport">${flight.from}</div>
                            </div>
                            <div class="flight-path">
                                <div class="duration">${flight.duration}</div>
                                <div class="flight-line">
                                    <div class="flight-line-bar"></div>
                                    <i class="fas fa-plane flight-icon"></i>
                                </div>
                                <div class="stops">${flight.stops}</div>
                            </div>
                            <div class="arrival">
                                <div class="time">${flight.arrival.time}</div>
                                <div class="airport">${flight.to}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="cabin-classes">
                    ${flight.cabinClasses.map(cabin => `
                        <div class="cabin-option ${!cabin.available ? 'unavailable' : ''}" data-cabin-type="${cabin.type}">
                            <div class="cabin-info">
                                <div class="cabin-name">${cabin.name}</div>
                                <div class="cabin-features">
                                    ${cabin.features.slice(0, 2).map(feature => `<span class="feature">${feature}</span>`).join('')}
                                    ${cabin.features.length > 2 ? `<span class="more-features">+${cabin.features.length - 2} more</span>` : ''}
                                </div>
                            </div>
                            <div class="cabin-price-section">
                                ${cabin.available ? `
                                    <div class="price">$${cabin.price}</div>
                                    <button class="select-cabin-btn" onclick="selectFlight('${flight.id}', '${cabin.type}', ${JSON.stringify({...flight, selectedCabin: cabin}).replace(/"/g, '&quot;')})">
                                        Select
                                    </button>
                                ` : `
                                    <div class="unavailable-text">Sold out</div>
                                `}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
            flightsContainer.appendChild(flightCard);
        });
    }

    displayResults(searchData) {
        const resultsContainer = document.querySelector('.search-results');
        if (!resultsContainer) {
            // Create results container if it doesn't exist
            const resultsHTML = `
                <section class="search-results">
                    <div class="container">
                        <div class="results-header">
                            <h2 id="results-title">Flight Results</h2>
                            <div class="results-info">
                                <span id="results-count">0 flights found</span>
                                <div class="sort-options">
                                    <select id="sort-flights">
                                        <option value="price">Sort by Price</option>
                                        <option value="duration">Sort by Duration</option>
                                        <option value="departure">Sort by Departure</option>
                                        <option value="arrival">Sort by Arrival</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="results-content">
                            <div class="filters-sidebar">
                                <div class="filter-section">
                                    <h3>Price Range</h3>
                                    <div class="price-filter">
                                        <input type="range" id="price-range" min="0" max="2000" value="2000">
                                        <div class="price-labels">
                                            <span>$0</span>
                                            <span id="max-price">$2000</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="flights-list" id="flights-list">
                                <!-- Flight results populated by JavaScript -->
                            </div>
                        </div>
                    </div>
                </section>
            `;
            
            // Insert after search section
            const searchSection = document.querySelector('.search-section');
            searchSection.insertAdjacentHTML('afterend', resultsHTML);
        }
        
        this.updateResultsHeader(searchData);
        this.displayFlights();
        this.setupFilters();
    }

    updateResultsHeader(searchData) {
        const { tripType, from, to, departure, return: returnDate } = searchData;
        const resultsTitle = document.getElementById('results-title');
        const resultsCount = document.getElementById('results-count');
        
        if (resultsTitle) {
            let title = '';
            if (tripType === 'oneway') {
                title = `One-way flights from ${from} to ${to}`;
            } else if (tripType === 'roundtrip') {
                title = `Round-trip flights from ${from} to ${to}`;
            } else if (tripType === 'multicity') {
                title = `Multi-city flights`;
            }
            resultsTitle.textContent = title;
        }
        
        if (resultsCount) {
            const outboundFlights = this.searchResults.filter(f => f.tripType === 'outbound');
            const returnFlights = this.searchResults.filter(f => f.tripType === 'return');
            
            let countText = '';
            if (tripType === 'oneway') {
                countText = `${outboundFlights.length} flights found`;
            } else if (tripType === 'roundtrip') {
                countText = `${outboundFlights.length} outbound, ${returnFlights.length} return flights found`;
            }
            resultsCount.textContent = countText;
        }
    }

    displayFlights() {
        const flightsContainer = document.querySelector('.flights-list');
        if (!flightsContainer) return;
        
        flightsContainer.innerHTML = '';
        
        this.searchResults.forEach(flight => {
            const flightCard = document.createElement('div');
            flightCard.className = 'flight-card';
            flightCard.innerHTML = `
                <div class="flight-info">
                    <div class="airline-section">
                        <div class="airline-logo">${flight.airlineCode}</div>
                        <div class="airline-name">${flight.airline}</div>
                    </div>
                    <div class="route-section">
                        <div class="departure">
                            <div class="time">${flight.departure.time}</div>
                            <div class="airport">${flight.from}</div>
                        </div>
                        <div class="flight-path">
                            <div class="duration">${flight.duration}</div>
                            <div class="flight-line"></div>
                            <div class="stops">${flight.stops}</div>
                        </div>
                        <div class="arrival">
                            <div class="time">${flight.arrival.time}</div>
                            <div class="airport">${flight.to}</div>
                        </div>
                    </div>
                    <div class="price-section">
                        <div class="price">$${flight.price}</div>
                        <button class="select-btn" onclick="selectFlight('${flight.id}', ${JSON.stringify(flight).replace(/"/g, '&quot;')})">Select</button>
                    </div>
                </div>
            `;
            flightsContainer.appendChild(flightCard);
        });
    }

    setupFilters() {
        // Sort functionality
        const sortSelect = document.getElementById('sort-flights');
        if (sortSelect) {
            sortSelect.addEventListener('change', this.sortFlights.bind(this));
        }
        
        // Price filter
        const priceFilter = document.getElementById('price-filter');
        if (priceFilter) {
            priceFilter.addEventListener('input', this.filterByPrice.bind(this));
        }
    }

    sortFlights(e) {
        const sortBy = e.target.value;
        
        switch (sortBy) {
            case 'price':
                this.searchResults.sort((a, b) => a.price - b.price);
                break;
            case 'duration':
                this.searchResults.sort((a, b) => {
                    const aDuration = parseInt(a.duration.replace(/[^\d]/g, ''));
                    const bDuration = parseInt(b.duration.replace(/[^\d]/g, ''));
                    return aDuration - bDuration;
                });
                break;
            case 'departure':
                this.searchResults.sort((a, b) => {
                    const aTime = a.departure.time.replace(':', '');
                    const bTime = b.departure.time.replace(':', '');
                    return aTime - bTime;
                });
                break;
            case 'arrival':
                this.searchResults.sort((a, b) => {
                    const aTime = a.arrival.time.replace(':', '');
                    const bTime = b.arrival.time.replace(':', '');
                    return aTime - bTime;
                });
                break;
        }
        
        this.displayFlights();
    }

    filterByPrice(e) {
        const maxPrice = parseInt(e.target.value);
        const filteredFlights = this.searchResults.filter(flight => flight.price <= maxPrice);
        
        // Temporarily store original results
        const originalResults = [...this.searchResults];
        this.searchResults = filteredFlights;
        this.displayFlights();
        
        // Update results count
        const resultsCountElement = document.querySelector('.results-count');
        if (resultsCountElement) {
            resultsCountElement.textContent = `${filteredFlights.length} flights found`;
        }
        
        // Restore original results for future filtering
        setTimeout(() => {
            this.searchResults = originalResults;
        }, 100);
    }

    loadPopularDestinations() {
        const destinations = [
            { city: 'London', country: 'United Kingdom', price: 'from $899', image: 'london.jpg' },
            { city: 'Paris', country: 'France', price: 'from $1,099', image: 'paris.jpg' },
            { city: 'Dubai', country: 'UAE', price: 'from $699', image: 'dubai.jpg' },
            { city: 'New York', country: 'USA', price: 'from $1,299', image: 'newyork.jpg' },
            { city: 'Tokyo', country: 'Japan', price: 'from $1,199', image: 'tokyo.jpg' },
            { city: 'Sydney', country: 'Australia', price: 'from $999', image: 'sydney.jpg' }
        ];
        
        const destinationsContainer = document.querySelector('.destinations-grid');
        if (destinationsContainer) {
            destinationsContainer.innerHTML = '';
            destinations.forEach(dest => {
                const destCard = document.createElement('div');
                destCard.className = 'destination-card';
                destCard.innerHTML = `
                    <div class="destination-image"></div>
                    <div class="destination-info">
                        <h3>${dest.city}</h3>
                        <p>${dest.country}</p>
                        <div class="destination-price">${dest.price}</div>
                    </div>
                `;
                destCard.addEventListener('click', () => selectDestination(`${dest.city} (${dest.city.substring(0,3).toUpperCase()})`));
                destinationsContainer.appendChild(destCard);
            });
        }
    }

    // Method to store selected flight data
    storeFlightData(flight, searchData) {
        const bookingData = {
            bookingReference: this.generateBookingReference(),
            searchData: searchData,
            selectedFlight: flight,
            passengers: this.passengers,
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
        return bookingData;
    }

    generateBookingReference() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

// Global function for flight selection
function selectFlight(flightId, cabinType, flightData) {
    const flight = window.flightBookingApp.flights.find(f => f.id === flightId);
    
    if (!flight) {
        window.flightBookingApp.showNotification('Flight not found. Please try again.', 'error');
        return;
    }
    
    // Check cabin availability
    const cabin = flight.cabins.find(c => c.type === cabinType);
    if (!cabin || cabin.available === 0) {
        window.flightBookingApp.showNotification('Sorry, this cabin class is not available.', 'warning');
        return;
    }
    
    try {
        // Store flight data
        window.flightBookingApp.storeFlightData(flight, flightData);
        
        // Redirect to passenger details
        window.location.href = 'passenger-details.html';
    } catch (error) {
        console.error('Error selecting flight:', error);
        window.flightBookingApp.showNotification('There was an error selecting this flight. Please try again.', 'error');
    }
}

function selectDestination(destination) {
    const toInput = document.getElementById('to-location');
    if (toInput) {
        toInput.value = destination;
        document.getElementById('from-location')?.focus();
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    window.flightApp = new FlightBookingApp();
});

// Flight scraper class for web scraping functionality
class FlightScraper {
    constructor() {
        this.scrapers = {
            'booking.com': this.scrapeBookingCom,
            'expedia.com': this.scrapeExpedia,
            'kayak.com': this.scrapeKayak
        };
    }

    async scrapeFlights(searchParams) {
        const results = [];
        
        for (const [site, scraper] of Object.entries(this.scrapers)) {
            try {
                const flights = await scraper(searchParams);
                results.push(...flights.map(flight => ({ ...flight, source: site })));
            } catch (error) {
                console.error(`Failed to scrape ${site}:`, error);
            }
        }
        
        return results;
    }

    async scrapeBookingCom(params) {
        // Implement Booking.com scraping logic
        return [];
    }

    async scrapeExpedia(params) {
        // Implement Expedia scraping logic
        return [];
    }

    async scrapeKayak(params) {
        // Implement Kayak scraping logic
        return [];
    }

    async scheduleDailyScraping() {
        // Schedule daily scraping for popular routes
        const popularRoutes = [
            { from: 'JNB', to: 'LHR' },
            { from: 'CPT', to: 'LHR' },
            { from: 'JNB', to: 'DXB' }
        ];
        
        setInterval(async () => {
            for (const route of popularRoutes) {
                await this.scrapeFlights(route);
            }
        }, 24 * 60 * 60 * 1000); // Daily
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FlightBookingApp, FlightScraper };
}