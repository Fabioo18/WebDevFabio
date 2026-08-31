/**
 * ============================================================================
 * WEDDING MANAGER PRO - REACTIVE LUXURY CONTROLLER (LIGHT THEME & THEME SWITCH)
 * ============================================================================
 */

const DEFAULT_FLOORPLAN_IMG = 'assets/planimetria-ristorante.png';

const DEFAULT_STATE = {
  allocatedBudget: 40000.0,
  floorplanImage: DEFAULT_FLOORPLAN_IMG,
  theme: 'light', // Default in tema chiaro Blush & Champagne

  tables: [
    {
      id: 't-rosa',
      name: 'Tavolo 01 - Rosa',
      collapsed: false,
      pin: { x: 30, y: 35 },
      guests: [
        { id: 1, name: 'Sofia Marino', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Onnivoro', allergies: 'Lattosio, Crostacei', partner: 'Onnivoro', seats: 2 },
        { id: 2, name: 'Valentina Ricci', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Vegetariano', allergies: '', partner: '', seats: 1 },
        { id: 3, name: 'Matteo Gallo', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Onnivoro', allergies: 'Crostacei', partner: 'Onnivoro, Allergie: Lattosio', seats: 2 },
        { id: 4, name: 'Alessandro Costa', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 }
      ]
    },
    {
      id: 't-girasole',
      name: 'Tavolo 02 - Girasole',
      collapsed: false,
      pin: { x: 61, y: 35 },
      guests: [
        { id: 5, name: 'Maria Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 },
        { id: 6, name: 'Lucia Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: 'Crostacei', partner: '(Figlio/a) Menù bimbi, Seggiolone', seats: 3 },
        { id: 7, name: 'Giovanni Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 },
        { id: 8, name: 'Elena Rossi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 }
      ]
    },
    {
      id: 't-tulipano',
      name: 'Tavolo 03 - Tulipano',
      collapsed: false,
      pin: { x: 10, y: 39 },
      guests: [
        { id: 9, name: 'Teresa Romano', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 },
        { id: 10, name: 'Elena Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: '', seats: 1 },
        { id: 11, name: 'Nicoletta Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: 'Crostacei', partner: '', seats: 1 },
        { id: 12, name: 'Mario Greco', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Vegano', allergies: '', partner: 'Onnivoro', seats: 2 }
      ]
    }
  ],

  notesList: [
    {
      id: 1,
      title: 'Disposizioni Allestimento Floreale',
      category: 'Fiori & Allestimenti',
      date: '28 Ago 2026',
      content: 'L\'arco nuziale deve essere montato entro le ore 14:00 all\'ingresso del chiostro. Il furgone del fiorista può sostare solo 20 minuti nel cortile posteriore per lo scarico.'
    },
    {
      id: 2,
      title: 'Seggiolone & Allergie Tavolo Girasole',
      category: 'Catering & Menu',
      date: '26 Ago 2026',
      content: 'Verificare che il maître abbia riservato il seggiolone per il figlio di Lucia Bianchi al Tavolo 02 (Girasole) e preparato il menu bimbi dedicato senza crostacei.'
    },
    {
      id: 3,
      title: 'Pratica Permessi SIAE & Scaletta DJ',
      category: 'Musica & SIAE',
      date: '20 Ago 2026',
      content: 'Codice evento SIAE già pagato e inviato alla band via email. Concordato ingresso sposi con brano acustico e DJ set serale a partire dalle 23:30.'
    }
  ],

  globalGuests: [
    { id: 101, name: 'Sofia Marino', group: 'Testimoni', seats: 2, diet: 'Onnivoro (Lattosio)', table: 'Tavolo 01 - Rosa', rsvp: 'Confermato' },
    { id: 102, name: 'Valentina Ricci', group: 'Testimoni', seats: 1, diet: 'Vegetariano', table: 'Tavolo 01 - Rosa', rsvp: 'Confermato' },
    { id: 103, name: 'Matteo Gallo', group: 'Testimoni', seats: 2, diet: 'Crostacei', table: 'Tavolo 01 - Rosa', rsvp: 'Confermato' },
    { id: 104, name: 'Alessandro Costa', group: 'Testimoni', seats: 2, diet: 'Standard', table: 'Tavolo 01 - Rosa', rsvp: 'Confermato' },
    { id: 105, name: 'Maria Bianchi', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Tavolo 02 - Girasole', rsvp: 'Confermato' },
    { id: 106, name: 'Lucia Bianchi', group: 'Familiari sposa', seats: 3, diet: 'Menu Bimbi', table: 'Tavolo 02 - Girasole', rsvp: 'Confermato' },
    { id: 107, name: 'Giovanni Bianchi', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Tavolo 02 - Girasole', rsvp: 'Confermato' },
    { id: 108, name: 'Elena Rossi', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Tavolo 02 - Girasole', rsvp: 'Confermato' },
    { id: 109, name: 'Teresa Romano', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Tavolo 03 - Tulipano', rsvp: 'Confermato' },
    { id: 110, name: 'Elena Bianchi', group: 'Familiari sposa', seats: 1, diet: 'Standard', table: 'Tavolo 03 - Tulipano', rsvp: 'Confermato' },
    { id: 111, name: 'Nicoletta Bianchi', group: 'Familiari sposa', seats: 1, diet: 'Crostacei', table: 'Tavolo 03 - Tulipano', rsvp: 'Confermato' },
    { id: 112, name: 'Mario Greco', group: 'Familiari sposa', seats: 2, diet: 'Vegano', table: 'Tavolo 03 - Tulipano', rsvp: 'Confermato' },
    { id: 113, name: 'Gruppo Colleghi Università', group: 'Amici Sposo', seats: 18, diet: 'Misti', table: 'Da Assegnare', rsvp: 'Confermato' },
    { id: 114, name: 'Famiglia De Luca', group: 'Parenti Sposa', seats: 10, diet: 'Standard', table: 'Da Assegnare', rsvp: 'Confermato' },
    { id: 115, name: 'Zii e Cugini Nord', group: 'Parenti Sposo', seats: 12, diet: 'Standard', table: 'Da Assegnare', rsvp: 'Confermato' },
    { id: 116, name: 'Amici Sport & Basket', group: 'Amici Sposo', seats: 16, diet: 'Standard', table: 'Da Assegnare', rsvp: 'Confermato' }
  ],

  expenses: [
    { id: 1, vendor: 'Catering Villa Rosa', category: 'Catering e Ricevimento', quote: 17500.0, paid: 15000.0, color: '#2e8b57' },
    { id: 2, vendor: 'Tenuta Storica Fiesole', category: 'Location', quote: 6500.0, paid: 6500.0, color: '#b8860b' },
    { id: 3, vendor: 'Photo & Video Art', category: 'Fotografia', quote: 3800.0, paid: 2800.0, color: '#6366f1' },
    { id: 4, vendor: 'Atelier Sartoria', category: 'Abiti e Accessori', quote: 3200.0, paid: 2500.0, color: '#d97706' },
    { id: 5, vendor: 'Live Band & DJ Set', category: 'Musica e Intrattenimento', quote: 2000.0, paid: 1500.0, color: '#8b5cf6' },
    { id: 6, vendor: 'Floral Designer', category: 'Fiori e Decorazioni', quote: 1850.0, paid: 1167.0, color: '#c2788b' }
  ],

  todos: [
    { id: 1, title: 'Fissare la data del matrimonio', owner: 'Paolo & Francesca', deadline: '29 mag 2025 07:41', done: true },
    { id: 2, title: 'Definire il budget totale', owner: 'Paolo & Francesca', deadline: '29 mag 2025 07:41', done: true },
    { id: 3, title: 'Prenotare la location per cerimonia', owner: 'Wedding Planner', deadline: '29 giu 2025 07:41', done: true },
    { id: 4, title: 'Prenotare la location per il ricevimento', owner: 'Wedding Planner', deadline: '29 giu 2025 07:41', done: true },
    { id: 5, title: 'Scegliere e prenotare il fotografo', owner: 'Francesca', deadline: '29 ago 2025 07:41', done: true },
    { id: 6, title: 'Scegliere e prenotare il catering', owner: 'Paolo & Francesca', deadline: '29 set 2025 07:41', done: true },
    { id: 7, title: 'Stilare la lista degli invitati', owner: 'Paolo & Francesca', deadline: '29 set 2025 07:41', done: true },
    { id: 8, title: 'Scegliere l\'abito da sposa', owner: 'Francesca', deadline: '29 ott 2025 07:41', done: true },
    { id: 9, title: 'Scegliere l\'abito da sposo', owner: 'Paolo', deadline: '29 ott 2025 07:41', done: true },
    { id: 10, title: 'Prenotare servizio musicale', owner: 'Paolo', deadline: '29 nov 2025 07:41', done: true },
    { id: 11, title: 'Ordinare le partecipazioni', owner: 'Francesca', deadline: '29 dic 2025 07:41', done: true },
    { id: 12, title: 'Inviare le partecipazioni', owner: 'Paolo & Francesca', deadline: '29 gen 2026 07:41', done: true },
    { id: 13, title: 'Acquistare le fedi nuziali', owner: 'Paolo & Francesca', deadline: '29 mar 2026 07:41', done: false },
    { id: 14, title: 'Conferma menu e degustazione catering', owner: 'Paolo & Francesca', deadline: '15 apr 2026 12:00', done: false },
    { id: 15, title: 'Prova finale abito sposa e sposo', owner: 'Francesca', deadline: '01 mag 2026 15:30', done: false },
    { id: 16, title: 'Definire disposizione tableau de mariage', owner: 'Wedding Planner', deadline: '10 mag 2026 18:00', done: false },
    { id: 17, title: 'Saldo finale fornitori e location', owner: 'Paolo & Francesca', deadline: '20 mag 2026 09:00', done: false },
    { id: 18, title: 'Noleggio auto d\'epoca per cerimonia', owner: 'Paolo', deadline: '22 mag 2026 10:00', done: false },
    { id: 19, title: 'Scelta bomboniere e confetti', owner: 'Francesca', deadline: '25 mag 2026 16:00', done: false },
    { id: 20, title: 'Stampa libretti messa e coni riso', owner: 'Wedding Planner', deadline: '01 giu 2026 11:00', done: false },
    { id: 21, title: 'Incontro con celebrante per letture', owner: 'Paolo & Francesca', deadline: '05 giu 2026 18:00', done: false },
    { id: 22, title: 'Definizione scaletta balli e DJ set', owner: 'Paolo', deadline: '10 giu 2026 21:00', done: false },
    { id: 23, title: 'Ritiro fedi nuziali incise', owner: 'Paolo & Francesca', deadline: '15 giu 2026 15:00', done: false },
    { id: 24, title: 'Trattamenti estetici e prova trucco', owner: 'Francesca', deadline: '20 giu 2026 09:30', done: false },
    { id: 25, title: 'Conferma finale transfer per invitati', owner: 'Wedding Planner', deadline: '21 giu 2026 12:00', done: false },
    { id: 26, title: 'Consegna materiali decorativi alla location', owner: 'Wedding Planner', deadline: '22 giu 2026 14:00', done: false },
    { id: 27, title: 'Stiratura e ritiro abiti sposi', owner: 'Paolo & Francesca', deadline: '23 giu 2026 11:00', done: false },
    { id: 28, title: 'Briefing con fotografo e videomaker', owner: 'Wedding Planner', deadline: '23 giu 2026 17:00', done: false },
    { id: 29, title: 'Verifica meteo e piano B per la pioggia', owner: 'Wedding Planner', deadline: '24 giu 2026 08:00', done: false }
  ],

  locations: [
    { id: 1, type: 'Cerimonia Religiosa', name: 'Chiesa di San Miniato al Monte', address: 'Via delle Porte Sante 34, Firenze', time: '16:30', notes: 'Parcheggio riservato per sposi e ospiti con pass.' },
    { id: 2, type: 'Ricevimento & Festa', name: 'Villa Rosa Ricevimenti', address: 'Via Colle Verde 12, Fiesole (FI)', time: '18:30', notes: 'Aperitivo in giardino, cena nella corte interna e open bar serale.' }
  ],

  photos: [
    { id: 1, title: 'Allestimento Floreale Chiesa', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Bouquet Sposa & Dettagli', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Tavoli e Segnaposto', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Taglio della Torta Nuziale', url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80' }
  ],

  users: [
    { id: 1, name: 'Paolo & Francesca', email: 'sposi@matrimonio.it', role: 'Sposi (Admin)', permissions: 'Accesso Completo', status: 'Attivo' },
    { id: 2, name: 'Elena Wedding Planner', email: 'elena@weddingplanner.it', role: 'Wedding Planner', permissions: 'Tavoli, RSVP & Budget', status: 'Attivo' },
    { id: 3, name: 'Staff Catering', email: 'maitre@villarosa.it', role: 'Fornitore', permissions: 'Sola Lettura Tavoli & Dieta', status: 'Attivo' }
  ]
};

let appState = JSON.parse(localStorage.getItem('wedding_pro_storage')) || DEFAULT_STATE;

if (!Array.isArray(appState.notesList)) {
  appState.notesList = DEFAULT_STATE.notesList;
}

function persistState() {
  localStorage.setItem('wedding_pro_storage', JSON.stringify(appState));
  recalculateAndRenderAll();
}

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initTabNavigation();
  initMobileNav();
  initModals();
  initTableHandlers();
  initInteractiveMap();
  initTodoHandlers();
  initBudgetHandlers();
  initGuestHandlers();
  initNotesModule();
  initResetHandler();
  recalculateAndRenderAll();
});

/* ==========================================================================
   GESTIONE TEMA (LIGHT / DARK SWITCH)
   ========================================================================== */
function initTheme() {
  const btn = document.getElementById('themeToggleBtn');
  const htmlEl = document.documentElement;

  if (!appState.theme) appState.theme = 'light';
  htmlEl.setAttribute('data-theme', appState.theme);
  updateThemeButtonText(btn, appState.theme);

  if (btn) {
    btn.addEventListener('click', () => {
      appState.theme = appState.theme === 'light' ? 'dark' : 'light';
      htmlEl.setAttribute('data-theme', appState.theme);
      updateThemeButtonText(btn, appState.theme);
      persistState();
    });
  }
}

function updateThemeButtonText(btn, theme) {
  if (!btn) return;
  btn.innerText = theme === 'light' ? '🌙 Tema Scuro' : '☀️ Tema Chiaro';
}

/* ==========================================================================
   1. NAVIGAZIONE TAB & MOBILE TOGGLE
   ========================================================================== */
function initTabNavigation() {
  const links = document.querySelectorAll('.sidebar-nav .nav-link');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tabId = link.getAttribute('data-tab');
      switchTab(tabId);
      closeMobileSidebar();
    });
  });
}

window.switchTab = function(tabId) {
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const activeLink = document.querySelector(`.nav-link[data-tab="${tabId}"]`);
  if (activeLink) activeLink.classList.add('active');

  document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  const targetPane = document.getElementById(`view-${tabId}`);
  if (targetPane) targetPane.classList.add('active');
};

function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');

  if (toggleBtn && sidebar && backdrop) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', closeMobileSidebar);
  }
}

function closeMobileSidebar() {
  const sidebar = document.getElementById('appSidebar');
  const backdrop = document.getElementById('sidebarBackdrop');
  if (sidebar) sidebar.classList.remove('open');
  if (backdrop) backdrop.classList.remove('active');
}

/* ==========================================================================
   2. MOTORE DI CALCOLO REATTIVO GLOBALE
   ========================================================================== */
function recalculateAndRenderAll() {
  const totalGuests = appState.globalGuests.reduce((sum, g) => sum + parseInt(g.seats || 1, 10), 0);
  
  let totalAssignedSeats = 0;
  appState.tables.forEach(t => {
    t.guests.forEach(g => totalAssignedSeats += parseInt(g.seats || 1, 10));
  });

  const totalQuotes = appState.expenses.reduce((sum, e) => sum + Number(e.quote || 0), 0);
  const totalPaid = appState.expenses.reduce((sum, e) => sum + Number(e.paid || 0), 0);
  const remainingBudget = appState.allocatedBudget - totalPaid;

  const budgetPerGuest = totalGuests > 0 ? (appState.allocatedBudget / totalGuests) : 0;
  const quotePerGuest = totalGuests > 0 ? (totalQuotes / totalGuests) : 0;
  const spentPerGuest = totalGuests > 0 ? (totalPaid / totalGuests) : 0;

  const percentQuotes = appState.allocatedBudget > 0 ? (totalQuotes / appState.allocatedBudget) * 100 : 0;
  const percentPaid = appState.allocatedBudget > 0 ? (totalPaid / appState.allocatedBudget) * 100 : 0;

  const totalTodos = appState.todos.length;
  const completedTodos = appState.todos.filter(t => t.done).length;
  const pendingTodos = totalTodos - completedTodos;
  const percentTodos = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  setEl('kpiGuests', totalGuests);
  setEl('badgeGuests', totalGuests);
  setEl('badgeTables', appState.tables.length);
  setEl('badgeTodos', pendingTodos);
  setEl('badgeNotes', appState.notesList.length);

  setEl('kpiBudgetPerGuest', formatCurrency(budgetPerGuest));
  setEl('kpiQuotePerGuest', formatCurrency(quotePerGuest));
  setEl('kpiSpentPerGuest', formatCurrency(spentPerGuest));

  setEl('kpiAllocatedBudget', formatCurrency(appState.allocatedBudget));
  setEl('kpiTotalQuotes', formatCurrency(totalQuotes));
  setEl('kpiPercentBudget', percentQuotes.toFixed(1) + '%');

  setEl('kpiTotalPaid', formatCurrency(totalPaid));
  setEl('kpiPercentPaid', percentPaid.toFixed(1) + '%');
  setEl('kpiRemainingBudget', formatCurrency(remainingBudget));

  setEl('qaTableStats', `${totalAssignedSeats} su ${totalGuests} ospiti posizionati`);
  setEl('qaTodoStats', `${pendingTodos} attività aperte da completare`);
  setEl('qaBudgetStats', `Saldo residuo: ${formatCurrency(totalQuotes - totalPaid)}`);
  setEl('qaNotesStats', `${appState.notesList.length} note salvate`);

  setEl('assignedCountText', `${totalAssignedSeats} / ${totalGuests}`);
  const assignedPercent = totalGuests > 0 ? Math.min(100, Math.round((totalAssignedSeats / totalGuests) * 100)) : 0;
  const pBar = document.getElementById('assignedProgressBar');
  if (pBar) pBar.style.width = `${assignedPercent}%`;

  const tBar = document.getElementById('todoProgressBar');
  if (tBar) tBar.style.width = `${percentTodos}%`;
  setEl('todoStatsText', `<strong>${completedTodos}</strong> impegni completati su <strong>${totalTodos}</strong> (${percentTodos}%)`);

  setEl('bSumAllocated', formatCurrency(appState.allocatedBudget));
  setEl('bSumQuotes', formatCurrency(totalQuotes));
  setEl('bSumPaid', formatCurrency(totalPaid));
  setEl('bSumRemaining', formatCurrency(remainingBudget));

  renderDonutChart(totalPaid);
  renderTablesModule();
  renderMapPins();
  renderTodoModule();
  renderBudgetModule();
  renderGroupsModule();
  renderGlobalGuestsModule();
  renderLocationsModule();
  renderGalleryModule();
  renderUsersModule();
  renderQrModule();
  renderNotesGrid();
}

/* ==========================================================================
   3. DONUT CHART SVG
   ========================================================================== */
function renderDonutChart(totalPaid) {
  const svg = document.getElementById('donutSvg');
  const legend = document.getElementById('donutLegend');
  if (!svg || !legend) return;

  svg.innerHTML = '';
  legend.innerHTML = '';

  const r = 70;
  const cx = 100;
  const cy = 100;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  appState.expenses.forEach(exp => {
    const fraction = totalPaid > 0 ? (exp.paid / totalPaid) : 0;
    const dashLength = fraction * circumference;

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', cx);
    circle.setAttribute('cy', cy);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', 'transparent');
    circle.setAttribute('stroke', exp.color);
    circle.setAttribute('stroke-width', '22');
    circle.setAttribute('stroke-dasharray', `${dashLength} ${circumference}`);
    circle.setAttribute('stroke-dashoffset', -offset);
    circle.style.transition = 'stroke-dasharray 0.3s ease';
    svg.appendChild(circle);

    offset += dashLength;

    const item = document.createElement('div');
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.style.gap = '6px';
    item.style.fontSize = '0.75rem';
    item.innerHTML = `<span style="width:8px;height:8px;border-radius:2px;background:${exp.color}"></span> ${exp.category} (${formatCurrency(exp.paid)})`;
    legend.appendChild(item);
  });
}

/* ==========================================================================
   4. MAPPA LOCATION INTERATTIVA & PINNING TAVOLI (DRAG & DROP)
   ========================================================================== */
function initInteractiveMap() {
  const stage = document.getElementById('floorplanStage');
  const imgEl = document.getElementById('floorplanImage');
  const fileInput = document.getElementById('mapFileInput');
  const resetMapBtn = document.getElementById('resetMapDefaultBtn');

  if (imgEl) {
    imgEl.src = appState.floorplanImage || DEFAULT_FLOORPLAN_IMG;
  }

  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function(evt) {
          appState.floorplanImage = evt.target.result;
          imgEl.src = appState.floorplanImage;
          persistState();
          alert('Planimetria caricata con successo!');
        };
        reader.readAsDataURL(file);
      }
    });
  }

  if (resetMapBtn) {
    resetMapBtn.addEventListener('click', () => {
      if (confirm('Ripristinare la planimetria predefinita?')) {
        appState.floorplanImage = DEFAULT_FLOORPLAN_IMG;
        imgEl.src = DEFAULT_FLOORPLAN_IMG;
        persistState();
      }
    });
  }

  if (stage) {
    stage.addEventListener('click', (e) => {
      if (e.target.closest('.map-table-pin')) return;
      const rect = stage.getBoundingClientRect();
      const posX = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const posY = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      openAssignMapPinModal(posX, posY);
    });
  }
}

8/* ==========================================================================
   RENDER MAP PINS (CON DRAG & DROP E ETICHETTE COMPATTE)
   ========================================================================== */
function renderMapPins() {
  const layer = document.getElementById('floorplanPinsLayer');
  const stage = document.getElementById('floorplanStage');
  if (!layer || !stage) return;

  layer.innerHTML = '';

  appState.tables.forEach((t, idx) => {
    if (!t.pin) {
      t.pin = { x: 30 + (idx * 20) % 50, y: 35 + (idx * 15) % 40 };
    }

    const totalSeats = t.guests.reduce((sum, g) => sum + (g.seats || 1), 0);
    
    // Sintesi del nome: rimuove "Tavolo 0X -" se presente per lasciare solo il nome (es. Rosa, Girasole)
    const shortName = t.name.includes('-') ? t.name.split('-').slice(1).join('-').trim() : t.name;

    const pin = document.createElement('div');
    pin.className = 'map-table-pin';
    pin.style.left = `${t.pin.x}%`;
    pin.style.top = `${t.pin.y}%`;
    pin.innerHTML = `
      <span>T${idx + 1}</span>
      <span class="map-pin-tag">${shortName} (${totalSeats}p)</span>
    `;

    // Supporto Drag and Drop completo con Mouse e Touch
    let isDragging = false;
    let startX = 0, startY = 0;
    let hasMoved = false;

    function onPointerDown(e) {
      isDragging = true;
      hasMoved = false;
      startX = e.clientX || e.touches?.[0]?.clientX;
      startY = e.clientY || e.touches?.[0]?.clientY;
      pin.classList.add('dragging');
      e.stopPropagation();

      document.addEventListener('pointermove', onPointerMove);
      document.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;
      const curX = e.clientX || e.touches?.[0]?.clientX;
      const curY = e.clientY || e.touches?.[0]?.clientY;

      if (Math.abs(curX - startX) > 4 || Math.abs(curY - startY) > 4) {
        hasMoved = true;
      }

      const rect = stage.getBoundingClientRect();
      let xPercent = ((curX - rect.left) / rect.width) * 100;
      let yPercent = ((curY - rect.top) / rect.height) * 100;

      xPercent = Math.max(5, Math.min(95, xPercent));
      yPercent = Math.max(5, Math.min(95, yPercent));

      pin.style.left = `${xPercent}%`;
      pin.style.top = `${yPercent}%`;
      t.pin = { x: Math.round(xPercent), y: Math.round(yPercent) };
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      pin.classList.remove('dragging');
      document.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerup', onPointerUp);

      if (hasMoved) {
        persistState();
      } else {
        openTableDetailFromMap(t.id);
      }
    }

    pin.addEventListener('pointerdown', onPointerDown);
    layer.appendChild(pin);
  });
}

function openAssignMapPinModal(xPercent, yPercent) {
  const optionsHtml = appState.tables.map(t => `<option value="${t.id}">${t.name}</option>`).join('');

  showModal('Colloca Tavolo su questa Posizione della Mappa', `
    <form id="assignMapPinForm">
      <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">
        Hai selezionato le coordinate <strong>X: ${xPercent}% | Y: ${yPercent}%</strong> sulla piantina.
      </p>

      <div class="modal-form-group">
        <label>Scegli quale tavolo associare:</label>
        <select id="mapSelectTable">
          <option value="NEW">+ Crea Nuovo Tavolo a queste coordinate</option>
          ${optionsHtml}
        </select>
      </div>

      <div class="modal-form-group" id="newTableNameGroup">
        <label>Nome del Nuovo Tavolo</label>
        <input type="text" id="mapNewTableName" placeholder="Es. Tavolo 04 - Orchidea">
      </div>

      <button type="submit" class="btn-luxury-primary full-width" style="margin-top:10px;">Fissa Posizione sulla Mappa</button>
    </form>
  `);

  const selectEl = document.getElementById('mapSelectTable');
  const nameGrp = document.getElementById('newTableNameGroup');

  selectEl.addEventListener('change', () => {
    nameGrp.style.display = selectEl.value === 'NEW' ? 'flex' : 'none';
  });

  document.getElementById('assignMapPinForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const selected = selectEl.value;

    if (selected === 'NEW') {
      const name = document.getElementById('mapNewTableName').value.trim() || `Tavolo ${appState.tables.length + 1}`;
      appState.tables.push({
        id: 't-' + Date.now(),
        name: name,
        collapsed: false,
        pin: { x: xPercent, y: yPercent },
        guests: []
      });
    } else {
      const table = appState.tables.find(t => t.id === selected);
      if (table) {
        table.pin = { x: xPercent, y: yPercent };
      }
    }

    closeModal();
    persistState();
  });
}

function openTableDetailFromMap(tableId) {
  const table = appState.tables.find(t => t.id === tableId);
  if (!table) return;

  const totalSeats = table.guests.reduce((sum, g) => sum + (g.seats || 1), 0);

  showModal(`Dettagli: ${table.name}`, `
    <div style="margin-bottom:14px;">
      <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:8px;">
        Capienza Attuale: <strong style="color:var(--gold-primary);">${totalSeats} ospiti seduti</strong>
      </div>

      <div style="max-height:220px; overflow-y:auto; display:flex; flex-direction:column; gap:8px; margin-bottom:14px;">
        ${table.guests.length === 0 ? '<div style="color:var(--text-dim); font-size:0.8rem;">Nessun ospite ancora seduto a questo tavolo.</div>' : ''}
        ${table.guests.map(g => `
          <div style="background:var(--bg-card-secondary); border:1px solid var(--border); padding:8px 12px; border-radius:6px; display:flex; justify-content:space-between; align-items:center;">
            <div>
              <strong>${g.name} (${g.seats || 1}p)</strong>
              <div style="font-size:0.72rem; color:var(--gold-primary);">Dieta: ${g.diet} ${g.allergies ? `· Allergie: ${g.allergies}` : ''}</div>
            </div>
            <button class="btn-table-action-del" onclick="removeGuestFromTable('${table.id}', ${g.id}); closeModal();">✕</button>
          </div>
        `).join('')}
      </div>

      <div style="display:flex; gap:8px;">
        <button class="btn-luxury-primary full-width" onclick="closeModal(); openAddGuestToTableModal('${table.id}');">
          👤 + Aggiungi Ospite
        </button>
      </div>
    </div>
  `);
}

/* ==========================================================================
   5. MODULO GESTIONE TAVOLI (SCHEDE A COLONNE)
   ========================================================================== */
function renderTablesModule(query = '') {
  const grid = document.getElementById('tablesColumnsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const filtered = appState.tables.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.guests.some(g => g.name.toLowerCase().includes(query.toLowerCase()))
  );

  filtered.forEach(t => {
    const totalSeatsInTable = t.guests.reduce((sum, g) => sum + (g.seats || 1), 0);
    const col = document.createElement('div');
    col.className = 'table-column-box';
    col.innerHTML = `
      <div class="table-col-header" onclick="toggleTableCollapse('${t.id}')">
        <div class="table-col-title">
          <span>${t.collapsed ? '▸' : '▾'}</span>
          <span>${t.name}</span>
          <span style="font-size:0.75rem; color:var(--text-muted); font-weight:normal; font-family:var(--font-mono);">(${totalSeatsInTable} p)</span>
        </div>
        <button class="btn-table-action-del" onclick="event.stopPropagation(); deleteTable('${t.id}')" title="Elimina">Elimina</button>
      </div>

      <div class="table-content-collapsible" style="display: ${t.collapsed ? 'none' : 'block'};">
        <button class="btn-add-guest-pill" onclick="openAddGuestToTableModal('${t.id}')">👤 + Inserisci Ospite</button>
        <div class="table-guests-body">
          ${t.guests.map(g => `
            <div class="guest-item-card">
              <button class="btn-remove-guest" onclick="removeGuestFromTable('${t.id}', ${g.id})" title="Rimuovi">&times;</button>
              <div class="guest-card-top">
                <span class="guest-name">${g.name} (${g.seats || 1}p)</span>
                <span class="badge-role ${g.badgeClass}">${g.role}</span>
              </div>
              <div class="guest-diet-info">
                <div>Dieta: ${g.diet}</div>
                ${g.allergies ? `<div>Allergie: ${g.allergies}</div>` : ''}
                ${g.partner ? `<div style="margin-top:2px; color:var(--text-dim);">${g.partner}</div>` : ''}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

function initTableHandlers() {
  const addBtn = document.getElementById('addTableBtn');
  const input = document.getElementById('newTableNameInput');

  if (addBtn && input) {
    addBtn.addEventListener('click', () => {
      const name = input.value.trim();
      if (name) {
        appState.tables.push({
          id: 't-' + Date.now(),
          name: name,
          collapsed: false,
          pin: { x: 30 + (appState.tables.length * 15) % 50, y: 40 + (appState.tables.length * 10) % 40 },
          guests: []
        });
        input.value = '';
        persistState();
      }
    });
  }

  const cAll = document.getElementById('collapseAllTablesBtn');
  const eAll = document.getElementById('expandAllTablesBtn');
  if (cAll) cAll.addEventListener('click', () => { appState.tables.forEach(t => t.collapsed = true); persistState(); });
  if (eAll) eAll.addEventListener('click', () => { appState.tables.forEach(t => t.collapsed = false); persistState(); });

  const sInput = document.getElementById('searchTablesInput');
  if (sInput) sInput.addEventListener('input', (e) => renderTablesModule(e.target.value));

  const sortSelect = document.getElementById('sortTablesSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      if (val === 'name') appState.tables.sort((a, b) => a.name.localeCompare(b.name));
      if (val === 'seats') appState.tables.sort((a, b) => b.guests.length - a.guests.length);
      persistState();
    });
  }
}

window.toggleTableCollapse = function(id) {
  const t = appState.tables.find(tbl => tbl.id === id);
  if (t) { t.collapsed = !t.collapsed; persistState(); }
};

window.deleteTable = function(id) {
  const t = appState.tables.find(tbl => tbl.id === id);
  if (t && confirm(`Eliminare il tavolo "${t.name}"? Gli ospiti associati torneranno nello stato Da Assegnare.`)) {
    t.guests.forEach(g => {
      const globalMatch = appState.globalGuests.find(gg => gg.name.toLowerCase() === g.name.toLowerCase());
      if (globalMatch) globalMatch.table = 'Da Assegnare';
    });
    appState.tables = appState.tables.filter(tbl => tbl.id !== id);
    persistState();
  }
};

window.removeGuestFromTable = function(tableId, guestId) {
  const t = appState.tables.find(tbl => tbl.id === tableId);
  if (t) {
    const guest = t.guests.find(g => g.id === guestId);
    if (guest) {
      const globalMatch = appState.globalGuests.find(gg => gg.name.toLowerCase() === guest.name.toLowerCase());
      if (globalMatch) globalMatch.table = 'Da Assegnare';
    }
    t.guests = t.guests.filter(g => g.id !== guestId);
    persistState();
  }
};

window.openAddGuestToTableModal = function(tableId) {
  const targetTable = appState.tables.find(t => t.id === tableId);
  showModal(`Aggiungi Ospite al Tavolo: ${targetTable.name}`, `
    <form id="addGuestTableForm">
      <div class="modal-form-group">
        <label>Nome e Cognome Ospite *</label>
        <input type="text" id="mGName" required placeholder="Es. Marco Rossi">
      </div>
      <div class="modal-form-group">
        <label>Ruolo / Gruppo</label>
        <select id="mGRole">
          <option value="Testimoni">Testimoni</option>
          <option value="Familiari sposa">Familiari sposa</option>
          <option value="Familiari sposo">Familiari sposo</option>
          <option value="Amici Sposo">Amici Sposo</option>
          <option value="Amici Sposa">Amici Sposa</option>
          <option value="Colleghi">Colleghi</option>
        </select>
      </div>
      <div class="modal-form-group">
        <label>Coperti / Posti</label>
        <input type="number" id="mGSeats" min="1" max="10" value="1" required>
      </div>
      <div class="modal-form-group">
        <label>Regime Alimentare</label>
        <input type="text" id="mGDiet" placeholder="Onnivoro, Vegetariano, Vegano, ecc." value="Onnivoro">
      </div>
      <div class="modal-form-group">
        <label>Allergie o Intolleranze</label>
        <input type="text" id="mGAllergies" placeholder="Es. Crostacei, Lattosio, Glutine...">
      </div>
      <div class="modal-form-group">
        <label>Note / Accompagnatore</label>
        <input type="text" id="mGPartner" placeholder="Es. (Partner) Menu Bimbi">
      </div>
      <button type="submit" class="btn-luxury-primary full-width" style="margin-top:10px;">Salva nel Tavolo</button>
    </form>
  `);

  document.getElementById('addGuestTableForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('mGName').value.trim();
    const role = document.getElementById('mGRole').value;
    const seats = parseInt(document.getElementById('mGSeats').value, 10) || 1;
    const diet = document.getElementById('mGDiet').value.trim() || 'Onnivoro';
    const allergies = document.getElementById('mGAllergies').value.trim();
    const partner = document.getElementById('mGPartner').value.trim();

    let bClass = 'badge-amici';
    if (role === 'Testimoni') bClass = 'badge-testimoni';
    if (role.includes('Familiari')) bClass = 'badge-famiglia';

    targetTable.guests.push({
      id: Date.now(),
      name,
      role,
      badgeClass: bClass,
      diet,
      allergies,
      partner,
      seats
    });

    const existingGlobal = appState.globalGuests.find(gg => gg.name.toLowerCase() === name.toLowerCase());
    if (existingGlobal) {
      existingGlobal.table = targetTable.name;
      existingGlobal.seats = seats;
    } else {
      appState.globalGuests.unshift({
        id: Date.now() + 1,
        name,
        group: role,
        seats,
        diet: allergies ? `${diet} (${allergies})` : diet,
        table: targetTable.name,
        rsvp: 'Confermato'
      });
    }

    closeModal();
    persistState();
  });
};

/* ==========================================================================
   6. MODULO NOTE & ACCORDI A SCHEDE
   ========================================================================== */
let activeNoteCat = 'all';

function initNotesModule() {
  const openBtn = document.getElementById('openAddNoteModalBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      showModal('Aggiungi Nuova Nota o Accordo', `
        <form id="addNoteModalForm">
          <div class="modal-form-group">
            <label>Titolo della Nota *</label>
            <input type="text" id="mNoteTitle" required placeholder="Es. Permesso ZTL per Fotografo">
          </div>
          <div class="modal-form-group">
            <label>Categoria</label>
            <select id="mNoteCat">
              <option value="Catering & Menu">🍽️ Catering & Menu</option>
              <option value="Fiori & Allestimenti">🌸 Fiori & Allestimenti</option>
              <option value="Musica & SIAE">🎷 Musica & SIAE</option>
              <option value="Foto & Video">📷 Foto & Video</option>
              <option value="Logistica & Altro">📌 Logistica & Altro</option>
            </select>
          </div>
          <div class="modal-form-group">
            <label>Contenuto & Dettagli *</label>
            <textarea id="mNoteContent" rows="4" required placeholder="Scrivi qui gli accordi presi, numeri di telefono, dettagli logistici..."></textarea>
          </div>
          <button type="submit" class="btn-luxury-primary full-width" style="margin-top:10px;">Salva Nota nell'Archivio</button>
        </form>
      `);

      document.getElementById('addNoteModalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const now = new Date();
        const dateStr = `${now.getDate()} ${['Gen','Feb','Mar','Apr','Mag','Giu','Lug','Ago','Set','Ott','Nov','Dic'][now.getMonth()]} ${now.getFullYear()}`;

        appState.notesList.unshift({
          id: Date.now(),
          title: document.getElementById('mNoteTitle').value.trim(),
          category: document.getElementById('mNoteCat').value,
          date: dateStr,
          content: document.getElementById('mNoteContent').value.trim()
        });

        closeModal();
        persistState();
      });
    });
  }

  document.querySelectorAll('.note-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.note-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeNoteCat = chip.getAttribute('data-cat');
      renderNotesGrid();
    });
  });
}

function renderNotesGrid() {
  const container = document.getElementById('notesCardsGrid');
  if (!container) return;

  container.innerHTML = '';
  const filtered = appState.notesList.filter(n => activeNoteCat === 'all' || n.category === activeNoteCat);

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:30px; color:var(--text-dim);">Nessuna nota presente in questa categoria.</div>`;
    return;
  }

  filtered.forEach(note => {
    const card = document.createElement('div');
    card.className = 'note-card-item';
    card.innerHTML = `
      <div>
        <div class="note-card-head">
          <span class="note-category-badge">${note.category}</span>
          <span style="font-size:0.72rem; color:var(--text-dim); font-family:var(--font-mono);">${note.date}</span>
        </div>
        <div class="note-card-title">${note.title}</div>
        <div class="note-card-body">${note.content}</div>
      </div>
      <div class="note-card-footer">
        <span>Archiviata in locale</span>
        <button class="btn-del-note" onclick="deleteNoteItem(${note.id})">Elimina Nota</button>
      </div>
    `;
    container.appendChild(card);
  });
}

window.deleteNoteItem = function(id) {
  if (confirm('Rimuovere questa nota dall\'archivio?')) {
    appState.notesList = appState.notesList.filter(n => n.id !== id);
    persistState();
  }
};

/* ==========================================================================
   7. CHECKLIST & TO-DO
   ========================================================================== */
function renderTodoModule(query = '', statusFilter = 'all') {
  const tbody = document.getElementById('todoTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  let filtered = appState.todos.filter(t => t.title.toLowerCase().includes(query.toLowerCase()) || t.owner.toLowerCase().includes(query.toLowerCase()));
  if (statusFilter === 'pending') filtered = filtered.filter(t => !t.done);
  if (statusFilter === 'completed') filtered = filtered.filter(t => t.done);

  filtered.forEach(todo => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleTodoItem(${todo.id})"></td>
      <td><strong style="${todo.done ? 'text-decoration:line-through; color:var(--text-dim);' : ''}">${todo.title}</strong></td>
      <td>${todo.owner}</td>
      <td style="color:var(--text-muted); font-size:0.78rem; font-family:var(--font-mono);">${todo.deadline}</td>
      <td>
        <label class="switch">
          <input type="checkbox" ${todo.done ? 'checked' : ''} onchange="toggleTodoItem(${todo.id})">
          <span class="slider"></span>
        </label>
      </td>
      <td><button class="btn-table-action-del" onclick="deleteTodoItem(${todo.id})">✕</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function initTodoHandlers() {
  const sInput = document.getElementById('searchTodoInput');
  const fStatus = document.getElementById('filterTodoStatus');
  if (sInput && fStatus) {
    sInput.addEventListener('input', () => renderTodoModule(sInput.value, fStatus.value));
    fStatus.addEventListener('change', () => renderTodoModule(sInput.value, fStatus.value));
  }

  const delComp = document.getElementById('deleteCompletedTodosBtn');
  if (delComp) {
    delComp.addEventListener('click', () => {
      if (confirm('Vuoi rimuovere tutti gli impegni già completati?')) {
        appState.todos = appState.todos.filter(t => !t.done);
        persistState();
      }
    });
  }

  const sAll = document.getElementById('selectAllTodos');
  if (sAll) {
    sAll.addEventListener('change', (e) => {
      appState.todos.forEach(t => t.done = e.target.checked);
      persistState();
    });
  }

  const openBtn = document.getElementById('openAddTodoModalBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      showModal('Nuovo Impegno di Nozze', `
        <form id="addTodoModalForm">
          <div class="modal-form-group">
            <label>Titolo Attività *</label>
            <input type="text" id="mTodoTitle" required placeholder="Es. Saldo fornitore musica">
          </div>
          <div class="modal-form-group">
            <label>Responsabile</label>
            <input type="text" id="mTodoOwner" required value="Paolo & Francesca">
          </div>
          <div class="modal-form-group">
            <label>Deadline</label>
            <input type="text" id="mTodoDeadline" value="24 set 2026 10:00">
          </div>
          <button type="submit" class="btn-luxury-primary full-width" style="margin-top:10px;">Inserisci Attività</button>
        </form>
      `);

      document.getElementById('addTodoModalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        appState.todos.unshift({
          id: Date.now(),
          title: document.getElementById('mTodoTitle').value.trim(),
          owner: document.getElementById('mTodoOwner').value.trim(),
          deadline: document.getElementById('mTodoDeadline').value.trim(),
          done: false
        });
        closeModal();
        persistState();
      });
    });
  }
}

window.toggleTodoItem = function(id) {
  const item = appState.todos.find(t => t.id === id);
  if (item) { item.done = !item.done; persistState(); }
};

window.deleteTodoItem = function(id) {
  appState.todos = appState.todos.filter(t => t.id !== id);
  persistState();
};

/* ==========================================================================
   8. BUDGET MANAGER
   ========================================================================== */
function renderBudgetModule() {
  const tbody = document.getElementById('budgetTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  appState.expenses.forEach(exp => {
    const diff = exp.quote - exp.paid;
    const isCompleted = diff <= 0;

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${exp.vendor}</strong></td>
      <td><span class="badge-mini" style="border-left:2px solid ${exp.color}">${exp.category}</span></td>
      <td>${formatCurrency(exp.quote)}</td>
      <td class="text-success"><strong>${formatCurrency(exp.paid)}</strong></td>
      <td style="color: ${diff > 0 ? '#b8860b' : 'var(--text-dim)'};">${formatCurrency(diff)}</td>
      <td>
        <span class="badge-role ${isCompleted ? 'badge-testimoni' : 'badge-famiglia'}">
          ${isCompleted ? 'Saldato' : 'In Corso'}
        </span>
      </td>
      <td><button class="btn-table-action-del" onclick="deleteExpenseItem(${exp.id})">Elimina</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function initBudgetHandlers() {
  const openBtn = document.getElementById('openAddExpenseModalBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      showModal('Aggiungi Voce di Spesa', `
        <form id="addExpenseModalForm">
          <div class="modal-form-group">
            <label>Fornitore o Servizio *</label>
            <input type="text" id="mExpVendor" required placeholder="Es. Noleggio Auto d'Epoca">
          </div>
          <div class="modal-form-group">
            <label>Categoria</label>
            <select id="mExpCategory">
              <option value="Catering e Ricevimento">Catering e Ricevimento</option>
              <option value="Location">Location</option>
              <option value="Fotografia">Fotografia</option>
              <option value="Abiti e Accessori">Abiti e Accessori</option>
              <option value="Musica e Intrattenimento">Musica e Intrattenimento</option>
              <option value="Fiori e Decorazioni">Fiori e Decorazioni</option>
              <option value="Altro">Altro / Extra</option>
            </select>
          </div>
          <div class="modal-form-group">
            <label>Preventivo Concordato (€) *</label>
            <input type="number" id="mExpQuote" required min="0" step="50" placeholder="1500">
          </div>
          <div class="modal-form-group">
            <label>Acconto Versato (€)</label>
            <input type="number" id="mExpPaid" min="0" step="50" placeholder="500" value="0">
          </div>
          <button type="submit" class="btn-luxury-primary full-width" style="margin-top:10px;">Salva Voce</button>
        </form>
      `);

      document.getElementById('addExpenseModalForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const colors = ['#2e8b57', '#b8860b', '#6366f1', '#d97706', '#8b5cf6', '#c2788b'];
        appState.expenses.push({
          id: Date.now(),
          vendor: document.getElementById('mExpVendor').value.trim(),
          category: document.getElementById('mExpCategory').value,
          quote: parseFloat(document.getElementById('mExpQuote').value) || 0,
          paid: parseFloat(document.getElementById('mExpPaid').value) || 0,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
        closeModal();
        persistState();
      });
    });
  }
}

window.deleteExpenseItem = function(id) {
  if (confirm('Vuoi rimuovere questa voce dal budget?')) {
    appState.expenses = appState.expenses.filter(e => e.id !== id);
    persistState();
  }
};

/* ==========================================================================
   9. ANAGRAFICA INVITATI & GRUPPI
   ========================================================================== */
function renderGlobalGuestsModule() {
  const tbody = document.getElementById('globalGuestsTableBody');
  const groupFilter = document.getElementById('filterGlobalGuestGroup');
  if (!tbody) return;

  tbody.innerHTML = '';
  const search = (document.getElementById('searchGlobalGuests')?.value || '').toLowerCase();
  const selectedGrp = groupFilter?.value || 'all';

  if (groupFilter) {
    const currentVal = groupFilter.value;
    const groups = [...new Set(appState.globalGuests.map(g => g.group))];
    groupFilter.innerHTML = '<option value="all">Tutti i gruppi</option>';
    groups.forEach(grp => {
      const opt = document.createElement('option');
      opt.value = grp;
      opt.innerText = grp;
      if (grp === currentVal) opt.selected = true;
      groupFilter.appendChild(opt);
    });
  }

  let filtered = appState.globalGuests.filter(g => 
    g.name.toLowerCase().includes(search) || g.group.toLowerCase().includes(search) || g.diet.toLowerCase().includes(search)
  );

  if (selectedGrp !== 'all') {
    filtered = filtered.filter(g => g.group === selectedGrp);
  }

  filtered.forEach(g => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${g.name}</strong></td>
      <td><span class="badge-role badge-famiglia">${g.group}</span></td>
      <td><strong>${g.seats}</strong> coperti</td>
      <td>${g.diet}</td>
      <td><span class="badge-mini">${g.table}</span></td>
      <td><span class="text-success">● ${g.rsvp}</span></td>
      <td><button class="btn-table-action-del" onclick="deleteGlobalGuest(${g.id})">✕</button></td>
    `;
    tbody.appendChild(tr);
  });
}

function initGuestHandlers() {
  const sInput = document.getElementById('searchGlobalGuests');
  const fGrp = document.getElementById('filterGlobalGuestGroup');
  if (sInput) sInput.addEventListener('input', renderGlobalGuestsModule);
  if (fGrp) fGrp.addEventListener('change', renderGlobalGuestsModule);

  const openBtn = document.getElementById('openAddGuestModalBtn');
  if (openBtn) {
    openBtn.addEventListener('click', () => {
      showModal('Aggiungi Ospite all\'Anagrafica', `
        <form id="addGlobalGuestForm">
          <div class="modal-form-group">
            <label>Nome e Cognome / Famiglia *</label>
            <input type="text" id="mGGName" required placeholder="Es. Famiglia Rossi">
          </div>
          <div class="modal-form-group">
            <label>Gruppo</label>
            <input type="text" id="mGGGroup" required value="Amici Sposo">
          </div>
          <div class="modal-form-group">
            <label>Numero di Coperti</label>
            <input type="number" id="mGGSeats" required min="1" max="20" value="1">
          </div>
          <div class="modal-form-group">
            <label>Menu / Dieta</label>
            <input type="text" id="mGGDiet" value="Standard">
          </div>
          <button type="submit" class="btn-luxury-primary full-width" style="margin-top:10px;">Inserisci Ospite</button>
        </form>
      `);

      document.getElementById('addGlobalGuestForm').addEventListener('submit', (e) => {
        e.preventDefault();
        appState.globalGuests.unshift({
          id: Date.now(),
          name: document.getElementById('mGGName').value.trim(),
          group: document.getElementById('mGGGroup').value.trim(),
          seats: parseInt(document.getElementById('mGGSeats').value, 10) || 1,
          diet: document.getElementById('mGGDiet').value.trim() || 'Standard',
          table: 'Da Assegnare',
          rsvp: 'Confermato'
        });
        closeModal();
        persistState();
      });
    });
  }

  const openGrpBtn = document.getElementById('openAddGroupModalBtn');
  if (openGrpBtn) {
    openGrpBtn.addEventListener('click', () => {
      const grpName = prompt('Nome del nuovo gruppo:');
      if (grpName) {
        appState.globalGuests.push({
          id: Date.now(),
          name: `Capogruppo ${grpName}`,
          group: grpName,
          seats: 1,
          diet: 'Standard',
          table: 'Da Assegnare',
          rsvp: 'Confermato'
        });
        persistState();
      }
    });
  }
}

window.deleteGlobalGuest = function(id) {
  const g = appState.globalGuests.find(guest => guest.id === id);
  if (g && confirm(`Rimuovere "${g.name}"?`)) {
    appState.tables.forEach(t => {
      t.guests = t.guests.filter(tg => tg.name.toLowerCase() !== g.name.toLowerCase());
    });
    appState.globalGuests = appState.globalGuests.filter(guest => guest.id !== id);
    persistState();
  }
};

function renderGroupsModule() {
  const container = document.getElementById('groupsGridContainer');
  if (!container) return;

  container.innerHTML = '';
  const grpMap = {};

  appState.globalGuests.forEach(g => {
    grpMap[g.group] = (grpMap[g.group] || 0) + parseInt(g.seats || 1, 10);
  });

  Object.keys(grpMap).forEach(grp => {
    const card = document.createElement('div');
    card.className = 'group-stat-card';
    card.innerHTML = `
      <h3>${grp}</h3>
      <div style="font-size: 1.5rem; font-weight:800; font-family:var(--font-mono); margin: 6px 0;">${grpMap[grp]} <span style="font-size:0.8rem; font-weight:normal; color:var(--text-muted);">coperti</span></div>
      <p style="font-size:0.75rem; color:var(--text-dim);">Quota calcolata sui partecipanti effettivi.</p>
    `;
    container.appendChild(card);
  });
}

/* ==========================================================================
   10. LOCATIONS, GALLERY, UTENTI
   ========================================================================== */
function renderLocationsModule() {
  const container = document.getElementById('locationsGridContainer');
  if (!container) return;

  container.innerHTML = '';
  appState.locations.forEach(loc => {
    const box = document.createElement('div');
    box.className = 'location-box';
    box.innerHTML = `
      <span class="loc-badge">${loc.type}</span>
      <h3>${loc.name}</h3>
      <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px;">📍 ${loc.address}</p>
      <div style="font-size:0.8rem; border-top:1px solid var(--border); padding-top:10px;">
        <div>Orario programmato: <strong>${loc.time}</strong></div>
        <div style="color:var(--text-dim); margin-top:3px;">${loc.notes}</div>
      </div>
    `;
    container.appendChild(box);
  });
}

function renderGalleryModule() {
  const container = document.getElementById('galleryContainer');
  if (!container) return;

  container.innerHTML = '';
  appState.photos.forEach(photo => {
    const item = document.createElement('div');
    item.className = 'gallery-photo-card';
    item.style.backgroundImage = `url('${photo.url}')`;
    item.innerHTML = `<span>${photo.title}</span>`;
    container.appendChild(item);
  });

  const simBtn = document.getElementById('uploadPhotoSimBtn');
  if (simBtn) {
    simBtn.onclick = () => {
      const title = prompt('Titolo della foto:');
      if (title) {
        appState.photos.unshift({
          id: Date.now(),
          title: title,
          url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
        });
        persistState();
      }
    };
  }
}

function renderUsersModule() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody) return;

  tbody.innerHTML = '';
  appState.users.forEach(u => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td><span class="badge-role badge-testimoni">${u.role}</span></td>
      <td>${u.permissions}</td>
      <td><span class="text-success">● ${u.status}</span></td>
    `;
    tbody.appendChild(tr);
  });

  const addBtn = document.getElementById('openAddUserModalBtn');
  if (addBtn) {
    addBtn.onclick = () => {
      const name = prompt('Nome nuovo utente:');
      const email = prompt('Email:');
      if (name && email) {
        appState.users.push({
          id: Date.now(),
          name,
          email,
          role: 'Collaboratore',
          permissions: 'Sola Lettura',
          status: 'Attivo'
        });
        persistState();
      }
    };
  }
}

/* ==========================================================================
   11. QR CODE UNIFICATO & SEGNAPOSTO DA TAVOLO
   ========================================================================== */
function renderQrModule() {
  const container = document.getElementById('qrCardsContainer');
  if (!container) return;

  container.innerHTML = '';
  appState.tables.forEach(t => {
    const card = document.createElement('div');
    card.className = 'qr-stand-card';
    card.innerHTML = `
      <h4>${t.name}</h4>
      <div class="qr-mock-img">SCAN ME</div>
      <p>Menu banchetto, programma nozze e caricamento foto live.</p>
    `;
    container.appendChild(card);
  });
}

function initResetHandler() {
  const resetBtn = document.getElementById('resetDataBtn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      if (confirm('Vuoi ripristinare i dati dimostrativi iniziali?')) {
        localStorage.removeItem('wedding_pro_storage');
        appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
        persistState();
        alert('Dati ripristinati con successo!');
      }
    });
  }
}

/* ==========================================================================
   12. GESTIONE MODALI UNIVERSALI
   ========================================================================== */
function initModals() {
  const closeBtn = document.getElementById('closeModalBtn');
  const overlay = document.getElementById('appModal');
  if (closeBtn && overlay) {
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeModal();
    });
  }
}

function showModal(title, contentHtml) {
  const overlay = document.getElementById('appModal');
  const mTitle = document.getElementById('modalTitle');
  const mBody = document.getElementById('modalBody');
  if (overlay && mTitle && mBody) {
    mTitle.innerText = title;
    mBody.innerHTML = contentHtml;
    overlay.classList.add('active');
  }
}

function closeModal() {
  const overlay = document.getElementById('appModal');
  if (overlay) overlay.classList.remove('active');
}

/* ==========================================================================
   HELPER UTILITY
   ========================================================================== */
function setEl(id, val) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = val;
}

function formatCurrency(amount) {
  return '€' + Number(amount || 0).toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}