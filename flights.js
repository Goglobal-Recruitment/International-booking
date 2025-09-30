// Dummy flight data
const flightData = [
  {id:1, from:"CPT", to:"JNB", airline:"South African Airways", stops:0, departure:"08:00", arrival:"10:00", duration:"2h", price:193, logo:"https://content.airlinelogos.com/airlines/saa.png"},
  {id:2, from:"CPT", to:"DUR", airline:"Emirates", stops:1, departure:"09:00", arrival:"11:45", duration:"2h 45m", price:183, logo:"https://content.airlinelogos.com/airlines/emirates.png"},
  {id:3, from:"CPT", to:"PLZ", airline:"British Airways", stops:0, departure:"07:30", arrival:"09:15", duration:"1h 45m", price:236, logo:"https://content.airlinelogos.com/airlines/ba.png"},
];

// Display flights
function displayFlights(data){
  const container = document.querySelector(".flights-results");
  container.innerHTML = "";
  data.forEach(f => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="flight-info">
        <img src="${f.logo}" alt="${f.airline}">
        <div>
          <div class="flight-route">${f.from} → ${f.to}</div>
          <div class="flight-duration">${f.duration}</div>
          <div class="flight-stops">${f.stops} Stop(s)</div>
        </div>
      </div>
      <div class="flight-price">$${f.price}</div>
      <button class="select-flight">Select</button>
    `;
    container.appendChild(card);
  });
}

// Filters
document.querySelectorAll(".stops-filter, .airline-filter").forEach(input => {
  input.addEventListener("change", () => {
    let filtered = flightData.slice();
    const stopsChecked = Array.from(document.querySelectorAll(".stops-filter:checked")).map(i=>parseInt(i.value));
    if(stopsChecked.length>0){ filtered = filtered.filter(f=>stopsChecked.includes(f.stops)); }
    const airlineChecked = Array.from(document.querySelectorAll(".airline-filter:checked")).map(i=>i.value);
    if(airlineChecked.length>0){ filtered = filtered.filter(f=>airlineChecked.includes(f.airline)); }
    displayFlights(filtered);
  });
});

// Sort
document.getElementById("sort").addEventListener("change",(e)=>{
  let sorted = flightData.slice();
  if(e.target.value==="price") sorted.sort((a,b)=>a.price-b.price);
  if(e.target.value==="duration") sorted.sort((a,b)=>parseInt(a.duration)-parseInt(b.duration));
  if(e.target.value==="departure") sorted.sort((a,b)=>a.departure.localeCompare(b.departure));
  displayFlights(sorted);
});

// Initial display
displayFlights(flightData);
