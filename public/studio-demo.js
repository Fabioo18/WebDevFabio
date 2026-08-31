/**
 * ============================================================================
 * STUDIO PROFESSIONALE & AZIENDA - CONTROLLER INTERATTIVO
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('consultationForm');
  
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('cName').value.trim();
      const email = document.getElementById('cEmail').value.trim();
      const area = document.getElementById('cArea').value;
      const message = document.getElementById('cMessage').value.trim();

      if (name && email && message) {
        showToast(`Grazie ${name}, richiesta inviata con successo! Un partner ti risponderà a ${email}.`);
        form.reset();
      }
    });
  }
});

function showToast(msg) {
  const toast = document.getElementById('studioToast');
  if (!toast) return;
  toast.innerText = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}