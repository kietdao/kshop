import { BrowserRouter } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { store } from './app/store';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from 'react-query'

const kshopClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 60 * 60 * 1000,
    }
  },
})
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter basename='/kshop'>
    <QueryClientProvider client={kshopClient}>
      <App />
    </QueryClientProvider>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
