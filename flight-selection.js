// Flight Selection Page - Enhanced Booking.com Style
class FlightSelectionApp {
    constructor() {
        // Airline logo mapping
        this.airlineLogos = {
            'British Airways': 'images/ba-logo.png',
            'South African Airways': 'images/saa-logo.png',
            'Emirates': 'images/emirates-logo.png',
            'Qatar Airways': 'images/qatar-logo.png',
            'Lufthansa': 'images/lufthansa-logo.png'
        };

        this.flights = [
            {
                id: 1,
                airline: { name: 'British Airways', code: 'BA', logo: 'images/ba-logo.png' },
                flightNumber: 'BA6234',
                departure: { airport: 'JNB', time: '14:30', city: 'Johannesburg' },
                arrival: { airport: 'LHR', time: '06:45+1', city: 'London' },
                duration: '11h 15m',
                stops: 0,
                price: 17100,
                aircraft: 'Boeing 777-300ER',
                popularity: 95,
                onTimePerformance: 88,
                cabinClasses: [
                    { 
                        type: 'economy', 
                        available: true, 
                        price: 17100, 
                        seatsLeft: 12,
                        features: ['Standard seat', 'Meal included', 'Carry-on bag', '23kg checked bag'] 
                    },
                    { 
                        type: 'premium', 
                        available: true, 
                        price: 25650, 
                        seatsLeft: 8,
                        features: ['Extra legroom', 'Premium meal', 'Priority boarding', '32kg checked bag'] 
                    },
                    { 
                        type: 'business', 
                        available: true, 
                        price: 51300, 
                        seatsLeft: 4,
                        features: ['Lie-flat seat', 'Gourmet dining', 'Lounge access', 'Priority check-in'] 
                    },
                    { 
                        type: 'first', 
                        available: true, 
                        price: 85500, 
                        seatsLeft: 2,
                        features: ['Private suite', 'Chef-prepared meals', 'Chauffeur service', 'Spa access'] 
                    }
                ]
            },
            {
                id: 2,
                airline: { name: 'South African Airways', code: 'SA', logo: 'images/saa-logo.png' },
                flightNumber: 'SA235',
                departure: { airport: 'JNB', time: '08:30', city: 'Johannesburg' },
                arrival: { airport: 'LHR', time: '19:00', city: 'London' },
                duration: '11h 30m',
                stops: 0,
                price: 15800,
                aircraft: 'Airbus A350-900',
                popularity: 92,
                onTimePerformance: 85,
                cabinClasses: [
                    { 
                        type: 'economy', 
                        available: true, 
                        price: 15800, 
                        seatsLeft: 18,
                        features: ['Standard seat', 'Meal included', 'Carry-on bag', '23kg checked bag'] 
                    },
                    { 
                        type: 'premium', 
                        available: true, 
                        price: 23700, 
                        seatsLeft: 6,
                        features: ['Extra legroom', 'Premium meal', 'Priority boarding', '32kg checked bag'] 
                    },
                    { 
                        type: 'business', 
                        available: true, 
                        price: 47400, 
                        seatsLeft: 3,
                        features: ['Lie-flat seat', 'Gourmet dining', 'Lounge access', 'Priority check-in'] 
                    }
                ]
            },
            {
                id: 3,
                airline: { name: 'Emirates', code: 'EK', logo: 'images/emirates-logo.png' },
                flightNumber: 'EK761',
                departure: { airport: 'JNB', time: '22:15', city: 'Johannesburg' },
                arrival: { airport: 'LHR', time: '14:30+1', city: 'London' },
                duration: '11h 15m',
                stops: 1,
                price: 19500,
                aircraft: 'Airbus A380-800',
                popularity: 98,
                onTimePerformance: 92,
                stopover: { airport: 'DXB', duration: '2h 15m' },
                cabinClasses: [
                    { 
                        type: 'economy', 
                        available: true, 
                        price: 19500, 
                        seatsLeft: 25,
                        features: ['Standard seat', 'Meal included', 'Carry-on bag', '30kg checked bag'] 
                    },
                    { 
                        type: 'premium', 
                        available: true, 
                        price: 29250, 
                        seatsLeft: 12,
                        features: ['Extra legroom', 'Premium meal', 'Priority boarding', '35kg checked bag'] 
                    },
                    { 
                        type: 'business', 
                        available: true, 
                        price: 58500, 
                        seatsLeft: 8,
                        features: ['Lie-flat seat', 'Gourmet dining', 'Lounge access', 'Shower spa'] 
                    },
                    { 
                        type: 'first', 
                        available: true, 
                        price: 97500, 
                        seatsLeft: 1,
                        features: ['Private suite', 'Chef-prepared meals', 'Chauffeur service', 'Onboard shower'] 
                    }
                ]
            },
            {
                id: 4,
                airline: { name: 'Qatar Airways', code: 'QR', logo: 'images/qatar-logo.png' },
                flightNumber: 'QR1367',
                departure: { airport: 'JNB', time: '16:45', city: 'Johannesburg' },
                arrival: { airport: 'LHR', time: '08:15+1', city: 'London' },
                duration: '12h 30m',
                stops: 1,
                price: 18200,
                aircraft: 'Boeing 787-9',
                popularity: 94,
                onTimePerformance: 90,
                stopover: { airport: 'DOH', duration: '1h 45m' },
                cabinClasses: [
                    { 
                        type: 'economy', 
                        available: true, 
                        price: 18200, 
                        seatsLeft: 15,
                        features: ['Standard seat', 'Meal included', 'Carry-on bag', '30kg checked bag'] 
                    },
                    { 
                        type: 'premium', 
                        available: true, 
                        price: 27300, 
                        seatsLeft: 7,
                        features: ['Extra legroom', 'Premium meal', 'Priority boarding', '35kg checked bag'] 
                    },
                    { 
                        type: 'business', 
                        available: true, 
                        price: 54600, 
                        seatsLeft: 5,
                        features: ['Lie-flat seat', 'Gourmet dining', 'Lounge access', 'Qsuite privacy'] 
                    }
                ]
            },
            {
                id: 5,
                airline: { name: 'Lufthansa', code: 'LH', logo: 'images/lufthansa-logo.png' },
                flightNumber: 'LH572',
                departure: { airport: 'JNB', time: '20:30', city: 'Johannesburg' },
                arrival: { airport: 'LHR', time: '12:45+1', city: 'London' },
                duration: '13h 15m',
                stops: 1,
                price: 16900,
                aircraft: 'Airbus A330-300',
                popularity: 87,
                onTimePerformance: 83,
                stopover: { airport: 'FRA', duration: '2h 30m' },
                cabinClasses: [
                    { 
                        type: 'economy', 
                        available: true, 
                        price: 16900, 
                        seatsLeft: 20,
                        features: ['Standard seat', 'Meal included', 'Carry-on bag', '23kg checked bag'] 
                    },
                    { 
                        type: 'premium', 
                        available: true, 
                        price: 25350, 
                        seatsLeft: 9,
                        features: ['Extra legroom', 'Premium meal', 'Priority boarding', '32kg checked bag'] 
                    },
                    { 
                        type: 'business', 
                        available: true, 
                        price: 50700, 
                        seatsLeft: 6,
                        features: ['Lie-flat seat', 'Gourmet dining', 'Lounge access', 'Premium amenities'] 
                    }
                ]
            }
        ];

        this.filteredFlights = [...this.flights];
        this.selectedFlight = null;
        this.sortBy = 'recommended';
        this.filters = {
            airlines: new Set(),
            stops: new Set(),
            timeRanges: new Set(),
            maxPrice: 100000
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.renderFlights();
        this.updateResultsCount();
    }

    setupEventListeners() {
        // Sort options
        document.querySelectorAll('input[name="sort"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.sortBy = e.target.value;
                this.renderFlights();
            });
        });

        // Price filter
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            priceSlider.addEventListener('input', (e) => {
                this.filters.maxPrice = parseInt(e.target.value);
                this.applyFilters();
            });
        }

        // Airline filters
        document.querySelectorAll('.airline-filter input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const airline = e.target.value;
                if (e.target.checked) {
                    this.filters.airlines.add(airline);
                } else {
                    this.filters.airlines.delete(airline);
                }
                this.applyFilters();
            });
        });

        // Stops filters
        document.querySelectorAll('.stop-filter input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const stops = parseInt(e.target.value);
                if (e.target.checked) {
                    this.filters.stops.add(stops);
                } else {
                    this.filters.stops.delete(stops);
                }
                this.applyFilters();
            });
        });

        // Time filters
        document.querySelectorAll('.time-filter input').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const timeRange = e.target.value;
                if (e.target.checked) {
                    this.filters.timeRanges.add(timeRange);
                } else {
                    this.filters.timeRanges.delete(timeRange);
                }
                this.applyFilters();
            });
        });

        // Clear filters
        const clearFilters = document.querySelector('.clear-filters');
        if (clearFilters) {
            clearFilters.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }
    }

    renderFlights() {
        const flightsList = document.getElementById('flights-list');
        const sortedFlights = this.sortFlights([...this.filteredFlights]);
        
        // Add loading state
        flightsList.classList.add('loading');
        
        setTimeout(() => {
            flightsList.innerHTML = sortedFlights.map(flight => this.createFlightCard(flight)).join('');
            flightsList.classList.remove('loading');
            
            // Add click event listeners to flight cards
            this.attachFlightCardListeners();
        }, 300);
    }

    attachFlightCardListeners() {
        document.querySelectorAll('.flight-card').forEach(card => {
            // Cabin selection
            card.querySelectorAll('.cabin-option').forEach(cabinOption => {
                cabinOption.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const cabinType = cabinOption.dataset.cabinType;
                    const flightId = parseInt(card.dataset.flightId);
                    this.selectFlight(flightId, cabinType);
                });
            });

            // Flight card hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-4px)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)';
            });
        });
    }

    createFlightCard(flight) {
        const isSelected = this.selectedFlight && this.selectedFlight.id === flight.id;
        const popularityBadge = flight.popularity >= 95 ? '<span class="popularity-badge">Most Popular</span>' : '';
        
        return `
            <div class="flight-card ${isSelected ? 'selected' : ''}" data-flight-id="${flight.id}">
                <div class="flight-main">
                    ${popularityBadge}
                    <div class="flight-header">
                        <div class="airline-info">
                            <div class="airline-logo">
                                <img src="${flight.airline.logo}" alt="${flight.airline.name}" 
                                     style="width: 100%; height: 100%; object-fit: contain; border-radius: 4px;"
                                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                                <div style="display: none; width: 100%; height: 100%; background: #0071c2; color: white; 
                                           align-items: center; justify-content: center; font-weight: bold; border-radius: 4px;">
                                    ${flight.airline.code}
                                </div>
                            </div>
                            <div class="airline-details">
                                <div class="airline-name">${flight.airline.name}</div>
                                <div class="flight-number">${flight.flightNumber}</div>
                            </div>
                        </div>
                        
                        <div class="flight-route">
                            <div class="departure">
                                <div class="time">${flight.departure.time}</div>
                                <div class="airport">${flight.departure.airport}</div>
                            </div>
                            
                            <div class="flight-path">
                                <div class="duration">${flight.duration}</div>
                                <div class="flight-line">
                                    ${flight.stops > 0 ? '<div class="stop-indicator"></div>' : ''}
                                </div>
                                <div class="stops">
                                    ${flight.stops === 0 ? 'Direct' : 
                                      flight.stops === 1 ? `1 stop${flight.stopover ? ' via ' + flight.stopover.airport : ''}` : 
                                      flight.stops + ' stops'}
                                </div>
                            </div>
                            
                            <div class="arrival">
                                <div class="time">${flight.arrival.time}</div>
                                <div class="airport">${flight.arrival.airport}</div>
                            </div>
                        </div>
                        
                        <div class="flight-price">
                            <div class="price-from">from</div>
                            <div class="price-amount">R${flight.price.toLocaleString()}</div>
                            <div class="price-per-person">per person</div>
                        </div>
                    </div>
                    
                    <div class="cabin-options">
                        ${flight.cabinClasses.map(cabin => `
                            <div class="cabin-option ${!cabin.available ? 'unavailable' : ''}" data-cabin-type="${cabin.type}">
                                <div class="cabin-header">
                                    <div class="cabin-name">${this.getCabinName(cabin.type)}</div>
                                    <div class="cabin-price">R${cabin.price.toLocaleString()}</div>
                                </div>
                                <div class="cabin-features">
                                    ${cabin.features.slice(0, 3).map(feature => `<span class="feature">${feature}</span>`).join('')}
                                </div>
                                ${cabin.seatsLeft <= 5 && cabin.available ? 
                                    `<div class="seats-left">${cabin.seatsLeft} seats left</div>` : ''}
                                ${!cabin.available ? 
                                    '<div class="unavailable-label">Sold out</div>' : 
                                    '<button class="select-btn">Select</button>'}
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="flight-details">
                    <div class="aircraft-info">
                        <i class="fas fa-plane"></i>
                        <span>${flight.aircraft}</span>
                    </div>
                    <div class="performance-info">
                        <span class="on-time">On-time: ${flight.onTimePerformance}%</span>
                    </div>
                </div>
            </div>
        `;
    }

    getCabinName(type) {
        const names = {
            economy: 'Economy',
            premium: 'Premium Economy',
            business: 'Business Class',
            first: 'First Class'
        };
        return names[type] || type;
    }

    sortFlights(flights) {
        switch (this.sortBy) {
            case 'price':
                return flights.sort((a, b) => a.price - b.price);
            case 'duration':
                return flights.sort((a, b) => this.parseDuration(a.duration) - this.parseDuration(b.duration));
            case 'departure':
                return flights.sort((a, b) => a.departure.time.localeCompare(b.departure.time));
            default:
                // Recommended: balance of price, duration, stops, and popularity
                return flights.sort((a, b) => {
                    const scoreA = (a.price / 1000) + 
                                  (this.parseDuration(a.duration) / 10) + 
                                  (a.stops * 50) - 
                                  (a.popularity / 10);
                    const scoreB = (b.price / 1000) + 
                                  (this.parseDuration(b.duration) / 10) + 
                                  (b.stops * 50) - 
                                  (b.popularity / 10);
                    return scoreA - scoreB;
                });
        }
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

    applyFilters() {
        this.filteredFlights = this.flights.filter(flight => {
            // Price filter
            if (flight.price > this.filters.maxPrice) return false;
            
            // Airline filter
            if (this.filters.airlines.size > 0 && !this.filters.airlines.has(flight.airline.code)) {
                return false;
            }
            
            // Stops filter
            if (this.filters.stops.size > 0 && !this.filters.stops.has(flight.stops)) {
                return false;
            }
            
            // Time range filter
            if (this.filters.timeRanges.size > 0) {
                const departureHour = parseInt(flight.departure.time.split(':')[0]);
                let matchesTimeRange = false;
                
                this.filters.timeRanges.forEach(range => {
                    switch (range) {
                        case 'morning':
                            if (departureHour >= 6 && departureHour < 12) matchesTimeRange = true;
                            break;
                        case 'afternoon':
                            if (departureHour >= 12 && departureHour < 18) matchesTimeRange = true;
                            break;
                        case 'evening':
                            if (departureHour >= 18 && departureHour < 24) matchesTimeRange = true;
                            break;
                        case 'night':
                            if (departureHour >= 0 && departureHour < 6) matchesTimeRange = true;
                            break;
                    }
                });
                
                if (!matchesTimeRange) return false;
            }
            
            return true;
        });
        
        this.renderFlights();
        this.updateResultsCount();
    }

    updateResultsCount() {
        const resultsCount = document.querySelector('.results-count');
        if (resultsCount) {
            resultsCount.textContent = `${this.filteredFlights.length} flights found`;
        }
    }

    selectFlight(flightId, cabinType = 'economy') {
        const flight = this.flights.find(f => f.id === flightId);
        if (!flight) return;

        const cabin = flight.cabinClasses.find(c => c.type === cabinType);
        if (!cabin || !cabin.available) return;

        this.selectedFlight = flight;
        this.selectedCabin = cabin;

        // Generate realistic booking reference
        const generateBookingReference = () => {
            const prefixes = ['BK', 'FL', 'TR', 'AV', 'JT'];
            const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const numbers = Math.floor(Math.random() * 900000000) + 100000000;
            return prefix + numbers;
        };

        // Store selection in localStorage with realistic booking reference
        const bookingData = {
            selectedFlight: {
                ...flight,
                airline: flight.airline.name,
                flightNumber: flight.flightNumber
            },
            selectedCabin: cabin,
            bookingReference: generateBookingReference(),
            pricing: {
                basePrice: cabin.price,
                taxes: Math.round(cabin.price * 0.15),
                discount: Math.round(cabin.price * 0.1),
                total: Math.round(cabin.price * 1.05)
            }
        };

        localStorage.setItem('bookingData', JSON.stringify(bookingData));

        // Update UI
        this.renderFlights();
        this.showNotification(`${flight.airline.name} ${flight.flightNumber} selected in ${this.getCabinName(cabinType)} class`, 'success');

        // Auto-scroll to continue button
        setTimeout(() => {
            const continueBtn = document.querySelector('.continue-booking');
            if (continueBtn) {
                continueBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 500);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style the notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '16px 24px',
            borderRadius: '8px',
            color: 'white',
            fontWeight: '600',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            backgroundColor: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#0071c2'
        });
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    clearAllFilters() {
        // Reset all filters
        this.filters = {
            airlines: new Set(),
            stops: new Set(),
            timeRanges: new Set(),
            maxPrice: 100000
        };
        
        // Reset UI elements
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        const priceSlider = document.getElementById('price-slider');
        if (priceSlider) {
            priceSlider.value = 100000;
        }
        
        this.filteredFlights = [...this.flights];
        this.renderFlights();
        this.updateResultsCount();
        
        this.showNotification('All filters cleared', 'info');
    }
}

// Initialize the app with enhanced error handling
document.addEventListener('DOMContentLoaded', () => {
    try {
        new FlightSelectionApp();
    } catch (error) {
        console.error('Failed to initialize Flight Selection App:', error);
        // Show user-friendly error message
        const errorDiv = document.createElement('div');
        errorDiv.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #ef4444;">
                <h3>Sorry, there was an error loading the flights.</h3>
                <p>Please refresh the page or try again later.</p>
            </div>
        `;
        document.getElementById('flights-list')?.appendChild(errorDiv);
    }
});

