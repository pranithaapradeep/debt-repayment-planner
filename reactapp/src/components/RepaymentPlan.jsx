import React from 'react';
import './RepaymentPlan.css';

const RepaymentPlan = ({ loans }) => {
  const calculateMonthlyPayment = (principal, rate, months) => {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  const calculateTotalInterest = (principal, monthlyPayment, months) => {
    return (monthlyPayment * months) - principal;
  };

  if (!loans || loans.length === 0) {
    return (
      <div className="repayment-plan">
        <h2>Repayment Plan</h2>
        <p>No loans added yet. Add a loan above to see your repayment plan.</p>
      </div>
    );
  }

  return (
    <div className="repayment-plan">
      <h2>Repayment Plan</h2>
      <table>
        <thead>
          <tr>
            <th>Loan Name</th>
            <th>Principal</th>
            <th>Interest Rate</th>
            <th>Term</th>
            <th>Monthly Payment</th>
            <th>Total Interest</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => {
            const monthlyPayment = calculateMonthlyPayment(loan.principal, loan.interestRate, loan.termMonths);
            const totalInterest = calculateTotalInterest(loan.principal, monthlyPayment, loan.termMonths);
            const totalAmount = loan.principal + totalInterest;
            
            return (
              <tr key={loan.id || index}>
                <td>{loan.loanName}</td>
                <td>${loan.principal?.toLocaleString() || '0'}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.termMonths} months</td>
                <td>${monthlyPayment.toFixed(2)}</td>
                <td>${totalInterest.toFixed(2)}</td>
                <td>${totalAmount.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RepaymentPlan;