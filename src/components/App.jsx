import React from 'react'
import { connect } from 'react-redux'
import Addon from './Addon'
import AddonListing from './AddonListing'
import Navbar from './Navbar'
import Install from './Install'

class App extends React.Component {
  content () {
    if (typeof this.props.installation_folder !== "undefined" && this.props.installation_folder !== '') {
      return <AddonListing addons={this.props.addons} />
    }
    return <Install />
  }

  render () {
    return (
      <>
        <Navbar brand="WoWBench" />
        {this.content()}
      </>
    )
  }

  componentDidMount () {
    console.log('react has mounted app')
  }
}

// export default 

const mapState = state => ({
  addons: state.addons,
  installation_folder: state.installation_folder
})

export default connect(
  mapState
)(App)
