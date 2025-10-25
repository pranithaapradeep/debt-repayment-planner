import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LoanForm from './components/LoanForm';
import RepaymentPlan from './components/RepaymentPlan';
import { getRepaymentPlan } from './services/api';

function App() {
  const [loans, setLoans] = useState([]);
  const [method, setMethod] = useState('snowball');
  const [loading, setLoading] = useState(false);

  const fetchRepaymentPlan = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getRepaymentPlan(method);
      setLoans(data);
    } catch (error) {
      console.error('Error fetching repayment plan:', error);
      setLoans([]);
    } finally {
      setLoading(false);
    }
  }, [method]);

  useEffect(() => {
    fetchRepaymentPlan();
  }, [fetchRepaymentPlan]);

  const handleMethodChange = (e) => {
    setMethod(e.target.value);
  };

  return (
    <div className="App">
      <header>
        <h1 className="main-title">Debt Repayment Planner</h1>
        <p className="subtitle">Created by Pranithaa</p>
      </header>
      
      <main>
        <LoanForm onLoanAdded={fetchRepaymentPlan} />
        
        <div className="method-selector">
          <label>
            Repayment Method:
            <select value={method} onChange={handleMethodChange}>
              <option value="snowball">Snowball (Smallest Principal First)</option>
              <option value="avalanche">Avalanche (Highest Interest Rate First)</option>
            </select>
          </label>
        </div>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <RepaymentPlan loans={loans} />
        )}
      </main>
    </div>
  );
}

export default App;