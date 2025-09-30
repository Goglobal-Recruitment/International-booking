class TicketConfirmation {
    constructor() {
        this.bookingData = this.getBookingData();
        this.init();
    }

    init() {
        this.populateBookingDetails();
        this.setupEventListeners();
        this.generateQRCode();
        this.startCountdown();
    }

    getBookingData() {
        // Get booking data from localStorage or URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const storedData = localStorage.getItem('bookingData');
        
        if (storedData) {
            return JSON.parse(storedData);
        }
        
        // Default booking data if none found
        return {
            bookingReference: this.generateBookingReference(),
            passenger: {
                title: 'Mr.',
                firstName: 'John',
                lastName: 'Smith',
                seat: '23A',
                class: 'Economy'
            },
            flight: {
                airline: 'British Airways',
                flightNumber: 'BA6234',
                from: {
                    code: 'JNB',
                    name: 'O.R. Tambo International',
                    city: 'Johannesburg'
                },
                to: {
                    code: 'LHR',
                    name: 'Heathrow Airport',
                    city: 'London'
                },
                departure: {
                    time: '14:30',
                    date: 'Mon, 15 Jan 2024'
                },
                arrival: {
                    time: '06:45',
                    date: 'Tue, 16 Jan 2024',
                    nextDay: true
                },
                duration: '11h 15m',
                type: 'Direct Flight',
                gate: 'B12',
                boardingTime: '13:45'
            },
            pricing: {
                baseFare: 899.00,
                taxes: 156.00,
                seatSelection: 0.00,
                extras: 15.00,
                total: 1070.00
            }
        };
    }

    generateBookingReference() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    populateBookingDetails() {
        const data = this.bookingData;
        
        // Update booking reference
        const bookingRefElement = document.getElementById('booking-ref');
        if (bookingRefElement) {
            bookingRefElement.textContent = data.bookingReference;
        }

        // Update passenger details
        this.updateElement('.passenger-name .title', data.passenger.title);
        this.updateElement('.passenger-name .first-name', data.passenger.firstName);
        this.updateElement('.passenger-name .last-name', data.passenger.lastName);
        this.updateElement('.seat-info', `Seat: ${data.passenger.seat}`);
        this.updateElement('.class-info', data.passenger.class);

        // Update flight details
        this.updateElement('.airline-details h2', data.flight.airline);
        this.updateElement('.airline-details p', `Flight ${data.flight.flightNumber}`);
        
        // Update route information
        this.updateElement('.departure-info .airport-code', data.flight.from.code);
        this.updateElement('.departure-info .airport-name', data.flight.from.name);
        this.updateElement('.departure-info .city-name', data.flight.from.city);
        this.updateElement('.departure-info .time', data.flight.departure.time);
        this.updateElement('.departure-info .date', data.flight.departure.date);

        this.updateElement('.arrival-info .airport-code', data.flight.to.code);
        this.updateElement('.arrival-info .airport-name', data.flight.to.name);
        this.updateElement('.arrival-info .city-name', data.flight.to.city);
        this.updateElement('.arrival-info .time', 
            data.flight.arrival.time + (data.flight.arrival.nextDay ? '<sup>+1</sup>' : ''));
        this.updateElement('.arrival-info .date', data.flight.arrival.date);

        this.updateElement('.flight-duration', data.flight.duration);
        this.updateElement('.flight-type', data.flight.type);
        this.updateElement('.gate-info .value', data.flight.gate);
        this.updateElement('.boarding-time .value', data.flight.boardingTime);

        // Update pricing
        this.updateElement('.summary-item:nth-child(1) .value', `$${data.pricing.baseFare.toFixed(2)}`);
        this.updateElement('.summary-item:nth-child(2) .value', `$${data.pricing.taxes.toFixed(2)}`);
        this.updateElement('.summary-item:nth-child(3) .value', `$${data.pricing.seatSelection.toFixed(2)}`);
        this.updateElement('.summary-item:nth-child(4) .value', `$${data.pricing.extras.toFixed(2)}`);
        this.updateElement('.summary-item.total .value', `$${data.pricing.total.toFixed(2)}`);
    }

    updateElement(selector, content) {
        const element = document.querySelector(selector);
        if (element) {
            element.innerHTML = content;
        }
    }

    setupEventListeners() {
        // Print ticket functionality
        const printBtn = document.querySelector('.btn-secondary');
        if (printBtn) {
            printBtn.addEventListener('click', this.printTicket.bind(this));
        }

        // Download PDF functionality
        const downloadBtn = document.querySelector('.btn-primary');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', this.downloadPDF.bind(this));
        }
    }

    generateQRCode() {
        // Simple QR code placeholder - in a real app, you'd use a QR code library
        const qrPlaceholder = document.querySelector('.qr-placeholder');
        if (qrPlaceholder) {
            // You could integrate with a QR code library like qrcode.js here
            qrPlaceholder.innerHTML = '<i class="fas fa-qrcode"></i>';
        }
    }

    printTicket() {
        // Hide header and footer for printing
        const header = document.querySelector('.header');
        const footer = document.querySelector('.footer');
        const actionSection = document.querySelector('.action-section');
        
        if (header) header.style.display = 'none';
        if (footer) footer.style.display = 'none';
        if (actionSection) actionSection.style.display = 'none';
        
        window.print();
        
        // Restore elements after printing
        setTimeout(() => {
            if (header) header.style.display = 'block';
            if (footer) footer.style.display = 'block';
            if (actionSection) actionSection.style.display = 'block';
        }, 1000);
    }

    downloadPDF() {
        // In a real application, you would use a library like jsPDF or html2pdf
        this.showNotification('PDF download feature coming soon!', 'info');
    }

    startCountdown() {
        // Countdown to boarding time (example)
        const boardingTime = new Date();
        boardingTime.setHours(13, 45, 0, 0); // Set to boarding time
        
        if (boardingTime < new Date()) {
            boardingTime.setDate(boardingTime.getDate() + 1); // Next day if time has passed
        }
        
        this.updateCountdown(boardingTime);
        setInterval(() => this.updateCountdown(boardingTime), 60000); // Update every minute
    }

    updateCountdown(targetTime) {
        const now = new Date();
        const timeDiff = targetTime - now;
        
        if (timeDiff > 0) {
            const hours = Math.floor(timeDiff / (1000 * 60 * 60));
            const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
            
            // You could add a countdown display to the page here
            console.log(`Time to boarding: ${hours}h ${minutes}m`);
        }
    }

    showNotification(message, type = 'success') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#00c851' : '#0071c2'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 1000;
            display: flex;
            align-items: center;
            gap: 12px;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global functions for button clicks
