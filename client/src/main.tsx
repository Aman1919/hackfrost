import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import React from 'react';

// Check if the root element exists before rendering
const rootElement = document.getElementById('root');
if (rootElement) {
  createRoot(rootElement).render(
      <App />
  );
}
