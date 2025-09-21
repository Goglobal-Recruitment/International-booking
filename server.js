// server.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const csvFilePath = './users.csv';

// Register endpoint
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Check if user already exists
  const users = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => users.push(row))
    .on('end', () => {
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
      }

      const csvWriter = createCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'email', title: 'email' },
          { id: 'password', title: 'password' },
          { id: 'firstName', title: 'firstName' },
          { id: 'lastName', title: 'lastName' },
        ],
        append: true
      });

      csvWriter.writeRecords([{ email, password, firstName, lastName }])
        .then(() => res.json({ success: true }));
    });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => users.push(row))
    .on('end', () => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        res.json({ success: true, user });
      } else {
        res.status(400).json({ error: 'Invalid email or password' });
      }
    });
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
