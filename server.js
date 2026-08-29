const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Middleware per leggere JSON e file statici
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rotte SEO Verticali / Clean URL
app.get('/siti-web-parrucchieri', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'siti-web-parrucchieri.html'));
});

app.get('/menu-digitale-qr', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'menu-demo.html'));
});

app.get('/wedding-website', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'wedding-demo.html'));
});

// Endpoint API Invio Preventivi via HTTPS (Resend API)
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, project_type, budget, message } = req.body;

  if (!name || !email || !project_type) {
    return res.status(400).json({ success: false, error: 'Campi obbligatori mancanti.' });
  }

  const resendApiKey = process.env.RESEND_API_KEY;

  if (resendApiKey) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          from: 'WebDevFabio Lead <onboarding@resend.dev>',
          to: ['webdevfabio@gmail.com'],
          reply_to: email,
          subject: `🔥 Nuovo Preventivo: ${project_type} - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
              <h2 style="color: #06b6d4;">Nuova Richiesta dal Sito WebDevFabio</h2>
              <hr style="border: 0; border-top: 1px solid #eee;">
              <p><strong>Nome / Attività:</strong> ${name}</p>
              <p><strong>Email di contatto:</strong> ${email}</p>
              <p><strong>Telefono / WhatsApp:</strong> ${phone || 'Non specificato'}</p>
              <p><strong>Soluzione Richiesta:</strong> ${project_type}</p>
              <p><strong>Budget Indicativo:</strong> ${budget || 'Non specificato'}</p>
              <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6; margin-top: 15px;">
                <strong>Descrizione del progetto:</strong><br>
                ${message ? message.replace(/\n/g, '<br>') : 'Nessun messaggio fornito.'}
              </div>
            </div>
          `
        })
      });

      const result = await response.json();

      if (response.ok) {
        console.log('✅ Email recapitata con successo via Resend:', result.id);
        return res.json({ success: true, message: 'Richiesta inviata con successo!' });
      } else {
        console.error('❌ Errore Resend API:', result);
        return res.status(500).json({ success: false, error: 'Errore durante l\'invio. Contattami su WhatsApp!' });
      }
    } catch (error) {
      console.error('❌ Errore fetch Resend:', error);
      return res.status(500).json({ success: false, error: 'Errore di connessione server.' });
    }
  } else {
    console.log('\n--- NUOVO PREVENTIVO RICEVUTO (RESEND_API_KEY non impostata) ---');
    console.log(req.body);
    console.log('--------------------------------------------------------------\n');
    return res.json({ success: true, message: 'Richiesta registrata nei log del server!' });
  }
});

// Gestione Socket.io Ordini KDS & Menu
let orders = [];

io.on('connection', (socket) => {
  socket.on('join_table', (table) => socket.join(table));

  socket.on('new_order', (order) => {
    orders.unshift(order);
    io.emit('order_received', order);
  });

  socket.on('update_status', (data) => {
    const order = orders.find((o) => o.id === data.orderId);
    if (order) {
      order.status = data.newStatus;
      io.to(order.table).emit('status_updated', data);
    }
  });

  socket.on('update_menu', (menuData) => {
    io.emit('menu_updated', menuData);
  });

  socket.on('shift_reset', () => {
    orders = [];
    io.emit('shift_reset');
  });

  socket.on('call_waiter', (data) => {
    io.emit('waiter_called', data);
  });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Sito e server avviati sulla porta ${PORT}`));