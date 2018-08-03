import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

class Sticky extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
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
    this.setWidth()

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
    const containerStyles = window.getComputedStyle(this.sticky.parentElement)
    const parentWidth =
      this.parsePxValue(containerStyles.width) -
      this.parsePxValue(containerStyles.borderLeft) -
      this.parsePxValue(containerStyles.borderRight)

    this.sticky.style.width = `${parentWidth}px`
  }

  /* eslint complexity: [2, 8] */
  /**
   * Determine the state of whether the content should be stuck, anchored to the stopping
   * point of the sticky behavior (e.g. the bottom of the container), or neither.
   * @return {void}
   */
  setContentState() {
    const currentHeight = this.sticky.offsetHeight

    const stickyContainer = this.sticky.parentElement
    const containerTop = stickyContainer.getBoundingClientRect().top
    const containerBottom = stickyContainer.getBoundingClientRect().bottom

    const stickyStart = containerTop
    const stickyStop = containerBottom - currentHeight

    const stickyFlag = stickyStart <= 0 && stickyStop > 0
    const anchorFlag = stickyStop <= 0

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
    const {children, className, ...props} = this.props
    /* eslint-disable no-nested-ternary */
    const stickyClass = this.state.isStuck
      ? 'rev-Sticky--stuck'
      : this.state.isAnchored
        ? 'rev-Sticky--anchored'
        : ''
    const stickyClassName = classNames(className, 'rev-Sticky', stickyClass)

    return (
      <Fragment>
        <div
          className="rev-Sticky-placeholder"
          ref={(placeholder) => {
            this.placeholder = placeholder
          }}
        />
        <div
          {...props}
          className={stickyClassName}
          ref={(sticky) => {
            this.sticky = sticky
          }}
        >
          {children}
        </div>
      </Fragment>
    )
  }
}

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
