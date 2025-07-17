// backend/utils/callDetector.js
const { spawn } = require('child_process');

const callDetector = (imagePath) => {
  return new Promise((resolve, reject) => {
    const python = spawn('python3', ['../detection/detect.py', imagePath]);

    let output = '';
    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error('Python error:', data.toString());
    });

    python.on('close', (code) => {
      try {
        const result = JSON.parse(output); 
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  });
};

module.exports = { callDetector };
