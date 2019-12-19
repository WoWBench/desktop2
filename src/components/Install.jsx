import * as React from 'react'
import * as Types from '../actions/types/app'
import { setInstallationFolder } from '../actions/app'
import { connect } from 'react-redux'

export class Install extends React.Component {
  constructor () {
    super ()
    this.change = this.change.bind(this)
  }

  change () {
    let sel = document.getElementById('directorySelector')
    let folder = sel.files[0].path
    if (folder.match(/.DS_Store/)) {
      folder = folder.replace('.DS_Store', '')
    }
    this.props.selectFolder(folder)
  }

  render () {
    let folderSelect = <input id="directorySelector" type="file" webkitdirectory="" onChange={this.change} />;

    return <>
      <h1>Welcome</h1>
      <p>In order to start, please locate the World of Warcraft installation folder (the folder containing one or more _classic_ or _retail_ folders).</p>
      {folderSelect}
    </>
  }
}

const mapState = state => ({
  installation_folder: state.installation_folder
})

const mapDispatch = dispatch => {
  return {
    selectFolder: folder => {
      dispatch(setInstallationFolder(folder))
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Install)
