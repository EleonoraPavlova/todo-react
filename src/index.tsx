import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './state/storeBLL'
import AppRedux from './apps/AppRedux/AppRedux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <AppRedux demo={true} />
    </HashRouter>
  </Provider>
)

reportWebVitals()
