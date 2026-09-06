import * as XLSX from 'xlsx';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function syncToExcel(consultations) {
  try {
    const dataDir = __dirname;
    const xlsxPath = path.resolve(dataDir, 'consultations.xlsx');
    const csvPath = path.resolve(dataDir, 'consultations.csv');

    // Format rows with clean human-readable Excel headers
    const excelRows = consultations.map((item, index) => {
      let dateStr = '';
      try {
        if (item.createdAt) {
          dateStr = new Date(item.createdAt).toLocaleString('en-IN', {
            dateStyle: 'medium',
            timeStyle: 'short'
          });
        }
      } catch (e) {
        dateStr = item.createdAt || '';
      }

      return {
        'S.No': index + 1,
        'Consultation ID': item.id || `VP-2026-${1000 + index}`,
        'Submission Date & Time': dateStr,
        'Client Full Name': item.name || '',
        'Contact Phone': item.phone || '',
        'Email Address': item.email || '',
        'Legal Matter / Practice Area': item.matterType || 'General Consultation',
        'Urgency Level': item.urgency || 'Standard',
        'Consultation Mode': item.mode || 'In-Chamber (District Court)',
        'Client Case Message': item.message || '',
        'Status': item.status || 'New'
      };
    });

    // 1. Create true Microsoft Excel Workbook (.xlsx)
    const worksheet = XLSX.utils.json_to_sheet(excelRows);

    // Set professional column widths
    worksheet['!cols'] = [
      { wch: 6 },   // S.No
      { wch: 18 },  // ID
      { wch: 24 },  // Date
      { wch: 24 },  // Name
      { wch: 18 },  // Phone
      { wch: 28 },  // Email
      { wch: 30 },  // Legal Matter
      { wch: 24 },  // Urgency
      { wch: 28 },  // Mode
      { wch: 45 },  // Message
      { wch: 12 }   // Status
    ];

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Advocate Inquiries');
    XLSX.writeFile(workbook, xlsxPath);

    // 2. Also write UTF-8 CSV with BOM for universal 1-click double-click open in Excel
    const csvContent = '\uFEFF' + XLSX.utils.sheet_to_csv(worksheet);
    fs.writeFileSync(csvPath, csvContent, 'utf-8');

    console.log(`[Excel Sync] Updated Excel sheet at: ${xlsxPath} (${excelRows.length} records)`);
    return { success: true, xlsxPath, csvPath, count: excelRows.length };
  } catch (err) {
    console.error('[Excel Sync Error]:', err.message);
    return { success: false, error: err.message };
  }
}
