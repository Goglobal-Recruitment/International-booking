// Dummy flight data (static)
const flightData = [
  {id:'1', from:'Cape Town', to:'Johannesburg', airline:'South African Airways', stops:0, departure:'08:00', arrival:'10:00', duration:'2h', price:193, logo:'img/SAA.png'},
  {id:'2', from:'Cape Town', to:'Durban', airline:'Emirates', stops:1, departure:'09:00', arrival:'11:45', duration:'2h 45m', price:183, logo:'img/Emirates.png'},
  {id:'3', from:'Cape Town', to:'London', airline:'British Airways', stops:1, departure:'22:00', arrival:'10:00+1', duration:'12h', price:423, logo:'img/BA.png'}
];

// Populate flight cards
function displayFlights(data){
  const container = document.querySelector(".flights-results");
  container.innerHTML = '';
  data.forEach(flight=>{
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="airline-logo"><img src="${flight.logo}" alt="${flight.airline}"></div>
      <div class="route">${flight.from} → ${flight.to}</div>
      <div class="times">${flight.departure} - ${flight.arrival}</div>
      <div class="duration">${flight.duration} | ${flight.stops} stop(s)</div>
      <div class="price">ZAR ${flight.price}</div>
      <button class="select-flight" data-id="${flight.id}">Select</button>
    `;
    container.appendChild(card);
  });
}

displayFlights(flightData);

// Flight selection
document.addEventListener('click', e=>{
  if(e.target.classList.contains('select-flight')){
    const fid = e.target.dataset.id;
    const flight = flightData.find(f=>f.id===fid);
    localStorage.setItem('selectedFlight', JSON.stringify(flight));
    window.location.href = 'seat-selection.html';
  }
});
