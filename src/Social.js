import React, {Component, Children, createElement} from 'react'
import classNames from 'classnames'
import Button from "./Button"

export default class Social extends Component {
  static get propTypes() {
    return {
      socialNetwork: React.PropTypes.string,
      url: React.PropTypes.string,
      message: React.PropTypes.string,
      button: React.PropTypes.bool
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
    switch (this.props.socialNetwork) {
      case "Buffer":
        return `https://buffer.com/add?text=${message}&url=${url}`
      case "Digg":
        return `http://digg.com/submit?url=${url}&title=${message}`
      case "email":
        return `mailto:?subject=${message}&body=${url}`
      case "Facebook":
        return `https://www.facebook.com/sharer/sharer.php?u=${url}`;
      case "Google+":
        return `https://plus.google.com/share?url=${url}`
      case "LinkedIn":
        return `https://www.linkedin.com/shareArticle?url=${url}&title=${message}`
      case "Pinterest":
        return `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${message}`
      case "Reddit":
        return `https://reddit.com/submit?url=${url}&title=${message}`
      case "Tumblr":
        return `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&caption=${message}`
      case "Twitter":
        return `https://twitter.com/intent/tweet?url=${url}&text=${message}`
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
