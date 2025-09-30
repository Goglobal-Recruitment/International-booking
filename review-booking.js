class ReviewBooking {
    constructor() {
        this.globalState = new GlobalState();
        this.flightData = null;
        this.passengerData = null;
        this.seatData = null;
        this.totalPrice = 0;
        this.init();
    }

    init() {
        this.loadBookingData();
        this.renderFlightSummary();
        this.renderPassengerDetails();
        this.renderSeatSummary();
        this.renderPriceSummary();
        this.setupEventListeners();
    }

    loadBookingData() {
        // Load flight data
        this.flightData = this.globalState.getSelectedFlight() || this.getDefaultFlightData();
        
        // Load passenger data from localStorage
        const passengerDataStr = localStorage.getItem('passengerDetails');
        this.passengerData = passengerDataStr ? JSON.parse(passengerDataStr) : this.getDefaultPassengerData();
        
        // Load seat data from localStorage
        const seatDataStr = localStorage.getItem('selectedSeats');
        this.seatData = seatDataStr ? JSON.parse(seatDataStr) : this.getDefaultSeatData();
    }

    getDefaultFlightData() {
        return {
            id: 'SA235',
            airline: 'South African Airways',
            flightNumber: 'SA235',
            departure: {
                time: '08:30',
                date: 'Mon 15 Jan 2024',
                airport: 'JNB',
                city: 'Johannesburg'
            },
            arrival: {
                time: '19:00',
                date: 'Mon 15 Jan 2024',
                airport: 'LHR',
                city: 'London'
            },
            duration: '11h 30m',
            type: 'Direct',
            price: 8999
        };
    }

    getDefaultPassengerData() {
        return {
            passengers: [
                {
                    title: 'Mr',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@email.com',
                    phone: '+27 12 345 6789',
                    dateOfBirth: '1990-01-01',
                    nationality: 'South African'
                }
            ]
        };
    }

    getDefaultSeatData() {
        return {
            seats: [
                {
                    passenger: 'John Doe',
                    seat: '15A',
                    type: 'Standard',
                    price: 0
                }
            ]
        };
    }

    renderFlightSummary() {
        const container = document.getElementById('flight-summary');
        const flight = this.flightData;

        container.innerHTML = `
            <div class="flight-route-summary">
                <div class="route-point departure">
                    <div class="route-time">${flight.departure.time}</div>
                    <div class="route-date">${flight.departure.date}</div>
                    <div class="route-airport">${flight.departure.airport} - ${flight.departure.city}</div>
                </div>
                
                <div class="route-path">
                    <div class="route-duration">${flight.duration}</div>
                    <div class="route-line"></div>
                    <div class="route-type">${flight.type}</div>
                </div>
                
                <div class="route-point arrival">
                    <div class="route-time">${flight.arrival.time}</div>
                    <div class="route-date">${flight.arrival.date}</div>
                    <div class="route-airport">${flight.arrival.airport} - ${flight.arrival.city}</div>
                </div>
            </div>
            
            <div class="flight-info-grid">
                <div class="info-item">
                    <span class="info-label">Airline</span>
                    <span class="info-value">${flight.airline}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Flight number</span>
                    <span class="info-value">${flight.flightNumber}</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Aircraft</span>
                    <span class="info-value">Boeing 777-300ER</span>
                </div>
                <div class="info-item">
                    <span class="info-label">Class</span>
                    <span class="info-value">Economy</span>
                </div>
            </div>
        `;
    }

    renderPassengerDetails() {
        const container = document.getElementById('passenger-list');
        const passengers = this.passengerData.passengers;

        container.innerHTML = passengers.map((passenger, index) => `
            <div class="passenger-item">
                <div class="passenger-info">
                    <div class="passenger-avatar">${passenger.firstName.charAt(0)}</div>
                    <div class="passenger-details">
                        <h4>${passenger.title} ${passenger.firstName} ${passenger.lastName}</h4>
                        <p>${passenger.email} • ${passenger.phone}</p>
                    </div>
                </div>
                <div class="passenger-extras">
                    <span class="info-value">Adult</span>
                </div>
            </div>
        `).join('');
    }

    renderSeatSummary() {
        const container = document.getElementById('seat-summary');
        const seats = this.seatData.seats;

        container.innerHTML = `
            <div class="seat-list">
                ${seats.map(seat => `
                    <div class="info-item">
                        <span class="info-label">${seat.passenger}</span>
                        <span class="info-value">Seat ${seat.seat} (${seat.type})</span>
                    </div>
                `).join('')}
            </div>
        `;
    }

    renderPriceSummary() {
        const container = document.getElementById('price-breakdown');
        const flight = this.flightData;
        const passengers = this.passengerData.passengers;
        const seats = this.seatData.seats;

        const flightPrice = flight.price * passengers.length;
        const seatPrice = seats.reduce((total, seat) => total + (seat.price || 0), 0);
        const taxes = Math.round(flightPrice * 0.15);
        const fees = 299;
        
        this.totalPrice = flightPrice + seatPrice + taxes + fees;

        container.innerHTML = `
            <div class="price-item">
                <span>Flight (${passengers.length} passenger${passengers.length > 1 ? 's' : ''})</span>
                <span>R ${flightPrice.toLocaleString()}</span>
            </div>
            ${seatPrice > 0 ? `
                <div class="price-item">
                    <span>Seat selection</span>
                    <span>R ${seatPrice.toLocaleString()}</span>
                </div>
            ` : ''}
            <div class="price-item">
                <span>Taxes and fees</span>
                <span>R ${taxes.toLocaleString()}</span>
            </div>
            <div class="price-item">
                <span>Booking fee</span>
                <span>R ${fees.toLocaleString()}</span>
            </div>
            <div class="price-item total">
                <span>Total</span>
                <span>R ${this.totalPrice.toLocaleString()}</span>
            </div>
        `;
    }

    setupEventListeners() {
        const termsCheckbox = document.getElementById('terms-agreement');
        const continueBtn = document.getElementById('continue-btn');

        termsCheckbox.addEventListener('change', function() {
            continueBtn.disabled = !this.checked;
        });
    }

    editFlight() {
        window.location.href = 'select-flight.html';
    }

    editPassengers() {
        window.location.href = 'passenger-details.html';
    }

    editSeats() {
        window.location.href = 'seat-selection.html';
    }

    proceedToPayment() {
        // Save booking summary to localStorage
        const bookingSummary = {
            flight: this.flightData,
            passengers: this.passengerData,
            seats: this.seatData,
            totalPrice: this.totalPrice,
            bookingDate: new Date().toISOString()
        };

        localStorage.setItem('bookingSummary', JSON.stringify(bookingSummary));
        
        // Navigate to payment page
        window.location.href = 'payment.html';
    }
}

// Global functions
function editFlight() {
    reviewBooking.editFlight();
}

function editPassengers() {
    reviewBooking.editPassengers();
}

function editSeats() {
    reviewBooking.editSeats();
}

function proceedToPayment() {
    reviewBooking.proceedToPayment();
}

// Initialize when page loads
let reviewBooking;
document.addEventListener('DOMContentLoaded', function() {
    reviewBooking = new ReviewBooking();
});