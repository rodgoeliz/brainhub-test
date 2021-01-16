import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/EventRegistrationPage';
import reportWebVitals from './reportWebVitals';
import { CustomApolloProvider } from './utils/react-apollo';

ReactDOM.render(
  <React.StrictMode>
    <CustomApolloProvider>
      <App />
    </CustomApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
