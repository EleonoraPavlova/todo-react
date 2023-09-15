import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'
import AppRedux from "./AppRedux";
import { Provider } from "react-redux";
import { store } from "./state/store";
// import AppReducer from "./AppReducer";
// import { App2 } from "./App2"; //micro-task

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <AppRedux />
        {/* <App2 /> */}
      </Provider>
    </HashRouter>
  </React.StrictMode >
);

reportWebVitals();

// Provider обязательно для redux