// results.js: loads flights.json (or local override), renders cards, filters & navigation
const dataUrl = 'International-booking/flights.json';
const resultsList = document.getElementById('resultsList');
const cardTemplate = document.getElementById('cardTemplate').content;
const urlParams = new URLSearchParams(location.search);

function fmt(n){ return Number(n).toLocaleString(); }
function parseQueryAirport(q){ return q ? q.replace(/\s*\(.+$/,'').trim() : '';}
function formatTime(iso){ const d = new Date(iso); return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}); }

async function loadData(){
  // localStorage override
  try{
    const override = localStorage.getItem('gg_flights_override');
    if(override){ const p = JSON.parse(override); if(Array.isArray(p)) return p; if(p && Array.isArray(p.flights)) return p.flights; }
  }catch(e){ console.warn('override invalid',e); }

  try{
    const res = await fetch(dataUrl + '?t=' + Date.now());
    if(res.ok){
      const j = await res.json();
      if(Array.isArray(j)) return j;
      if(j && Array.isArray(j.flights)) return j.flights;
    }
  }catch(e){
    console.warn('Could not fetch flights.json', e);
  }
  // fallback demo
  return demoFlights();
}

function demoFlights(){
  const now = new Date();
  return [...Array(10)].map((_,i)=>{
    const dep = new Date(now.getTime()+ (i+1)*86400000 + i*3600000);
    const arr = new Date(dep.getTime() + (10+i)*3600000);
    const codes = [['JNB','LHR'],['JNB','DXB'],['CPT','FRA'],['JNB','AMS']];
    const pick = codes[i%codes.length];
    return {
      id: 'GGL'+(2000+i),
      airline: ['British Airways','Emirates','Qatar Airways','Lufthansa'][i%4],
      airlineLogo: '',
      depTime: dep.toISOString(),
      arrTime: arr.toISOString(),
      origin: pick[0],
      originName: pick[0]==='JNB' ? 'Johannesburg' : 'Cape Town',
      dest: pick[1],
      destName: pick[1]==='LHR' ? 'London' : (pick[1]==='DXB' ? 'Dubai' : (pick[1]==='FRA' ? 'Frankfurt' : 'Amsterdam')),
      stops: i%2,
      priceZAR: 125000 + i*2200,
      durationMin: (10+i)*60
    }
  });
}

function renderCards(flights){
  resultsList.innerHTML = '';
  if(!flights||!flights.length){
    resultsList.innerHTML = '<div style="padding:14px;background:#fff;border-radius:10px">No flights found.</div>';
    return;
  }
  flights.forEach(f=>{
    const node = document.importNode(cardTemplate, true);
    const root = node.querySelector('.flight-card');
    const img = root.querySelector('.airline img');
    if(f.airlineLogo) img.src = f.airlineLogo; else img.style.display='none';
    root.querySelector('.airline-name').textContent = f.airline || 'Airline';
    root.querySelector('.time-dep').textContent = formatTime(f.depTime);
    root.querySelector('.time-arr').textContent = formatTime(f.arrTime);
    root.querySelector('.route').textContent = `${f.origin} — ${f.dest} • ${Math.floor((f.durationMin||0)/60)}h ${(f.durationMin||0)%60}m`;
    root.querySelector('.price').textContent = `ZAR ${fmt(f.priceZAR||0)}`;
    const btn = root.querySelector('.select');
    btn.addEventListener('click', ()=>{
      const booking = {
        id: f.id, airline: f.airline, price: f.priceZAR, origin: f.origin, originName: f.originName,
        dest: f.dest, destName: f.destName, depTime: f.depTime, arrTime: f.arrTime
      };
      sessionStorage.setItem('gg_booking', JSON.stringify(booking));
      location.href = 'seat-selection.html';
    });
    resultsList.appendChild(root);
  });
}

function populateFilters(flights){
  const airlineSet = new Set(flights.map(f=>f.airline));
  const airlineSelect = document.getElementById('airlineFilter');
  airlineSelect.innerHTML = '<option value="any">Any</option>';
  Array.from(airlineSet).forEach(a=>{
    const opt = document.createElement('option'); opt.value=a; opt.textContent=a; airlineSelect.appendChild(opt);
  });
}

function applyFilters(flights){
  const stops = document.getElementById('stopsFilter').value;
  const airline = document.getElementById('airlineFilter').value;
  const sort = document.getElementById('sortBy').value;
  let out = flights.slice();
  if(stops!=='any') out = out.filter(f => String(f.stops) === String(stops));
  if(airline!=='any') out = out.filter(f => f.airline === airline);
  if(sort==='price') out.sort((a,b)=>a.priceZAR - b.priceZAR);
  if(sort==='duration') out.sort((a,b)=>a.durationMin - b.durationMin);
  return out;
}

// Wire up
(async ()=>{
  const all = await loadData();
  const fromQ = urlParams.get('from') || '';
  const toQ = urlParams.get('to') || '';
  const head = document.getElementById('resultHead');
  head.textContent = `Results ${fromQ? ' — ' + fromQ : ''} ${toQ? ' → ' + toQ : ''}`;
  let filtered = all;
  if(fromQ) filtered = filtered.filter(f => (f.originName && f.originName.toLowerCase().includes(parseQueryAirport(fromQ).toLowerCase())) || (f.origin && f.origin.toLowerCase().includes(parseQueryAirport(fromQ).toLowerCase())));
  if(toQ) filtered = filtered.filter(f => (f.destName && f.destName.toLowerCase().includes(parseQueryAirport(toQ).toLowerCase())) || (f.dest && f.dest.toLowerCase().includes(parseQueryAirport(toQ).toLowerCase())));
  if(filtered.length===0) filtered = all; // fallback show all
  populateFilters(all);
  renderCards(filtered);

  // filter change handlers
  ['stopsFilter','airlineFilter','sortBy'].forEach(id=>{
    document.getElementById(id).addEventListener('change', ()=> {
      const out = applyFilters(filtered);
      renderCards(out);
    });
  });
})();
