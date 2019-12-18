import React from 'react'

export default class Addon extends React.Component {
  /* Render an addon as a table row */
  render() {
    return <tr>
      <td>{this.props.addon.title}</td>
      <td>{this.props.addon.version}</td>
      <td>A</td>
    </tr>
  }
}
