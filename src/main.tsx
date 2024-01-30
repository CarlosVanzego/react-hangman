// Importing React and ReactDOM
import React from 'react';
import ReactDOM from 'react-dom/client';
// Importing the main component of the application
import App from './App.tsx';

// Rendering the main component wrapped in React.StrictMode
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