function addToCalendar() {
    const app = window.ticketApp;
    if (app) {
        // Create calendar event
        const event = {
            title: `Flight ${app.bookingData.flight.flightNumber} - ${app.bookingData.flight.from.city} to ${app.bookingData.flight.to.city}`,
            start: new Date(app.bookingData.flight.departure.date + ' ' + app.bookingData.flight.departure.time),
            description: `Booking Reference: ${app.bookingData.bookingReference}\nGate: ${app.bookingData.flight.gate}\nSeat: ${app.bookingData.passenger.seat}`
        };
        
        // Create Google Calendar URL
        const startDate = event.start.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(event.start.getTime() + (11 * 60 + 15) * 60000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(event.description)}`;
        
        window.open(calendarUrl, '_blank');
    }
}

function shareBooking() {
    const app = window.ticketApp;
    if (app && navigator.share) {
        navigator.share({
            title: 'Flight Booking Confirmation',
            text: `My flight booking is confirmed! Reference: ${app.bookingData.bookingReference}`,
            url: window.location.href
        });
    } else {
        // Fallback to clipboard
        const shareText = `Flight booking confirmed!\nReference: ${app.bookingData.bookingReference}\nFlight: ${app.bookingData.flight.flightNumber}\n${app.bookingData.flight.from.city} → ${app.bookingData.flight.to.city}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                app.showNotification('Booking details copied to clipboard!');
            });
        }
    }
}

function manageBooking() {
    // Redirect to booking management page
    window.location.href = 'booking-management.html';
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ticketApp = new TicketConfirmation();
});