const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let loans = [];
let nextId = 1;

// Add loan
app.post('/api/loans', (req, res) => {
  const loan = { id: nextId++, ...req.body };
  loans.push(loan);
  res.json(loan);
});

// Get loans
app.get('/api/loans', (req, res) => {
  res.json(loans);
});

// Get repayment plan
app.get('/api/loans/repayment', (req, res) => {
  const method = req.query.method || 'snowball';
  
  // Simple mock calculation
  const sortedLoans = [...loans];
  if (method === 'snowball') {
    sortedLoans.sort((a, b) => a.principal - b.principal);
  } else {
    sortedLoans.sort((a, b) => b.interestRate - a.interestRate);
  }
  
  res.json(sortedLoans);
});

app.listen(8080, () => {
  console.log('Mock server running on http://localhost:8080');
});