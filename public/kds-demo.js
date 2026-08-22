/**
 * ============================================================================
 * KDS-DEMO.JS - MONITOR CUCINA & CASSA CON SOCKET.IO
 * ============================================================================
 */

let currentFilter = 'active'; 
let orderBeingEdited = null;

document.addEventListener('DOMContentLoaded', () => {
  renderKdsScreen();
  initKdsFilterButtons();
  initKdsSocketListeners();
  initMenuAdminDrawer();
  initEditOrderModal();
  initShiftCloseHandlers();
});

function initKdsSocketListeners() {
  socket.on('order_received', (order) => {
    const orders = getOrders();
    // Controlla se l'ordine esiste già per evitare doppioni
    const exists = orders.some(o => o.id === order.id);
    if (!exists) {
      orders.unshift(order);
      saveOrders(orders);
      playBeepSound('alert');
      showToast(`⚡ Nuova comanda #${order.id} da ${order.table}!`);
      renderKdsScreen();
    }
  });

  socket.on('waiter_called', (data) => {
    playBeepSound('alert');
    showToast(`🔔 CHIAMATA CAMERIERE dal ${data.table}!`);
  });
}

function initKdsFilterButtons() {
  const btnActive = document.getElementById('filterActiveBtn');
  const btnBilling = document.getElementById('filterBillingBtn');
  const btnHistory = document.getElementById('filterHistoryBtn');

  const setFilter = (filter, activeBtn) => {
    currentFilter = filter;
    [btnActive, btnBilling, btnHistory].forEach(b => {
      if (b) b.classList.remove('active');
    });
    if (activeBtn) activeBtn.classList.add('active');
    renderKdsScreen();
  };

  if (btnActive) btnActive.onclick = () => setFilter('active', btnActive);
  if (btnBilling) btnBilling.onclick = () => setFilter('billing', btnBilling);
  if (btnHistory) btnHistory.onclick = () => setFilter('history', btnHistory);
}

function renderKdsScreen() {
  const container = document.getElementById('kdsOrdersContainer');
  if (!container) return;

  const orders = getOrders();

  const activeOrders = orders.filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'ready');
  const billingOrders = orders.filter(o => o.status === 'billing');
  const completedOrders = orders.filter(o => o.status === 'completed');

  const totalEarned = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
  const totalPending = [...activeOrders, ...billingOrders].reduce((sum, o) => sum + (o.total || 0), 0);

  const totalEarnedEl = document.getElementById('kdsTotalEarned');
  const totalPendingEl = document.getElementById('kdsTotalPending');
  const activeCountEl = document.getElementById('kdsActiveCount');
  const billingCountEl = document.getElementById('kdsBillingCount');
  const historyCountEl = document.getElementById('kdsHistoryCount');

  if (totalEarnedEl) totalEarnedEl.innerText = `€${totalEarned.toFixed(2)}`;
  if (totalPendingEl) totalPendingEl.innerText = `€${totalPending.toFixed(2)}`;
  if (activeCountEl) activeCountEl.innerText = activeOrders.length;
  if (billingCountEl) billingCountEl.innerText = billingOrders.length;
  if (historyCountEl) historyCountEl.innerText = completedOrders.length;

  container.innerHTML = '';
  let displayList = activeOrders;
  if (currentFilter === 'billing') displayList = billingOrders;
  if (currentFilter === 'history') displayList = completedOrders;

  if (displayList.length === 0) {
    let emptyMsg = 'Nessuna comanda in preparazione.';
    if (currentFilter === 'billing') emptyMsg = 'Nessun tavolo ha richiesto il conto.';
    if (currentFilter === 'history') emptyMsg = 'Nessuna comanda saldata nel turno corrente.';

    container.innerHTML = `<div style="color:#aaa; padding:60px 20px; text-align:center; grid-column: 1/-1; font-size:1.1rem;">${emptyMsg}</div>`;
    return;
  }

  displayList.forEach(order => {
    const card = document.createElement('div');
    card.className = `kds-order-card status-${order.status}`;

    let statusBtnLabel = '';
    let btnClass = 'btn-kds-step';

    if (order.status === 'pending') statusBtnLabel = '⏳ In Attesa ➔ Inizia Preparazione';
    else if (order.status === 'preparing') statusBtnLabel = '👨‍🍳 In Preparazione ➔ Pronto al Pass';
    else if (order.status === 'ready') statusBtnLabel = '🍽️ Pronto al Pass ➔ Richiedi / Porta Conto';
    else if (order.status === 'billing') {
      statusBtnLabel = '🧾 Paga Conto & Incassa (€' + Number(order.total).toFixed(2) + ') ➔';
      btnClass = 'btn-kds-step btn-billing-highlight';
    } else if (order.status === 'completed') {
      statusBtnLabel = '✔️ Pagato & Concluso';
    }

    card.innerHTML = `
      <div class="kds-card-head">
        <div>
          <strong class="kds-order-num">#${order.id}</strong>
          <div class="kds-table-name">${order.table}</div>
        </div>
        <div style="text-align:right;">
          <div class="kds-time-box">${order.time}</div>
          <strong style="color:var(--accent-gold); font-family:var(--font-mono); font-size:0.95rem;">€${Number(order.total).toFixed(2)}</strong>
        </div>
      </div>

      <div class="kds-items-body">
        ${order.items.map(it => `
          <div class="kds-item-line">
            <span class="kds-qty">${it.qty}x</span>
            <span class="kds-dish-title">${it.name}</span>
          </div>
        `).join('')}
      </div>

      ${order.notes && order.notes !== 'Nessuna nota speciale' ? `<div class="kds-note-box">⚠️ ${order.notes}</div>` : ''}

      <div class="kds-card-foot">
        <button class="${btnClass}" onclick="advanceOrderStatus(${order.id})">
          ${statusBtnLabel}
        </button>
        ${order.status !== 'completed' ? `<button class="btn-edit-order-kds" onclick="openEditOrderModal(${order.id})">✏️ Modifica Comanda</button>` : ''}
      </div>
    `;

    container.appendChild(card);
  });
}

