// Inietta automaticamente Favicon e Meta Open Graph su tutte le pagine
(function injectGlobalHeadTags() {
  const head = document.head;

  // 1. Favicon
  if (!document.querySelector("link[rel~='icon']")) {
    const favicon = document.createElement('link');
    favicon.rel = 'icon';
    favicon.type = 'image/svg+xml';
    favicon.href = '/favicon.svg';
    head.appendChild(favicon);
  }

  // 2. Open Graph Banner Image
  if (!document.querySelector("meta[property='og:image']")) {
    const ogImg = document.createElement('meta');
    ogImg.setAttribute('property', 'og:image');
    ogImg.content = window.location.origin + '/og-banner.svg';
    head.appendChild(ogImg);

    const ogImgType = document.createElement('meta');
    ogImgType.setAttribute('property', 'og:image:type');
    ogImgType.content = 'image/svg+xml';
    head.appendChild(ogImgType);
  }

  // 3. Open Graph Type
  if (!document.querySelector("meta[property='og:type']")) {
    const ogType = document.createElement('meta');
    ogType.setAttribute('property', 'og:type');
    ogType.content = 'website';
    head.appendChild(ogType);
  }
})();

document.addEventListener('DOMContentLoaded', () => {
  initBackgroundCanvas();
  initScrollReveal();
  initCounters();
  initPortfolioFilters();
  initFaqAccordion();
  initContactForm();
  initMobileMenu();
  initProjectTriggers();
});

function initBackgroundCanvas() {
  const canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);
  const particles = [];
  const particleCount = Math.min(Math.floor(window.innerWidth / 25), 50);
  let mouse = { x: null, y: null, radius: 120 };

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
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.5 + 0.8;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      if (mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 1.2;
          this.y -= Math.sin(angle) * 1.2;
        }
      }
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 182, 212, 0.35)';
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
        if (dist < 100) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.18 * (1 - dist / 100)})`;
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

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach((el) => observer.observe(el));
}

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
          const duration = 1000;
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
  }, { threshold: 0.4 });
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) observer.observe(statsSection);
}

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
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

function initFaqAccordion() {
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach((q) => {
    q.addEventListener('click', () => {
      const parent = q.parentElement;
      const isActive = parent.classList.contains('active');

      document.querySelectorAll('.faq-item').forEach((item) => {
        item.classList.remove('active');
      });

      if (!isActive) {
        parent.classList.add('active');
      }
    });
  });
}

function initProjectTriggers() {
  const triggers = document.querySelectorAll('.select-project-trigger');
  const projectSelect = document.getElementById('clientProjectType');

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const project = trigger.getAttribute('data-project');
      if (projectSelect && project) {
        projectSelect.value = project;
        updateFloatingWhatsapp(project);
      }
    });
  });

  if (projectSelect) {
    projectSelect.addEventListener('change', (e) => {
      updateFloatingWhatsapp(e.target.value);
    });
  }
}

function updateFloatingWhatsapp(serviceName) {
  const waFloat = document.getElementById('mainWaFloat');
  if (!waFloat) return;
  const basePhone = '393273965395';
  const customMsg = `Ciao Fabio, ho visto WebDevFabio e vorrei informazioni per il servizio: ${serviceName}.`;
  waFloat.href = `https://wa.me/${basePhone}?text=${encodeURIComponent(customMsg)}`;
}

function initContactForm() {
  const form = document.getElementById('mainContactForm');
  const submitBtn = document.getElementById('submitBtn');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim();
    const email = document.getElementById('clientEmail')?.value.trim();
    const phone = document.getElementById('clientPhone')?.value.trim() || '';
    const project_type = document.getElementById('clientProjectType')?.value;
    const budget = document.getElementById('clientBudget')?.value || '';
    const message = document.getElementById('clientMessage')?.value.trim() || '';

    if (!name || !email || !project_type) {
      showToast('Per favore, compila i campi obbligatori marcati con (*).');
      return;
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'Invio in corso...';
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, project_type, budget, message })
      });

      const data = await res.json();

      if (data.success) {
        showToast('Richiesta inviata con successo! Ti risponderò a breve.');
        form.reset();
      } else {
        showToast(data.error || 'Errore durante l\'invio. Riprova.');
      }
    } catch (err) {
      showToast('Errore di connessione. Puoi scrivermi direttamente su WhatsApp.');
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'Richiedi un preventivo';
      }
    }
  });
}

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

function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}