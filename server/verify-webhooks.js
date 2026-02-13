const http = require('http');

function postRequest(path, data) {
    const dataString = JSON.stringify(data);
    const options = {
        hostname: 'localhost',
        port: 5000,
        path: path,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': dataString.length,
        },
    };

    const req = http.request(options, (res) => {
        console.log(`POST ${path} Status: ${res.statusCode}`);
        res.on('data', (d) => {
            process.stdout.write(d);
        });
        console.log('\n');
    });

    req.on('error', (e) => {
        console.error(`Problem with request: ${e.message}`);
    });

    req.write(dataString);
    req.end();
}

console.log("Triggering Webhooks in 2 seconds...");

setTimeout(() => {
    console.log("Sending Stripe Webhook...");
    postRequest('/webhooks/stripe', {
        type: 'payment_intent.succeeded',
        amount: 250000, // $2500.00
        currency: 'usd'
    });
}, 2000);

setTimeout(() => {
    console.log("Sending Expense Webhook...");
    postRequest('/webhooks/payment', {
        type: 'expense',
        amount: 1500, // $1500
        description: 'New Laptop'
    });
}, 4000);

setTimeout(() => {
    console.log("Sending Accounting Webhook...");
    postRequest('/webhooks/accounting', {
        type: 'sync',
        status: 'completed'
    });
}, 6000);
