// backend/routes/detect.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const { callDetector } = require('../utils/callDetector');
const axios = require('axios');

const router = express.Router();

// Multer config
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (_, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// POST /api/detect
router.post('/', upload.single('frame'), async (req, res) => {
  try {
    const imagePath = req.file.path;
    const result = await callDetector(imagePath);

    if (result.crime) {
      // Trigger n8n alert
      await axios.post(process.env.N8N_WEBHOOK_URL, {
        message: "🚨 Crime detected!",
        image: imagePath
      });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error('Detection error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
