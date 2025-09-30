class SeatSelectionApp {
    constructor() {
        this.selectedSeats = {};
        this.currentPassenger = 1;
        this.totalPassengers = 1;
        this.currency = this.getCurrency();
        this.currencySymbol = this.getCurrencySymbol();
        this.flightData = this.getFlightData();
        this.searchData = this.getSearchData();
        this.baseFare = this.getBaseFare();
        
        // Set passenger count from search data
        if (this.searchData && this.searchData.passengers) {
            this.totalPassengers = this.searchData.passengers.adults + 
                                 this.searchData.passengers.children + 
                                 this.searchData.passengers.infants;
        }
        
        // Set selected cabin type from search data or flight data
        this.selectedCabinType = this.searchData?.class || 
                               this.flightData.flight?.selectedCabin?.type || 
                               'economy';
        
        // Aircraft configurations
        this.aircraftConfigs = {
            'Boeing 777-300ER': {
                cabins: ['first', 'business', 'premium', 'economy'],
                seatMaps: {
                    first: { rows: 2, config: '1-1', startRow: 1 },
                    business: { rows: 6, config: '2-2', startRow: 3 },
                    premium: { rows: 8, config: '2-3-2', startRow: 9 },
                    economy: { rows: 35, config: '3-3-3', startRow: 17, exitRows: [25, 26] }
                }
            },
            'Airbus A350-900': {
                cabins: ['business', 'premium', 'economy'],
                seatMaps: {
                    business: { rows: 8, config: '1-2-1', startRow: 1 },
                    premium: { rows: 6, config: '2-3-2', startRow: 9 },
                    economy: { rows: 32, config: '3-3-3', startRow: 15, exitRows: [23, 24] }
                }
            },
            'Boeing 787-9': {
                cabins: ['business', 'premium', 'economy'],
                seatMaps: {
                    business: { rows: 7, config: '1-2-1', startRow: 1 },
                    premium: { rows: 5, config: '2-3-2', startRow: 8 },
                    economy: { rows: 28, config: '3-3-3', startRow: 13, exitRows: [20, 21] }
                }
            },
            'Airbus A380-800': {
                cabins: ['first', 'business', 'premium', 'economy'],
                seatMaps: {
                    first: { rows: 3, config: '1-1', startRow: 1 },
                    business: { rows: 12, config: '1-2-1', startRow: 4 },
                    premium: { rows: 10, config: '2-4-2', startRow: 16 },
                    economy: { rows: 40, config: '3-4-3', startRow: 26, exitRows: [35, 36] }
                }
            },
            'Boeing 747-8': {
                cabins: ['first', 'business', 'premium', 'economy'],
                seatMaps: {
                    first: { rows: 2, config: '1-1', startRow: 1 },
                    business: { rows: 8, config: '2-2', startRow: 3 },
                    premium: { rows: 6, config: '2-3-2', startRow: 11 },
                    economy: { rows: 38, config: '3-4-3', startRow: 17, exitRows: [28, 29] }
                }
            },
            'Airbus A330-300': {
                cabins: ['business', 'premium', 'economy'],
                seatMaps: {
                    business: { rows: 6, config: '2-2-2', startRow: 1 },
                    premium: { rows: 4, config: '2-3-2', startRow: 7 },
                    economy: { rows: 30, config: '2-4-2', startRow: 11, exitRows: [20, 21] }
                }
            },
            'Boeing 737-800': {
                cabins: ['business', 'economy'],
                seatMaps: {
                    business: { rows: 4, config: '2-2', startRow: 1 },
                    economy: { rows: 26, config: '3-3', startRow: 5, exitRows: [12, 13] }
                }
            },
            'Embraer E190': {
                cabins: ['business', 'economy'],
                seatMaps: {
                    business: { rows: 3, config: '1-2', startRow: 1 },
                    economy: { rows: 22, config: '2-2', startRow: 4, exitRows: [12, 13] }
                }
            }
        };
        
        // Seat prices in ZAR (base currency)
        this.seatPrices = {
            economy: 0,
            premium: 950,
            exitRow: 475,
            business: 1800,
            first: 2500
        };
        
        // Extras in ZAR
        this.extras = {
            priorityBoarding: { price: 285, selected: false },
            extraLegroom: { price: 665, selected: false },
            mealUpgrade: { price: 380, selected: false }
        };
        
        this.init();
    }

    getSearchData() {
        const storedData = localStorage.getItem('flightSearchData');
        if (storedData) {
            try {
                return JSON.parse(storedData);
            } catch (e) {
                console.error('Error parsing search data:', e);
            }
        }
        return null;
    }

    getFlightData() {
        const storedData = localStorage.getItem('selectedFlight');
        if (storedData) {
            try {
                const data = JSON.parse(storedData);
                console.log('Loaded flight data:', data);
                return data;
            } catch (e) {
                console.error('Error parsing flight data:', e);
            }
        }
        
        // Default flight data if none found
        console.warn('No flight data found in localStorage, using default');
        return {
            flight: {
                id: 'BA6234',
                airline: 'British Airways',
                airlineCode: 'BA',
                flightNumber: 'BA6234',
                from: 'JNB',
                to: 'LHR',
                departure: { time: '14:30', date: 'Mon 15 Jan 2024' },
                arrival: { time: '06:45+1', date: 'Mon 15 Jan 2024' },
                duration: '11h 15m',
                aircraft: 'Boeing 777-300ER',
                selectedCabin: { type: 'economy', price: 17100 },
                cabinClasses: [
                    { type: 'economy', available: true, price: 17100 },
                    { type: 'premium', available: true, price: 25650 },
                    { type: 'business', available: true, price: 51300 },
                    { type: 'first', available: true, price: 85500 }
                ]
            },
            passengers: { adults: 1, children: 0, infants: 0 }
        };
    }

    getCurrency() {
        if (window.globalState) {
            return window.globalState.getState().currency;
        }
        return localStorage.getItem('selectedCurrency') || 'ZAR';
    }

    getCurrencySymbol() {
        if (window.globalState) {
            return window.globalState.getState().currencySymbol;
        }
        
        const symbols = {
            'ZAR': 'R',
            'USD': '$',
            'EUR': '€',
            'GBP': '£'
        };
        return symbols[this.currency] || 'R';
    }

    formatPrice(amount) {
        if (this.currency !== 'ZAR') {
            // Convert from ZAR to selected currency
            const rates = { 'USD': 0.054, 'EUR': 0.049, 'GBP': 0.042 };
            amount = Math.round(amount * (rates[this.currency] || 1));
        }
        return `${this.currencySymbol}${amount.toLocaleString()}`;
    }

    getBaseFare() {
        return this.flightData.flight?.selectedCabin?.price || 17100;
    }

    init() {
        this.updateFlightDisplay();
        this.generatePassengerList();
        this.generateSeatMapForSelectedCabin();
        this.setupEventListeners();
        this.updatePriceSummary();
    }

    updateFlightDisplay() {
        const flight = this.flightData.flight;
        if (!flight) return;
        
        // Update flight info
        document.getElementById('flight-number').textContent = flight.flightNumber;
        document.getElementById('route').textContent = `${flight.from} → ${flight.to}`;
        document.getElementById('departure-time').textContent = flight.departure.time;
        document.getElementById('arrival-time').textContent = flight.arrival.time;
        document.getElementById('flight-duration').textContent = flight.duration;
        document.getElementById('aircraft-type').textContent = flight.aircraft;
        
        // Update selected cabin info
        const cabinInfo = document.getElementById('selected-cabin-info');
        if (cabinInfo) {
            cabinInfo.innerHTML = `
                <div class="cabin-selection-info">
                    <h3>Selected: ${this.getCabinName(this.selectedCabinType)}</h3>
                    <p>Base fare: ${this.formatPrice(this.baseFare)}</p>
                </div>
            `;
        }
    }

    getCabinName(type) {
        const names = {
            'economy': 'Economy Class',
            'premium': 'Premium Economy',
            'business': 'Business Class',
            'first': 'First Class'
        };
        return names[type] || 'Economy Class';
    }

    generateSeatMapForSelectedCabin() {
        const aircraft = this.flightData.flight?.aircraft || 'Boeing 777-300ER';
        const config = this.aircraftConfigs[aircraft];
        
        if (!config) {
            console.error('Aircraft configuration not found');
            return;
        }
        
        const selectedCabinConfig = config.seatMaps[this.selectedCabinType];
        if (!selectedCabinConfig) {
            console.error('Selected cabin configuration not found');
            return;
        }
        
        this.generateCabinSection(selectedCabinConfig);
        this.generateSeatLegend();
    }

    generateCabinSection(cabinConfig) {
        const container = document.getElementById('seat-map');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Add cabin header
        const cabinHeader = document.createElement('div');
        cabinHeader.className = 'cabin-header';
        cabinHeader.innerHTML = `
            <div class="cabin-info">
                <h3>${this.getCabinName(this.selectedCabinType)}</h3>
                <p>Select your preferred seat</p>
            </div>
        `;
        container.appendChild(cabinHeader);
        
        // Generate seat rows
        const seatGrid = document.createElement('div');
        seatGrid.className = 'seat-grid';
        
        for (let row = cabinConfig.startRow; row < cabinConfig.startRow + cabinConfig.rows; row++) {
            const rowElement = this.createSeatRow(row, cabinConfig);
            seatGrid.appendChild(rowElement);
        }
        
        container.appendChild(seatGrid);
    }

    createSeatRow(rowNumber, cabinConfig) {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'seat-row';
        
        // Row number
        const rowLabel = document.createElement('div');
        rowLabel.className = 'row-number';
        rowLabel.textContent = rowNumber;
        rowDiv.appendChild(rowLabel);
        
        // Generate seats based on configuration
        const seatLetters = this.getSeatLettersForConfig(cabinConfig.config);
        const sections = cabinConfig.config.split('-');
        let letterIndex = 0;
        
        sections.forEach((section, sectionIndex) => {
            const sectionDiv = document.createElement('div');
            sectionDiv.className = 'seat-section';
            
            const seatCount = parseInt(section);
            for (let i = 0; i < seatCount; i++) {
                const letter = seatLetters[letterIndex];
                const seat = this.createSeat(rowNumber, letter, cabinConfig);
                sectionDiv.appendChild(seat);
                letterIndex++;
            }
            
            rowDiv.appendChild(sectionDiv);
            
            // Add aisle space (except after last section)
            if (sectionIndex < sections.length - 1) {
                const aisle = document.createElement('div');
                aisle.className = 'aisle';
                rowDiv.appendChild(aisle);
            }
        });
        
        return rowDiv;
    }

    createSeat(row, letter, cabinConfig) {
        const seatId = `${row}${letter}`;
        const seatDiv = document.createElement('div');
        seatDiv.className = 'seat';
        seatDiv.dataset.seatId = seatId;
        seatDiv.dataset.row = row;
        seatDiv.dataset.letter = letter;
        
        // Get seat availability and pricing
        const seatInfo = this.seatAvailability[this.selectedCabinType]?.[seatId];
        
        if (!seatInfo || !seatInfo.available) {
            seatDiv.classList.add('occupied');
            seatDiv.innerHTML = '<i class="fas fa-times"></i>';
            return seatDiv;
        }
        
        // Determine seat type and styling
        let seatType = 'standard';
        if (letter === 'A' || letter === 'F' || letter === 'K') {
            seatType = 'window';
            seatDiv.classList.add('window-seat');
        } else if (letter === 'C' || letter === 'D' || letter === 'G' || letter === 'H') {
            seatType = 'aisle';
            seatDiv.classList.add('aisle-seat');
        }
        
        if (cabinConfig.exitRows && cabinConfig.exitRows.includes(row)) {
            seatType = 'exit-row';
            seatDiv.classList.add('exit-row');
        }
        
        if (row <= cabinConfig.startRow + 3) {
            seatDiv.classList.add('front-section');
        }
        
        // Add pricing
        const price = seatInfo.price;
        if (price > 0) {
            seatDiv.classList.add('premium-seat');
            const priceLabel = document.createElement('div');
            priceLabel.className = 'seat-price';
            priceLabel.textContent = this.formatPrice(price);
            seatDiv.appendChild(priceLabel);
        }
        
        // Seat content
        const seatContent = document.createElement('div');
        seatContent.className = 'seat-content';
        seatContent.innerHTML = `
            <span class="seat-label">${seatId}</span>
            ${price === 0 ? '<i class="fas fa-check"></i>' : ''}
        `;
        seatDiv.appendChild(seatContent);
        
        // Add click handler
        seatDiv.addEventListener('click', () => this.selectSeat(seatId, seatInfo));
        
        return seatDiv;
    }

    generateSeatLegend() {
        const legendContainer = document.getElementById('seat-legend');
        if (!legendContainer) return;
        
        legendContainer.innerHTML = `
            <div class="legend-title">
                <h4>Seat Legend</h4>
            </div>
            <div class="legend-items">
                <div class="legend-item">
                    <div class="legend-seat available"></div>
                    <span>Available (Free)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat premium"></div>
                    <span>Premium (Extra fee)</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat selected"></div>
                    <span>Your selection</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat occupied"></div>
                    <span>Occupied</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat window"></div>
                    <span>Window seat</span>
                </div>
                <div class="legend-item">
                    <div class="legend-seat aisle"></div>
                    <span>Aisle seat</span>
                </div>
            </div>
        `;
    }

    generatePassengerList() {
        const container = document.getElementById('passenger-list');
        if (!container) return;
        
        container.innerHTML = '';
        
        const searchData = this.searchData;
        let passengerIndex = 1;
        
        // Generate adult passengers
        if (searchData && searchData.passengers) {
            for (let i = 0; i < searchData.passengers.adults; i++) {
                container.appendChild(this.createPassengerItem(passengerIndex, 'Adult', i + 1));
                passengerIndex++;
            }
            
            // Generate child passengers
            for (let i = 0; i < searchData.passengers.children; i++) {
                container.appendChild(this.createPassengerItem(passengerIndex, 'Child', i + 1));
                passengerIndex++;
            }
            
            // Generate infant passengers
            for (let i = 0; i < searchData.passengers.infants; i++) {
                container.appendChild(this.createPassengerItem(passengerIndex, 'Infant', i + 1, true));
                passengerIndex++;
            }
        } else {
            // Default single adult passenger
            container.appendChild(this.createPassengerItem(1, 'Adult', 1));
        }
        
        // Select first passenger by default
        this.selectPassenger(1);
    }

    createPassengerItem(index, type, number, isInfant = false) {
        const item = document.createElement('div');
        item.className = 'passenger-item';
        item.dataset.passengerId = index;
        
        const seatInfo = this.selectedSeats[index] ? 
            `Seat ${this.selectedSeats[index].seatId}` : 
            (isInfant ? 'Lap infant' : 'No seat selected');
        
        item.innerHTML = `
            <div class="passenger-info">
                <div class="passenger-details">
                    <span class="passenger-name">${type} ${number}</span>
                    <span class="passenger-seat">${seatInfo}</span>
                </div>
                <div class="passenger-status">
                    ${this.selectedSeats[index] ? 
                        '<i class="fas fa-check-circle text-green"></i>' : 
                        (isInfant ? '<i class="fas fa-baby text-blue"></i>' : '<i class="fas fa-circle text-gray"></i>')
                    }
                </div>
            </div>
        `;
        
        if (!isInfant) {
            item.addEventListener('click', () => this.selectPassenger(index));
        }
        
        return item;
    }

    selectSeat(seatId, seatInfo) {
        // Check if seat is already taken
        const existingPassenger = Object.keys(this.selectedSeats).find(
            passengerId => this.selectedSeats[passengerId].seatId === seatId
        );
        
        if (existingPassenger && parseInt(existingPassenger) !== this.currentPassenger) {
            this.showCustomNotification('This seat is already selected by another passenger', 'warning');
            return;
        }
        
        // Remove previous seat selection for current passenger
        if (this.selectedSeats[this.currentPassenger]) {
            const prevSeat = document.querySelector(`[data-seat-id="${this.selectedSeats[this.currentPassenger].seatId}"]`);
            if (prevSeat) {
                prevSeat.classList.remove('selected');
            }
        }
        
        // Add new seat selection
        this.selectedSeats[this.currentPassenger] = {
            seatId: seatId,
            price: seatInfo.price,
            type: seatInfo.type,
            features: seatInfo.features
        };
        
        // Update UI
        const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
        if (seatElement) {
            seatElement.classList.add('selected');
        }
        
        // Show seat features
        this.showSeatFeatures(seatInfo);
        
        // Update passenger display
        this.updatePassengerSeatDisplay();
        
        // Update price summary
        this.updatePriceSummary();
        
        // Auto-select next passenger if available
        this.autoSelectNextPassenger();
    }

    autoSelectNextPassenger() {
        const infantCount = this.searchData?.passengers?.infants || 0;
        const totalSelectablePassengers = this.totalPassengers - infantCount;
        
        for (let i = this.currentPassenger + 1; i <= totalSelectablePassengers; i++) {
            if (!this.selectedSeats[i]) {
                this.selectPassenger(i);
                return;
            }
        }
    }

    updatePriceSummary() {
        const baseFareElement = document.getElementById('base-fare');
        const seatFeesElement = document.getElementById('seat-fees');
        const extrasElement = document.getElementById('extras-fees');
        const totalElement = document.getElementById('total-price');
        
        if (!baseFareElement || !seatFeesElement || !extrasElement || !totalElement) return;
        
        // Calculate seat fees
        let seatFees = 0;
        Object.values(this.selectedSeats).forEach(seat => {
            seatFees += seat.price || 0;
        });
        
        // Calculate extras fees
        let extrasFees = 0;
        Object.values(this.extras).forEach(extra => {
            if (extra.selected) {
                extrasFees += extra.price;
            }
        });
        
        // Calculate total per passenger type
        const passengerCounts = this.searchData?.passengers || { adults: 1, children: 0, infants: 0 };
        const totalBaseFare = (passengerCounts.adults * this.baseFare) + 
                             (passengerCounts.children * this.baseFare * 0.75) + 
                             (passengerCounts.infants * this.baseFare * 0.1);
        
        const total = totalBaseFare + seatFees + extrasFees;
        
        // Update display
        baseFareElement.textContent = this.formatPrice(totalBaseFare);
        seatFeesElement.textContent = this.formatPrice(seatFees);
        extrasElement.textContent = this.formatPrice(extrasFees);
        totalElement.textContent = this.formatPrice(total);
    }

    showCustomNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        
        // Set notification content
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle',
            warning: 'fas fa-exclamation-triangle'
        };
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="${icons[type] || icons.info}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Auto-hide after 4 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }

    updatePassengerSeatDisplay() {
        for (let i = 1; i <= this.totalPassengers; i++) {
            const seatElement = document.getElementById(`seat-${i}`);
            const priceElement = document.getElementById(`price-${i}`);
            
            if (this.selectedSeats[i]) {
                const seat = this.selectedSeats[i];
                seatElement.textContent = `Seat ${seat.id}`;
                priceElement.textContent = seat.price > 0 ? this.formatPrice(seat.price) : 'Free';
            } else {
                seatElement.textContent = 'No seat selected';
                priceElement.textContent = 'Free';
            }
        }
    }

    setupEventListeners() {
        // Passenger selection
        document.querySelectorAll('.passenger-item').forEach(item => {
            item.addEventListener('click', () => {
                const passengerId = parseInt(item.dataset.passenger);
                this.selectPassenger(passengerId);
            });
        });
        
        // Extras checkboxes
        Object.keys(this.extras).forEach(extraKey => {
            const checkbox = document.getElementById(extraKey.replace(/([A-Z])/g, '-$1').toLowerCase());
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    this.extras[extraKey].selected = e.target.checked;
                    this.updatePriceSummary();
                });
            }
        });
    }

    selectPassenger(passengerId) {
        // Update active passenger
        document.querySelectorAll('.passenger-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-passenger="${passengerId}"]`).classList.add('active');
        
        this.currentPassenger = passengerId;
    }

    updatePriceSummary() {
        // Calculate seat costs
        let seatTotal = 0;
        Object.values(this.selectedSeats).forEach(seat => {
            seatTotal += seat.price;
        });
        
        // Calculate extras costs
        let extrasTotal = 0;
        Object.values(this.extras).forEach(extra => {
            if (extra.selected) {
                extrasTotal += extra.price;
            }
        });
        
        // Update display
        document.getElementById('base-fare').textContent = this.formatPrice(this.baseFare);
        document.getElementById('seat-total').textContent = this.formatPrice(seatTotal);
        document.getElementById('extras-total').textContent = this.formatPrice(extrasTotal);
        document.getElementById('grand-total').textContent = this.formatPrice(this.baseFare + seatTotal + extrasTotal);
    }
}

