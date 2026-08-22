/**
 * ============================================================================
 * MENU-SHARED.JS - CONFIGURAZIONE SOCKET.IO & DATI CONDIVISI
 * ============================================================================
 */

const socket = io(); // Connessione globale al server Render

const INITIAL_MENU_DATA = [
  { id: 1, category: 'antipasti', name: 'Tagliere Toscano con Coccoli', price: 14.00, desc: 'Prosciutto crudo DOP, salame toscano, pecorino di Pienza, coccoli caldi.', img: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=400&q=80', tags: ['daily'], isDaily: true, available: true },
  { id: 2, category: 'antipasti', name: 'Tartare di Manzo Chianina', price: 16.50, desc: 'Battuta a coltello con tuorlo marinato, capperi e crostini senza glutine.', img: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=400&q=80', tags: ['gluten-free', 'lactose-free'], isDaily: false, available: true },
  { id: 3, category: 'primi', name: 'Pappardelle al Cinghiale Bianco', price: 15.00, desc: 'Pasta fresca tirata a mano con ragù di cinghiale sfumato al Chianti.', img: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281140?auto=format&fit=crop&w=400&q=80', tags: ['daily'], isDaily: true, available: true },
  { id: 4, category: 'primi', name: 'Tortelli di Zucca al Burro e Salvia', price: 14.50, desc: 'Tortelli artigianali, ripieno di zucca mantovana e Parmigiano 24 mesi.', img: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=400&q=80', tags: ['veg'], isDaily: false, available: true },
  { id: 5, category: 'pizze', name: 'Margherita Verace Contemporanea', price: 9.50, desc: 'Pomodoro San Marzano DOP, Bufala Campana, basilico, olio EVO.', img: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=400&q=80', tags: ['veg'], isDaily: false, available: true },
  { id: 6, category: 'pizze', name: 'Gourmet Tartufo & Stracciatella', price: 16.00, desc: 'Fiordilatte, crema di tartufo nero estivo, carpaccio di manzo marinato.', img: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80', tags: ['daily'], isDaily: true, available: true },
  { id: 7, category: 'secondi', name: 'Bistecca alla Fiorentina (per 2)', price: 48.00, desc: 'Frollatura 45 giorni, cotta su brace di legna con patate arrosto.', img: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', tags: ['gluten-free', 'lactose-free'], isDaily: false, available: true },
  { id: 8, category: 'secondi', name: 'Burger Vegano Gourmet all\'Avocado', price: 13.50, desc: 'Patty di ceci e barbabietola, pomodoro secco, insalata e mayo vegana.', img: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=400&q=80', tags: ['vegan', 'lactose-free'], isDaily: false, available: true },
  { id: 9, category: 'drink', name: 'Negroni Riserva del Conte', price: 9.00, desc: 'Gin Toscano artigianale, Bitter Campari, Vermouth Rosso e scorza d\'arancia.', img: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80', tags: ['gluten-free', 'vegan'], isDaily: false, available: true },
  { id: 10, category: 'dolci', name: 'Tiramisù Artigianale al Bicchiere', price: 6.50, desc: 'Savoiardi sardi, caffè espresso, crema al mascarpone bio e cacao.', img: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=400&q=80', tags: ['veg'], isDaily: true, available: true }
];

function getMenuData() {
  return JSON.parse(localStorage.getItem('menu_digital_storage')) || INITIAL_MENU_DATA;
}

function saveMenuData(data) {
  localStorage.setItem('menu_digital_storage', JSON.stringify(data));
}

function getOrders() {
  return JSON.parse(localStorage.getItem('menu_kds_orders')) || [];
}

function saveOrders(orders) {
  localStorage.setItem('menu_kds_orders', JSON.stringify(orders));
}

function playBeepSound(type = 'notification') {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(type === 'alert' ? 880 : 587.33, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.35);
  } catch (e) {}
}

function showToast(msg) {
  const toast = document.getElementById('menuToast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}