// server.js
const express = require('express');
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const csvFilePath = './users.csv';

// Ensure CSV file exists with headers
function ensureCsvFile() {
  if (!fs.existsSync(csvFilePath)) {
    fs.writeFileSync(csvFilePath, 'email,password,firstName,lastName\n');
    console.log('Created users.csv file with headers');
  }
}

// Initialize CSV file on startup
ensureCsvFile();

// Register endpoint
app.post('/register', (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check if user already exists
  const users = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => users.push(row))
    .on('end', () => {
      if (users.find(u => u.email === email)) {
        return res.status(400).json({ message: 'User already exists' });
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

      const newUser = { email, password, firstName, lastName };
      csvWriter.writeRecords([newUser])
        .then(() => {
          console.log('User registered:', email);
          res.json({ success: true, user: newUser });
        })
        .catch((error) => {
          console.error('CSV write error:', error);
          res.status(500).json({ message: 'Failed to save user data' });
        });
    })
    .on('error', (error) => {
      console.error('CSV read error:', error);
      res.status(500).json({ message: 'Failed to read user data' });
    });
});

// Login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const users = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on('data', (row) => users.push(row))
    .on('end', () => {
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        console.log('User logged in:', email);
        res.json({ success: true, user });
      } else {
        res.status(400).json({ message: 'Invalid email or password' });
      }
    })
    .on('error', (error) => {
      console.error('CSV read error:', error);
      res.status(500).json({ message: 'Failed to read user data' });
    });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
  console.log('CSV file path:', path.resolve(csvFilePath));
  console.log('Ready to accept user registrations and logins');
});
