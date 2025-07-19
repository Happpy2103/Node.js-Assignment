import express from 'express';

const app = express();
const PORT = 8000;

app.get('/', (req, res) => {
  res.send(' Welcome to the Q8 Node.js Server!');
});

app.listen(PORT, () => {
  console.log(` Server is running at http://localhost:${PORT}`);
});

