import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('React app starting...');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
console.log('React app rendered');