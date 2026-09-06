import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { syncToExcel } from './data/excelSync.js';

// Custom Vite plugin to handle backend API routes for consultations
function consultationsApiPlugin() {
  const dataFilePath = path.resolve(__dirname, 'data', 'consultations.json');

  return {
    name: 'consultations-api',
    configureServer(server) {
      server.middlewares.use('/api/consultations', (req, res) => {
        // Ensure data directory and file exist
        const dir = path.dirname(dataFilePath);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        if (!fs.existsSync(dataFilePath)) {
          fs.writeFileSync(dataFilePath, '[]', 'utf-8');
        }

        // POST: Clients submit their private inquiry -> saved to Excel and JSON
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const payload = JSON.parse(body);
              if (!payload.name || !payload.phone) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'Name and phone are required fields.' }));
                return;
              }

              const consultations = JSON.parse(fs.readFileSync(dataFilePath, 'utf-8') || '[]');
              const newConsultation = {
                id: `VP-2026-${Math.floor(1000 + Math.random() * 9000)}`,
                createdAt: new Date().toISOString(),
                status: 'New',
                ...payload
              };

              consultations.unshift(newConsultation);
              fs.writeFileSync(dataFilePath, JSON.stringify(consultations, null, 2), 'utf-8');

              // Automatically sync and update consultations.xlsx and consultations.csv
              syncToExcel(consultations);

              res.statusCode = 201;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({
                success: true,
                id: newConsultation.id,
                message: 'Consultation request received and stored securely in Chamber Excel Sheet.'
              }));
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Failed to save consultation', details: err.message }));
            }
          });
          return;
        }

        // GET is protected so public website visitors cannot view other clients' private data
        if (req.method === 'GET') {
          res.statusCode = 403;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Forbidden: Client records are private and only accessible via local Excel Sheet.' }));
          return;
        }

        res.statusCode = 405;
        res.end('Method Not Allowed');
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), consultationsApiPlugin()],
  server: {
    port: 5173
  }
});
