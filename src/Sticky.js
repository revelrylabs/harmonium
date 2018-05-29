import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

/* eslint complexity: [2, 4] */
/**
 * A component encapsulating the children of the Sticky container to
 * keep track of the current state of sticky behavior. 
 */
const StickyContent = ({
  children,
  className,
  isStuck,
  isAnchored,
  stickToBottom,
  setRef,
  ...props
}) => {
  /* eslint-disable no-nested-ternary */
  const stickyClass = isStuck
    ? stickToBottom
      ? 'rev-Sticky-content--stuck-bottom'
      : 'rev-Sticky-content--stuck-top'
    : isAnchored
      ? 'rev-Sticky-content--anchored'
      : ''
  const itemClassName = classNames(className, 'rev-Sticky-content', stickyClass)

  return (
    <div ref={setRef} className={itemClassName} {...props}>
      {children}
    </div>
  )
}

StickyContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  isStuck: PropTypes.bool,
  isAnchored: PropTypes.bool,
  stickToBottom: PropTypes.bool,
  setRef: PropTypes.func,
}

/**
 * A stateless Sticky container commponent that allows a user to plug-and-play
 * custom defined behavior if desired.
 */
class Sticky extends Component {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    contentClassName: PropTypes.string,
    isStuck: PropTypes.bool,
    isAnchored: PropTypes.bool,
    stickToBottom: PropTypes.bool,
    setRef: PropTypes.func,
    setContentRef: PropTypes.func,
  }

  render() {
    const {
      children,
      className,
      contentClassName,
      setRef,
      setContentRef,
      isStuck,
      isAnchored,
      stickToBottom,
      ...props
    } = this.props

    const containerClassName = classNames(className, 'rev-Sticky')

    return (
      <div ref={setRef} className={containerClassName} {...props}>
        <StickyContent
          className={contentClassName}
          isAnchored={isAnchored}
          isStuck={isStuck}
          stickToBottom={stickToBottom}
          setRef={setContentRef}
        >
          {children}
        </StickyContent>
      </div>
    )
  }
}

/**
 * A Sticky container component that allows its children to stick to the top of
 * the viewport as the user scrolls down the document. Passing in the stickToBottom 
 * prop will reverse the orientation, sticking the container's children to the 
 * bottom of the viewport as the user scrolls up the document.
 * 
 * The component also supports an offset prop. This prop is currently meant to be a 
 * an amount in px, e.g. offset="50px". In the default orientation, the offset will 
 * prevent the sticking from occurring until the user scrolls past the offset amount 
 * down from the top of the container. With the stickToBottom prop, the offset will 
 * prevent the sticking from occurring until the user scrolls past the offset amount 
 * up from the bottom of the container. This prop may eventually be reworked to
 * use the positions of elements for explicitly customizable starting/stopping points
 * or perhaps allow both of these forms of offset.
 */
class StatefulSticky extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    onBackgroundClick: PropTypes.func,
    className: PropTypes.string,
    children: PropTypes.node,
    stickToBottom: PropTypes.bool,
    offset: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.state = {
      isStuck: false,
      isAnchored: false,
    }
  }

  /**
   * Used to bind a ref to the container part of the sticky container system.
   */
  setContainerRef(container) {
    this.stickyContainer = container
  }

  /**
   * Used to bind a ref to the content, i.e. the children, part of the sticky container system.
   */
  setContentRef(content) {
    this.stickyContent = content
  }

  /**
   * Set the function that determines state as the window scroll event when
   * the component mounts.
   */
  componentDidMount() {
    window.addEventListener('scroll', this.setContentState.bind(this))
  }

  /* eslint complexity: [2, 8] */
  /**
   * Determine the state of whether the content should be stuck, anchored to the stopping 
   * point of the sticky behavior (e.g. the bottom of the container), or neither.
   */
  setContentState() {
    /* eslint-disable no-unused-vars */
    const contentTop = this.stickyContent.getBoundingClientRect().top
    const contentBottom = this.stickyContent.getBoundingClientRect().bottom

    const containerTop = this.stickyContainer.getBoundingClientRect().top
    const containerBottom = this.stickyContainer.getBoundingClientRect().bottom

    let stickyStart, stickyStop, stickyFlag, anchorFlag

    if (this.props.stickToBottom) {
      stickyStart = this.props.offset
        ? containerBottom -
          this.parsePxValue(this.props.offset) -
          window.innerHeight
        : containerBottom - window.innerHeight
      stickyStop =
        containerTop + this.stickyContent.offsetHeight - window.innerHeight
      stickyFlag = stickyStart >= 0 && stickyStop <= 0
      anchorFlag = stickyStart <= 0
    } else {
      stickyStart = this.props.offset
        ? containerTop + this.parsePxValue(this.props.offset)
        : containerTop
      stickyStop = containerBottom - this.stickyContent.offsetHeight
      stickyFlag = stickyStart <= 0 && stickyStop >= 0
      anchorFlag = stickyStop <= 0
    }

    if (stickyFlag) {
      const sideBorders =
        this.parsePxValue(this.stickyContainer.style.borderRightWidth) +
        this.parsePxValue(this.stickyContainer.style.borderLeftWidth)
      
      // this is to force the fixed div holding the sticky content
      // to not break out of the sticky container since fixed
      // positioning breaks elements out of document flow
      this.stickyContent.style.width = `${(
        this.stickyContainer.offsetWidth - sideBorders
      ).toString()}px`

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
      this.setState({
        isStuck: false,
        isAnchored: false,
      })
    }
  }

  /**
   * Convert a string value of a quantity in px to an integer of the numeric 
   * value of the quantity. For example, passing in the string '18px' will return 
   * the integer 18.
   * @param {string} value the value in px to convert
   */
  parsePxValue(value) {
    return parseInt(value.replace('px', ''), 10)
  }

  render() {
    const {children, className, offset, stickToBottom, ...props} = this.props

    return (
      <Sticky
        setRef={this.setContainerRef.bind(this)}
        setContentRef={this.setContentRef.bind(this)}
        isStuck={this.state.isStuck}
        isAnchored={this.state.isAnchored}
        stickToBottom={stickToBottom}
        {...props}
      >
        {children}
      </Sticky>
    )
  }
}

Sticky.Stateful = StatefulSticky

export default Sticky
