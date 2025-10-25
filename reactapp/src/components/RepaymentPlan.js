import React from 'react';

const RepaymentPlan = ({ loans }) => {
  const calculateMonthlyPayment = (principal, rate, months) => {
    const monthlyRate = rate / 100 / 12;
    if (monthlyRate === 0) return principal / months;
    return (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
  };

  if (!loans || loans.length === 0) {
    return (
      <div>
        <h2>Repayment Plan</h2>
        <p>No loans added yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Repayment Plan</h2>
      <table>
        <thead>
          <tr>
            <th>Loan Name</th>
            <th>Principal</th>
            <th>Interest Rate</th>
            <th>Term</th>
            <th>Monthly Payment</th>
          </tr>
        </thead>
        <tbody>
          {loans.map((loan, index) => {
            const monthlyPayment = calculateMonthlyPayment(loan.principal, loan.interestRate, loan.termMonths);
            
            return (
              <tr key={loan.id || index}>
                <td>{loan.loanName}</td>
                <td>₹{loan.principal?.toLocaleString()}</td>
                <td>{loan.interestRate}%</td>
                <td>{loan.termMonths} months</td>
                <td>₹{monthlyPayment.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RepaymentPlan;