// Global functions
function skipSeats() {
    // Replace confirm with custom modal
    if (showConfirmDialog('Are you sure you want to skip seat selection? You can select seats later for an additional fee.')) {
        window.location.href = 'passenger-details.html';
    }

    // Add custom confirm dialog function
    function showConfirmDialog(message) {
        return new Promise((resolve) => {
            const modal = document.createElement('div');
            modal.className = 'confirm-modal';
            modal.innerHTML = `
                <div class="confirm-modal-content">
                    <div class="confirm-modal-header">
                        <h3>Confirm Action</h3>
                    </div>
                    <div class="confirm-modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="confirm-modal-footer">
                        <button class="btn btn-secondary" onclick="resolveConfirm(false)">Cancel</button>
                        <button class="btn btn-primary" onclick="resolveConfirm(true)">Confirm</button>
                    </div>
                </div>
            `;
    
            document.body.appendChild(modal);
    
            window.resolveConfirm = (result) => {
                modal.remove();
                delete window.resolveConfirm;
                resolve(result);
            };
        });
    }

    window.location.href = 'passenger-details.html';
}

function continueToPassengerDetails() {
    // Store seat selection data with proper currency
    const seatData = {
        selectedSeats: app.selectedSeats,
        extras: app.extras,
        currency: app.currency,
        currencySymbol: app.currencySymbol,
        totalCost: document.getElementById('grand-total').textContent,
        baseFare: app.baseFare,
        flightData: app.flightData
    };
    
    localStorage.setItem('seatSelection', JSON.stringify(seatData));
    window.location.href = 'passenger-details.html';
}

// Initialize the application
let app;
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing app...');
    app = new SeatSelectionApp();
});