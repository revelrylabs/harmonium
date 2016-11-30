import React, {Component} from 'react'
import CardLayout from './CardLayout'

export default class Card extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <CardLayout {...props} className={`Card ${className}`}>
        {children}
      </CardLayout>
    )
  }
}

class CardHeader extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <CardLayout.Bar className={`Card-Slice Card-Header ${className}`}>
        {children}
      </CardLayout.Bar>
    )
  }
}
Card.Header = CardHeader

class CardFooter extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <CardLayout.Bar className={`Card-Slice Card-Footer ${className}`}>
        {children}
      </CardLayout.Bar>
    )
  }
}
Card.Footer = CardFooter

class CardFill extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <CardLayout.Fill className={`Card-Slice Card-Fill ${className}`}>
        {children}
      </CardLayout.Fill>
    )
  }
}
Card.Fill = CardFill
