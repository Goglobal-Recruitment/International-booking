// flights.js — controls tabs, passenger dropdown + form behaviour (no Node, client only)
(function(){
  // Tab control: one-way / round / multi
  const tabs = document.querySelectorAll('.tab');
  const returnWrap = document.getElementById('returnWrap');
  tabs.forEach(t => t.addEventListener('click', () => {
    tabs.forEach(x => { x.classList.remove('active'); x.setAttribute('aria-selected','false'); });
    t.classList.add('active'); t.setAttribute('aria-selected','true');
    const type = t.dataset.type;
    if(type === 'oneway') {
      returnWrap.style.display = 'none';
      document.getElementById('return').value = '';
    } else {
      returnWrap.style.display = '';
    }
    // you can add multi-city handler later
  }));

  // Passenger dropdown logic
  const paxBtn = document.getElementById('paxBtn');
  const paxMenu = document.getElementById('paxMenu');
  let paxState = { adults:1, children:0, infants:0, class: 'Business' };
  const adultsCount = document.getElementById('adultsCount');
  const childrenCount = document.getElementById('childrenCount');
  const infantsCount = document.getElementById('infantsCount');
  const adultsInput = document.getElementById('adultsInput');
  const childrenInput = document.getElementById('childrenInput');
  const infantsInput = document.getElementById('infantsInput');
  const classInput = document.getElementById('classInput');
  const cabinClass = document.getElementById('cabinClass');

  function updatePaxUI(){
    adultsCount.textContent = paxState.adults;
    childrenCount.textContent = paxState.children;
    infantsCount.textContent = paxState.infants;
    paxBtn.textContent = `${paxState.adults} adult${paxState.adults>1?'s':''}, ${paxState.class} ▾`;
    adultsInput.value = paxState.adults;
    childrenInput.value = paxState.children;
    infantsInput.value = paxState.infants;
    classInput.value = paxState.class;
    cabinClass.value = paxState.class;
  }

  // Open/close menu
  paxBtn.addEventListener('click', (e)=>{
    const open = paxMenu.style.display === 'block';
    paxMenu.style.display = open ? 'none' : 'block';
    paxBtn.setAttribute('aria-expanded', String(!open));
  });

  // Counter buttons
  paxMenu.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-action]');
    if(!btn) return;
    const action = btn.dataset.action;
    const target = btn.dataset.target;
    if(action === 'inc'){
      if(target === 'adults'){ if(paxState.adults < 9) paxState.adults++; }
      if(target === 'children'){ if(paxState.children < 8) paxState.children++; }
      if(target === 'infants'){ if(paxState.infants < paxState.adults) paxState.infants++; }
    } else if(action === 'dec'){
      if(target === 'adults' && paxState.adults > 1) paxState.adults--;
      if(target === 'children' && paxState.children > 0) paxState.children--;
      if(target === 'infants' && paxState.infants > 0) paxState.infants--;
    }
    updatePaxUI();
  });

  // Cabin class change
  cabinClass.addEventListener('change', (e)=>{
    paxState.class = e.target.value;
    updatePaxUI();
  });

  // Apply button
  document.getElementById('paxApply').addEventListener('click', ()=>{
    paxState.class = cabinClass.value;
    updatePaxUI();
    paxMenu.style.display = 'none';
    paxBtn.setAttribute('aria-expanded','false');
  });

  // Close when clicking outside
  document.addEventListener('click', (e)=>{
    if(!e.target.closest('.pax-toggle')){
      paxMenu.style.display = 'none';
      paxBtn.setAttribute('aria-expanded','false');
    }
  });

  // Keyboard improvements for datalist-like suggestion (basic)
  const fromInput = document.getElementById('from');
  const toInput = document.getElementById('to');
  [fromInput,toInput].forEach(inp=>{
    inp.addEventListener('keydown', (e)=>{
      // space+enter to accept; arrows not handled (datalist has limited keyboard UI)
      if(e.key === 'Enter'){
        // allow submit via enter on any field
      }
    });
  });

  // On load: set initial UI
  updatePaxUI();

  // Form submission: validate and redirect to results.html with query params
  const form = document.getElementById('searchForm');
  form.addEventListener('submit', (e)=>{
    // keep native submission but ensure hidden inputs updated
    // validate basic airports
    const fromVal = fromInput.value.trim();
    const toVal = toInput.value.trim();
    if(!fromVal || !toVal){
      e.preventDefault();
      alert('Please enter both origin and destination airports.');
      return;
    }
    // Ensure if one-way chosen, return date not present
    const activeTab = document.querySelector('.tab.active').dataset.type;
    if(activeTab === 'oneway'){
      document.getElementById('return').value = '';
    }
    // sync the hidden class input
    classInput.value = paxState.class;
    // allow normal GET submission to results.html
    // but first ensure URL safe encoding of inputs;
    // we'll prevent default and manually navigate so encoding is clean
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('from', fromVal);
    params.set('to', toVal);
    params.set('depart', document.getElementById('depart').value || '');
    params.set('return', document.getElementById('return').value || '');
    params.set('adults', paxState.adults);
    params.set('children', paxState.children);
    params.set('infants', paxState.infants);
    params.set('class', paxState.class);
    params.set('trip', activeTab);
    // navigate
    window.location = 'results.html?' + params.toString();
  });

  // Accessibility: keyboard close on Escape for paxMenu
  document.addEventListener('keydown', (e)=> {
    if(e.key === 'Escape'){
      paxMenu.style.display = 'none';
      paxBtn.setAttribute('aria-expanded','false');
    }
  });

  // Small progressive enhancement: set depart min to today, return min to depart+1
  const departEl = document.getElementById('depart');
  const returnEl = document.getElementById('return');
  const today = new Date().toISOString().slice(0,10);
  departEl.setAttribute('min', today);
  departEl.addEventListener('change', ()=>{
    const d = departEl.value;
    if(d){
      const msec = new Date(d).getTime() + 24*3600*1000;
      returnEl.setAttribute('min', new Date(msec).toISOString().slice(0,10));

    <script src="https://cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
  const tripButtons = document.querySelectorAll('.trip-btn');
  const segments = document.querySelector('.segments');
  const addSegmentBtn = document.querySelector('.add-segment');
  const passengerCount = document.querySelector('.count');
  let count = 1;

  // Toggle trip type
  tripButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tripButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.dataset.type;

      if(type === 'multi') {
        addSegmentBtn.style.display = 'block';
        document.querySelectorAll('.return-date').forEach(el=>el.style.display='none');
      } else {
        addSegmentBtn.style.display = 'none';
        document.querySelectorAll('.segment .return-date').forEach(el => el.style.display = type==='round'?'block':'none');
        document.querySelectorAll('.segment .remove-segment').forEach(el => el.style.display = 'none');
        // Reset segments to 1
        const originalSegment = segments.children[0].cloneNode(true);
        segments.innerHTML = '';
        segments.appendChild(originalSegment);
        initializeDatePickers();
      }
    });
  });

  // Add new segment for multi-city
  addSegmentBtn.addEventListener('click', () => {
    const newSegment = segments.children[0].cloneNode(true);
    newSegment.querySelector('.remove-segment').style.display = 'block';
    newSegment.querySelectorAll('input').forEach(i => i.value = '');
    segments.appendChild(newSegment);
    initializeDatePickers();
    newSegment.querySelector('.remove-segment').addEventListener('click', () => newSegment.remove());
  });

  // Passenger increment/decrement
  document.querySelector('.increment').addEventListener('click', () => {
    count++;
    passengerCount.textContent = count;
  });
  document.querySelector('.decrement').addEventListener('click', () => {
    if(count>1) count--;
    passengerCount.textContent = count;
  });

  // Search button mock
  document.querySelector('.search-btn').addEventListener('click', () => {
    const tripType = document.querySelector('.trip-btn.active').textContent;
    const directOnly = document.getElementById('direct').checked ? "Yes" : "No";
    const passengers = passengerCount.textContent;
    alert(`Trip Type: ${tripType}\nPassengers: ${passengers}\nDirect Only: ${directOnly}\nSearch triggered! (mock)`);
  });

  // Initialize date pickers
  function initializeDatePickers(){
    document.querySelectorAll('.date-picker').forEach(input => flatpickr(input, {
      minDate: 'today',
      dateFormat: 'Y-m-d'
    }));
  }

  initializeDatePickers();
});
</script>

    
    }
  });

})();
