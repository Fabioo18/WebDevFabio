/**
 * ============================================================================
 * WEDDING MANAGER PRO - REACTIVE SINGLE-STATE CONTROLLER
 * ============================================================================
 */

// STATO INIZIALE DI DEFAULT
const DEFAULT_STATE = {
    allocatedBudget: 40000.0,
  
    // Tavoli e ospiti assegnati
    tables: [
      {
        id: 't-rosa',
        name: 'Rosa',
        collapsed: false,
        guests: [
          { id: 1, name: 'Sofia Marino', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Onnivoro', allergies: 'Lattosio, Crostacei', partner: 'Onnivoro', seats: 2 },
          { id: 2, name: 'Valentina Ricci', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Vegetariano', allergies: '', partner: '', seats: 1 },
          { id: 3, name: 'Matteo Gallo', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Onnivoro', allergies: 'Crostacei', partner: 'Onnivoro, Allergie: Lattosio', seats: 2 },
          { id: 4, name: 'Alessandro Costa', role: 'Testimoni', badgeClass: 'badge-testimoni', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 }
        ]
      },
      {
        id: 't-girasole',
        name: 'Girasole',
        collapsed: false,
        guests: [
          { id: 5, name: 'Maria Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 },
          { id: 6, name: 'Lucia Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: 'Crostacei', partner: '(Figlio/a) Menù bimbi, Seggiolone', seats: 3 },
          { id: 7, name: 'Giovanni Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 },
          { id: 8, name: 'Elena Rossi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 }
        ]
      },
      {
        id: 't-tulipano',
        name: 'Tulipano',
        collapsed: false,
        guests: [
          { id: 9, name: 'Teresa Romano', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: 'Onnivoro', seats: 2 },
          { id: 10, name: 'Elena Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: '', partner: '', seats: 1 },
          { id: 11, name: 'Nicoletta Bianchi', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Onnivoro', allergies: 'Crostacei', partner: '', seats: 1 },
          { id: 12, name: 'Mario Greco', role: 'Familiari sposa', badgeClass: 'badge-famiglia', diet: 'Vegano', allergies: '', partner: 'Onnivoro', seats: 2 }
        ]
      }
    ],
  
    // Anagrafica Globale Ospiti (Totale 80 coperti iniziali)
    globalGuests: [
      { id: 101, name: 'Sofia Marino', group: 'Testimoni', seats: 2, diet: 'Onnivoro (Lattosio)', table: 'Rosa', rsvp: 'Confermato' },
      { id: 102, name: 'Valentina Ricci', group: 'Testimoni', seats: 1, diet: 'Vegetariano', table: 'Rosa', rsvp: 'Confermato' },
      { id: 103, name: 'Matteo Gallo', group: 'Testimoni', seats: 2, diet: 'Crostacei', table: 'Rosa', rsvp: 'Confermato' },
      { id: 104, name: 'Alessandro Costa', group: 'Testimoni', seats: 2, diet: 'Standard', table: 'Rosa', rsvp: 'Confermato' },
      { id: 105, name: 'Maria Bianchi', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Girasole', rsvp: 'Confermato' },
      { id: 106, name: 'Lucia Bianchi', group: 'Familiari sposa', seats: 3, diet: 'Menu Bimbi', table: 'Girasole', rsvp: 'Confermato' },
      { id: 107, name: 'Giovanni Bianchi', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Girasole', rsvp: 'Confermato' },
      { id: 108, name: 'Elena Rossi', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Girasole', rsvp: 'Confermato' },
      { id: 109, name: 'Teresa Romano', group: 'Familiari sposa', seats: 2, diet: 'Standard', table: 'Tulipano', rsvp: 'Confermato' },
      { id: 110, name: 'Elena Bianchi', group: 'Familiari sposa', seats: 1, diet: 'Standard', table: 'Tulipano', rsvp: 'Confermato' },
      { id: 111, name: 'Nicoletta Bianchi', group: 'Familiari sposa', seats: 1, diet: 'Crostacei', table: 'Tulipano', rsvp: 'Confermato' },
      { id: 112, name: 'Mario Greco', group: 'Familiari sposa', seats: 2, diet: 'Vegano', table: 'Tulipano', rsvp: 'Confermato' },
      { id: 113, name: 'Gruppo Colleghi Università', group: 'Amici Sposo', seats: 18, diet: 'Misti', table: 'Da Assegnare', rsvp: 'Confermato' },
      { id: 114, name: 'Famiglia De Luca', group: 'Parenti Sposa', seats: 10, diet: 'Standard', table: 'Da Assegnare', rsvp: 'Confermato' },
      { id: 115, name: 'Zii e Cugini Nord', group: 'Parenti Sposo', seats: 12, diet: 'Standard', table: 'Da Assegnare', rsvp: 'Confermato' },
      { id: 116, name: 'Amici Sport & Basket', group: 'Amici Sposo', seats: 16, diet: 'Standard', table: 'Da Assegnare', rsvp: 'Confermato' }
    ],
  
    // Spese & Bilancio (Totale Iniziale: €34,850 preventivo / €29,467 pagato)
    expenses: [
      { id: 1, vendor: 'Catering Villa Rosa', category: 'Catering e Ricevimento', quote: 17500.0, paid: 15000.0, color: '#34d399' },
      { id: 2, vendor: 'Tenuta Storica Fiesole', category: 'Location', quote: 6500.0, paid: 6500.0, color: '#38bdf8' },
      { id: 3, vendor: 'Photo & Video Art', category: 'Fotografia', quote: 3800.0, paid: 2800.0, color: '#818cf8' },
      { id: 4, vendor: 'Atelier Sartoria', category: 'Abiti e Accessori', quote: 3200.0, paid: 2500.0, color: '#f59e0b' },
      { id: 5, vendor: 'Live Band & DJ Set', category: 'Musica e Intrattenimento', quote: 2000.0, paid: 1500.0, color: '#a78bfa' },
      { id: 6, vendor: 'Floral Designer', category: 'Fiori e Decorazioni', quote: 1850.0, paid: 1167.0, color: '#fb7185' }
    ],
  
    // To-Do List (Totale Iniziale: 12 completati su 29)
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
  
    // Note
    notes: 'Promemoria: accordarsi con il fiorista per l\'allestimento dell\'arco nuziale entro le ore 14:00. Verificare la disponibilità del seggiolone per il tavolo Girasole.',
  
    // Locations
    locations: [
      { id: 1, type: 'Cerimonia Religiosa', name: 'Chiesa di San Miniato al Monte', address: 'Via delle Porte Sante 34, Firenze', time: '16:30', notes: 'Parcheggio riservato per sposi e ospiti con pass.' },
      { id: 2, type: 'Ricevimento & Festa', name: 'Villa Rosa Ricevimenti', address: 'Via Colle Verde 12, Fiesole (FI)', time: '18:30', notes: 'Aperitivo in giardino, cena nella corte interna e open bar serale.' }
    ],
  
    // Gallery
    photos: [
      { id: 1, title: 'Allestimento Floreale Chiesa', url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80' },
      { id: 2, title: 'Bouquet Sposa & Dettagli', url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=600&q=80' },
      { id: 3, title: 'Tavoli e Segnaposto', url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80' },
      { id: 4, title: 'Taglio della Torta Nuziale', url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&w=600&q=80' }
    ],
  
    // Utenti
    users: [
      { id: 1, name: 'Paolo & Francesca', email: 'sposi@matrimonio.it', role: 'Sposi (Admin)', permissions: 'Accesso Completo', status: 'Attivo' },
      { id: 2, name: 'Elena Wedding Planner', email: 'elena@weddingplanner.it', role: 'Wedding Planner', permissions: 'Tavoli, RSVP & Budget', status: 'Attivo' },
      { id: 3, name: 'Staff Catering', email: 'maitre@villarosa.it', role: 'Fornitore', permissions: 'Sola Lettura Tavoli & Dieta', status: 'Attivo' }
    ]
  };
  
  // Caricamento dello Stato Reattivo
  let appState = JSON.parse(localStorage.getItem('wedding_pro_storage')) || DEFAULT_STATE;
  
  /**
   * Salva lo stato in LocalStorage e scatena il ricalcolo di tutta l'interfaccia
   */
  function persistState() {
    localStorage.setItem('wedding_pro_storage', JSON.stringify(appState));
    recalculateAndRenderAll();
  }
  
  // Inizializzazione applicazione
  document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    initModals();
    initTableHandlers();
    initTodoHandlers();
    initBudgetHandlers();
    initGuestHandlers();
    initNotesModule();
    initResetHandler();
    recalculateAndRenderAll();
  });
  
  /* ==========================================================================
     1. NAVIGAZIONE TAB
     ========================================================================== */
  function initTabNavigation() {
    const links = document.querySelectorAll('.sidebar-nav .nav-link');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');
        switchTab(tabId);
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
  
  /* ==========================================================================
     2. MOTORE DI CALCOLO REATTIVO GLOBALE (AGGIORNA TUTTO)
     ========================================================================== */
  function recalculateAndRenderAll() {
    // 1. Calcolo Ospiti Totali e Assegnati
    const totalGuests = appState.globalGuests.reduce((sum, g) => sum + parseInt(g.seats || 1, 10), 0);
    
    let totalAssignedSeats = 0;
    appState.tables.forEach(t => {
      t.guests.forEach(g => totalAssignedSeats += parseInt(g.seats || 1, 10));
    });
  
    // 2. Calcolo Finanziario (Budget & Spese)
    const totalQuotes = appState.expenses.reduce((sum, e) => sum + Number(e.quote || 0), 0);
    const totalPaid = appState.expenses.reduce((sum, e) => sum + Number(e.paid || 0), 0);
    const remainingBudget = appState.allocatedBudget - totalPaid;
  
    // 3. Medie per persona
    const budgetPerGuest = totalGuests > 0 ? (appState.allocatedBudget / totalGuests) : 0;
    const quotePerGuest = totalGuests > 0 ? (totalQuotes / totalGuests) : 0;
    const spentPerGuest = totalGuests > 0 ? (totalPaid / totalGuests) : 0;
  
    // 4. Percentuali
    const percentQuotes = appState.allocatedBudget > 0 ? (totalQuotes / appState.allocatedBudget) * 100 : 0;
    const percentPaid = appState.allocatedBudget > 0 ? (totalPaid / appState.allocatedBudget) * 100 : 0;
  
    // 5. To-Do Stats
    const totalTodos = appState.todos.length;
    const completedTodos = appState.todos.filter(t => t.done).length;
    const pendingTodos = totalTodos - completedTodos;
    const percentTodos = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;
  
    // Aggiornamento DOM KPI Cards (Dashboard)
    setEl('kpiGuests', totalGuests);
    setEl('badgeGuests', totalGuests);
    setEl('badgeTables', appState.tables.length);
    setEl('badgeTodos', pendingTodos);
  
    setEl('kpiBudgetPerGuest', formatCurrency(budgetPerGuest));
    setEl('kpiQuotePerGuest', formatCurrency(quotePerGuest));
    setEl('kpiSpentPerGuest', formatCurrency(spentPerGuest));
  
    setEl('kpiAllocatedBudget', formatCurrency(appState.allocatedBudget));
    setEl('kpiTotalQuotes', formatCurrency(totalQuotes));
    setEl('kpiPercentBudget', percentQuotes.toFixed(2) + '%');
  
    setEl('kpiTotalPaid', formatCurrency(totalPaid));
    setEl('kpiPercentPaid', percentPaid.toFixed(2) + '%');
    setEl('kpiRemainingBudget', formatCurrency(remainingBudget));
  
    // Aggiornamento Pannello Azioni Rapide nella Dashboard
    setEl('qaTableStats', `${totalAssignedSeats} su ${totalGuests} ospiti assegnati`);
    setEl('qaTodoStats', `${pendingTodos} attività aperte da completare`);
    setEl('qaBudgetStats', `Saldo residuo da versare: ${formatCurrency(totalQuotes - totalPaid)}`);
  
    // Aggiornamento Barre e Banner Sezioni
    setEl('assignedCountText', `${totalAssignedSeats} / ${totalGuests}`);
    const assignedPercent = totalGuests > 0 ? Math.min(100, Math.round((totalAssignedSeats / totalGuests) * 100)) : 0;
    const pBar = document.getElementById('assignedProgressBar');
    if (pBar) pBar.style.width = `${assignedPercent}%`;
  
    const tBar = document.getElementById('todoProgressBar');
    if (tBar) tBar.style.width = `${percentTodos}%`;
    setEl('todoStatsText', `<strong>${completedTodos}</strong> impegni completati su <strong>${totalTodos}</strong> (${percentTodos}%)`);
  
    // Banner Budget
    setEl('bSumAllocated', formatCurrency(appState.allocatedBudget));
    setEl('bSumQuotes', formatCurrency(totalQuotes));
    setEl('bSumPaid', formatCurrency(totalPaid));
    setEl('bSumRemaining', formatCurrency(remainingBudget));
  
    // Render Sub-Moduli
    renderDonutChart(totalPaid);
    renderTablesModule();
    renderTodoModule();
    renderBudgetModule();
    renderGroupsModule();
    renderGlobalGuestsModule();
    renderLocationsModule();
    renderGalleryModule();
    renderUsersModule();
    renderQrModule();
  }
  
  /* ==========================================================================
     3. GRAFICO A CIAMBELLA DINAMICO (SVG)
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
      circle.setAttribute('stroke-width', '24');
      circle.setAttribute('stroke-dasharray', `${dashLength} ${circumference}`);
      circle.setAttribute('stroke-dashoffset', -offset);
      circle.style.transition = 'stroke-dasharray 0.3s ease';
      svg.appendChild(circle);
  
      offset += dashLength;
  
      const item = document.createElement('div');
      item.style.display = 'flex';
      item.style.alignItems = 'center';
      item.style.gap = '6px';
      item.style.fontSize = '0.78rem';
      item.innerHTML = `<span style="width:10px;height:10px;border-radius:2px;background:${exp.color}"></span> ${exp.category} (${formatCurrency(exp.paid)})`;
      legend.appendChild(item);
    });
  }
  
  /* ==========================================================================
     4. MODULO TAVOLI (SINCRONIZZATO CON OSPITI E ANAGRAFICA)
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
            <span style="font-size:0.8rem; color:var(--text-muted); font-weight:normal;">(${totalSeatsInTable} posti)</span>
          </div>
          <button class="btn-table-action-del" onclick="event.stopPropagation(); deleteTable('${t.id}')" title="Elimina tavolo">Elimina</button>
        </div>
  
        <div class="table-content-collapsible" style="display: ${t.collapsed ? 'none' : 'block'};">
          <button class="btn-add-guest-pill" onclick="openAddGuestToTableModal('${t.id}')">👤+ Aggiungi Ospite al Tavolo</button>
          <div class="table-guests-body">
            ${t.guests.map(g => `
              <div class="guest-item-card">
                <button class="btn-remove-guest" onclick="removeGuestFromTable('${t.id}', ${g.id})" title="Rimuovi dal tavolo">&times;</button>
                <div class="guest-card-top">
                  <span class="guest-name">${g.name} (${g.seats || 1}p)</span>
                  <span class="badge-role ${g.badgeClass}">${g.role}</span>
                </div>
                <div class="guest-diet-info">
                  <div>Dieta: ${g.diet}</div>
                  ${g.allergies ? `<div>Allergie: ${g.allergies}</div>` : ''}
                  ${g.partner ? `<div style="margin-top:4px; color:#888;">${g.partner}</div>` : ''}
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
    if (t && confirm(`Eliminare il tavolo "${t.name}"? Gli ospiti assegnati passeranno allo stato "Da Assegnare".`)) {
      // Aggiorna anagrafica globale per gli ospiti di questo tavolo
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
        // Aggiorna anagrafica globale
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
          <label>Numero di Coperti / Posti</label>
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
          <label>Dettagli Accompagnatore / Note</label>
          <input type="text" id="mGPartner" placeholder="Es. (Partner) Onnivoro / Menù Bimbi">
        </div>
        <button type="submit" class="btn-rose-main full-width" style="margin-top:10px;">Salva nel Tavolo</button>
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
  
      // Aggiunge al tavolo
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
  
      // Sincronizza o inserisce nell'anagrafica globale
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
     5. MODULO LISTA IMPEGNI (TO-DO LIST)
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
        <td style="color:var(--text-muted); font-size:0.8rem;">${todo.deadline}</td>
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
        if (confirm('Vuoi eliminare tutti gli impegni già completati?')) {
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
              <label>Chi se ne occupa?</label>
              <input type="text" id="mTodoOwner" required placeholder="Es. Paolo & Francesca, Wedding Planner..." value="Paolo & Francesca">
            </div>
            <div class="modal-form-group">
              <label>Deadline Scadenza</label>
              <input type="text" id="mTodoDeadline" placeholder="Es. 24 set 2026 12:00" value="24 set 2026 10:00">
            </div>
            <button type="submit" class="btn-rose-main full-width" style="margin-top:10px;">Aggiungi alla Lista</button>
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
     6. BUDGET MANAGER MODULE (AGGIUNTA, MODIFICA & RICALCOLO)
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
        <td style="color: ${diff > 0 ? '#f59e0b' : '#9e9ea7'};">${formatCurrency(diff)}</td>
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
        showModal('Aggiungi Spesa / Fornitore', `
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
              <label>Preventivo Totale Accordato (€) *</label>
              <input type="number" id="mExpQuote" required min="0" step="50" placeholder="1500">
            </div>
            <div class="modal-form-group">
              <label>Acconto Versato (€)</label>
              <input type="number" id="mExpPaid" min="0" step="50" placeholder="500" value="0">
            </div>
            <button type="submit" class="btn-rose-main full-width" style="margin-top:10px;">Salva Voce di Spesa</button>
          </form>
        `);
  
        document.getElementById('addExpenseModalForm').addEventListener('submit', (e) => {
          e.preventDefault();
          const colors = ['#34d399', '#38bdf8', '#818cf8', '#f59e0b', '#a78bfa', '#fb7185'];
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
    if (confirm('Vuoi rimuovere questa voce di spesa dal budget?')) {
      appState.expenses = appState.expenses.filter(e => e.id !== id);
      persistState();
    }
  };
  
  /* ==========================================================================
     7. ANAGRAFICA INVITATI & GRUPPI (CALCOLI SINCRONIZZATI)
     ========================================================================== */
  function renderGlobalGuestsModule() {
    const tbody = document.getElementById('globalGuestsTableBody');
    const groupFilter = document.getElementById('filterGlobalGuestGroup');
    if (!tbody) return;
  
    tbody.innerHTML = '';
    const search = (document.getElementById('searchGlobalGuests')?.value || '').toLowerCase();
    const selectedGrp = groupFilter?.value || 'all';
  
    // Popola select filtri gruppi dinamicamente
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
              <input type="text" id="mGGGroup" required placeholder="Es. Amici Sposo, Parenti, ecc." value="Amici Sposo">
            </div>
            <div class="modal-form-group">
              <label>Numero di Coperti / Posti</label>
              <input type="number" id="mGGSeats" required min="1" max="20" value="1">
            </div>
            <div class="modal-form-group">
              <label>Menu / Esigenze Alimentari</label>
              <input type="text" id="mGGDiet" placeholder="Standard, Vegano, Allergia Glutine..." value="Standard">
            </div>
            <button type="submit" class="btn-rose-main full-width" style="margin-top:10px;">Aggiungi Ospite</button>
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
        const grpName = prompt('Nome del nuovo gruppo (es. Colleghi Sede Milano):');
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
    if (g && confirm(`Rimuovere "${g.name}" dall'anagrafica?`)) {
      // Rimuove anche dal tavolo se era assegnato
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
        <div style="font-size: 1.5rem; font-weight:800; margin: 8px 0;">${grpMap[grp]} <span style="font-size:0.85rem; font-weight:normal; color:var(--text-muted);">coperti confermati</span></div>
        <p style="font-size:0.8rem; color:var(--text-dim);">Quota automatica calcolata sul totale dei partecipanti.</p>
      `;
      container.appendChild(card);
    });
  }
  
  /* ==========================================================================
     8. LOCATIONS, GALLERY, UTENTI & QR CODE
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
        <p>📍 ${loc.address}</p>
        <div style="font-size:0.85rem; border-top:1px solid var(--border); padding-top:12px;">
          <div>Orario programmato: <strong>${loc.time}</strong></div>
          <div style="color:var(--text-dim); margin-top:4px;">${loc.notes}</div>
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
        const title = prompt('Titolo per la nuova foto:');
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
        const name = prompt('Nome e Cognome nuovo utente:');
        const email = prompt('Email:');
        if (name && email) {
          appState.users.push({
            id: Date.now(),
            name,
            email,
            role: 'Collaboratore',
            permissions: 'Sola Lettura Tavoli',
            status: 'Attivo'
          });
          persistState();
        }
      };
    }
  }
  
  function renderQrModule() {
    const container = document.getElementById('qrCardsContainer');
    if (!container) return;
  
    container.innerHTML = '';
    appState.tables.forEach(t => {
      const card = document.createElement('div');
      card.className = 'qr-stand-card';
      card.innerHTML = `
        <h4>Tavolo ${t.name}</h4>
        <div class="qr-mock-img">SCAN ME</div>
        <p>Inquadra per consultare il menu personalizzato e caricare foto.</p>
      `;
      container.appendChild(card);
    });
  }
  
  function initNotesModule() {
    const area = document.getElementById('notesArea');
    const saveBtn = document.getElementById('saveNotesBtn');
    if (area) area.value = appState.notes;
    if (saveBtn && area) {
      saveBtn.addEventListener('click', () => {
        appState.notes = area.value;
        persistState();
        const status = document.getElementById('notesStatusText');
        if (status) {
          status.innerText = 'Modifiche salvate con successo!';
          setTimeout(() => status.innerText = 'Tutte le modifiche sono sincronizzate in locale.', 2500);
        }
      });
    }
  }
  
  function initResetHandler() {
    const resetBtn = document.getElementById('resetDataBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Vuoi ripristinare tutti i dati dimostrativi iniziali? Le modifiche locali verranno sovrascritte.')) {
          localStorage.removeItem('wedding_pro_storage');
          appState = JSON.parse(JSON.stringify(DEFAULT_STATE));
          persistState();
          alert('Dati ripristinati con successo!');
        }
      });
    }
  }
  
  /* ==========================================================================
     9. GESTIONE MODALI
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