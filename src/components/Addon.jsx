import React from 'react'

export default class Addon extends React.Component {
  /* Render an addon as a table row */
  renderTableRow() {
    return <tr>
      <td>Name</td>
      <td>Version/Ref</td>
      <td>Actions</td>
    </tr>
  }

  render() {
    return this.renderTableRow()
  }
}
