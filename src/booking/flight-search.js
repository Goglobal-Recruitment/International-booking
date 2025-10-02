// Flight Search JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Load airports data
    loadAirports();
    
    // Set minimum date to today
    setMinimumDates();
    
    // Initialize event listeners
    initializeEventListeners();
    
    // Initialize trip type functionality
    initializeTripTypes();
    
    // Initialize passengers dropdown
    initializePassengersDropdown();
});

// Load airports from JSON file
async function loadAirports() {
    try {
        const response = await fetch('../data/airports.json');
        const airports = await response.json();
        
        const departureSelect = document.getElementById('departure');
        const destinationSelect = document.getElementById('destination');
        
        airports.forEach(airport => {
            const option1 = document.createElement('option');
            option1.value = airport;
            option1.textContent = airport;
            departureSelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = airport;
            option2.textContent = airport;
            destinationSelect.appendChild(option2);
        });
    } catch (error) {
        console.error('Error loading airports:', error);
        // Fallback airports
        const fallbackAirports = [
            "New York (JFK)", "Los Angeles (LAX)", "London (LHR)", 
            "Tokyo (NRT)", "Paris (CDG)", "Dubai (DXB)"
        ];
        
        const departureSelect = document.getElementById('departure');
        const destinationSelect = document.getElementById('destination');
        
        fallbackAirports.forEach(airport => {
            const option1 = document.createElement('option');
            option1.value = airport;
            option1.textContent = airport;
            departureSelect.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = airport;
            option2.textContent = airport;
            destinationSelect.appendChild(option2);
        });
    }
}

// Set minimum dates to today
function setMinimumDates() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departure-date').setAttribute('min', today);
    document.getElementById('return-date').setAttribute('min', today);
}

// Initialize event listeners
function initializeEventListeners() {
    // Swap button functionality
    document.getElementById('swap-btn').addEventListener('click', swapLocations);
    
    // Form submission
    document.getElementById('search-form').addEventListener('submit', handleFormSubmission);
    
    // Departure date change - update return date minimum
    document.getElementById('departure-date').addEventListener('change', function() {
        const departureDate = this.value;
        document.getElementById('return-date').setAttribute('min', departureDate);
    });
}

// Initialize trip type tabs
function initializeTripTypes() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const returnDateField = document.getElementById('return-date-field');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all tabs
            tabBtns.forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            const tripType = this.dataset.tripType;
            
            // Show/hide return date field based on trip type
            if (tripType === 'one-way') {
                returnDateField.style.display = 'none';
                document.getElementById('return-date').removeAttribute('required');
            } else {
                returnDateField.style.display = 'block';
                if (tripType === 'return') {
                    document.getElementById('return-date').setAttribute('required', 'required');
                }
            }
        });
    });
}

// Initialize passengers dropdown
function initializePassengersDropdown() {
    const passengersTrigger = document.getElementById('passengers-trigger');
    const passengersDropdown = document.getElementById('passengers-dropdown');
    const doneBtn = document.getElementById('passengers-done');
    
    // Toggle dropdown
    passengersTrigger.addEventListener('click', function() {
        passengersDropdown.style.display = 
            passengersDropdown.style.display === 'block' ? 'none' : 'block';
    });
    
    // Close dropdown when clicking done
    doneBtn.addEventListener('click', function() {
        passengersDropdown.style.display = 'none';
        updatePassengersDisplay();
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.passengers-field')) {
            passengersDropdown.style.display = 'none';
        }
    });
    
    // Counter buttons
    const counterBtns = document.querySelectorAll('.counter-btn');
    counterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const counter = this.dataset.counter;
            const action = this.dataset.action;
            const countElement = document.getElementById(counter + '-count');
            let count = parseInt(countElement.textContent);
            
            if (action === 'increase') {
                count++;
            } else if (action === 'decrease' && count > 0) {
                count--;
                // Ensure at least 1 adult
                if (counter === 'adults' && count < 1) {
                    count = 1;
                }
            }
            
            countElement.textContent = count;
            updateCounterButtons();
        });
    });
}

// Update counter button states
function updateCounterButtons() {
    const adultsCount = parseInt(document.getElementById('adults-count').textContent);
    const childrenCount = parseInt(document.getElementById('children-count').textContent);
    
    // Disable decrease button for adults if count is 1
    const adultsDecreaseBtn = document.querySelector('[data-counter="adults"][data-action="decrease"]');
    adultsDecreaseBtn.disabled = adultsCount <= 1;
    
    // Disable decrease button for children if count is 0
    const childrenDecreaseBtn = document.querySelector('[data-counter="children"][data-action="decrease"]');
    childrenDecreaseBtn.disabled = childrenCount <= 0;
}

// Update passengers display text
function updatePassengersDisplay() {
    const adultsCount = parseInt(document.getElementById('adults-count').textContent);
    const childrenCount = parseInt(document.getElementById('children-count').textContent);
    const selectedClass = document.querySelector('input[name="class"]:checked').value;
    
    let passengersText = '';
    
    if (adultsCount === 1) {
        passengersText += '1 Adult';
    } else {
        passengersText += adultsCount + ' Adults';
    }
    
    if (childrenCount > 0) {
        if (childrenCount === 1) {
            passengersText += ', 1 Child';
        } else {
            passengersText += ', ' + childrenCount + ' Children';
        }
    }
    
    // Add class
    const classNames = {
        'economy': 'Economy',
        'premium-economy': 'Premium Economy',
        'business': 'Business',
        'first': 'First Class'
    };
    
    passengersText += ', ' + classNames[selectedClass];
    
    document.getElementById('passengers').value = passengersText;
}

// Swap locations
function swapLocations() {
    const departureSelect = document.getElementById('departure');
    const destinationSelect = document.getElementById('destination');
    
    const tempValue = departureSelect.value;
    departureSelect.value = destinationSelect.value;
    destinationSelect.value = tempValue;
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(e.target);
    const tripType = document.querySelector('.tab-btn.active').dataset.tripType;
    const adultsCount = parseInt(document.getElementById('adults-count').textContent);
    const childrenCount = parseInt(document.getElementById('children-count').textContent);
    
    // Create trip data object
    const tripData = {
        tripType: tripType,
        from: formData.get('departure'),
        to: formData.get('destination'),
        departureDate: formData.get('departure-date'),
        returnDate: formData.get('return-date') || null,
        adults: adultsCount,
        children: childrenCount,
        class: formData.get('class'),
        searchTime: new Date().toISOString()
    };
    
    // Validate required fields
    if (!tripData.from || !tripData.to || !tripData.departureDate) {
        alert('Please fill in all required fields.');
        return;
    }
    
    if (tripData.from === tripData.to) {
        alert('Departure and destination cannot be the same.');
        return;
    }
    
    if (tripType === 'return' && !tripData.returnDate) {
        alert('Please select a return date.');
        return;
    }
    
    // Store data in sessionStorage
    sessionStorage.setItem('tripData', JSON.stringify(tripData));
    
    // Show loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.innerHTML;
    searchBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchBtn.disabled = true;
    
    // Simulate search delay and redirect
    setTimeout(() => {
        window.location.href = 'flight-selection.html';
    }, 1500);
}

// Initialize counter button states on load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(updateCounterButtons, 100);
});