import React, {cloneElement, Component, Children} from 'react'
import classNames from 'classnames'

const StickyContent = ({
  children,
  className,
  isStuck,
  isAnchored,
  stickToBottom,
  setRef,
  ...props
}) => {
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
    const contentTop = this.stickyContent.getBoundingClientRect().top
    const contentBottom = this.stickyContent.getBoundingClientRect().bottom

    const containerTop = this.stickyContainer.getBoundingClientRect().top
    const containerBottom = this.stickyContainer.getBoundingClientRect().bottom

    let stickyStart, stickyStop, stickyFlag, anchorFlag

    if (this.props.stickToBottom) {
      stickyStart = this.props.offset
                  ? containerBottom - this.parsePxValue(this.props.offset)
                                    - window.innerHeight
                  : containerBottom - window.innerHeight
      stickyStop = containerTop + this.stickyContent.offsetHeight - window.innerHeight
      stickyFlag = stickyStart >= 0 && stickyStop <= 0
      anchorFlag = stickyStart <= 0
    } else {
      stickyStart = this.props.offset
                              ? containerTop + this.parsePxValue(this.props.offset)
                              : containerTop
      stickyStop = containerBottom - this.stickyContent.offsetHeight
      stickyFlag = stickyStart <= 0  && stickyStop >= 0
      anchorFlag = stickyStop <= 0
    }

    if (stickyFlag) {
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
    } else if (anchorFlag) {
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
      stickToBottom,
      ...props
    } = this.props

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
