/**
 * ============================================================================
 * LINKTREE HUB PRO - REACTIVE ANALYTICS & LINK CONTROLLER
 * ============================================================================
 */

// STATO PREDEFINITO HUB
const DEFAULT_HUB_STATE = {
    theme: 'theme-slate',
    views: 1240,
    links: [
      {
        id: 1,
        title: 'Salone Parrucchieri & Barber',
        subtitle: 'Case Study Reale • Sistema di prenotazione oraria',
        icon: '✂️',
        url: 'https://parrucchiere.onrender.com/',
        type: 'featured',
        clicks: 418
      },
      {
        id: 2,
        title: 'Wedding & Eventi Gestionale Pro',
        subtitle: 'Demo Gestionale tavoli, RSVP & budget sposi',
        icon: '💍',
        url: 'wedding-demo.html',
        type: 'standard',
        clicks: 302
      },
      {
        id: 3,
        title: 'Calcola Preventivo Sito Web',
        subtitle: 'Stima istantanea per Landing, Booking e Vetrine',
        icon: '⚡',
        url: 'index.html#calculator',
        type: 'standard',
        clicks: 245
      },
      {
        id: 4,
        title: 'Richiedi Consulenza Rapida',
        subtitle: 'Chat WhatsApp diretta per info e fattibilità',
        icon: '💬',
        url: '#whatsapp-modal',
        type: 'modal',
        clicks: 189
      },
      {
        id: 5,
        title: 'Portfolio Ufficiale & Showcase',
        subtitle: 'Guarda tutti i componenti e progetti completi',
        icon: '🚀',
        url: 'index.html',
        type: 'standard',
        clicks: 86
      }
    ]
  };
  
  // Inizializzazione con persistenza locale
  let hubState = JSON.parse(localStorage.getItem('linktree_hub_state')) || DEFAULT_HUB_STATE;
  
  // Incrementa visualizzazioni uniche di sessione
  if (!sessionStorage.getItem('hub_view_recorded')) {
    hubState.views++;
    sessionStorage.setItem('hub_view_recorded', 'true');
    saveState();
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(hubState.theme);
    renderLinks();
    renderAdminList();
    updateAnalyticsDOM();
    initAdminDrawer();
    initModals();
    initForm();
  });
  
  function saveState() {
    localStorage.setItem('linktree_hub_state', JSON.stringify(hubState));
    updateAnalyticsDOM();
  }
  
  /* ==========================================================================
     1. RENDERING LINK & GESTIONE CLICK ANALYTICS
     ========================================================================== */
  function renderLinks() {
    const container = document.getElementById('linksContainer');
    if (!container) return;
  
    container.innerHTML = '';
  
    hubState.links.forEach((link) => {
      const isFeatured = link.type === 'featured';
      const card = document.createElement('a');
      card.className = `link-card ${isFeatured ? 'card-featured' : ''}`;
      card.href = link.url;
  
      // Se è un link esterno
      if (!link.url.startsWith('#')) {
        card.target = '_blank';
        card.rel = 'noopener noreferrer';
      }
  
      card.innerHTML = `
        ${isFeatured ? '<span class="featured-tag">In Evidenza</span>' : ''}
        <div class="link-card-left">
          <div class="link-icon-box">${link.icon}</div>
          <div class="link-texts">
            <span class="link-title">${link.title}</span>
            ${link.subtitle ? `<span class="link-subtitle">${link.subtitle}</span>` : ''}
          </div>
        </div>
        <span class="link-arrow">→</span>
      `;
  
      // Intercetta click per analytics e modali
      card.addEventListener('click', (e) => {
        recordClick(link.id);
  
        if (link.type === 'modal' || link.url.startsWith('#')) {
          e.preventDefault();
          handleModalAction(link.url);
        }
      });
  
      container.appendChild(card);
    });
  }
  
  function recordClick(linkId) {
    const item = hubState.links.find(l => l.id === linkId);
    if (item) {
      item.clicks++;
      saveState();
      renderAdminList();
    }
  }
  
  function updateAnalyticsDOM() {
    const totalClicks = hubState.links.reduce((sum, l) => sum + (l.clicks || 0), 0);
    const ctr = hubState.views > 0 ? ((totalClicks / hubState.views) * 100).toFixed(1) : 0;
  
    setEl('statTotalViews', hubState.views.toLocaleString('it-IT'));
    setEl('statTotalClicks', totalClicks.toLocaleString('it-IT'));
    setEl('statCtr', `${ctr}%`);
  }
  
  /* ==========================================================================
     2. GESTIONE AZIONI MODALI SPECIALI (WhatsApp, Preventivi)
     ========================================================================== */
  function handleModalAction(actionUrl) {
    if (actionUrl === '#whatsapp-modal' || actionUrl.includes('whatsapp')) {
      openModal('💬 Contatto Rapido WhatsApp', `
        <div style="text-align: center; padding: 10px 0;">
          <p style="color: var(--text-muted); font-size: 0.9rem; margin-bottom: 20px;">
            Scrivimi direttamente su WhatsApp per informazioni, preventivi o tempi di consegna per il tuo sito.
          </p>
          <a href="https://wa.me/391234567890?text=Ciao%20Fabio,%20ho%20visto%20il%20tuo%20link%20hub%20e%20vorrei%20informazioni!" 
             target="_blank" 
             class="btn-admin-submit" 
             style="display: block; text-decoration: none; text-align: center; margin-bottom: 12px;">
            Apri Chat WhatsApp ↗
          </a>
        </div>
      `);
    } else {
      showToast(`Apertura: ${actionUrl}`);
    }
  }
  
  /* ==========================================================================
     3. PANNELLO ADMIN (AGGIUNTA, RIMOZIONE & THEME SWITCH)
     ========================================================================== */
  function initAdminDrawer() {
    const toggleBtn = document.getElementById('toggleAdminBtn');
    const closeBtn = document.getElementById('closeAdminBtn');
    const drawer = document.getElementById('adminDrawer');
  
    if (toggleBtn && drawer) {
      toggleBtn.addEventListener('click', () => drawer.classList.toggle('open'));
    }
  
    if (closeBtn && drawer) {
      closeBtn.addEventListener('click', () => drawer.classList.remove('open'));
    }
  
    // Selettore Temi
    const themeBtns = document.querySelectorAll('.theme-btn');
    themeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        themeBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const chosenTheme = btn.getAttribute('data-theme');
        applyTheme(chosenTheme);
        hubState.theme = chosenTheme;
        saveState();
        showToast('Tema grafico aggiornato!');
      });
    });
  
    // Reset statistiche
    const resetBtn = document.getElementById('resetAnalyticsBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Vuoi azzerare il conteggio dei click di tutti i link?')) {
          hubState.links.forEach(l => l.clicks = 0);
          saveState();
          renderAdminList();
          showToast('Statistiche azzerate.');
        }
      });
    }
  }
  
  function applyTheme(themeClass) {
    document.body.className = themeClass;
    const activeBtn = document.querySelector(`.theme-btn[data-theme="${themeClass}"]`);
    if (activeBtn) {
      document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
      activeBtn.classList.add('active');
    }
  }
  
  function renderAdminList() {
    const list = document.getElementById('adminLinksList');
    if (!list) return;
  
    list.innerHTML = '';
    hubState.links.forEach(l => {
      const item = document.createElement('div');
      item.className = 'admin-link-item';
      item.innerHTML = `
        <div class="admin-link-info">
          <span>${l.icon}</span>
          <strong>${l.title}</strong>
        </div>
        <div style="display:flex; align-items:center; gap:10px;">
          <span class="admin-link-clicks">${l.clicks || 0} click</span>
          <button class="btn-del-link" onclick="deleteLink(${l.id})" title="Elimina Link">&times;</button>
        </div>
      `;
      list.appendChild(item);
    });
  }
  
  function initForm() {
    const form = document.getElementById('addLinkForm');
    if (!form) return;
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('linkTitleInput').value.trim();
      const subtitle = document.getElementById('linkSubtitleInput').value.trim();
      const url = document.getElementById('linkUrlInput').value.trim();
      const icon = document.getElementById('linkIconInput').value.trim() || '🔗';
      const type = document.getElementById('linkTypeSelect').value;
  
      hubState.links.push({
        id: Date.now(),
        title,
        subtitle,
        url,
        icon,
        type,
        clicks: 0
      });
  
      saveState();
      renderLinks();
      renderAdminList();
      form.reset();
      showToast('Nuovo link inserito con successo!');
    });
  }
  
  window.deleteLink = function(id) {
    if (confirm('Rimuovere questo elemento dal tuo Link Hub?')) {
      hubState.links = hubState.links.filter(l => l.id !== id);
      saveState();
      renderLinks();
      renderAdminList();
      showToast('Link eliminato.');
    }
  };
  
  /* ==========================================================================
     4. CONDIVISIONE, QR CODE & MODALI
     ========================================================================== */
  function initModals() {
    const closeBtn = document.getElementById('closeModalBtn');
    const overlay = document.getElementById('hubModal');
    if (closeBtn && overlay) {
      closeBtn.addEventListener('click', closeModal);
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
      });
    }
  
    // Pulsante QR Code
    const qrBtn = document.getElementById('openQrBtn');
    if (qrBtn) {
      qrBtn.addEventListener('click', () => {
        openModal('📱 QR Code Profilo', `
          <div class="qr-modal-content">
            <div class="qr-box-mock">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm10 0h3v3h-3v-3zm5 0h3v3h-3v-3zm-5 5h3v3h-3v-3zm5 0h3v3h-3v-3z"/>
              </svg>
              <span style="font-size:0.7rem; margin-top:6px;">@webdev.fabio</span>
            </div>
            <p style="color:var(--text-muted); font-size:0.85rem;">Inquadra per aprire direttamente il profilo da smartphone.</p>
          </div>
        `);
      });
    }
  
    // Pulsante Condividi
    const shareBtn = document.getElementById('openShareBtn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        const currentUrl = window.location.href;
        openModal('🔗 Condividi Hub', `
          <div style="padding: 10px 0;">
            <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:12px;">Copia il link diretto al tuo profilo per incollarlo su Instagram, TikTok o LinkedIn:</p>
            <div class="copy-input-group">
              <input type="text" id="shareUrlField" value="${currentUrl}" readonly>
              <button class="btn-admin-submit" style="padding:0 16px;" onclick="copyShareUrl()">Copia</button>
            </div>
          </div>
        `);
      });
    }
  }
  
  function openModal(title, bodyHtml) {
    const overlay = document.getElementById('hubModal');
    const mTitle = document.getElementById('modalTitle');
    const mBody = document.getElementById('modalBody');
    if (overlay && mTitle && mBody) {
      mTitle.innerText = title;
      mBody.innerHTML = bodyHtml;
      overlay.classList.add('active');
    }
  }
  
  function closeModal() {
    const overlay = document.getElementById('hubModal');
    if (overlay) overlay.classList.remove('active');
  }
  
  window.copyShareUrl = function() {
    const field = document.getElementById('shareUrlField');
    if (field) {
      navigator.clipboard.writeText(field.value).then(() => {
        showToast('Link copiato negli appunti!');
        closeModal();
      });
    }
  };
  
  /* ==========================================================================
     UTILITY
     ========================================================================== */
  function setEl(id, val) {
    const el = document.getElementById(id);
    if (el) el.innerText = val;
  }
  
  function showToast(msg) {
    const toast = document.getElementById('hubToast');
    if (!toast) return;
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2800);
  }