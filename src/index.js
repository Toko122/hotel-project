import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter as Router } from 'react-router-dom';


const CLERKPUBKEY = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY

if (!CLERKPUBKEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ClerkProvider publishableKey={CLERKPUBKEY} afterSignOutUrl="/">
  <Router>
    <App />
  </Router>
  </ClerkProvider>
);
