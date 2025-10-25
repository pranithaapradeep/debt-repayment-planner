import React, { useState } from 'react';
import { addLoan } from '../services/api';
import './LoanForm.css';

const LoanForm = ({ onLoanAdded }) => {
  const [formData, setFormData] = useState({
    loanName: '',
    principal: '',
    interestRate: '',
    termMonths: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loanData = {
        ...formData,
        principal: parseFloat(formData.principal),
        interestRate: parseFloat(formData.interestRate),
        termMonths: parseInt(formData.termMonths)
      };
      console.log('Submitting loan:', loanData);
      const result = await addLoan(loanData);
      console.log('Loan added successfully:', result);
      setFormData({ loanName: '', principal: '', interestRate: '', termMonths: '' });
      onLoanAdded();
    } catch (error) {
      console.error('Error adding loan:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="loan-form">
      <h2>Add New Loan</h2>
      <input
        type="text"
        name="loanName"
        placeholder="Loan Name"
        value={formData.loanName}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="principal"
        placeholder="Principal Amount"
        value={formData.principal}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        step="0.01"
        name="interestRate"
        placeholder="Interest Rate (%)"
        value={formData.interestRate}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="termMonths"
        placeholder="Term (Months)"
        value={formData.termMonths}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Loan</button>
    </form>
  );
};

export default LoanForm;