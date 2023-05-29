import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../../client/src/App';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context';
import { ThemeProviderWrapper } from './context/theme.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <AuthProviderWrapper>
        <Router>
          <App />
        </Router>
      </AuthProviderWrapper>
    </ThemeProviderWrapper>
  </React.StrictMode>
)
