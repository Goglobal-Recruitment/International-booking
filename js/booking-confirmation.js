const flightDataConfirm = JSON.parse(localStorage.getItem('selectedFlight'));

document.getElementById('flight-number').textContent = flightDataConfirm.airline + ' ' + flightDataConfirm.flightNumber;
document.getElementById('flight-from').textContent = flightDataConfirm.from;
document.getElementById('flight-to').textContent = flightDataConfirm.to;
document.getElementById('flight-seat').textContent = flightDataConfirm.passengerSeat || 'Auto';
document.getElementById('flight-departure').textContent = flightDataConfirm.departure;

document.getElementById('download-ticket').addEventListener('click',()=>{
  alert('PDF download feature coming soon!');
});
