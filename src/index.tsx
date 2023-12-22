import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom'
// import AppRedux from "../src/apps/AppRedux/AppRedux";
import { Provider } from "react-redux";
import { store } from "./state/storeBLL";
// import AppReduxHooks from "./apps/AppRedux/AppReduxHooks";
import AppRedux from "./apps/AppRedux/AppRedux";


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <HashRouter>
    <Provider store={store}>
      <AppRedux demo={false} />
      {/* <AppReduxHooks /> */}
      {/* <App2 /> */}
    </Provider>
  </HashRouter>
);

reportWebVitals();