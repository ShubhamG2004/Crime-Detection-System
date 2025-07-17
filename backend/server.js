// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const detectRoute = require('./routes/detect');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api/detect', detectRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.send('🔐 Crime Detection API is running!');
});
