// Universal Date Validation for Booking.com Clone
// This script prevents users from selecting past dates across all pages

(function() {
    'use strict';
    
    class DateValidator {
        constructor() {
            this.today = new Date().toISOString().split('T')[0];
            this.init();
        }

        init() {
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setupValidation());
            } else {
                this.setupValidation();
            }
        }

        setupValidation() {
            // Find all date inputs on the page
            const dateInputs = document.querySelectorAll('input[type="date"]');
            
            dateInputs.forEach(input => {
                // Skip date of birth fields (they should allow past dates)
                if (this.isDateOfBirthField(input)) {
                    return;
                }
                
                // Set minimum date to today
                input.min = this.today;
                
                // Add change event listener
                input.addEventListener('change', (event) => this.validateDate(event));
                
                // Add input event listener for manual typing
                input.addEventListener('input', (event) => this.validateDate(event));
            });
        }

        isDateOfBirthField(input) {
            const id = input.id ? input.id.toLowerCase() : '';
            const name = input.name ? input.name.toLowerCase() : '';
            const label = this.getAssociatedLabel(input);
            
            return id.includes('dob') || 
                   id.includes('dateofbirth') || 
                   id.includes('birth') ||
                   name.includes('dob') || 
                   name.includes('dateofbirth') || 
                   name.includes('birth') ||
                   (label && label.toLowerCase().includes('birth'));
        }

        getAssociatedLabel(input) {
            // Check for label with for attribute
            if (input.id) {
                const labelFor = document.querySelector(`label[for="${input.id}"]`);
                if (labelFor) return labelFor.textContent;
            }
            
            // Check for parent label
            const parentLabel = input.closest('label');
            if (parentLabel) return parentLabel.textContent;
            
            // Check for sibling label
            const siblingLabel = input.parentElement ? input.parentElement.querySelector('label') : null;
            if (siblingLabel) return siblingLabel.textContent;
            
            return null;
        }

        validateDate(event) {
            const input = event.target;
            const inputDate = input.value;
            
            if (inputDate && inputDate < this.today) {
                input.value = this.today;
                this.showDateWarning();
            }
        }

        showDateWarning() {
            // Create or show warning message
            let warning = document.getElementById('date-warning');
            
            if (!warning) {
                warning = document.createElement('div');
                warning.id = 'date-warning';
                warning.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #ff4444;
                    color: white;
                    padding: 12px 20px;
                    border-radius: 4px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
                    z-index: 10000;
                    font-family: Arial, sans-serif;
                    font-size: 14px;
                    max-width: 300px;
                `;
                warning.textContent = 'You cannot select a date in the past. Please choose today or a future date.';
                document.body.appendChild(warning);
            }
            
            warning.style.display = 'block';
            
            // Hide warning after 3 seconds
            setTimeout(() => {
                if (warning) {
                    warning.style.display = 'none';
                }
            }, 3000);
        }
    }

    // Initialize date validator
    new DateValidator();
})();