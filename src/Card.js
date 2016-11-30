import React, {Component} from 'react'
import CardLayout from './CardLayout'

export default class Card extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <CardLayout {...props} className={`rev-Card ${className}`}>
        {children}
      </CardLayout>
    )
  }
}

class CardHeader extends Component {
  render() {
    const {className, children, ...props} = this.props
    return (
      <CardLayout.Bar className={`rev-Card-slice rev-Card-header ${className}`}>
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
      <CardLayout.Bar className={`rev-Card-slice rev-Card-footer ${className}`}>
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
      <CardLayout.Fill className={`rev-Card-slice rev-Card-fill ${className}`}>
        {children}
      </CardLayout.Fill>
    )
  }
}
Card.Fill = CardFill
