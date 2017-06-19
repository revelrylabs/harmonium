import React, {Component, Children, createElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Button from "./Button"

export default class Social extends Component {
  static get propTypes() {
    return {
      socialNetwork: PropTypes.string,
      url: PropTypes.string,
      message: PropTypes.string,
      button: PropTypes.bool
    }
  }
  static get defaultProps() {
    return {
        socialNetwork: "Facebook",
        url: "http://revelry.co",
        message: "Check this out!",
        button: false
    }
  }

  getLink() {
    const {url, message} = this.props
    const encodedMsg = encodeURIComponent(message)

    switch (this.props.socialNetwork) {
      case "Buffer":
        return `https://buffer.com/add?text=${encodedMsg}&url=${url}`
      case "Digg":
        return `http://digg.com/submit?url=${url}&title=${encodedMsg}`
      case "email":
        return `mailto:?subject=${encodedMsg}&body=${url}`
      case "Facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "Google+":
        return `https://plus.google.com/share?url=${url}`
      case "LinkedIn":
        return `https://www.linkedin.com/shareArticle?url=${url}&title=${encodedMsg}`
      case "Pinterest":
        return `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${encodedMsg}`
      case "Reddit":
        return `https://reddit.com/submit?url=${url}&title=${encodedMsg}`
      case "Tumblr":
        return `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&caption=${encodedMsg}`
      case "Twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${encodedMsg}`
      default:
        console.warn("No valid social network given!")
    }
  }

  render() {
    // Extract props that will not pass through.
    const {className, children, socialNetwork, url, message, button, ...props} = this.props

    const componentClassName = classNames(className, "social", `social--${socialNetwork}`)

    const componentProps = {
      // so any button options like tiny or expanded get passed along
      ...props,
      href: this.getLink(),
      rel: "noopener noreferrer",
      target: "_blank",
      title: `Share via ${this.props.socialNetwork}`,
      className: componentClassName
    }

    if (this.props.button) {
      return (
        <Button {...componentProps}>
          {this.props.children}
        </Button>
      )
    } else {
      return (
        <a {...componentProps}>
          {this.props.children}
        </a>
      )
    }
  }
}
