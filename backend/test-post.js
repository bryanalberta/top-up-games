const http = require('http');

const data = JSON.stringify({
  gameId: "1768412a-84cb-4ad8-a792-4db3ab5de8e5",
  productId: "304d0923-c8f4-44c5-a221-c6d7d0782aeb",
  gameUserId: "444445556",
  paymentMethod: "Qris"
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/transactions',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);
  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

req.write(data);
req.end();
