import axios from 'axios';

const API_BASE_URL = '/api';

export const addLoan = async (loan) => {
  const response = await axios.post(`${API_BASE_URL}/loans`, loan);
  return response.data;
};

export const getLoans = async () => {
  const response = await axios.get(`${API_BASE_URL}/loans`);
  return response.data;
};

export const getRepaymentPlan = async (method) => {
  const response = await axios.get(`${API_BASE_URL}/loans/repayment?method=${method}`);
  return response.data;
};