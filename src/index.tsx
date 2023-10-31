import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom'
// import AppRedux from "../src/apps/AppRedux/AppRedux";
import { Provider } from "react-redux";
import { store } from "./state/store";
import AppReduxHooks from "./apps/AppRedux/AppReduxHooks";
// import App from "./apps/App/App";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <Provider store={store}>
      <AppReduxHooks />
      {/* <App2 /> */}
    </Provider>
  </HashRouter>
);

reportWebVitals();

// Provider обязательно для redux