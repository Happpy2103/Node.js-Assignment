// server.js
import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 4000;

app.get('/', async (req, res) => {
  try {
    const response = await fetch('https://www.google.com', {
  
    });
    const html = await response.text();
    res.send(html); // send HTML response
  } catch (err) {
    res.status(500).send('Error fetching Google page: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
