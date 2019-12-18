import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { Provider } from 'react-redux'
import store from './stores/app'
import electron from 'electron'
import { setAddonsStatus } from './actions/app'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
)

electron.ipcRenderer.on('get-addons', (event, addons) => {
  store.dispatch(setAddonsStatus(addons))
})

electron.ipcRenderer.send('get-addons', {})
