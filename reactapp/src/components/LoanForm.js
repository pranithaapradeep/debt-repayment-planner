import React, { useState } from 'react';
import { addLoan } from '../services/api';

const LoanForm = ({ onLoanAdded }) => {
  const [formData, setFormData] = useState({
    loanName: '',
    principal: '',
    interestRate: '',
    termMonths: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await addLoan({
        loanName: formData.loanName,
        principal: parseFloat(formData.principal),
        interestRate: parseFloat(formData.interestRate),
        termMonths: parseInt(formData.termMonths)
      });
      
      setFormData({ loanName: '', principal: '', interestRate: '', termMonths: '' });
      onLoanAdded();
    } catch (error) {
      console.error('Error adding loan:', error);
      alert('Failed to add loan. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Loan'}
      </button>
    </form>
  );
};

export default LoanForm;