function goToPassengerDetails() {
    window.location.href = 'passenger-details.html';
}

// Add notification styles
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    padding: 16px 20px;
    z-index: 1000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    border-left: 4px solid #0071c2;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: #10b981;
}

.notification-error {
    border-left-color: #ef4444;
}

.notification-info {
    border-left-color: #0071c2;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
    font-weight: 500;
    color: #1a1a1a;
}

.notification-content i {
    font-size: 18px;
}

.notification-success .notification-content i {
    color: #10b981;
}

.notification-error .notification-content i {
    color: #ef4444;
}

.notification-info .notification-content i {
    color: #0071c2;
}

.no-results {
    text-align: center;
    padding: 60px 20px;
    color: #6b7280;
}

.no-results-icon {
    font-size: 48px;
    margin-bottom: 20px;
    opacity: 0.5;
}

.no-results h3 {
    font-size: 24px;
    margin-bottom: 12px;
    color: #1a1a1a;
}

.no-results p {
    font-size: 16px;
    margin-bottom: 24px;
}

.clear-filters-btn {
    background: #0071c2;
    color: white;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
}

.clear-filters-btn:hover {
    background: #005999;
}

.flight-badges {
    display: flex;
    gap: 12px;
    margin: 16px 0;
}

.badge {
    display: flex;
    align-items: center;
    gap: