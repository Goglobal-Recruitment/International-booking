// Seat map data (6 seats per row, 20 rows)
const seatMap = [];
const occupiedSeats = ['1A', '1B', '3C', '5F', '7A', '10D', '12B', '15E']; // Mock occupied seats
let selectedSeats = [];

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadFlightDetails();
    generateSeatMap();
    displaySeats();
});

function loadFlightDetails() {
    const flightData = JSON.parse(sessionStorage.getItem('selectedFlight') || '{}');
    const detailsElement = document.getElementById('flight-details');
    
    if (flightData.airline) {
        detailsElement.textContent = `${flightData.airline} ${flightData.flightNumber} | ${flightData.departure.time} ${flightData.departure.airport} → ${flightData.arrival.time} ${flightData.arrival.airport}`;
    } else {
        detailsElement.textContent = 'Emirates EK 123 | 08:30 JFK → 14:45 DXB';
    }
}

function generateSeatMap() {
    const rows = 20;
    const seatsPerRow = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    for (let row = 1; row <= rows; row++) {
        for (let seat of seatsPerRow) {
            const seatId = `${row}${seat}`;
            seatMap.push({
                id: seatId,
                row: row,
                seat: seat,
                occupied: occupiedSeats.includes(seatId)
            });
        }
    }
}

function displaySeats() {
    const seatMapContainer = document.getElementById('seat-map');
    seatMapContainer.innerHTML = '';
    
    seatMap.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.className = 'seat';
        seatElement.textContent = seat.id;
        seatElement.dataset.seatId = seat.id;
        
        if (seat.occupied) {
            seatElement.classList.add('occupied');
        } else {
            seatElement.classList.add('available');
            seatElement.addEventListener('click', () => selectSeat(seat.id));
        }
        
        seatMapContainer.appendChild(seatElement);
    });
}

function selectSeat(seatId) {
    const seatElement = document.querySelector(`[data-seat-id="${seatId}"]`);
    
    if (selectedSeats.includes(seatId)) {
        // Deselect seat
        selectedSeats = selectedSeats.filter(id => id !== seatId);
        seatElement.classList.remove('selected');
        seatElement.classList.add('available');
    } else {
        // Select seat (limit to 2 seats for this example)
        if (selectedSeats.length < 2) {
            selectedSeats.push(seatId);
            seatElement.classList.remove('available');
            seatElement.classList.add('selected');
        }
    }
    
    updateContinueButton();
}

function updateContinueButton() {
    const continueBtn = document.getElementById('continue-btn');
    const searchData = JSON.parse(sessionStorage.getItem('flightSearch') || '{}');
    const requiredSeats = parseInt(searchData.passengers) || 2;
    
    continueBtn.disabled = selectedSeats.length !== requiredSeats;
}

function proceedToBooking() {
    sessionStorage.setItem('selectedSeats', JSON.stringify(selectedSeats));
    window.location.href = 'final-booking.html';
}