window.advanceOrderStatus = function(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  if (order.status === 'pending') order.status = 'preparing';
  else if (order.status === 'preparing') order.status = 'ready';
  else if (order.status === 'ready') order.status = 'billing';
  else if (order.status === 'billing') order.status = 'completed';
  else if (order.status === 'completed') order.status = 'pending';

  saveOrders(orders);
  renderKdsScreen();

  // Invia aggiornamento stato al server
  socket.emit('update_status', {
    orderId: order.id,
    newStatus: order.status,
    table: order.table
  });
};

/* ==========================================================================
   CHIUSURA TURNO GIORNALIERO & ARCHIVIO STORICO
   ========================================================================== */
function initShiftCloseHandlers() {
  const closeShiftBtn = document.getElementById('closeShiftBtn');
  const openHistBtn = document.getElementById('openHistoryModalBtn');
  const closeHistBtn = document.getElementById('closeDailyHistoryModalBtn');
  const closeHistBtn2 = document.getElementById('closeDailyHistoryBtn');
  const histModal = document.getElementById('dailyHistoryModal');

  if (closeShiftBtn) {
    closeShiftBtn.addEventListener('click', () => {
      const orders = getOrders();
      const completedOrders = orders.filter(o => o.status === 'completed');
      const pendingOrders = orders.filter(o => o.status !== 'completed');

      if (pendingOrders.length > 0) {
        if (!confirm(`Attenzione: ci sono ancora ${pendingOrders.length} comande aperte al tavolo non saldate. Vuoi chiudere comunque il turno registrando solo l'incasso saldato?`)) {
          return;
        }
      }

      const totalEarned = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0);
      const now = new Date();
      const dateString = `${now.toLocaleDateString('it-IT')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const history = getDailyHistory();
      history.unshift({
        id: Date.now(),
        date: dateString,
        totalOrders: completedOrders.length,
        totalRevenue: totalEarned,
        avgTicket: completedOrders.length > 0 ? (totalEarned / completedOrders.length) : 0
      });
      localStorage.setItem('menu_daily_history_storage', JSON.stringify(history));

      saveOrders([]);
      localStorage.removeItem('my_active_order_id');

      socket.emit('shift_reset');

      renderKdsScreen();
      playBeepSound('notification');
      alert(`🌙 Turno chiuso con successo!\nIncasso registrato nell'archivio: €${totalEarned.toFixed(2)}\nIl monitor è pronto per il nuovo servizio.`);
    });
  }

  if (openHistBtn) {
    openHistBtn.addEventListener('click', () => {
      renderDailyHistoryModal();
      if (histModal) histModal.classList.add('active');
    });
  }

  if (closeHistBtn) closeHistBtn.onclick = () => histModal.classList.remove('active');
  if (closeHistBtn2) closeHistBtn2.onclick = () => histModal.classList.remove('active');
}

