const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');

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

// Endpoint API Invio Preventivi con forzatura IPv4 per Render
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, project_type, budget, message } = req.body;

  if (!name || !email || !project_type) {
    return res.status(400).json({ success: false, error: 'Campi obbligatori mancanti.' });
  }

  const emailUser = process.env.EMAIL_USER || 'webdevfabio@gmail.com';
  const emailPass = process.env.EMAIL_PASS ? process.env.EMAIL_PASS.replace(/\s+/g, '') : null;

  if (emailPass) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // STARTTLS su porta 587
      requireTLS: true,
      auth: {
        user: emailUser,
        pass: emailPass
      },
      tls: {
        rejectUnauthorized: false
      },
      // Forza l'uso di IPv4 per evitare l'errore ENETUNREACH di Render
      family: 4
    });

    const mailOptions = {
      from: `"WebDevFabio Lead" <${emailUser}>`,
      to: 'webdevfabio@gmail.com',
      replyTo: email,
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
            ${message ? message.replace(/\n/g, '<br>') : 'Nessun messaggio aggiuntivo fornito.'}
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log('✅ Email inviata con successo per:', email);
      return res.json({ success: true, message: 'Email inviata con successo!' });
    } catch (error) {
      console.error('❌ Errore Nodemailer:', error);
      return res.status(500).json({ 
        success: false, 
        error: 'Errore durante l\'invio. Ti invito a contattarmi via WhatsApp!' 
      });
    }
  } else {
    console.log('\n--- PREVENTIVO RICEVUTO (EMAIL_PASS mancante) ---');
    console.log(req.body);
    console.log('-------------------------------------------------\n');
    return res.json({ success: true, message: 'Richiesta registrata nei log.' });
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