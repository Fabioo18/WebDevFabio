/**
 * ============================================================================
 * MENU-DEMO.JS - CLIENTE: CARRELLO A DESTRA & SOCKET.IO REAL-TIME
 * ============================================================================
 */

let menuData = getMenuData();
let cart = JSON.parse(localStorage.getItem('menu_cart_storage')) || [];
let mySentOrderIds = JSON.parse(localStorage.getItem('my_sent_order_ids')) || [];

let activeCategory = 'all';
let activeDietFilter = 'all';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
  const tableSelect = document.getElementById('tableNumberSelect');
  if (tableSelect) {
    socket.emit('join_table', tableSelect.value);
    tableSelect.addEventListener('change', () => {
      socket.emit('join_table', tableSelect.value);
      renderSentOrdersList();
    });
  }

  renderMenuFeed();
  initFilters();
  initTableSelector();
  initServiceButtons();
  initOrderActions();
  renderSidebarCart();
  renderSentOrdersList();
  initSocketListeners();
});

/* ==========================================================================
   1. ASCOLTO EVENTI SOCKET.IO DAL SERVER
   ========================================================================== */
function initSocketListeners() {
  socket.on('status_updated', (data) => {
    if (mySentOrderIds.includes(data.orderId)) {
      playBeepSound('alert');
      
      // Aggiorna lo stato locale dell'ordine
      const orders = getOrders();
      const order = orders.find(o => o.id === data.orderId);
      if (order) {
        order.status = data.newStatus;
        saveOrders(orders);
      }

      renderSentOrdersList();

      let message = `Comanda #${data.orderId}: `;
      if (data.newStatus === 'preparing') message += '👨‍🍳 I cuochi hanno iniziato la preparazione!';
      if (data.newStatus === 'ready') message += '🍽️ PRONTA AL PASS! Il cameriere sta servendo i piatti.';
      if (data.newStatus === 'billing') message += '🧾 Richiesta conto ricevuta dalla cassa.';
      if (data.newStatus === 'completed') message += '💶 Conto saldato con successo. Grazie!';

      showToast(message);
    }
  });

  socket.on('menu_updated', (newMenu) => {
    menuData = newMenu;
    saveMenuData(menuData);
    renderMenuFeed();
    showToast('📋 Menu aggiornato in tempo reale.');
  });

  socket.on('shift_reset', () => {
    mySentOrderIds = [];
    localStorage.removeItem('my_sent_order_ids');
    cart = [];
    localStorage.removeItem('menu_cart_storage');
    saveOrders([]);
    renderSidebarCart();
    renderSentOrdersList();
    showToast('🌙 Il turno del ristorante si è concluso. Tavolo resettato!');
  });
}

/* ==========================================================================
   2. RENDERING MENU A SINISTRA
   ========================================================================== */
