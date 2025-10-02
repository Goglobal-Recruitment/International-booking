class FlightSelector {
    constructor() {
        this.flights = [];
        this.filteredFlights = [];
        this.globalState = new GlobalState();
        this.init();
    }

    init() {
        this.loadFlightData();
        this.setupEventListeners();
        this.populateSearchSummary();
        this.renderFlights();
    }

    loadFlightData() {
        // Get search parameters from localStorage or URL
        const searchData = this.globalState.getSearchData();
        
        // Mock flight data - in a real app, this would come from an API
        this.flights = [
            {
                id: 'SA235',
                airline: 'South African Airways',
                flightNumber: 'SA235',
                logo: 'SA',
                departure: {
                    time: '08:30',
                    date: 'Mon 15 Jan',
                    airport: 'O.R. Tambo International (JNB)',
                    city: 'Johannesburg'
                },
                arrival: {
                    time: '19:00',
                    date: 'Mon 15 Jan',
                    airport: 'Heathrow Airport (LHR)',
                    city: 'London'
                },
                duration: '11h 30m',
                stops: 'Direct',
                price: 8999,
                class: 'Economy'
            },
            {
                id: 'EK761',
                airline: 'Emirates',
                flightNumber: 'EK761',
                logo: 'EK',
                departure: {
                    time: '10:15',
                    date: 'Mon 15 Jan',
                    airport: 'O.R. Tambo International (JNB)',
                    city: 'Johannesburg'
                },
                arrival: {
                    time: '21:45',
                    date: 'Mon 15 Jan',
                    airport: 'Heathrow Airport (LHR)',
                    city: 'London'
                },
                duration: '12h 30m',
                stops: '1 stop in Dubai',
                price: 7899,
                class: 'Economy'
            },
            {
                id: 'QR1361',
                airline: 'Qatar Airways',
                flightNumber: 'QR1361',
                logo: 'QR',
                departure: {
                    time: '14:20',
                    date: 'Mon 15 Jan',
                    airport: 'O.R. Tambo International (JNB)',
                    city: 'Johannesburg'
                },
                arrival: {
                    time: '06:30',
                    date: 'Tue 16 Jan',
                    airport: 'Heathrow Airport (LHR)',
                    city: 'London'
                },
                duration: '13h 10m',
                stops: '1 stop in Doha',
                price: 8299,
                class: 'Economy'
            },
            {
                id: 'BA6233',
                airline: 'British Airways',
                flightNumber: 'BA6233',
                logo: 'BA',
                departure: {
                    time: '20:30',
                    date: 'Mon 15 Jan',
                    airport: 'O.R. Tambo International (JNB)',
                    city: 'Johannesburg'
                },
                arrival: {
                    time: '07:15',
                    date: 'Tue 16 Jan',
                    airport: 'Heathrow Airport (LHR)',
                    city: 'London'
                },
                duration: '11h 45m',
                stops: 'Direct',
                price: 9499,
                class: 'Economy'
            },
            {
                id: 'LH572',
                airline: 'Lufthansa',
                flightNumber: 'LH572',
                logo: 'LH',
                departure: {
                    time: '16:45',
                    date: 'Mon 15 Jan',
                    airport: 'O.R. Tambo International (JNB)',
                    city: 'Johannesburg'
                },
                arrival: {
                    time: '08:20',
                    date: 'Tue 16 Jan',
                    airport: 'Heathrow Airport (LHR)',
                    city: 'London'
                },
                duration: '14h 35m',
                stops: '1 stop in Frankfurt',
                price: 7599,
                class: 'Economy'
            }
        ];

        this.filteredFlights = [...this.flights];
    }

    setupEventListeners() {
        // Filter event listeners
        document.getElementById('sort-by').addEventListener('change', () => this.applyFilters());
        document.getElementById('stops').addEventListener('change', () => this.applyFilters());
        document.getElementById('airlines').addEventListener('change', () => this.applyFilters());
        document.getElementById('price-range').addEventListener('change', () => this.applyFilters());
    }

    populateSearchSummary() {
        const searchData = this.globalState.getSearchData();
        
        if (searchData) {
            document.getElementById('from-city').textContent = searchData.from?.city || 'Johannesburg';
            document.getElementById('to-city').textContent = searchData.to?.city || 'London';
            
            const passengers = searchData.passengers || { adults: 1 };
            const totalPassengers = passengers.adults + (passengers.children || 0) + (passengers.infants || 0);
            const passengerText = totalPassengers === 1 ? '1 adult' : `${totalPassengers} passengers`;
            
            document.getElementById('search-details').textContent = 
                `${searchData.departureDate || 'Mon, 15 Jan'} • ${passengerText} • ${searchData.class || 'Economy'}`;
        }
    }

    applyFilters() {
        let filtered = [...this.flights];

        // Sort filter
        const sortBy = document.getElementById('sort-by').value;
        switch (sortBy) {
            case 'price':
                filtered.sort((a, b) => a.price - b.price);
                break;
            case 'duration':
                filtered.sort((a, b) => this.parseDuration(a.duration) - this.parseDuration(b.duration));
                break;
            case 'departure':
                filtered.sort((a, b) => this.parseTime(a.departure.time) - this.parseTime(b.departure.time));
                break;
            case 'arrival':
                filtered.sort((a, b) => this.parseTime(a.arrival.time) - this.parseTime(b.arrival.time));
                break;
        }

        // Stops filter
        const stops = document.getElementById('stops').value;
        if (stops === 'direct') {
            filtered = filtered.filter(flight => flight.stops === 'Direct');
        } else if (stops === '1-stop') {
            filtered = filtered.filter(flight => flight.stops === 'Direct' || flight.stops.includes('1 stop'));
        }

        // Airlines filter
        const airlines = document.getElementById('airlines').value;
        if (airlines !== 'all') {
            const airlineMap = {
                'sa': 'South African Airways',
                'emirates': 'Emirates',
                'qatar': 'Qatar Airways',
                'british': 'British Airways'
            };
            filtered = filtered.filter(flight => flight.airline === airlineMap[airlines]);
        }

        // Price filter
        const priceRange = document.getElementById('price-range').value;
        if (priceRange !== 'all') {
            const maxPrice = parseInt(priceRange);
            filtered = filtered.filter(flight => flight.price <= maxPrice);
        }

        this.filteredFlights = filtered;
        this.renderFlights();
    }

    parseDuration(duration) {
        const match = duration.match(/(\d+)h\s*(\d+)?m?/);
        if (match) {
            const hours = parseInt(match[1]);
            const minutes = match[2] ? parseInt(match[2]) : 0;
            return hours * 60 + minutes;
        }
        return 0;
    }

    parseTime(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    renderFlights() {
        const container = document.getElementById('flights-list');
        
        if (this.filteredFlights.length === 0) {
            container.innerHTML = `
                <div class="no-flights">
                    <i class="fas fa-plane" style="font-size: 48px; color: #ccc; margin-bottom: 16px;"></i>
                    <h3>No flights found</h3>
                    <p>Try adjusting your filters or search criteria.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.filteredFlights.map(flight => `
            <div class="flight-card">
                <div class="flight-header">
                    <div class="airline-info">
                        <div class="airline-logo">${flight.logo}</div>
                        <div class="airline-details">
                            <div class="airline-name">${flight.airline}</div>
                            <div class="flight-number">${flight.flightNumber}</div>
                        </div>
                    </div>
                    <div class="price-info">
                        <div class="price">R ${flight.price.toLocaleString()}</div>
                        <div class="price-note">per person</div>
                    </div>
                </div>
                
                <div class="flight-route">
                    <div class="departure">
                        <div class="time">${flight.departure.time}</div>
                        <div class="airport">${flight.departure.airport}</div>
                        <div class="date">${flight.departure.date}</div>
                    </div>
                    
                    <div class="flight-path">
                        <div class="duration">${flight.duration}</div>
                        <div class="path-line"></div>
                        <div class="stops">${flight.stops}</div>
                    </div>
                    
                    <div class="arrival">
                        <div class="time">${flight.arrival.time}</div>
                        <div class="airport">${flight.arrival.airport}</div>
                        <div class="date">${flight.arrival.date}</div>
                    </div>
                </div>
                
                <div class="flight-details">
                    <div class="flight-type">${flight.class}</div>
                    <button class="select-btn" onclick="selectFlight('${flight.id}')">
                        Select flight
                    </button>
                </div>
            </div>
        `).join('');
    }

    selectFlight(flightId) {
        const selectedFlight = this.flights.find(flight => flight.id === flightId);
        if (selectedFlight) {
            // Store selected flight in global state
            this.globalState.setSelectedFlight(selectedFlight);
            
            // Navigate to passenger details page
            window.location.href = 'passenger-details.html';
        }
    }
}

// Global functions
function modifySearch() {
    window.location.href = 'flights.html';
}

function selectFlight(flightId) {
    if (window.flightSelector) {
        window.flightSelector.selectFlight(flightId);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.flightSelector = new FlightSelector();
});