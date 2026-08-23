/**
 * ============================================================================
 * SCRIPT.JS - ARCHITETTURA DINAMICA & INTERATTIVA
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initBackgroundCanvas();
    initScrollReveal();
    initCounters();
    initPortfolioFilters();
    initCalculator();
    initDemoModal();
    initContactForm();
    initMobileMenu();
  });
  
  /* ==========================================================================
     1. CANVAS PARTICELLE INTERATTIVE (Glow + Rete Neurale)
     ========================================================================== */
  function initBackgroundCanvas() {
    const canvas = document.getElementById('bgCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
  
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
  
    const particles = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 20), 65);
    let mouse = { x: null, y: null, radius: 140 };
  
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });
  
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
  
    window.addEventListener('mouseout', () => {
      mouse.x = null;
      mouse.y = null;
    });
  
    class Particle {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.7;
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.8 + 0.8;
      }
  
      update() {
        this.x += this.vx;
        this.y += this.vy;
  
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
  
        // Interazione con il mouse
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < mouse.radius) {
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * 1.5;
            this.y -= Math.sin(angle) * 1.5;
          }
        }
      }
  
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.4)';
        ctx.fill();
      }
    }
  
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  
    function animate() {
      ctx.clearRect(0, 0, width, height);
  
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
  
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
  
          if (dist < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(59, 130, 246, ${0.2 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animate);
    }
  
    animate();
  }
  
  /* ==========================================================================
     2. SCROLL REVEAL (Intersection Observer)
     ========================================================================== */
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
  
    reveals.forEach((el) => observer.observe(el));
  }
  
  /* ==========================================================================
     3. ANIMAZIONE CONTATORI METRICHE HERO
     ========================================================================== */
  function initCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    let animated = false;
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statValues.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-count'), 10);
            let count = 0;
            const duration = 1200;
            const step = Math.ceil(target / (duration / 20));
  
            const interval = setInterval(() => {
              count += step;
              if (count >= target) {
                stat.textContent = target + (target === 100 ? '%' : (target === 0 ? '€' : ''));
                clearInterval(interval);
              } else {
                stat.textContent = count;
              }
            }, 20);
          });
        }
      });
    }, { threshold: 0.5 });
  
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) observer.observe(statsSection);
  }
  
  /* ==========================================================================
     4. FILTRI PORTFOLIO
     ========================================================================== */
  function initPortfolioFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
  
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        filterBtns.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
  
        const filter = btn.getAttribute('data-filter');
  
        projectCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1)';
            }, 10);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.95)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 200);
          }
        });
      });
    });
  }
  
  /* ==========================================================================
     5. CALCOLATORE DI PREVENTIVO DINAMICO
     
  function initCalculator() {
    const typeRadios = document.querySelectorAll('input[name="siteType"]');
    const addons = document.querySelectorAll('.addon-check');
    const priceDisplay = document.getElementById('estimatedPrice');
    const summaryDetails = document.getElementById('summaryDetails');
    const transferBtn = document.getElementById('transferToFormBtn');
  
    const names = {
      linktree: 'Link-in-Bio Custom',
      landing: 'Landing Page / Vetrina',
      booking: 'Sito con Prenotazioni',
      portfolio: 'Portfolio Professionale',
      whatsapp: 'Chat WhatsApp Diretta',
      seo: 'Ottimizzazione SEO Base',
      multilang: 'Multilingua IT/EN',
      analytics: 'Privacy + GA4 Analytics'
    };
  
    function updateCalculation() {
      let total = 0;
      let selectedType = 'linktree';
      let activeFeatures = [];
  
      typeRadios.forEach((radio) => {
        if (radio.checked) {
          total += parseInt(radio.getAttribute('data-price'), 10);
          selectedType = radio.value;
          activeFeatures.push(names[selectedType]);
        }
      });
  
      addons.forEach((addon) => {
        if (addon.checked) {
          total += parseInt(addon.getAttribute('data-price'), 10);
          activeFeatures.push(names[addon.value]);
        }
      });
  
      if (priceDisplay) {
        priceDisplay.textContent = total;
      }
  
      if (summaryDetails) {
        summaryDetails.innerHTML = activeFeatures
          .map((f) => `<div>✓ ${f}</div>`)
          .join('');
      }
  
      // Aggiorna campi form
      const formType = document.getElementById('clientProjectType');
      const formBudget = document.getElementById('clientBudget');
      if (formType) formType.value = names[selectedType];
      if (formBudget) formBudget.value = `€ ${total}`;
    }
  
    typeRadios.forEach((r) => r.addEventListener('change', updateCalculation));
    addons.forEach((a) => a.addEventListener('change', updateCalculation));
    updateCalculation();
  
    if (transferBtn) {
      transferBtn.addEventListener('click', () => {
        const contactSec = document.getElementById('contact');
        if (contactSec) {
          contactSec.scrollIntoView({ behavior: 'smooth' });
          showToast('Preventivo applicato al modulo!');
        }
      });
    }
  }
    ========================================================================== */
  
  /* ==========================================================================
     6. MODALE CON DEMO LIVE INTERATTIVE
     ========================================================================== */
  function initDemoModal() {
    const modal = document.getElementById('demoModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const demoButtons = document.querySelectorAll('.open-demo-btn');
  
    if (!modal) return;
  
    const demoTemplates = {
      booking: {
        title: 'Sistema Prenotazione (Simulazione)',
        html: `
          <div style="background:#090d16; padding:20px; border-radius:12px; border:1px solid rgba(255,255,255,0.1);">
            <p style="margin-bottom:12px; font-size:0.9rem; color:#94a3b8;">Scegli un orario per testare l'interazione:</p>
            <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:10px; margin-bottom:16px;">
              <button class="btn btn-outline demo-slot" style="padding:10px; font-size:0.85rem;">09:30</button>
              <button class="btn btn-outline demo-slot" style="padding:10px; font-size:0.85rem;">11:00</button>
              <button class="btn btn-outline demo-slot" style="padding:10px; font-size:0.85rem;">15:30</button>
            </div>
            <div id="demoBookingResult" style="font-size:0.85rem; color:#06b6d4; min-height:24px;"></div>
          </div>
        `
      },
      linktree: {
        title: 'Link-in-Bio Phone Preview',
        html: `
          <div style="max-width:320px; margin:0 auto; background:#000; padding:24px 16px; border-radius:30px; border:2px solid #3b82f6; text-align:center;">
            <div style="width:60px; height:60px; background:#3b82f6; border-radius:50%; margin:0 auto 12px; display:flex; align-items:center; justify-content:center; font-size:1.5rem;">🚀</div>
            <h4 style="margin-bottom:4px;">@tuobrand</h4>
            <p style="font-size:0.75rem; color:#94a3b8; margin-bottom:16px;">Soluzioni Digitali su Misura</p>
            <div style="display:flex; flex-direction:column; gap:8px;">
              <button class="btn btn-glass" style="font-size:0.8rem; padding:10px;" onclick="alert('Demo: Link al Catalogo')">📖 Scarica Catalogo</button>
              <button class="btn btn-glass" style="font-size:0.8rem; padding:10px;" onclick="alert('Demo: Prenota Consulenza')">📅 Prenota Consulenza</button>
              <button class="btn btn-glass" style="font-size:0.8rem; padding:10px;" onclick="alert('Demo: Chat WhatsApp')">💬 WhatsApp Diretto</button>
            </div>
          </div>
        `
      },
      portfolio: {
        title: 'Portfolio Galleria Interattiva',
        html: `
          <div style="text-align:center; padding:20px;">
            <p style="color:#94a3b8; font-size:0.9rem; margin-bottom:16px;">Esempio transizione galleria ad alte performance:</p>
            <div style="height:140px; background:#111827; border:1px dashed #3b82f6; display:flex; align-items:center; justify-content:center; border-radius:10px; font-family:monospace; color:#06b6d4;">
              [ Visualizzatore Immagini Ultra-Leggero ]
            </div>
          </div>
        `
      },
      landing: {
        title: 'Vetrina & Food Mockup',
        html: `
          <div style="padding:16px; background:#090d16; border-radius:12px;">
            <h4 style="color:#06b6d4; margin-bottom:8px;">Menu del Giorno Interattivo</h4>
            <p style="font-size:0.85rem; color:#94a3b8; margin-bottom:12px;">Filtra tra le portate senza ricaricare la pagina con velocità istantanea.</p>
            <div style="background:rgba(255,255,255,0.03); padding:10px; border-radius:8px; font-size:0.85rem;">
              ☕ Espresso Speciale Single Origin — <strong>€ 2.50</strong>
            </div>
          </div>
        `
      }
    };
  
    demoButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const type = btn.getAttribute('data-demo');
        const data = demoTemplates[type];
  
        if (data) {
          modalTitle.textContent = data.title;
          modalContent.innerHTML = data.html;
          modal.classList.add('active');
  
          // Event listener per slot di prenotazione nella demo
          const slots = modalContent.querySelectorAll('.demo-slot');
          const res = modalContent.querySelector('#demoBookingResult');
          slots.forEach((slot) => {
            slot.addEventListener('click', () => {
              slots.forEach((s) => s.classList.remove('btn-primary'));
              slot.classList.add('btn-primary');
              if (res) res.textContent = `Hai selezionato l'orario delle ${slot.textContent}!`;
            });
          });
        }
      });
    });
  
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  }
  

