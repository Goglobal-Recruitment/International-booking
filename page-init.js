/**
 * Page Initialization Script
 * Ensures global state is loaded and applied on every page
 */

document.addEventListener('DOMContentLoaded', function() {
    // Ensure global state is initialized
    if (!window.globalState) {
        // Load global state script if not already loaded
        const script = document.createElement('script');
        script.src = 'global-state.js';
        script.onload = function() {
            initializePage();
        };
        document.head.appendChild(script);
    } else {
        initializePage();
    }
});

function initializePage() {
    // Apply global state to current page
    if (window.globalState) {
        window.globalState.applyStateToPage();
        
        // Set up page-specific event listeners
        setupPageEventListeners();
        
        // Update contact numbers
        updateAllContactNumbers();
    }
}

function setupPageEventListeners() {
    // Listen for global state changes
    document.addEventListener('globalStateChange', function(event) {
        const { type, data } = event.detail;
        
        switch(type) {
            case 'currency':
                updateCurrencyElements(data.currency, data.symbol);
                break;
            case 'tripType':
                updateTripTypeElements(data);
                break;
            case 'flightClass':
                updateFlightClassElements(data);
                break;
        }
    });
}

function updateCurrencyElements(currency, symbol) {
    // Update currency displays on the page
    const currencyElements = document.querySelectorAll('[data-currency]');
    currencyElements.forEach(element => {
        element.textContent = currency;
    });
}

function updateTripTypeElements(tripType) {
    // Update trip type displays
    const tripTypeElements = document.querySelectorAll('[data-trip-type]');
    tripTypeElements.forEach(element => {
        element.textContent = tripType;
    });
}

function updateFlightClassElements(flightClass) {
    // Update flight class displays
    const flightClassElements = document.querySelectorAll('[data-flight-class]');
    flightClassElements.forEach(element => {
        element.textContent = flightClass;
    });
}

function updateAllContactNumbers() {
    const contactNumber = '+1 (888) 850-3958';
    
    // Update all contact number displays
    const contactElements = document.querySelectorAll('[data-contact-number]');
    contactElements.forEach(element => {
        element.textContent = contactNumber;
    });
    
    // Update contact support functions
    if (window.contactSupport) {
        const originalContactSupport = window.contactSupport;
        window.contactSupport = function(type) {
            if (type === 'phone') {
                const confirmationCode = document.getElementById('confirmation-number')?.textContent || 'N/A';
                showCustomNotification(`Call us at ${contactNumber}\nHave your confirmation number ready: ${confirmationCode}\n\nOur support team is available 24/7 to assist you with your booking.`, 'info');
            } else {
                originalContactSupport(type);
            }
        };
    }
}

// Custom notification system to replace alerts
function showCustomNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `custom-notification custom-notification-${type}`;
    notification.innerHTML = `
        <div class="custom-notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message.replace(/\n/g, '<br>')}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="custom-notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // Add styles if not already present
    if (!document.getElementById('custom-notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'custom-notification-styles';
        styles.textContent = `
            .custom-notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 10000;
                min-width: 300px;
                max-width: 400px;
                animation: slideInRight 0.3s ease-out;
            }

            .custom-notification-success {
                border-left: 4px solid #00aa6c;
            }

            .custom-notification-error {
                border-left: 4px solid #d32f2f;
            }

            .custom-notification-info {
                border-left: 4px solid #0071c2;
            }

            .custom-notification-warning {
                border-left: 4px solid #ff9800;
            }

            .custom-notification-content {
                display: flex;
                align-items: flex-start;
                padding: 16px;
                gap: 12px;
            }

            .custom-notification-content i:first-child {
                font-size: 18px;
                margin-top: 2px;
            }

            .custom-notification-success .custom-notification-content i:first-child {
                color: #00aa6c;
            }

            .custom-notification-error .custom-notification-content i:first-child {
                color: #d32f2f;
            }

            .custom-notification-info .custom-notification-content i:first-child {
                color: #0071c2;
            }

            .custom-notification-warning .custom-notification-content i:first-child {
                color: #ff9800;
            }

            .custom-notification-content span {
                flex: 1;
                line-height: 1.4;
            }

            .custom-notification-close {
                background: none;
                border: none;
                cursor: pointer;
                color: #666;
                padding: 4px;
                margin-left: auto;
            }

            .custom-notification-close:hover {
                color: #333;
            }

            @keyframes slideInRight {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Auto remove after 7 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 7000);
}

// Make the function globally available
window.showCustomNotification = showCustomNotification;