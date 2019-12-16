import React from 'react'
import ReactDOM from 'react-dom'

import Navbar from './components/Navbar'
import App from './components/App'
import { Provider } from 'react-redux'
import store from './stores/app'

console.log('loading react')
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
  ,
  document.getElementById('app')
)