/* ==========================================================================
     7. GESTIONE INVIO FORM & NOTIFICHE TOAST
     ========================================================================== */
 function initContactForm() {
    const form = document.getElementById('mainContactForm');
    const btn = document.getElementById('submitBtn');
    
    if (!form && !btn) return;

    const handler = (e) => {
      if (e) e.preventDefault();
  
      const nameInput = document.getElementById('clientName');
      const emailInput = document.getElementById('clientEmail');
      const projectSelect = document.getElementById('clientProjectType');
      const budgetInput = document.getElementById('clientBudget');
      const msgInput = document.getElementById('clientMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const project = projectSelect ? projectSelect.value : '';
      const budget = budgetInput ? budgetInput.value.trim() : '';
      const msg = msgInput ? msgInput.value.trim() : '';
  
      if (!name || !email) {
        showToast('Per favore, compila i campi obbligatori (Nome e Email).');
        return;
      }

      if (!project) {
        showToast('Per favore, seleziona un servizio dal menu a tendina.');
        return;
      }

      if (!budget) {
        showToast('Per favore, inserisci un budget stimato.');
        return;
      }
  
      // Generazione del link mailto formattato
      const mailtoSubject = encodeURIComponent(`Richiesta Preventivo: ${project} - ${name}`);
      const mailtoBody = encodeURIComponent(
        `Nome / Azienda: ${name}\n` +
        `Email: ${email}\n` +
        `Servizio Selezionato: ${project}\n` +
        `Budget Indicato: ${budget}\n\n` +
        `Note / Dettagli:\n${msg || 'Nessun messaggio aggiuntivo fornito.'}`
      );
  
      // Apertura client email
      window.location.href = `mailto:webdevfabio@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
      showToast('Apertura client email in corso...');
    };

    if (form) {
      form.addEventListener('submit', handler);
    }
    if (btn) {
      btn.addEventListener('click', handler);
    }
  }

  /* ==========================================================================
     8. MENU MOBILE HAMBURGER
     ========================================================================== */
  function initMobileMenu() {
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-cta');
  
    if (!hamburger || !navMenu) return;
  
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
      });
    });
  }