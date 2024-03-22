import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.css'
import reportWebVitals from './reportWebVitals'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './app/storeBLL'
import App from 'app/App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <HashRouter>
      <App demo={true} />
    </HashRouter>
  </Provider>
)

reportWebVitals()
