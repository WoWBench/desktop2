const SET_INSTALLATION_FOLDER = 'SET_INSTALLATION_FOLDER'
const SET_ADDONS_STATUS = 'SET_ADDONS_STATUS'

export function setInstallationFolder (folder) {
  return {
    type: SET_INSTALLATION_FOLDER,
    payload: folder
  }
}

export function setAddonsStatus (addons) {
  return {
    type: SET_ADDONS_STATUS,
    payload: addons
  }
}
