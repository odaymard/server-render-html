const express = require('express');
const requestIp = require('request-ip');
const app = express();

// Middleware to get the client's IP address
app.use(requestIp.mw());

app.get('/', (req, res) => {
  const clientIp = req.clientIp;
  res.send(`Your IP address is: ${clientIp}`);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
