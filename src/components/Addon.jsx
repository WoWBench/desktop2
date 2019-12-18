import React from 'react'

export default class Addon extends React.Component {
  /* Render an addon as a table row */
  render() {
    let toc = this.props.addon.toc
    return <tr>
      <td>{toc.title}</td>
      <td>{toc.version}</td>
      <td>{toc.author}</td>
    </tr>
  }
}
