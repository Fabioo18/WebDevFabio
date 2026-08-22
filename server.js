const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Serve tutti i file statici dalla cartella public
app.use(express.static('public'));

let orders = [];

io.on('connection', (socket) => {
    socket.on('join_table', (table) => socket.join(table));

    socket.on('new_order', (order) => {
        orders.unshift(order);
        io.emit('order_received', order);
    });

    socket.on('update_status', (data) => {
        const order = orders.find(o => o.id === data.orderId);
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