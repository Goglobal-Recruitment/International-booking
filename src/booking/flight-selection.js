// Mock flight data
const mockFlights = [
    {
        id: 1,
        airline: "Emirates",
        flightNumber: "EK 123",
        departure: { time: "08:30", airport: "JFK" },
        arrival: { time: "14:45", airport: "DXB" },
        duration: "14h 15m",
        price: 850,
        stops: 0
    },
    {
        id: 2,
        airline: "Qatar Airways",
        flightNumber: "QR 456",
        departure: { time: "10:15", airport: "JFK" },
        arrival: { time: "18:30", airport: "DOH" },
        duration: "12h 15m",
        price: 720,
        stops: 0
    },
    {
        id: 3,
        airline: "Turkish Airlines",
        flightNumber: "TK 789",
        departure: { time: "16:20", airport: "JFK" },
        arrival: { time: "09:45+1", airport: "IST" },
        duration: "11h 25m",
        price: 650,
        stops: 0
    }
];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadSearchDetails();
    displayFlights(mockFlights);
    setupEventListeners();
});

function loadSearchDetails() {
    const searchData = JSON.parse(sessionStorage.getItem('flightSearch') || '{}');
    const detailsElement = document.getElementById('search-details');
    
    if (searchData.origin && searchData.destination) {
        detailsElement.textContent = `${searchData.origin} → ${searchData.destination} | ${searchData.departureDate} | ${searchData.passengers} passengers`;
    } else {
        detailsElement.textContent = 'New York (JFK) → Dubai (DXB) | Dec 15, 2024 | 2 passengers';
    }
}

function displayFlights(flights) {
    const resultsContainer = document.getElementById('flight-results');
    resultsContainer.innerHTML = '';
    
    flights.forEach(flight => {
        const flightCard = createFlightCard(flight);
        resultsContainer.appendChild(flightCard);
    });
}

function createFlightCard(flight) {
    const card = document.createElement('div');
    card.className = 'flight-card';
    card.innerHTML = `
        <div class="flight-info">
            <div>
                <div class="airline">${flight.airline}</div>
                <div class="time-info">
                    <span>${flight.departure.time} ${flight.departure.airport}</span>
                    <span>→</span>
                    <span>${flight.arrival.time} ${flight.arrival.airport}</span>
                    <span>(${flight.duration})</span>
                </div>
                <div>${flight.stops === 0 ? 'Direct' : flight.stops + ' stop(s)'}</div>
            </div>
            <div>
                <div class="price">$${flight.price}</div>
                <button class="select-btn" onclick="selectFlight(${flight.id})">Select</button>
            </div>
        </div>
    `;
    return card;
}

function selectFlight(flightId) {
    const selectedFlight = mockFlights.find(f => f.id === flightId);
    sessionStorage.setItem('selectedFlight', JSON.stringify(selectedFlight));
    window.location.href = 'seat-selection.html';
}

function setupEventListeners() {
    document.getElementById('sort-select').addEventListener('change', function(e) {
        const sortBy = e.target.value;
        const sortedFlights = [...mockFlights].sort((a, b) => {
            if (sortBy === 'price') return a.price - b.price;
            if (sortBy === 'duration') return a.duration.localeCompare(b.duration);
            if (sortBy === 'departure') return a.departure.time.localeCompare(b.departure.time);
        });
        displayFlights(sortedFlights);
    });
}