import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const dataFilePath = path.resolve(__dirname, 'data', 'consultations.json');

// Ensure directory and file exist
const dir = path.dirname(dataFilePath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
if (!fs.existsSync(dataFilePath)) {
  fs.writeFileSync(dataFilePath, '[]', 'utf-8');
}

import { syncToExcel } from './data/excelSync.js';

// Protected Consultations API: Clients can POST inquiries, public cannot read them
app.get('/api/consultations', (req, res) => {
  res.status(403).json({ error: 'Forbidden: Client records are private and only accessible via local Excel Sheet.' });
});

app.post('/api/consultations', (req, res) => {
  try {
    const { name, phone, email, matterType, urgency, mode, message } = req.body;
    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and phone are required fields.' });
    }

    const consultations = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8') || '[]');
    const newConsultation = {
      id: `VP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      createdAt: new Date().toISOString(),
      status: 'New',
      name,
      phone,
      email: email || '',
      matterType: matterType || 'General Legal Consultation',
      urgency: urgency || 'Standard',
      mode: mode || 'In-Chamber',
      message: message || ''
    };

    consultations.unshift(newConsultation);
    fs.writeFileSync(dataFilePath, JSON.stringify(consultations, null, 2), 'utf-8');

    // Automatically update consultations.xlsx and consultations.csv
    syncToExcel(consultations);

    res.status(201).json({
      success: true,
      id: newConsultation.id,
      message: 'Consultation request received and stored securely in Chamber Excel Sheet.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save consultation', details: err.message });
  }
});

// Serve production static build if available
const distPath = path.resolve(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Advocate Vikram Poonia Backend API listening on http://localhost:${PORT}`);
});
