import React, {Component, Children, createElement} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const URL_FUNCTIONS = {
  BUFFER: (url, text) => `https://buffer.com/add?text=${text}&url=${url}`,
  DIGG: (url, text) => `http://digg.com/submit?url=${url}&title=${text}`,
  EMAIL: (url, text) => `mailto:?subject=${text}&body=${url}`,
  FACEBOOK: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  GOOGLE_PLUS: (url) => `https://plus.google.com/share?url=${url}`,
  LINKEDIN: (url, text) => `https://www.linkedin.com/shareArticle?url=${url}&title=${text}`,
  PINTEREST: (url, text) =>
    `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${text}`,
  REDDIT: (url, text) => `https://reddit.com/submit?url=${url}&title=${text}`,
  TUMBLR: (url, text) =>
    `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&caption=${text}`,
  TWITTER: (url, text) => `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
}

export default class Social extends Component {
  static types = URL_FUNCTIONS

  static propTypes = {
    type: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    message: PropTypes.string,
  }

  static defaultProps = {
    message: 'Check this out!',
    componentClass: 'a',
  }

  get href() {
    const {type, url, message} = this.props

    return type(encodeURIComponent(url), encodeURIComponent(message))
  }

  render() {
    // Extract props that will not pass through.
    const {className, componentClass, url, message, children, ...props} = this.props

    const componentClassName = classNames(className, 'social')

    const componentProps = {
      ...props,
      href: this.href,
      rel: 'noopener noreferrer',
      target: '_blank',
      className: componentClassName,
    }

    return createElement(componentClass || 'a', componentProps, children)
  }
}