function getDailyHistory() {
  return JSON.parse(localStorage.getItem('menu_daily_history_storage')) || [
    { id: 1, date: 'Ieri 23:30', totalOrders: 34, totalRevenue: 1280.00, avgTicket: 37.64 },
    { id: 2, date: '2 giorni fa 23:45', totalOrders: 28, totalRevenue: 994.50, avgTicket: 35.51 }
  ];
}

function renderDailyHistoryModal() {
  const tbody = document.getElementById('dailyHistoryTableBody');
  const grandTotalEl = document.getElementById('histGrandTotal');
  const totalDaysEl = document.getElementById('histTotalDays');
  if (!tbody) return;

  const history = getDailyHistory();
  const grandTotal = history.reduce((s, h) => s + h.totalRevenue, 0);

  if (grandTotalEl) grandTotalEl.innerText = `€${grandTotal.toFixed(2)}`;
  if (totalDaysEl) totalDaysEl.innerText = `${history.length} turni registrati`;

  tbody.innerHTML = '';
  history.forEach(h => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${h.date}</strong></td>
      <td>${h.totalOrders} comande</td>
      <td style="color:var(--text-muted); font-family:var(--font-mono);">€${Number(h.avgTicket).toFixed(2)}</td>
      <td class="text-green" style="font-family:var(--font-mono); font-weight:700;">€${Number(h.totalRevenue).toFixed(2)}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ==========================================================================
   MODIFICA COMANDA & ADMIN MENU
   ========================================================================== */
function initEditOrderModal() {
  const closeBtn = document.getElementById('closeEditOrderModalBtn');
  const saveBtn = document.getElementById('saveEditedOrderBtn');
  const addDishBtn = document.getElementById('quickAddDishBtn');

  if (closeBtn) closeBtn.onclick = () => document.getElementById('editOrderModal').classList.remove('active');

  if (addDishBtn) {
    addDishBtn.onclick = () => {
      if (!orderBeingEdited) return;
      const select = document.getElementById('quickAddDishSelect');
      const dishId = parseInt(select.value, 10);
      const menu = getMenuData();
      const dish = menu.find(d => d.id === dishId);

      if (dish) {
        const existing = orderBeingEdited.items.find(it => it.id === dish.id || it.name === dish.name);
        if (existing) existing.qty++;
        else orderBeingEdited.items.push({ id: dish.id, name: dish.name, qty: 1, price: dish.price });

        recalculateEditedOrderTotal();
        renderEditOrderModalContent();
      }
    };
  }

  if (saveBtn) {
    saveBtn.onclick = () => {
      if (!orderBeingEdited) return;

      const orders = getOrders();
      const idx = orders.findIndex(o => o.id === orderBeingEdited.id);
      if (idx !== -1) {
        orderBeingEdited.notes = document.getElementById('editOrderNotesInput').value.trim() || 'Nessuna nota speciale';
        recalculateEditedOrderTotal();
        orders[idx] = JSON.parse(JSON.stringify(orderBeingEdited));
        saveOrders(orders);

        document.getElementById('editOrderModal').classList.remove('active');
        renderKdsScreen();
        showToast(`Comanda #${orderBeingEdited.id} aggiornata!`);
      }
    };
  }
}

window.openEditOrderModal = function(orderId) {
  const orders = getOrders();
  const order = orders.find(o => o.id === orderId);
  if (!order) return;

  orderBeingEdited = JSON.parse(JSON.stringify(order));

  document.getElementById('editOrderModalTitle').innerText = `Modifica Comanda #${orderBeingEdited.id}`;
  document.getElementById('editOrderTableSub').innerText = orderBeingEdited.table;
  document.getElementById('editOrderNotesInput').value = orderBeingEdited.notes === 'Nessuna nota speciale' ? '' : orderBeingEdited.notes;

  const menu = getMenuData();
  const select = document.getElementById('quickAddDishSelect');
  select.innerHTML = '';
  menu.forEach(d => {
    const opt = document.createElement('option');
    opt.value = d.id;
    opt.innerText = `${d.name} (€${Number(d.price).toFixed(2)})`;
    select.appendChild(opt);
  });

  recalculateEditedOrderTotal();
  renderEditOrderModalContent();
  document.getElementById('editOrderModal').classList.add('active');
};

function renderEditOrderModalContent() {
  const container = document.getElementById('editOrderItemsContainer');
  if (!container || !orderBeingEdited) return;

  container.innerHTML = '';
  orderBeingEdited.items.forEach((item, index) => {
    const row = document.createElement('div');
    row.className = 'edit-item-row';
    row.innerHTML = `
      <div>
        <strong>${item.name}</strong>
        <div style="font-size:0.75rem; color:var(--accent-gold);">€${(Number(item.price) * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="btn-qty" onclick="changeEditItemQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button class="btn-qty" onclick="changeEditItemQty(${index}, 1)">+</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.changeEditItemQty = function(index, delta) {
  if (!orderBeingEdited) return;
  orderBeingEdited.items[index].qty += delta;
  if (orderBeingEdited.items[index].qty <= 0) {
    orderBeingEdited.items.splice(index, 1);
  }
  recalculateEditedOrderTotal();
  renderEditOrderModalContent();
};

function recalculateEditedOrderTotal() {
  if (!orderBeingEdited) return;
  const tot = orderBeingEdited.items.reduce((s, it) => s + (Number(it.price) * it.qty), 0);
  orderBeingEdited.total = tot;
  document.getElementById('editOrderTotalText').innerText = `€${tot.toFixed(2)}`;
}

/* ==========================================================================
   GESTIONE MENU & DISPONIBILITÀ (LATO LOCALE)
   ========================================================================== */
function initMenuAdminDrawer() {
  const openBtn = document.getElementById('openMenuAdminBtn');
  const closeBtn = document.getElementById('closeAdminMenuDrawerBtn');
  const drawer = document.getElementById('adminMenuDrawer');

  if (openBtn) {
    openBtn.onclick = () => {
      renderAdminMenuList();
      if (drawer) drawer.classList.add('open');
    };
  }

  if (closeBtn) closeBtn.onclick = () => drawer.classList.remove('open');
}

function renderAdminMenuList() {
  const list = document.getElementById('adminMenuDrawerList');
  if (!list) return;

  const menu = getMenuData();
  list.innerHTML = '';

  menu.forEach(dish => {
    const row = document.createElement('div');
    row.className = 'admin-dish-row';
    row.innerHTML = `
      <div style="flex:1;">
        <strong>${dish.name}</strong>
        <div style="display:flex; align-items:center; gap:8px; margin-top:4px;">
          <span style="font-size:0.75rem; color:var(--text-muted);">Prezzo €:</span>
          <input type="number" step="0.50" min="0.50" value="${dish.price}" class="admin-price-input" 
                 oninput="updateDishPrice(${dish.id}, this.value)" 
                 onchange="updateDishPrice(${dish.id}, this.value)">
        </div>
      </div>
      <div class="admin-toggles-box">
        <button class="btn-toggle-status ${dish.available ? 'active' : ''}" onclick="toggleDishAvailability(${dish.id})">
          ${dish.available ? 'Disponibile' : 'Esaurito'}
        </button>
        <button class="btn-toggle-status ${dish.isDaily ? 'active' : ''}" onclick="toggleDishDaily(${dish.id})">
          ⭐ Giorno
        </button>
      </div>
    `;
    list.appendChild(row);
  });
}

window.toggleDishAvailability = function(dishId) {
  const menu = getMenuData();
  const dish = menu.find(d => d.id === dishId);
  if (dish) {
    dish.available = !dish.available;
    saveMenuData(menu);
    renderAdminMenuList();
    socket.emit('update_menu', menu);
    showToast(`${dish.name}: ${dish.available ? 'Disponibile' : 'Esaurito'}`);
  }
};

window.toggleDishDaily = function(dishId) {
  const menu = getMenuData();
  const dish = menu.find(d => d.id === dishId);
  if (dish) {
    dish.isDaily = !dish.isDaily;

    if (dish.isDaily) {
      if (!dish.tags.includes('daily')) dish.tags.push('daily');
    } else {
      dish.tags = dish.tags.filter(t => t !== 'daily');
    }

    saveMenuData(menu);
    renderAdminMenuList();
    socket.emit('update_menu', menu);
    showToast(`${dish.name}: ${dish.isDaily ? 'Aggiunto al Piatto del Giorno' : 'Rimosso dal Giorno'}`);
  }
};

window.updateDishPrice = function(dishId, newPrice) {
  const parsedPrice = parseFloat(newPrice);
  if (isNaN(parsedPrice) || parsedPrice <= 0) return;

  const menu = getMenuData();
  const dish = menu.find(d => d.id === dishId);
  if (dish) {
    dish.price = parsedPrice;
    saveMenuData(menu);
    socket.emit('update_menu', menu);
  }
};