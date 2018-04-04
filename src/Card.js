import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CardLayout from './CardLayout'

export default class Card extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

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
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return <CardLayout.Bar className={`rev-Card-header ${className}`}>{children}</CardLayout.Bar>
  }
}
Card.Header = CardHeader

class CardFooter extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return <CardLayout.Bar className={`rev-Card-footer ${className}`}>{children}</CardLayout.Bar>
  }
}
Card.Footer = CardFooter

class CardBody extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  render() {
    const {className, children} = this.props

    return <CardLayout.Bar className={`rev-Card-body ${className}`}>{children}</CardLayout.Bar>
  }
}
Card.Body = CardBody
