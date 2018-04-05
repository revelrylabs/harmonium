import React, {cloneElement, Component, Children} from 'react'
import classNames from 'classnames'

const StickyContent = ({
  children,
  className,
  isStuck,
  isAnchored,
  setRef,
  ...props
}) => {
  const stickyClass = isStuck ? 'rev-Sticky-content--stuck'
                              : isAnchored ? 'rev-Sticky-content--anchored' : ''
  const itemClassName = classNames(className, 'rev-Sticky-content', stickyClass)

  return (
    <div ref={setRef} className={itemClassName} {...props}>
      {children}
    </div>
  )
}

class Sticky extends Component {
  render() {
    const {
      children,
      className,
      contentClassName,
      setRef,
      setContentRef,
      isStuck,
      isAnchored,
      ...props
    } = this.props

    const containerClassName = classNames(className, 'rev-Sticky')

    return (
      <div ref={setRef} className={containerClassName} {...props}>
        <StickyContent
          className={contentClassName}
          isAnchored={isAnchored}
          isStuck={isStuck}
          setRef={setContentRef}
        >
          {children}
        </StickyContent>
      </div>
    )
  }
}

class StatefulSticky extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStuck: false,
      isAnchored: false
    }
  }

  setContainerRef(container) {
    this.stickyContainer = container
  }

  setContentRef(content) {
    this.stickyContent = content
  }

  setContentState() {
    const stickyContent = this.stickyContent
    const contentTop = stickyContent.getBoundingClientRect().top
    const contentBottom = stickyContent.getBoundingClientRect().bottom

    const stickyContainer = this.stickyContainer
    const containerTop = stickyContainer.getBoundingClientRect().top
    const containerBottom = stickyContainer.getBoundingClientRect().bottom

    const stickyStartPoint = this.props.offset ? containerTop + this.parsePxValue(this.props.offset)
                                               : containerTop
    const stickyStopPoint = containerBottom - stickyContent.offsetHeight

    if (stickyStartPoint <= 0 && stickyStopPoint > 0) {
      const sideBorders = this.parsePxValue(this.stickyContainer.style.borderRightWidth)
                        + this.parsePxValue(this.stickyContainer.style.borderLeftWidth)

      // this is to force the fixed div holding the sticky content
      // to not break out of the sticky container since fixed
      // positioning breaks elements out of document flow
      this.stickyContent.style.width = (this.stickyContainer.offsetWidth - sideBorders).toString() + 'px'

      this.setState({
        isStuck: true,
        isAnchored: false
      })
    } else if (stickyStopPoint <= 0) {
      this.setState({
        isStuck: false,
        isAnchored: true
      })
    } else {
      this.setState({
        isStuck: false,
        isAnchored: false
      })
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.setContentState.bind(this))
  }

  parsePxValue(value) {
    return parseInt(value.replace('px', ''))
  }

  render() {
    const {
      children,
      className,
      offset,
      ...props
    } = this.props

    return (
      <Sticky
        setRef={this.setContainerRef.bind(this)}
        setContentRef={this.setContentRef.bind(this)}
        isStuck={this.state.isStuck}
        isAnchored={this.state.isAnchored}
        {...props}
      >
        {children}
      </Sticky>
    )
  }
}

Sticky.Stateful = StatefulSticky

export default Sticky
