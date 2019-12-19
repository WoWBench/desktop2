import * as types from './types/app'

export function setInstallationFolder (folder) {
  return {
    type: types.SET_INSTALLATION_FOLDER,
    payload: folder
  }
}

export function setAddonsStatus (addons) {
  return {
    type: types.SET_ADDONS_STATUS,
    payload: addons
  }
}
