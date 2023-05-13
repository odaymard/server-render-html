const express = require('express');
const requestIp = require('request-ip');
const app = express();
const fs = require('fs');
const { dirname } = require('path');

// Middleware to get the client's IP address
app.use(requestIp.mw());

app.get('/', (req, res) => {
  const clientIp = req.clientIp;
   const referer = req.headers.referer || '';

  // Create a log entry with the client's IP address and the referer
  const logEntry = `IP: ${clientIp} | Referer: ${referer}\n`;

  // Append the log entry to reqlog.txt
  fs.appendFile('reqlog.txt', logEntry, (err) => {
    if (err) {
      console.error('Error writing to reqlog.txt:', err);
    }
  });
  res.sendFile(__dirname + '/index.html');
});

app.get('/getlogs', (req, res) => {
  fs.readFile('reqlog.txt', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading reqlog.txt:', err);
      res.status(500).send('Error reading logs');
      return;
    }

    res.send(data);
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
