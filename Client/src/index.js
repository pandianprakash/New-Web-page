import React from 'react';
import ReactDOM from 'react-dom/client';  /// Import the new client
import "./index.css"
import { BrowserRouter as Routes, Route, Switch } from 'react-router-dom';
import App from './App';  // Your main App component
import 'boxicons/css/boxicons.min.css';
// Find the root element in your HTML
const rootElement = document.getElementById('root');

// Use the createRoot API (React 18)
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);  // Create root using React 18 API
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    console.error('Root element not found');
}
