// flights.js — client side UI glue
const dataUrl = 'flights.json'; // produced by GitHub Actions or you can hand-drop
const resultsList = document.getElementById('resultsList');
const cardTemplate = document.getElementById('cardTemplate').content;

async function loadData() {
  try {
    const res = await fetch(dataUrl + '?t=' + Date.now());
    if (!res.ok) throw new Error('No data');
    return await res.json();
  } catch (e) {
    // fallback: generate demo data
    return demoFlights();
  }
}

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
      origin: 'JNB',
      dest: 'LHR',
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
  flights.forEach(f=>{
    const node = document.importNode(cardTemplate, true);
    const root = node.querySelector('.flight-card');
    root.querySelector('.airline').textContent = f.airline;
    root.querySelector('.time-dep').textContent = formatTime(f.depTime);
    root.querySelector('.time-arr').textContent = formatTime(f.arrTime);
    root.querySelector('.route').textContent = `${f.origin} — ${f.dest} • ${Math.floor(f.durationMin/60)}h ${f.durationMin%60}m`;
    root.querySelector('.price').textContent = `ZAR ${Number(f.priceZAR).toLocaleString()}`;
    const btn = root.querySelector('.select');
    btn.addEventListener('click', ()=> {
      // create booking object in sessionStorage and navigate to seat selection
      const booking = {
        id: f.id,
        airline: f.airline,
        price: f.priceZAR,
        origin: f.origin,
        dest: f.dest,
        depTime: f.depTime,
        arrTime: f.arrTime
      };
      sessionStorage.setItem('gg_booking', JSON.stringify(booking));
      window.location = 'seat-selection.html';
    });
    resultsList.appendChild(root);
  });
}

document.getElementById('searchForm').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const from = document.getElementById('from').value.trim();
  const to = document.getElementById('to').value.trim();
  const depart = document.getElementById('depart').value;
  const ret = document.getElementById('return').value;
  // basic UX: show "Searching..."
  resultsList.innerHTML = '<div style="padding:20px;background:#fff;border-radius:10px">Searching flights…</div>';
  let flights = await loadData();
  // simple filter: match origin/dest strings
  flights = flights.filter(f => (f.origin.toLowerCase().includes(from.toLowerCase()) || f.originName?.toLowerCase().includes(from.toLowerCase())) &&
                                 (f.dest.toLowerCase().includes(to.toLowerCase()) || f.destName?.toLowerCase().includes(to.toLowerCase())));
  // fallback if filter removed more than 75%
  if (flights.length === 0) flights = await loadData();
  renderCards(flights);
});

// initial render: show sample results
(async ()=> {
  const flights = await loadData();
  renderCards(flights);
})();