function renderMenuFeed() {
  const container = document.getElementById('menuItemsContainer');
  if (!container) return;
  container.innerHTML = '';

  const categories = {
    antipasti: 'Antipasti della Casa',
    primi: 'Primi Piatti',
    pizze: 'Pizze Contemporanee',
    secondi: 'Secondi Piatti',
    drink: 'Cocktail Bar & Drink',
    dolci: 'Dessert'
  };

  const filtered = menuData.filter(item => {
    const matchCat = activeCategory === 'all' || item.category === activeCategory;
    const matchDiet = activeDietFilter === 'all' 
      || (activeDietFilter === 'daily' && item.isDaily) 
      || (activeDietFilter !== 'daily' && item.tags.includes(activeDietFilter));
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      || item.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchDiet && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding: 40px; color: var(--text-muted);">Nessun piatto trovato con i filtri selezionati.</div>`;
    return;
  }

  const grouped = {};
  filtered.forEach(item => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  Object.keys(grouped).forEach(catKey => {
    const sectionTitle = document.createElement('h3');
    sectionTitle.className = 'category-section-title';
    sectionTitle.innerText = categories[catKey] || catKey.toUpperCase();
    container.appendChild(sectionTitle);

    grouped[catKey].forEach(dish => {
      const card = document.createElement('div');
      card.className = `dish-card ${!dish.available ? 'sold-out' : ''}`;
      
      let badgesHtml = '';
      if (dish.isDaily) badgesHtml += '<span class="badge-tag badge-daily">⭐ Del Giorno</span>';
      if (dish.tags && dish.tags.includes('gluten-free')) badgesHtml += '<span class="badge-tag badge-gluten">🌾 No Glutine</span>';
      if (dish.tags && dish.tags.includes('veg')) badgesHtml += '<span class="badge-tag badge-veg">🌱 Veg</span>';
      if (dish.tags && dish.tags.includes('vegan')) badgesHtml += '<span class="badge-tag badge-veg">🥑 Vegan</span>';

      card.innerHTML = `
        <div class="dish-img" style="background-image: url('${dish.img}')"></div>
        <div class="dish-body">
          <div>
            <div class="dish-title-row">
              <span class="dish-name">${dish.name}</span>
              <span class="dish-price">€${Number(dish.price).toFixed(2)}</span>
            </div>
            <p class="dish-desc">${dish.desc}</p>
            <div class="dish-badges-row">${badgesHtml}</div>
          </div>
          <div class="dish-action-row">
            ${dish.available 
              ? `<button class="btn-add-cart" onclick="addToCart(${dish.id})">+ Aggiungi</button>` 
              : '<span style="font-size:0.75rem; color:var(--accent-rose); font-weight:700;">Esaurito</span>'}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  });
}

function initFilters() {
  document.getElementById('menuSearchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderMenuFeed();
  });

  document.querySelectorAll('.diet-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('.diet-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      activeDietFilter = chip.getAttribute('data-diet');
      renderMenuFeed();
    });
  });

  document.querySelectorAll('.cat-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.cat-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-cat');
      renderMenuFeed();
    });
  });
}

window.addToCart = function(dishId) {
  const dish = menuData.find(d => d.id === dishId);
  if (!dish || !dish.available) return;

  const existing = cart.find(item => item.id === dishId);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id: dish.id, name: dish.name, price: dish.price, qty: 1 });
  }

  localStorage.setItem('menu_cart_storage', JSON.stringify(cart));
  renderSidebarCart();
};

function renderSidebarCart() {
  const container = document.getElementById('sidebarCartItems');
  const subtotalEl = document.getElementById('sidebarSubtotal');
  const countBadge = document.getElementById('currentCartCount');
  const sendBtn = document.getElementById('sendOrderDirectBtn');
  if (!container) return;

  const totalQty = cart.reduce((s, i) => s + i.qty, 0);
  const totalPrice = cart.reduce((s, i) => s + (Number(i.price) * i.qty), 0);

  countBadge.innerText = `${totalQty} piatti`;
  subtotalEl.innerText = `€${totalPrice.toFixed(2)}`;

  if (cart.length === 0) {
    container.innerHTML = `<div class="empty-cart-msg">Seleziona i piatti dal menu a sinistra per comporre l'ordine.</div>`;
    sendBtn.disabled = true;
    return;
  }

  sendBtn.disabled = false;
  container.innerHTML = '';

  cart.forEach(item => {
    const row = document.createElement('div');
    row.className = 'sidebar-cart-item';
    row.innerHTML = `
      <div style="flex: 1;">
        <div style="font-weight: 700; font-size: 0.86rem; color: #fff;">${item.name}</div>
        <div style="font-size: 0.76rem; color: var(--accent-gold); font-family: var(--font-mono);">€${(Number(item.price) * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-qty-ctrl">
        <button class="btn-qty" onclick="changeSidebarQty(${item.id}, -1)">-</button>
        <span>${item.qty}</span>
        <button class="btn-qty" onclick="changeSidebarQty(${item.id}, 1)">+</button>
      </div>
    `;
    container.appendChild(row);
  });
}

window.changeSidebarQty = function(id, delta) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) cart = cart.filter(i => i.id !== id);
    localStorage.setItem('menu_cart_storage', JSON.stringify(cart));
    renderSidebarCart();
  }
};

function initOrderActions() {
  const sendBtn = document.getElementById('sendOrderDirectBtn');
  const requestBillBtn = document.getElementById('requestTableBillBtn');

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      if (cart.length === 0) return;

      const tableText = document.getElementById('tableNumberSelect').value;
      const notes = document.getElementById('orderNotes').value.trim();
      const totalPrice = cart.reduce((s, i) => s + (Number(i.price) * i.qty), 0);
      const newOrderId = Math.floor(100 + Math.random() * 900);

      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

      const newOrder = {
        id: newOrderId,
        table: tableText,
        time: timeStr,
        status: 'pending',
        notes: notes || 'Nessuna nota speciale',
        items: [...cart],
        total: totalPrice
      };

      // Inviamo al server. Sarà il server a distribuirlo correttamente a KDS e client.
      socket.emit('new_order', newOrder);

      mySentOrderIds.unshift(newOrderId);
      localStorage.setItem('my_sent_order_ids', JSON.stringify(mySentOrderIds));

      // Svuotiamo il carrello di creazione
      cart = [];
      localStorage.setItem('menu_cart_storage', JSON.stringify(cart));
      document.getElementById('orderNotes').value = '';

      renderSidebarCart();
      renderSentOrdersList();
      playBeepSound('notification');
      showToast(`⚡ Comanda #${newOrderId} inviata in cucina con successo!`);
    });
  }

  if (requestBillBtn) {
    requestBillBtn.addEventListener('click', () => {
      const orders = getOrders();
      let hasUpdated = false;

      orders.forEach(o => {
        if (mySentOrderIds.includes(o.id) && o.status !== 'completed') {
          o.status = 'billing';
          hasUpdated = true;
          socket.emit('update_status', { orderId: o.id, newStatus: 'billing', table: o.table });
        }
      });

      if (hasUpdated) {
        saveOrders(orders);
        renderSentOrdersList();
        playBeepSound('notification');
        showToast('🧾 Richiesta conto inviata alla cassa!');
      }
    });
  }
}

