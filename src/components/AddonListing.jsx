import React from 'react'
import Addon from './Addon'

export default class AddonListing extends React.Component {
  renderAddonRows () {
    if (typeof this.props.addons !== 'undefined') {
      return this.props.addons.classic.map((a) => {
        return <Addon addon={a} key={a.toc.title} />
      })
    }
    return <tr><td>No data found</td></tr>
  }

  render () {
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
}
