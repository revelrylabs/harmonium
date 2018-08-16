import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/**
 * A Sticky component that allows its content to stick
 * to the top or bottom of the window.
 */
class Sticky extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    stickToBottom: PropTypes.bool,
    topAnchor: PropTypes.string,
    bottomAnchor: PropTypes.string,
    topOffset: PropTypes.number,
    bottomOffset: PropTypes.number,
  }

  constructor(props) {
    super(props)
    this.state = {
      isStuck: false,
      isAnchored: false,
    }

    this.setContentState = this.setContentState.bind(this)
    this.setWidth = this.setWidth.bind(this)
  }

  /**
   * Set the function that determines stickiness as the window scroll event and set
   * the width setting function on window resize and load when the component mounts.
   * @return {void}
   */
  componentDidMount() {
    window.addEventListener('scroll', this.setContentState)
    window.addEventListener('resize', this.setWidth)
    window.addEventListener('load', this.setWidth)

    this.placeholder.style.width = `${this.sticky.offsetWidth}px`
    this.placeholder.style.height = `${this.sticky.offsetHeight}px`
  }

  /**
   * Remove all the event listeners added on mount when the component unmounts.
   * @return {void}
   */
  componentWillUnmount() {
    window.removeEventListener('scroll', this.setContentState)
    window.removeEventListener('resize', this.setWidth)
    window.removeEventListener('load', this.setWidth)
  }

  /**
   * Convert a string value of a quantity in px to an integer of the numeric
   * value of the quantity. For example, passing in the string '18px' will return
   * the integer 18.
   * @param {string} value the value in px to convert
   * @return {int} the parsed px value as an integer
   */
  parsePxValue(value) {
    return parseInt(value.replace('px', ''), 10)
  }

  /**
   * Set the width of the content block.
   * @return {void}
   */
  setWidth() {
    // use clientWidth here instead of offsetWidth
    // because this value is used to contain the sticky
    // element INSIDE of its parents borders
    this.sticky.style.width = `${this.sticky.parentElement.clientWidth}px`
  }

  /**
   * Takes one of the anchor prop values and determines
   * whether to anchor to the top or bottom of the element
   * @param {string} anchor the anchor prop value
   * @return {string} the parsed anchor point
   */
  getAnchor(anchor) {
    const anchorParts = /(\w+):?(\w*)/.exec(anchor)
    const anchorEl = document.getElementById(anchorParts[1])
    let anchorPoint

    if (anchorParts[2] === 'bottom') {
      anchorPoint = anchorEl.getBoundingClientRect().bottom
    } else if (anchorParts[2] === 'top' || !anchorParts[2]) {
      anchorPoint = anchorEl.getBoundingClientRect().top
    }

    return anchorPoint
  }

  /**
   * Determine the points at which the sticky element starts to
   * stick and stops sticking depending on which props are passed in.
   * The stickToBottom prop sticks the sticky element to the bottom of the window.
   * The topAnchor prop changes the starting point for a top-sticking sticky and
   * the stopping point for a bottom-sticking sticky. The bottomAnchor changes the
   * stopping point for a top-sticking sticky and the starting point for a
   * bottom-sticking sticky.
   * @return {object} the sticky starting and stopping points
   */
  setStickyPoints() {
    let stickyStart, stickyStop, topAnchor, bottomAnchor

    if (this.props.topAnchor) {
      topAnchor = this.getAnchor(this.props.topAnchor)
    }

    if (this.props.bottomAnchor) {
      bottomAnchor = this.getAnchor(this.props.bottomAnchor)
    }

    const currentHeight = this.sticky.offsetHeight

    const stickyContainer = this.sticky.parentElement.parentElement
    const containerTop = stickyContainer.getBoundingClientRect().top
    const containerBottom = stickyContainer.getBoundingClientRect().bottom

    let topPoint = topAnchor ? topAnchor : containerTop
    let bottomPoint = bottomAnchor ? bottomAnchor : containerBottom

    if (this.props.topOffset) {
      topPoint += this.props.topOffset
    }

    if (this.props.bottomOffset) {
      bottomPoint += this.props.bottomOffset
    }

    if (this.props.stickToBottom) {
      const windowHeight = window.innerHeight

      stickyStart = bottomPoint - windowHeight
      stickyStop = topPoint + currentHeight - windowHeight
    } else {
      stickyStart = topPoint
      stickyStop = bottomPoint - currentHeight
    }

    return {
      stickyStart,
      stickyStop,
    }
  }

  /* eslint complexity: [2, 8] */
  /**
   * Determine the state of whether the content should be stuck, anchored to the stopping
   * point of the sticky behavior (e.g. the bottom of the container), or neither.
   * @return {void}
   */
  setContentState() {
    const stickyPoints = this.setStickyPoints()
    let stickyFlag, anchorFlag

    if (this.props.stickToBottom) {
      stickyFlag = stickyPoints.stickyStart > 0 && stickyPoints.stickyStop <= 0
      anchorFlag = stickyPoints.stickyStart <= 0
    } else {
      stickyFlag = stickyPoints.stickyStart <= 0 && stickyPoints.stickyStop > 0
      anchorFlag = stickyPoints.stickyStop <= 0
    }

    if (stickyFlag) {
      this.placeholder.style.display = 'block'

      this.setState({
        isStuck: true,
        isAnchored: false,
      })
    } else if (anchorFlag) {
      this.setState({
        isStuck: false,
        isAnchored: true,
      })
    } else {
      this.placeholder.style.display = 'none'

      this.setState({
        isStuck: false,
        isAnchored: false,
      })
    }
  }

  render() {
    const {children, className, stickToBottom, ...props} = this.props
    /* eslint-disable no-nested-ternary */
    const stickyClass = this.state.isStuck
      ? stickToBottom
        ? 'rev-Sticky--stuck-bottom'
        : 'rev-Sticky--stuck-top'
      : this.state.isAnchored
        ? 'rev-Sticky--anchored'
        : ''
    const stickyClassName = classNames(className, 'rev-Sticky', stickyClass)
    const divProps = Object.assign({}, props)

    delete divProps.topAnchor
    delete divProps.bottomAnchor
    delete divProps.topOffset
    delete divProps.bottomOffset

    return (
      <div className="rev-Sticky-wrapper">
        <div
          className="rev-Sticky-placeholder"
          ref={(placeholder) => {
            this.placeholder = placeholder
          }}
        />
        <div
          className={stickyClassName}
          ref={(sticky) => {
            this.sticky = sticky
          }}
          {...divProps}
        >
          {children}
        </div>
      </div>
    )
  }
}

/**
 * A StickyContainer component to hold a Sticky element.
 */
class StickyContainer extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
  }

  constructor(props) {
    super(props)
  }

  render() {
    const {children, className, ...props} = this.props
    const containerClassName = classNames(className, 'rev-Sticky-container')

    return (
      <div {...props} className={containerClassName}>
        {children}
      </div>
    )
  }
}

Sticky.Container = StickyContainer

export {StickyContainer}
export default Sticky
