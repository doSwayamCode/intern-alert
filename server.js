const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const csvPath = path.join(__dirname, 'leads.csv');

const csvWriter = createCsvWriter({
  path: csvPath,
  header: [
    { id: 'timestamp', title: 'Timestamp' },
    { id: 'name', title: 'Name' },
    { id: 'email', title: 'Email' },
    { id: 'domain', title: 'Target Roles' }
  ],
  append: fs.existsSync(csvPath)
});

// Create CSV file with headers if it doesn't exist yet
if (!fs.existsSync(csvPath)) {
  csvWriter.writeRecords([]).then(() => console.log('Initialized leads.csv with headers'));
}

app.post('/api/leads', async (req, res) => {
  try {
    const { name, email, domain } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const record = [
      {
        timestamp: new Date().toISOString(),
        name,
        email,
        domain
      }
    ];

    await csvWriter.writeRecords(record);
    res.status(200).json({ success: true, message: 'Saved to mock Google Sheet' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to write to database' });
  }
});

app.get('/api/leads', (req, res) => {
  const results = [];
  
  if (!fs.existsSync(csvPath)) {
    return res.json([]);
  }

  fs.createReadStream(csvPath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', () => {
      res.json(results);
    })
    .on('error', (err) => res.status(500).json({ error: 'Failed to read database' }));
});

// Export CSV Endpoint
app.get('/api/export', (req, res) => {
  if (fs.existsSync(csvPath)) {
    res.download(csvPath, 'intern_alert_leads.csv');
  } else {
    res.status(404).send('No data available to download yet. Submit a test lead on the landing page first!');
  }
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`\n🚀 Server running locally!`);
  console.log(`👉 Live Landing Page: http://localhost:${port}`);
  console.log(`📊 Admin Dashboard: http://localhost:${port}/admin`);
});
