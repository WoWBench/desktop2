import React from 'react'
import { connect } from 'react-redux'
import Addon from './Addon'

class App extends React.Component {
  renderAddonRows () {
    if (typeof this.props.addons !== 'undefined') {
      return this.props.addons.map((a) => {
        return <Addon addon={a} key={a.title} />
      })
    }
    return <tr><td>No data found</td></tr>
  }

  renderAddons () {
    return (
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Version</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAddonRows()}
        </tbody>
      </table>
    )
  }

  render () {
    return (
      <>
        <h1>I am a React App</h1>
        {this.renderAddons()}
      </>
    )
  }
}

// export default 

const mapState = state => ({ addons: state.addons })

export default connect(
  mapState
)(App)
