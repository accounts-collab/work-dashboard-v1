const eventBus = require('../events/eventBus');

class SSEService {
    constructor() {
        this.clients = [];
        this.initialize();
    }

    initialize() {
        // Subscribe to internal events
        eventBus.on('dashboard:update', (data) => {
            this.broadcast('dashboard_update', data);
        });

        eventBus.on('notification', (data) => {
            this.broadcast('notification', data);
        });

        // Heartbeat to keep connections alive
        setInterval(() => {
            this.broadcast('heartbeat', { timestamp: Date.now() });
        }, 30000);
    }

    addClient(res) {
        const clientId = Date.now();
        const newClient = {
            id: clientId,
            res
        };

        this.clients.push(newClient);
        console.log(`[SSE] Client connected: ${clientId}. Total clients: ${this.clients.length}`);

        // Send initial connection confirmation
        res.write(`data: ${JSON.stringify({ type: 'connected', clientId })}\n\n`);

        return {
            clientId,
            close: () => {
                this.removeClient(clientId);
            }
        };
    }

    removeClient(id) {
        this.clients = this.clients.filter(client => client.id !== id);
        console.log(`[SSE] Client disconnected: ${id}. Total clients: ${this.clients.length}`);
    }

    broadcast(type, data) {
        this.clients.forEach(client => {
            client.res.write(`data: ${JSON.stringify({ type, data })}\n\n`);
        });
    }
}

module.exports = new SSEService();
