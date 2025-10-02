/* flights.js — Node-free version
   - Tries /International-booking/flights.json
   - Falls back to demo data
   - Reads override from localStorage key "gg_flights_override"
   - Adds a "Reload data" button for quick testing in browser
*/

const dataUrl = 'International-booking/flights.json';
const resultsList = document.getElementById('resultsList');
const cardTemplate = document.getElementById('cardTemplate').content;

// Small helper - demo fallback data
function demoFlights(){
  const now = new Date();
  return [...Array(8)].map((_,i)=>{
    const dep = new Date(now.getTime()+ (i+1)*3600000*6);
    const arr = new Date(dep.getTime()+3600000*10 + i*600000);
    return {
      id: 'GGL'+(1000+i),
      airline: ['British Airways','Emirates','Cathay','Qatar Airways'][i%4],
      depTime: dep.toISOString(),
      arrTime: arr.toISOString(),
      origin: i%2===0 ? 'JNB' : 'CPT',
      originName: i%2===0 ? 'Johannesburg' : 'Cape Town',
      dest: ['LHR','DXB','FRA','AMS'][i%4],
      destName: ['London','Dubai','Frankfurt','Amsterdam'][i%4],
      stops: i%2,
      priceZAR: 125000 + i*2000,
      durationMin: 10*60 + i*30
    }
  });
}

function formatTime(iso){
  const d = new Date(iso);
  return d.toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
}

function renderCards(flights){
  resultsList.innerHTML = '';
  if(!flights || flights.length===0){
    resultsList.innerHTML = '<div style="padding:20px;background:#fff;border-radius:10px">No flights available.</div>';
    return;
  }
  flights.forEach(f=>{
    const node = document.importNode(cardTemplate, true);
    const root = node.querySelector('.flight-card');
    root.querySelector('.airline').textContent = f.airline || 'Unknown';
    root.querySelector('.time-dep').textContent = formatTime(f.depTime);
    root.querySelector('.time-arr').textContent = formatTime(f.arrTime);
    const origin = f.originName || f.origin || '—';
    const dest = f.destName || f.dest || '—';
    root.querySelector('.route').textContent = `${origin} (${f.origin}) — ${dest} (${f.dest}) • ${Math.floor((f.durationMin||0)/60)}h ${(f.durationMin||0)%60}m`;
    root.querySelector('.price').textContent = `ZAR ${Number(f.priceZAR||0).toLocaleString()}`;
    const btn = root.querySelector('.select');
    btn.addEventListener('click', ()=> {
      const booking = {
        id: f.id,
        airline: f.airline,
        price: f.priceZAR,
        origin: f.origin,
        originName: f.originName,
        dest: f.dest,
        destName: f.destName,
        depTime: f.depTime,
        arrTime: f.arrTime
      };
      sessionStorage.setItem('gg_booking', JSON.stringify(booking));
      window.location = 'seat-selection.html';
    });
    resultsList.appendChild(root);
  });
}

// Load flights from various sources (localStorage override -> static JSON -> demo)
async function loadData(){
  // 1) localStorage override (admin upload)
  try {
    const override = localStorage.getItem('gg_flights_override');
    if(override){
      const parsed = JSON.parse(override);
      if(Array.isArray(parsed)) return parsed;
      // If object with root property, try to find array
      if(parsed && parsed.flights && Array.isArray(parsed.flights)) return parsed.flights;
    }
  } catch(e){
    console.warn('Invalid override JSON in localStorage', e);
  }

  // 2) try static JSON in repo (no node required — use GitHub web UI to add this file)
  try {
    const res = await fetch(dataUrl + '?t=' + Date.now());
    if(res.ok){
      const json = await res.json();
      if(Array.isArray(json)) return json;
      // if API returns an object with flights array
      if(json && Array.isArray(json.flights)) return json.flights;
    }
  } catch(e){
    // fetch failed: maybe file missing or CORS issue
    console.warn('Could not fetch flights.json — using demo data.', e);
  }

  // 3) fallback demo
  return demoFlights();
}

// Wire up search form & filters
document.getElementById('searchForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  resultsList.innerHTML = '<div style="padding:20px;background:#fff;border-radius:10px">Searching flights…</div>';
  let flights = await loadData();
  // simple filter: check origin/dest code or name text
  if(from) flights = flights.filter(f => (String(f.origin||'').toLowerCase().includes(from.toLowerCase()) || String(f.originName||'').toLowerCase().includes(from.toLowerCase())));
  if(to) flights = flights.filter(f => (String(f.dest||'').toLowerCase().includes(to.toLowerCase()) || String(f.destName||'').toLowerCase().includes(to.toLowerCase())));
  if(flights.length === 0){
    // show easier fallback (show full data with a hint)
    flights = await loadData(); // reload fallback (demo)
    renderCards(flights);
    // also show a hint
    const hint = document.createElement('div');
    hint.style.padding='10px';
    hint.style.fontSize='13px';
    hint.style.color='#555';
    hint.textContent = 'No exact matches — showing all available flights. To customize data, add a flights.json file to your repo or use the Admin Upload page.';
    resultsList.prepend(hint);
    return;
  }
  renderCards(flights);
});

// Add small reload button to UI (helpful for admin uploads)
(function addReloadControl(){
  const sec = document.getElementById('resultsSection');
  if(!sec) return;
  const ctrl = document.createElement('div');
  ctrl.style.marginBottom='10px';
  ctrl.innerHTML = '<button id="reloadData" class="btn" style="margin-left:10px">Reload data</button> <a href="admin.html" class="btn" style="margin-left:10px">Open Admin</a>';
  sec.insertBefore(ctrl, sec.firstChild);
  document.getElementById('reloadData').addEventListener('click', async ()=>{
    const flights = await loadData();
    renderCards(flights);
  });
})();

// initial render
(async ()=> {
  const flights = await loadData();
  renderCards(flights);
})();
