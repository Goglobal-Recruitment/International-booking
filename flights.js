const flights = [
  {from:"CPT", to:"JNB", airline:"South African Airways", stops:0, departure:"08:00", arrival:"10:00", duration:"2h", price:193},
  {from:"CPT", to:"JNB", airline:"Emirates", stops:1, departure:"09:00", arrival:"11:45", duration:"2h 45m", price:183},
  {from:"CPT", to:"JNB", airline:"British Airways", stops:0, departure:"07:30", arrival:"09:15", duration:"1h 45m", price:236},
  {from:"CPT", to:"LHR", airline:"British Airways", stops:1, departure:"22:00", arrival:"10:00+1", duration:"12h", price:423},
  {from:"CPT", to:"NYC", airline:"Emirates", stops:1, departure:"20:00", arrival:"06:00+1", duration:"15h", price:845},
  {from:"CPT", to:"DXB", airline:"Emirates", stops:0, departure:"16:00", arrival:"00:00+1", duration:"8h", price:503}
];

function displayFlights(data) {
  const container = document.querySelector(".flights-results");
  container.innerHTML = "";
  data.forEach(f => {
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="flight-info">
        <div class="airline">${f.airline}</div>
        <div class="route">${f.from} → ${f.to}</div>
        <div class="duration">${f.duration} | ${f.stops} stop(s)</div>
      </div>
      <div class="price">ZAR ${f.price}</div>
      <button onclick="selectFlight('${f.airline}', '${f.from}', '${f.to}', '${f.price}')">Select</button>
    `;
    container.appendChild(card);
  });
}

function selectFlight(airline, from, to, price) {
  // store selected flight in localStorage for next page
  localStorage.setItem("selectedFlight", JSON.stringify({airline, from, to, price}));
  window.location.href = "flight-details.html";
}

// Filters & sort
document.querySelectorAll(".filters input, #sort").forEach(el => el.addEventListener("change", ()=>{
  let filtered = flights.slice();

  // Stops filter
  const stops = Array.from(document.querySelectorAll(".filters input[type=checkbox]:checked")).map(c=>parseInt(c.value));
  if(stops.length) filtered = filtered.filter(f=>stops.includes(f.stops));

  // Sort
  const sort = document.getElementById("sort").value;
  if(sort==="price") filtered.sort((a,b)=>a.price-b.price);
  if(sort==="duration") filtered.sort((a,b)=>parseInt(a.duration)-parseInt(b.duration));
  
  displayFlights(filtered);
}));

// Initial display
displayFlights(flights);
