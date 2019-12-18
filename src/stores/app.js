import { createStore } from 'redux'

function appStore(state = {}, action) {
  switch (action.type) {
    case 'SET_ADDONS_STATUS':
      return Object.assign({}, state, {
        addons: action.payload
      })
    case 'SET_INSTALLATION_FOLDER':
      return Object.assign({}, state, {
        installation_folder: action.payload
      })
    default:
      return state
  }
}

let store = createStore(appStore)

export default store