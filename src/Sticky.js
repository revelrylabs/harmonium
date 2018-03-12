import React, {cloneElement, Component, Children} from 'react'
import classNames from 'classnames'

const StickyContent = ({
  children,
  className,
  isStuck,
  ...props
}) => {
  const stickyClass = isStuck ? 'rev-Sticky-content--stuck' : ''
  const itemClassName = classNames(className, 'rev-Sticky-content', stickyClass)

  return (
    <div className={itemClassName} {...props}>
      {children}
    </div>
  )
}

const Sticky = ({
  children,
  className,
  contentClassName,
  setContainerRef,
  isStuck,
  ...props
}) => {
  const containerClassName = classNames(className, 'rev-Sticky')

  return (
    <div ref={setContainerRef} className={containerClassName} {...props}>
      <StickyContent isStuck={isStuck} className={contentClassName}>
        {children}
      </StickyContent>
    </div>
  )
}

class StatefulSticky extends Component {
  constructor(props) {
    super(props)
    this.state = {
      stick: false
    }
  }

  setContainerRef(container) {
    this.stickyContainer = container;
  }

  shouldContentStick() {
    const stickyContainer = this.stickyContainer;
    const containerTop = stickyContainer.getBoundingClientRect().top
    const containerBottom = containerTop + stickyContainer.scrollHeight
    this.setState({
      stick: containerTop <= 0 && 0 <= containerBottom
    })
  }

  componentDidMount() {
    window.addEventListener('scroll', this.shouldContentStick.bind(this))
  }

  render() {
    const {children, className, ...props} = this.props
    return (
      <Sticky
        setContainerRef={this.setContainerRef.bind(this)}
        isStuck={this.state.stick}
        {...props}
      >
        {children}
      </Sticky>
    )
  }
}

Sticky.Stateful = StatefulSticky

export default Sticky