function renderSentOrdersList() {
  const container = document.getElementById('sidebarSentOrdersList');
  const countPill = document.getElementById('sentOrdersCount');
  const banner = document.getElementById('sentOrdersTotalBanner');
  const grandTotalEl = document.getElementById('sentOrdersGrandTotal');
  const myTable = document.getElementById('tableNumberSelect').value;

  if (!container) return;

  const allOrders = getOrders();
  const myOrders = allOrders.filter(o => o.table === myTable);

  countPill.innerText = myOrders.length;

  if (myOrders.length === 0) {
    container.innerHTML = `<div class="empty-cart-msg">Nessuna comanda inviata per questo tavolo.</div>`;
    if (banner) banner.style.display = 'none';
    return;
  }

  if (banner) banner.style.display = 'block';
  const grandTotal = myOrders.reduce((s, o) => s + Number(o.total), 0);
  grandTotalEl.innerText = `€${grandTotal.toFixed(2)}`;

  container.innerHTML = '';

  myOrders.forEach(order => {
    const card = document.createElement('div');
    card.className = `sent-order-card status-${order.status}`;

    let statusLabel = 'In Attesa ⏳';
    let statusClass = 'tag-pending';
    if (order.status === 'preparing') { statusLabel = 'In Preparazione 👨‍🍳'; statusClass = 'tag-prep'; }
    if (order.status === 'ready') { statusLabel = 'Pronto al Pass 🍽️'; statusClass = 'tag-ready'; }
    if (order.status === 'billing') { statusLabel = 'Conto Richiesto 🧾'; statusClass = 'tag-billing'; }
    if (order.status === 'completed') { statusLabel = 'Saldato ✔️'; statusClass = 'tag-done'; }

    const itemsSummary = order.items.map(it => `• ${it.qty}x ${it.name}`).join('<br>');

    card.innerHTML = `
      <div class="sent-order-head">
        <div>
          <strong style="color:#fff; font-size:0.92rem;">Comanda #${order.id}</strong>
          <small style="color:var(--text-muted); display:block; font-size:0.72rem;">Ore ${order.time}</small>
        </div>
        <span class="status-pill-badge ${statusClass}">${statusLabel}</span>
      </div>
      <div class="sent-order-dishes">${itemsSummary}</div>
      <div class="sent-order-foot">
        <span>Totale:</span>
        <strong style="color:var(--accent-gold); font-family:var(--font-mono);">€${Number(order.total).toFixed(2)}</strong>
      </div>
    `;
    container.appendChild(card);
  });
}

function initTableSelector() {
  document.getElementById('tableNumberSelect').addEventListener('change', () => {
    renderSentOrdersList();
  });
}

function initServiceButtons() {
  const btn = document.getElementById('callWaiterBtn');
  if (btn) {
    btn.onclick = () => {
      const table = document.getElementById('tableNumberSelect').value;
      socket.emit('call_waiter', { table });
      alert(`🔔 Cameriere notificato per ${table}! Un addetto sta arrivando.`);
    };
  }
}