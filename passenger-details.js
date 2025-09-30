class PassengerDetailsApp {
    constructor() {
        this.flightData = this.getFlightData();
        this.passengers = [];
        this.contactInfo = {};
        this.pricing = {
            baseFare: 0,
            taxes: 0,
            fees: 0,
            total: 0
        };
        
        this.init();
    }

    init() {
        this.populateFlightDetails();
        this.setupPassengerForms();
        this.setupEventListeners();
        this.calculatePricing();
        this.validateForm();
    }

    getFlightData() {
        const storedData = localStorage.getItem('selectedFlight');
        if (storedData) {
            return JSON.parse(storedData);
        }
        
        // Default flight data if none found
        return {
            flight: {
                id: 'SA235',
                airline: 'South African Airways',
                flightNumber: 'SA235',
                from: { code: 'JNB', name: 'O.R. Tambo International', city: 'Johannesburg' },
                to: { code: 'LHR', name: 'Heathrow Airport', city: 'London' },
                departure: { time: '08:30', date: 'Mon 15 Jan 2024' },
                arrival: { time: '19:00', date: 'Mon 15 Jan 2024' },
                duration: '11h 30m',
                type: 'Direct',
                price: 899
            },
            passengers: { adults: 1, children: 0, infants: 0, class: 'economy' }
        };
    }

    populateFlightDetails() {
        const flight = this.flightData.flight;
        
        // Update airline info
        this.updateElement('.airline-logo', flight.airline.substring(0, 2).toUpperCase());
        this.updateElement('.airline-name', flight.airline);
        this.updateElement('.flight-number', flight.flightNumber);
        this.updateElement('.flight-date', flight.departure.date);
        
        // Update route info
        this.updateElement('.departure .time', flight.departure.time);
        this.updateElement('.departure .airport', flight.from.code);
        this.updateElement('.departure .city', flight.from.city);
        
        this.updateElement('.arrival .time', flight.arrival.time);
        this.updateElement('.arrival .airport', flight.to.code);
        this.updateElement('.arrival .city', flight.to.city);
        
        this.updateElement('.duration', flight.duration);
        this.updateElement('.stops', flight.type);
    }

    setupPassengerForms() {
        const passengerContainer = document.querySelector('.passenger-form');
        const passengers = this.flightData.passengers;
        
        // Clear existing forms
        passengerContainer.innerHTML = '';
        
        // Create forms for adults
        for (let i = 0; i < passengers.adults; i++) {
            this.createPassengerForm('Adult', i + 1, passengerContainer);
        }
        
        // Create forms for children
        for (let i = 0; i < passengers.children; i++) {
            this.createPassengerForm('Child', i + 1, passengerContainer);
        }
        
        // Create forms for infants
        for (let i = 0; i < passengers.infants; i++) {
            this.createPassengerForm('Infant', i + 1, passengerContainer);
        }
        
        // Add contact information form
        this.createContactForm(passengerContainer);
    }

    createPassengerForm(type, number, container) {
        const section = document.createElement('div');
        section.className = 'passenger-section';
        section.innerHTML = `
            <h3>${type} ${number}</h3>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label required">Title</label>
                    <select class="form-select" name="${type.toLowerCase()}_${number}_title" required>
                        <option value="">Select title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Miss">Miss</option>
                        <option value="Dr">Dr</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label required">First Name</label>
                    <input type="text" class="form-input" name="${type.toLowerCase()}_${number}_firstName" required>
                </div>
                <div class="form-group">
                    <label class="form-label required">Last Name</label>
                    <input type="text" class="form-input" name="${type.toLowerCase()}_${number}_lastName" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label required">Date of Birth</label>
                    <input type="date" class="form-input" name="${type.toLowerCase()}_${number}_dob" required>
                </div>
                <div class="form-group">
                    <label class="form-label required">Nationality</label>
                    <select class="form-select" name="${type.toLowerCase()}_${number}_nationality" required>
                        <option value="">Select nationality</option>
                        <option value="ZA">South African</option>
                        <option value="GB">British</option>
                        <option value="US">American</option>
                        <option value="DE">German</option>
                        <option value="FR">French</option>
                        <option value="AU">Australian</option>
                        <option value="CA">Canadian</option>
                    </select>
                </div>
                <div class="form-group">
                    <label class="form-label required">Passport Number</label>
                    <input type="text" class="form-input" name="${type.toLowerCase()}_${number}_passport" required>
                </div>
            </div>
            ${type === 'Adult' ? `
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label">Frequent Flyer Number</label>
                    <input type="text" class="form-input" name="${type.toLowerCase()}_${number}_frequentFlyer">
                </div>
                <div class="form-group">
                    <label class="form-label">Special Requests</label>
                    <select class="form-select" name="${type.toLowerCase()}_${number}_specialRequests">
                        <option value="">None</option>
                        <option value="wheelchair">Wheelchair assistance</option>
                        <option value="vegetarian">Vegetarian meal</option>
                        <option value="kosher">Kosher meal</option>
                        <option value="halal">Halal meal</option>
                        <option value="diabetic">Diabetic meal</option>
                    </select>
                </div>
            </div>
            ` : ''}
        `;
        
        container.appendChild(section);
    }

    createContactForm(container) {
        const contactSection = document.createElement('div');
        contactSection.className = 'contact-info';
        contactSection.innerHTML = `
            <h2>Contact information</h2>
            <div class="contact-notice">
                <p><strong>Important:</strong> We'll send your booking confirmation and flight updates to this email address.</p>
                <p>Make sure you can access this email account during your trip.</p>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label required">Email Address</label>
                    <input type="email" class="form-input" name="contact_email" required>
                </div>
                <div class="form-group">
                    <label class="form-label required">Confirm Email</label>
                    <input type="email" class="form-input" name="contact_email_confirm" required>
                </div>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label class="form-label required">Phone Number</label>
                    <input type="tel" class="form-input" name="contact_phone" required>
                </div>
                <div class="form-group">
                    <label class="form-label">Country/Region</label>
                    <select class="form-select" name="contact_country">
                        <option value="ZA">South Africa</option>
                        <option value="GB">United Kingdom</option>
                        <option value="US">United States</option>
                        <option value="DE">Germany</option>
                        <option value="FR">France</option>
                        <option value="AU">Australia</option>
                        <option value="CA">Canada</option>
                    </select>
                </div>
            </div>
        `;
        
        container.appendChild(contactSection);
    }

    setupEventListeners() {
        // Form validation on input
        document.addEventListener('input', (e) => {
            if (e.target.matches('.form-input, .form-select')) {
                this.validateField(e.target);
                this.validateForm();
            }
        });

        // Email confirmation validation
        document.addEventListener('input', (e) => {
            if (e.target.name === 'contact_email_confirm') {
                this.validateEmailConfirmation();
            }
        });

        // Continue button
        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.addEventListener('click', this.handleContinue.bind(this));
        }

        // Form submission
        const form = document.getElementById('passenger-form');
        if (form) {
            form.addEventListener('submit', this.handleSubmit.bind(this));
        }
    }

    validateField(field) {
        const errorElement = field.parentNode.querySelector('.error-message');
        
        // Remove existing error
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');

        // Validate required fields
        if (field.hasAttribute('required') && !field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        // Validate email format
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                this.showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }

        // Validate passport number format
        if (field.name.includes('passport') && field.value) {
            if (field.value.length < 6) {
                this.showFieldError(field, 'Passport number must be at least 6 characters');
                return false;
            }
        }

        return true;
    }

    validateEmailConfirmation() {
        const emailField = document.querySelector('input[name="contact_email"]');
        const confirmField = document.querySelector('input[name="contact_email_confirm"]');
        
        if (emailField && confirmField && confirmField.value) {
            if (emailField.value !== confirmField.value) {
                this.showFieldError(confirmField, 'Email addresses do not match');
                return false;
            }
        }
        
        return true;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        field.parentNode.appendChild(errorElement);
    }

    validateForm() {
        const requiredFields = document.querySelectorAll('.form-input[required], .form-select[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
            }
        });

        // Check email confirmation
        if (!this.validateEmailConfirmation()) {
            isValid = false;
        }

        const continueBtn = document.getElementById('continue-btn');
        if (continueBtn) {
            continueBtn.disabled = !isValid;
        }

        return isValid;
    }

    calculatePricing() {
        const flight = this.flightData.flight;
        const passengers = this.flightData.passengers;
        
        const basePrice = flight.price || 899;
        const adultPrice = basePrice;
        const childPrice = basePrice * 0.75;
        const infantPrice = basePrice * 0.1;
        
        this.pricing.baseFare = (passengers.adults * adultPrice) + 
                               (passengers.children * childPrice) + 
                               (passengers.infants * infantPrice);
        
        this.pricing.taxes = this.pricing.baseFare * 0.15;
        this.pricing.fees = 25 * (passengers.adults + passengers.children + passengers.infants);
        this.pricing.total = this.pricing.baseFare + this.pricing.taxes + this.pricing.fees;
        
        this.updatePricingDisplay();
    }

    updatePricingDisplay() {
        this.updateElement('.price-item:nth-child(1) .price-value', `$${this.pricing.baseFare.toFixed(2)}`);
        this.updateElement('.price-item:nth-child(2) .price-value', `$${this.pricing.taxes.toFixed(2)}`);
        this.updateElement('.price-item:nth-child(3) .price-value', `$${this.pricing.fees.toFixed(2)}`);
        this.updateElement('.price-item:nth-child(4) .price-value', `$${this.pricing.total.toFixed(2)}`);
    }

    handleContinue() {
        if (this.validateForm()) {
            this.collectFormData();
            this.saveBookingData();
            window.location.href = 'seat-selection.html';
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.handleContinue();
    }

    collectFormData() {
        const formData = new FormData(document.getElementById('passenger-form'));
        const passengers = [];
        const passengerTypes = ['adult', 'child', 'infant'];
        
        passengerTypes.forEach(type => {
            let count = 1;
            while (formData.get(`${type}_${count}_firstName`)) {
                passengers.push({
                    type: type,
                    title: formData.get(`${type}_${count}_title`),
                    firstName: formData.get(`${type}_${count}_firstName`),
                    lastName: formData.get(`${type}_${count}_lastName`),
                    dateOfBirth: formData.get(`${type}_${count}_dob`),
                    nationality: formData.get(`${type}_${count}_nationality`),
                    passport: formData.get(`${type}_${count}_passport`),
                    frequentFlyer: formData.get(`${type}_${count}_frequentFlyer`) || '',
                    specialRequests: formData.get(`${type}_${count}_specialRequests`) || ''
                });
                count++;
            }
        });

        this.passengers = passengers;
        this.contactInfo = {
            email: formData.get('contact_email'),
            phone: formData.get('contact_phone'),
            country: formData.get('contact_country')
        };
    }

    saveBookingData() {
        const bookingData = {
            ...this.flightData,
            passengers: this.passengers,
            contactInfo: this.contactInfo,
            pricing: this.pricing,
            step: 'passenger-details-completed',
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('bookingData', JSON.stringify(bookingData));
    }

    updateElement(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
            element.textContent = content;
        }
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new PassengerDetailsApp();
});