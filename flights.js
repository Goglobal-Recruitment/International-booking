// Dummy flight data
const flightData = [
  { id: "f001", from:"Cape Town", to:"Johannesburg", airline:"South African Airways", stops:0, departure:"08:00", arrival:"10:00", duration:"2h", price:193, logo:"https://content.airlinelogos.com/airlines/saa.png", departISO:"2025-10-30T08:00", arriveISO:"2025-10-30T10:00", cabinOptions:["Economy","Business"] },
  { id: "f002", from:"Cape Town", to:"Durban", airline:"Emirates", stops:1, departure:"09:00", arrival:"11:45", duration:"2h 45m", price:183, logo:"https://content.airlinelogos.com/airlines/emirates.png", departISO:"2025-10-30T09:00", arriveISO:"2025-10-30T11:45", cabinOptions:["Economy","Business"] },
  { id: "f003", from:"Cape Town", to:"Port Elizabeth", airline:"British Airways", stops:0, departure:"07:30", arrival:"09:15", duration:"1h 45m", price:236, logo:"https://content.airlinelogos.com/airlines/ba.png", departISO:"2025-10-30T07:30", arriveISO:"2025-10-30T09:15", cabinOptions:["Economy","Business"] },
  { id: "f004", from:"Cape Town", to:"London", airline:"British Airways", stops:1, departure:"22:00", arrival:"10:00+1", duration:"12h", price:423, logo:"https://content.airlinelogos.com/airlines/ba.png", departISO:"2025-10-30T22:00", arriveISO:"2025-10-31T10:00", cabinOptions:["Economy","Business","First"] },
  { id: "f005", from:"Cape Town", to:"New York", airline:"Emirates", stops:1, departure:"20:00", arrival:"06:00+1", duration:"15h", price:845, logo:"https://content.airlinelogos.com/airlines/emirates.png", departISO:"2025-10-30T20:00", arriveISO:"2025-10-31T06:00", cabinOptions:["Economy","Business","First"] },
  { id: "f006", from:"Cape Town", to:"Dubai", airline:"Emirates", stops:0, departure:"16:00", arrival:"00:00+1", duration:"8h", price:503, logo:"https://content.airlinelogos.com/airlines/emirates.png", departISO:"2025-10-30T16:00", arriveISO:"2025-10-31T00:00", cabinOptions:["Economy","Business"] }
];

// Populate flights
function displayFlights(data){
  const container = document.querySelector(".flights-results");
  container.innerHTML = "";
  if(data.length===0){
    container.innerHTML = "<p style='text-align:center;color:#666;margin:20px 0'>No flights found</p>";
    return;
  }
  data.forEach(flight=>{
    const card = document.createElement("div");
    card.className = "flight-card";
    card.innerHTML = `
      <div class="flight-header">
        <div class="airline-info">
          <img src="${flight.logo}" alt="${flight.airline}" class="airline-logo">
          <div class="airline-details">
            <div class="airline-name">${flight.airline}</div>
            <div class="flight-number">${flight.stops===0?"Non-stop":flight.stops+" Stop(s)"}</div>
          </div>
        </div>
        <div class="flight-route">
          <div class="departure"><div class="time">${flight.departure}</div><div class="airport">${flight.from}</div></div>
          <div class="flight-path"><div class="duration">${flight.duration}</div></div>
          <div class="arrival"><div class="time">${flight.arrival}</div><div class="airport">${flight.to}</div></div>
        </div>
        <div class="flight-price">
          <div class="price-amount">ZAR ${flight.price}</div>
          <button class="select-btn" data-id="${flight.id}">Select</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Add click listeners for selection
  document.querySelectorAll(".select-btn").forEach(btn=>{
    btn.addEventListener("click", e=>{
      const id = e.target.dataset.id;
      // store flights in localStorage for next page
      localStorage.setItem("booking_mirror_flights", JSON.stringify(flightData));
      window.location.href = `select-flight.html?flight=${id}`;
    });
  });
}

// Initial display
displayFlights(flightData);

// Filters
document.querySelectorAll(".stops-filter, .airline-filter").forEach(input=>{
  input.addEventListener("change", ()=>{
    let filtered = flightData.slice();

    // stops filter
    const stopsChecked = Array.from(document.querySelectorAll(".stops-filter:checked")).map(i=>parseInt(i.value));
    if(stopsChecked.length>0){
      filtered = filtered.filter(f=>stopsChecked.includes(f.stops));
    }

    // airline filter
    const airlineChecked = Array.from(document.querySelectorAll(".airline-filter:checked")).map(i=>i.value);
    if(airlineChecked.length>0){
      filtered = filtered.filter(f=>airlineChecked.includes(f.airline));
    }

    displayFlights(filtered);
  });
});

// Sort
document.getElementById("sort").addEventListener("change", e=>{
  let sorted = flightData.slice();
  if(e.target.value==="price") sorted.sort((a,b)=>a.price-b.price);
  if(e.target.value==="duration") sorted.sort((a,b)=>{
    const parseDur = d=>parseInt(d.split('h')[0])*60 + (d.includes('h')?parseInt(d.split(' ')[1]||0):0);
    return parseDur(a.duration)-parseDur(b.duration);
  });
  if(e.target.value==="departure") sorted.sort((a,b)=>a.departure.localeCompare(b.departure));
  displayFlights(sorted);
});

// Search form
document.getElementById("flight-search-form").addEventListener("submit", e=>{
  e.preventDefault();
  const from = document.getElementById("from").value.toLowerCase();
  const to = document.getElementById("to").value.toLowerCase();
  const directOnly = document.getElementById("direct").checked;
  let filtered = flightData.filter(f=>f.from.toLowerCase().includes(from) && f.to.toLowerCase().includes(to));
  if(directOnly) filtered = filtered.filter(f=>f.stops===0);
  displayFlights(filtered);
});
