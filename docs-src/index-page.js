import React, {Component} from 'react'
import Layout from './layout'

export default class IndexPage extends Component {
  render() {
    const {navKeys} = this.props
    return (
      <Layout title="Documentation" navKeys={navKeys} />
    )
  }
}
