import React from 'react'
import { connect } from 'react-redux'
import Addon from './Addon'
import AddonListing from './AddonListing'
import Navbar from './Navbar'

class App extends React.Component {
  render () {
    return (
      <>
        <Navbar brand="WoWBench" />
        <AddonListing addons={this.props.addons} />
      </>
    )
  }
}

// export default 

const mapState = state => ({ addons: state.addons })

export default connect(
  mapState
)(App)
