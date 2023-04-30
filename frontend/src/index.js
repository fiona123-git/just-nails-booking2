import React from 'react';
import { createRoot } from 'react-dom/client';
//import { Provider } from 'react-redux';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './bootstrap.min.css'
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';



const container = document.getElementById('root');
const root = createRoot(container);


root.render(
  <GoogleOAuthProvider clientId="271291999603-vekug6djlfo4hr62gvb4bjjg6f2jjh3l.apps.googleusercontent.com">
  <React.StrictMode>
  
      <App />
    
  </React.StrictMode>
  </GoogleOAuthProvider>
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(); 
