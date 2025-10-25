import axios from 'axios';

const API_BASE_URL = '/api';
const IS_GITHUB_PAGES = window.location.hostname.includes('github.io');

// Mock data for GitHub Pages
let mockLoans = [
  { id: 1, name: 'Credit Card', principal: 5000, interestRate: 18.5, minimumPayment: 150 },
  { id: 2, name: 'Student Loan', principal: 25000, interestRate: 6.8, minimumPayment: 300 }
];

export const addLoan = async (loan) => {
  if (IS_GITHUB_PAGES) {
    // Mock implementation for GitHub Pages
    const newLoan = { ...loan, id: Date.now() };
    mockLoans.push(newLoan);
    return newLoan;
  }
  const response = await axios.post(`${API_BASE_URL}/loans`, loan);
  return response.data;
};

export const getLoans = async () => {
  if (IS_GITHUB_PAGES) {
    return mockLoans;
  }
  const response = await axios.get(`${API_BASE_URL}/loans`);
  return response.data;
};

export const getRepaymentPlan = async (method) => {
  if (IS_GITHUB_PAGES) {
    // Mock repayment calculation
    const sortedLoans = [...mockLoans].sort((a, b) => {
      if (method === 'snowball') {
        return a.principal - b.principal; // Smallest balance first
      } else {
        return b.interestRate - a.interestRate; // Highest interest first
      }
    });
    return sortedLoans;
  }
  const response = await axios.get(`${API_BASE_URL}/loans/repayment?method=${method}`);
  return response.data;
};