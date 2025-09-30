// Dummy flight data
const flightData = [
  {id:1, from:"Cape Town", to:"Johannesburg", airline:"South African Airways", stops:0, departure:"08:00", arrival:"10:00", duration:"2h", price:193, logo:"https://content.airlinelogos.com/airlines/saa.png"},
  {id:2, from:"Cape Town", to:"Durban", airline:"Emirates", stops:1, departure:"09:00", arrival:"11:45", duration:"2h 45m", price:183, logo:"https://content.airlinelogos.com/airlines/emirates.png"},
  {id:3, from:"Cape Town", to:"Port Elizabeth", airline:"British Airways", stops:0, departure:"07:30", arrival:"09:15", duration:"1h 45m", price:236, logo:"https://content.airlinelogos.com/airlines/ba.png"},
  {id:4, from:"Cape Town", to:"London", airline:"British Airways", stops:1, departure:"22:00", arrival:"10:00+1", duration:"12h", price:423, logo:"https://content.airlinelogos.com/airlines/ba.png"},
  {id:5, from:"Cape Town", to:"New York", airline:"Emirates", stops:1, departure:"20:00", arrival:"06:00+1", duration:"15h", price:845, logo:"https://content.airlinelogos.com/airlines/emirates.png"},
  {id:6, from:"Cape Town", to:"Dubai", airline:"Emirates", stops:0, departure:"16:00", arrival:"00:00+1", duration:"8h", price:503, logo:"https://content.airlinelogos.com/airlines/emirates.png"},
  {id:7, from:"Johannesburg", to:"Sydney", airline:"Qantas", stops:1, departure:"14:00", arrival:"06:00+1", duration:"12h", price:950, logo:"https://content.airlinelogos.com/airlines/qf.png"},
  {id:8, from:"Nairobi", to:"London", airline:"British Airways", stops:0, departure:"10:00", arrival:"18:00", duration:"8h", price:720, logo:"https://content.airlinelogos.com/airlines/ba.png"},
  {id:9, from:"Lagos", to:"Dubai", airline:"Emirates", stops:0, departure:"11:00", arrival:"19:00", duration:"8h", price:600, logo:"https://content.airlinelogos.com/airlines/emirates.png"},
  {id:10, from:"Accra", to:"Johannesburg", airline:"South African Airways", stops:1, departure:"09:30", arrival:"15:00", duration:"5h 30m", price:400, logo:"https://content.airlinelogos.com/airlines/saa.png"}
];

// Populate flights
function displayFlights(data){
  const container = document.querySelector(".flights-list");
  container.innerHTML = "";
  data.forEach(flight=>{
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="flight-header">
        <div class="airline-info">
          <img src="${flight.logo}" class="airline-logo" alt="${flight.airline}">
          <div class="airline-details">
            <span class="airline-name">${flight.airline}</span>
            <span class="flight-number">${flight.stops===0 ? "Non-stop" : flight.stops+" stop(s)"}</span>
          </div>
        </div>
        <div class="flight-route">
          <div class="departure">
            <span class="time">${flight.departure}</span>
            <span class="airport">${flight.from}</span>
          </div>
          <div class="flight-path">
            <div class="flight-line"></div>
            <span class="duration">${flight.duration}</span>
          </div>
          <div class="arrival">
            <span class="time">${flight.arrival}</span>
            <span class="airport">${flight.to}</span>
          </div>
        </div>
        <div class="flight-price">
          <span class="price-from">From</span>
          <span class="price-amount">ZAR ${flight.price.toLocaleString()}</span>
          <span class="price-per-person">per passenger</span>
        </div>
      </div>
      <div class="cabin-options">
        <div class="cabin-option">
          <div class="cabin-header">
            <span class="cabin-name">Economy</span>
            <span class="cabin-price">ZAR ${flight.price.toLocaleString()}</span>
          </div>
          <div class="cabin-features">
            <div class="feature">Free checked baggage</div>
            <div class="feature">Refundable</div>
            <div class="feature">Seat selection</div>
          </div>
          <button class="select-btn">Select</button>
        </div>
        <div class="cabin-option">
          <div class="cabin-header">
            <span class="cabin-name">Business</span>
            <span class="cabin-price">ZAR ${(flight.price*2.5).toLocaleString()}</span>
          </div>
          <div class="cabin-features">
            <div class="feature">Extra legroom</div>
            <div class="feature">Priority boarding</div>
            <div class="feature">Lounge access</div>
          </div>
          <button class="select-btn">Select</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// Initial display
displayFlights(flightData);

// Filters
document.querySelectorAll(".stops-filter, .airline-filter").forEach(input=>{
  input.addEventListener("change",()=>{
    let filtered = flightData.slice();
    const stopsChecked = Array.from(document.querySelectorAll(".stops-filter:checked")).map(i=>parseInt(i.value));
    if(stopsChecked.length>0) filtered = filtered.filter(f=>stopsChecked.includes(f.stops));
    const airlineChecked = Array.from(document.querySelectorAll(".airline-filter:checked")).map(i=>i.value);
    if(airlineChecked.length>0) filtered = filtered.filter(f=>airlineChecked.includes(f.airline));
    displayFlights(filtered);
  });
});

// Sort
document.getElementById("sort").addEventListener("change", (e)=>{
  let sorted = flightData.slice();
  if(e.target.value==="price") sorted.sort((a,b)=>a.price-b.price);
  if(e.target.value==="duration") sorted.sort((a,b)=>{
    const dA = parseInt(a.duration);
    const dB = parseInt(b.duration);
    return dA-dB;
  });
  if(e.target.value==="departure") sorted.sort((a,b)=>a.departure.localeCompare(b.departure));
  displayFlights(sorted);
});
