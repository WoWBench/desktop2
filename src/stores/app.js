import { createStore } from 'redux'

function appStore(state = {}, action) {
  switch (action.type) {
    case 'SET_INSTALLATION_FOLDER':
      state.installation_folder = action.folder
      return state
    default:
      return state
  }
}

let store = createStore(appStore)

export default store