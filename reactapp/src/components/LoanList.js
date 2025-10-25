import React from 'react';
import { deleteLoan } from '../services/api';

const LoanList = ({ loans, onLoanDeleted }) => {
  const handleDelete = async (id) => {
    try {
      await deleteLoan(id);
      onLoanDeleted();
    } catch (error) {
      console.error('Error deleting loan:', error);
    }
  };

  return (
    <div>
      <h3>Your Loans</h3>
      {loans.map(loan => (
        <div key={loan.id}>
          <span>{loan.name}: ₹{loan.balance} at {loan.interestRate}%</span>
          <button onClick={() => handleDelete(loan.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default LoanList;