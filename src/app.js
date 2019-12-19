import React from 'react'
import ReactDOM from 'react-dom'

import App from './components/App'
import { Provider } from 'react-redux'
import store from './stores/app'
import electron from 'electron'
import { setAddonsStatus } from './actions/app'

const APP_VERSION = '0.0.1'

ReactDOM.render(
  <Provider store={store} electron={electron}>
    <App />
  </Provider>,
  document.getElementById('app')
)

electron.ipcRenderer.on('get-addons', (event, addons) => {
  store.dispatch(setAddonsStatus(addons))
})

// When app loads send the request to get addon information.
electron.ipcRenderer.send('get-addons', {})
