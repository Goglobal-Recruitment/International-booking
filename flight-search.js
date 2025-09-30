class FlightSearch {
    constructor() {
        this.globalState = new GlobalState();
        this.airports = this.globalState.airportData;
        this.passengers = { adults: 1, children: 0 };
        this.tripType = 'round-trip';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupDateInputs();
        this.loadSavedData();
        this.updatePassengersDisplay();
    }

    setupEventListeners() {
        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
        });

        // Location inputs
        document.getElementById('from-location').addEventListener('input', (e) => this.handleLocationInput(e, 'from'));
        document.getElementById('to-location').addEventListener('input', (e) => this.handleLocationInput(e, 'to'));

        // Swap locations
        document.getElementById('swap-locations').addEventListener('click', () => this.swapLocations());

        // Passengers dropdown
        document.getElementById('passengers-btn').addEventListener('click', () => this.togglePassengersDropdown());
        document.querySelectorAll('.passenger-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.handlePassengerChange(e));
        });

        // Form submission
        document.getElementById('flight-search-form').addEventListener('submit', (e) => this.handleSearch(e));

        // Popular destinations
        document.querySelectorAll('.destination-card').forEach(card => {
            card.addEventListener('click', (e) => this.selectDestination(e.currentTarget.dataset.destination));
        });

        // Close dropdowns when clicking outside
        document.addEventListener('click', (e) => this.handleOutsideClick(e));
    }

    setupDateInputs() {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        const nextWeek = new Date(today);
        nextWeek.setDate(nextWeek.getDate() + 7);

        document.getElementById('departure-date').min = today.toISOString().split('T')[0];
        document.getElementById('departure-date').value = tomorrow.toISOString().split('T')[0];
        document.getElementById('return-date').min = tomorrow.toISOString().split('T')[0];
        document.getElementById('return-date').value = nextWeek.toISOString().split('T')[0];

        // Update return date minimum when departure date changes
        document.getElementById('departure-date').addEventListener('change', (e) => {
            const departureDate = new Date(e.target.value);
            const returnDate = new Date(departureDate);
            returnDate.setDate(returnDate.getDate() + 1);
            document.getElementById('return-date').min = returnDate.toISOString().split('T')[0];
        });
    }

    switchTab(tabType) {
        this.tripType = tabType;
        
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-tab="${tabType}"]`).classList.add('active');

        // Show/hide return date
        const returnDateGroup = document.getElementById('return-date-group');
        if (tabType === 'one-way') {
            returnDateGroup.style.display = 'none';
        } else {
            returnDateGroup.style.display = 'block';
        }

        // Update global state
        this.globalState.updateTripType(tabType);
    }

    handleLocationInput(event, type) {
        const input = event.target;
        const query = input.value.toLowerCase();
        const dropdown = document.getElementById(`${type}-dropdown`);

        if (query.length < 2) {
            dropdown.style.display = 'none';
            return;
        }

        const matches = Object.entries(this.airports)
            .filter(([code, data]) => 
                code.toLowerCase().includes(query) ||
                data.city.toLowerCase().includes(query) ||
                data.name.toLowerCase().includes(query)
            )
            .slice(0, 8);

        if (matches.length > 0) {
            dropdown.innerHTML = matches.map(([code, data]) => `
                <div class="location-option" data-code="${code}">
                    <div>
                        <div class="airport-code">${code}</div>
                        <div class="airport-name">${data.name}</div>
                        <div class="airport-city">${data.city}, ${data.country}</div>
                    </div>
                </div>
            `).join('');

            dropdown.style.display = 'block';

            // Add click listeners to options
            dropdown.querySelectorAll('.location-option').forEach(option => {
                option.addEventListener('click', () => {
                    const code = option.dataset.code;
                    const airportData = this.airports[code];
                    input.value = `${airportData.city} (${code})`;
                    input.dataset.code = code;
                    dropdown.style.display = 'none';
                });
            });
        } else {
            dropdown.style.display = 'none';
        }
    }

    swapLocations() {
        const fromInput = document.getElementById('from-location');
        const toInput = document.getElementById('to-location');
        
        const fromValue = fromInput.value;
        const fromCode = fromInput.dataset.code;
        const toValue = toInput.value;
        const toCode = toInput.dataset.code;

        fromInput.value = toValue;
        fromInput.dataset.code = toCode;
        toInput.value = fromValue;
        toInput.dataset.code = fromCode;
    }

    togglePassengersDropdown() {
        const dropdown = document.getElementById('passengers-dropdown');
        dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    }

    handlePassengerChange(event) {
        event.preventDefault();
        const action = event.target.dataset.action;
        const type = event.target.dataset.type;

        if (action === 'increase') {
            if (type === 'adults' && this.passengers.adults < 9) {
                this.passengers.adults++;
            } else if (type === 'children' && this.passengers.children < 8) {
                this.passengers.children++;
            }
        } else if (action === 'decrease') {
            if (type === 'adults' && this.passengers.adults > 1) {
                this.passengers.adults--;
            } else if (type === 'children' && this.passengers.children > 0) {
                this.passengers.children--;
            }
        }

        this.updatePassengersDisplay();
    }

    updatePassengersDisplay() {
        document.getElementById('adults-count').textContent = this.passengers.adults;
        document.getElementById('children-count').textContent = this.passengers.children;

        const total = this.passengers.adults + this.passengers.children;
        let text = `${this.passengers.adults} adult${this.passengers.adults > 1 ? 's' : ''}`;
        if (this.passengers.children > 0) {
            text += `, ${this.passengers.children} child${this.passengers.children > 1 ? 'ren' : ''}`;
        }
        document.getElementById('passengers-text').textContent = text;
    }

    selectDestination(destinationCode) {
        const toInput = document.getElementById('to-location');
        const airportData = this.airports[destinationCode];
        if (airportData) {
            toInput.value = `${airportData.city} (${destinationCode})`;
            toInput.dataset.code = destinationCode;
        }
    }

    handleOutsideClick(event) {
        // Close location dropdowns
        if (!event.target.closest('.location-input-wrapper')) {
            document.querySelectorAll('.location-dropdown').forEach(dropdown => {
                dropdown.style.display = 'none';
            });
        }

        // Close passengers dropdown
        if (!event.target.closest('.passengers-dropdown-wrapper')) {
            document.getElementById('passengers-dropdown').style.display = 'none';
        }
    }

    loadSavedData() {
        const savedSearch = this.globalState.getSearchData();
        if (savedSearch) {
            if (savedSearch.from) {
                const fromInput = document.getElementById('from-location');
                const fromAirport = this.airports[savedSearch.from];
                if (fromAirport) {
                    fromInput.value = `${fromAirport.city} (${savedSearch.from})`;
                    fromInput.dataset.code = savedSearch.from;
                }
            }
            if (savedSearch.to) {
                const toInput = document.getElementById('to-location');
                const toAirport = this.airports[savedSearch.to];
                if (toAirport) {
                    toInput.value = `${toAirport.city} (${savedSearch.to})`;
                    toInput.dataset.code = savedSearch.to;
                }
            }
        }
    }

    handleSearch(event) {
        event.preventDefault();

        const fromInput = document.getElementById('from-location');
        const toInput = document.getElementById('to-location');
        const departureDate = document.getElementById('departure-date').value;
        const returnDate = document.getElementById('return-date').value;
        const cabinClass = document.getElementById('cabin-class').value;

        // Validation
        if (!fromInput.dataset.code) {
            alert('Please select a departure airport');
            return;
        }
        if (!toInput.dataset.code) {
            alert('Please select a destination airport');
            return;
        }
        if (!departureDate) {
            alert('Please select a departure date');
            return;
        }
        if (this.tripType === 'round-trip' && !returnDate) {
            alert('Please select a return date');
            return;
        }

        // Save search data
        const searchData = {
            from: fromInput.dataset.code,
            to: toInput.dataset.code,
            departureDate,
            returnDate: this.tripType === 'round-trip' ? returnDate : null,
            passengers: this.passengers,
            cabinClass,
            tripType: this.tripType
        };

        this.globalState.updateSearchData(searchData);
        
        // Redirect to flight selection
        window.location.href = 'select-flight.html';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FlightSearch();
});