import React from 'react';
import ReactDOM from 'react-dom/client';
import Application from './Application';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Application />
  </React.StrictMode>
);
