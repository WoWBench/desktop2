import React from 'react'
import { connect } from 'react-redux'
import Addon from './Addon'
import AddonListing from './AddonListing'

class App extends React.Component {
  render () {
    return (
      <>
        <h1>I am a React App</h1>
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
