import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './context/auth.context';
import { ThemeProviderWrapper } from './context/theme.context';
import { MessageProviderWrapper } from './context/message.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProviderWrapper>
      <AuthProviderWrapper>
        <MessageProviderWrapper>
          <Router>
            <App />
          </Router>
        </MessageProviderWrapper>
      </AuthProviderWrapper>
    </ThemeProviderWrapper>
  </React.StrictMode>
)
