import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { Provider } from 'react-redux';
import store from './services/Store.jsx';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { ThemeProvider } from './context/ThemeContext.jsx';

const paypalClientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || '';

// Only wrap with PayPalScriptProvider if client ID is provided and not empty
const AppWithPayPal = paypalClientId && paypalClientId.trim() !== '' ? (
  <PayPalScriptProvider 
    options={{ 
      clientId: paypalClientId,
      currency: "USD"
    }}
  >
    <App />
  </PayPalScriptProvider>
) : (
  <App />
);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider>
        {AppWithPayPal}
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
)
