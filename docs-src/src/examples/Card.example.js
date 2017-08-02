import React, {Component} from 'react'
import Card from 'revelry-components/lib/Card'
import Lipsum from 'revelry-components/lib/Lipsum'

export class Basics extends Component {
  render() {
    return (
      <Card style={{height: '240px'}}>
        <Card.Header>Header content</Card.Header>
        <Card.Fill>
          <p><Lipsum /></p>
        </Card.Fill>
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    )
  }
}
