const flight = JSON.parse(localStorage.getItem('selectedFlight'));
const seatMap = document.getElementById('seat-map');

// Simple seat grid
const rows = 6;
const cols = 6;
for(let r=1;r<=rows;r++){
  const rowDiv = document.createElement('div');
  rowDiv.className = 'seat-row';
  for(let c=1;c<=cols;c++){
    const seat = document.createElement('div');
    seat.className = 'seat';
    seat.textContent = `${r}${String.fromCharCode(64+c)}`;
    seat.addEventListener('click',()=>{
      document.querySelectorAll('.seat.selected').forEach(s=>s.classList.remove('selected'));
      seat.classList.add('selected');
    });
    rowDiv.appendChild(seat);
  }
  seatMap.appendChild(rowDiv);
}

document.getElementById('confirm-seat').addEventListener('click',()=>{
  const selectedSeat = document.querySelector('.seat.selected')?.textContent || 'Auto';
  flight.passengerSeat = selectedSeat;
  localStorage.setItem('selectedFlight', JSON.stringify(flight));
  window.location.href = 'booking-confirmation.html';
});
