class SeatSelector {
    constructor() {
        this.selectedSeats = [];
        this.flightData = null;
        this.passengerCount = 1;
        this.seatPrices = {
            economy: { standard: 0, extra: 25, exit: 35 },
            premium: { standard: 50, extra: 75, exit: 85 },
            business: { standard: 150, extra: 175, exit: 185 }
        };
        this.init();
    }

    init() {
        this.loadFlightData();
        this.generateSeatMap();
        this.setupEventListeners();
        this.updateProgressBar();
    }

    loadFlightData() {
        // Load flight data from localStorage or use default
        this.flightData = JSON.parse(localStorage.getItem('selectedFlight')) || {
            airline: 'Emirates',
            flightNumber: 'EK 764',
            from: 'JNB',
            to: 'DXB',
            departure: '2024-02-15',
            departureTime: '10:30',
            arrival: '2024-02-15',
            arrivalTime: '18:45',
            duration: '8h 15m',
            aircraft: 'Boeing 777-300ER',
            class: 'Economy'
        };

        this.passengerCount = parseInt(localStorage.getItem('passengerCount')) || 1;
        
        // Update flight info display
        this.updateFlightInfo();
    }

    updateFlightInfo() {
        const flightInfo = document.querySelector('.flight-info');
        if (flightInfo) {
            flightInfo.innerHTML = `
                <div class="flight-route">
                    <span class="route-text">${this.flightData.from} → ${this.flightData.to}</span>
                    <span class="flight-number">${this.flightData.flightNumber}</span>
                </div>
                <div class="flight-details">
                    <span>${this.formatDate(this.flightData.departure)}</span>
                    <span>${this.flightData.departureTime} - ${this.flightData.arrivalTime}</span>
                    <span>${this.flightData.duration}</span>
                </div>
            `;
        }
    }

    generateSeatMap() {
        const seatMap = document.querySelector('.seat-map');
        if (!seatMap) return;

        const rows = 30; // Economy section
        const seatsPerRow = 6; // A-B-C | D-E-F layout
        const seatLabels = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        let seatMapHTML = '<div class="aircraft-section">';
        seatMapHTML += '<div class="section-header">Economy Class</div>';

        for (let row = 1; row <= rows; row++) {
            seatMapHTML += `<div class="seat-row" data-row="${row}">`;
            seatMapHTML += `<div class="row-number">${row}</div>`;
            
            for (let i = 0; i < seatsPerRow; i++) {
                const seatLabel = seatLabels[i];
                const seatId = `${row}${seatLabel}`;
                const isAisle = i === 2; // Add aisle after C
                const isOccupied = Math.random() < 0.3; // 30% occupied
                const isExitRow = row === 12 || row === 13;
                const isExtraLegroom = row <= 5;
                
                let seatClass = 'seat';
                let seatType = 'standard';
                let price = 0;
                
                if (isOccupied) {
                    seatClass += ' occupied';
                } else if (isExitRow) {
                    seatClass += ' exit-row';
                    seatType = 'exit';
                    price = this.seatPrices.economy.exit;
                } else if (isExtraLegroom) {
                    seatClass += ' extra-legroom';
                    seatType = 'extra';
                    price = this.seatPrices.economy.extra;
                }

                seatMapHTML += `
                    <div class="${seatClass}" 
                         data-seat="${seatId}" 
                         data-type="${seatType}"
                         data-price="${price}"
                         ${isOccupied ? 'data-occupied="true"' : ''}>
                        ${seatLabel}
                    </div>
                `;
                
                if (isAisle) {
                    seatMapHTML += '<div class="aisle"></div>';
                }
            }
            
            seatMapHTML += '</div>';
        }
        
        seatMapHTML += '</div>';
        seatMap.innerHTML = seatMapHTML;
    }

    setupEventListeners() {
        // Seat selection
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('seat') && !e.target.dataset.occupied) {
                this.handleSeatSelection(e.target);
            }
        });

        // Continue button
        const continueBtn = document.querySelector('.continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', () => this.proceedToReview());
        }

        // Back button
        const backBtn = document.querySelector('.back-btn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'select-flight.html';
            });
        }
    }

    handleSeatSelection(seatElement) {
        const seatId = seatElement.dataset.seat;
        const seatPrice = parseInt(seatElement.dataset.price) || 0;
        
        if (seatElement.classList.contains('selected')) {
            // Deselect seat
            seatElement.classList.remove('selected');
            this.selectedSeats = this.selectedSeats.filter(seat => seat.id !== seatId);
        } else {
            // Check if we can select more seats
            if (this.selectedSeats.length >= this.passengerCount) {
                this.showNotification(`You can only select ${this.passengerCount} seat(s)`, 'warning');
                return;
            }
            
            // Select seat
            seatElement.classList.add('selected');
            this.selectedSeats.push({
                id: seatId,
                type: seatElement.dataset.type,
                price: seatPrice
            });
        }
        
        this.updateSeatSummary();
        this.updateContinueButton();
    }

    updateSeatSummary() {
        const summary = document.querySelector('.seat-summary');
        if (!summary) return;

        const totalPrice = this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        
        let summaryHTML = '<h3>Selected Seats</h3>';
        
        if (this.selectedSeats.length === 0) {
            summaryHTML += '<p class="no-seats">No seats selected</p>';
        } else {
            summaryHTML += '<div class="selected-seats-list">';
            this.selectedSeats.forEach(seat => {
                summaryHTML += `
                    <div class="selected-seat-item">
                        <span class="seat-id">Seat ${seat.id}</span>
                        <span class="seat-price">$${seat.price}</span>
                    </div>
                `;
            });
            summaryHTML += '</div>';
            
            if (totalPrice > 0) {
                summaryHTML += `<div class="total-price">Total: $${totalPrice}</div>`;
            }
        }
        
        summary.innerHTML = summaryHTML;
    }

    updateContinueButton() {
        const continueBtn = document.querySelector('.continue-btn');
        if (!continueBtn) return;

        const canContinue = this.selectedSeats.length === this.passengerCount;
        continueBtn.disabled = !canContinue;
        
        if (canContinue) {
            continueBtn.textContent = 'Continue to Review';
        } else {
            const remaining = this.passengerCount - this.selectedSeats.length;
            continueBtn.textContent = `Select ${remaining} more seat(s)`;
        }
    }

    updateProgressBar() {
        const steps = document.querySelectorAll('.progress-step');
        steps.forEach((step, index) => {
            const stepNumber = step.querySelector('.step-number');
            if (index < 2) { // Steps 1 and 2 completed
                stepNumber.classList.add('completed');
            } else if (index === 2) { // Current step
                stepNumber.classList.add('active');
            }
        });
    }

    proceedToReview() {
        if (this.selectedSeats.length !== this.passengerCount) {
            this.showNotification('Please select seats for all passengers', 'error');
            return;
        }

        // Save seat selection to localStorage
        localStorage.setItem('selectedSeats', JSON.stringify(this.selectedSeats));
        
        // Calculate total seat price
        const totalSeatPrice = this.selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
        localStorage.setItem('seatPrice', totalSeatPrice.toString());

        // Navigate to review page
        window.location.href = 'review-booking.html';
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SeatSelector();
});

// Global functions for navigation
function goBack() {
    window.location.href = 'select-flight.html';
}

function proceedToReview() {
    const seatSelector = window.seatSelector;
    if (seatSelector) {
        seatSelector.proceedToReview();
    }
}