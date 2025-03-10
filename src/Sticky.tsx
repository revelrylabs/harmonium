import React, {Component, Fragment, RefObject} from 'react'
import classNames from 'classnames'

/**
 * Props for the Sticky component
 */
export interface StickyProps {
  className?: string
  children?: React.ReactNode
  stickToBottom?: boolean
  topAnchor?: string
  bottomAnchor?: string
  topOffset?: number
  bottomOffset?: number
  [key: string]: any
}

/**
 * State for the Sticky component
 */
interface StickyState {
  isStuck: boolean
}

/**
 * A Sticky component that allows its content to stick
 * to the top or bottom of the window.
 */
class Sticky extends Component<StickyProps, StickyState> {
  private sticky: HTMLDivElement | null = null
  private placeholder: HTMLDivElement | null = null

  constructor(props: StickyProps) {
    super(props)
    this.state = {isStuck: false}
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

    if (this.sticky && this.placeholder) {
      this.placeholder.style.width = `${this.sticky.offsetWidth}px`
      this.placeholder.style.height = `${this.sticky.offsetHeight}px`
    }
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
  parsePxValue(value: string): number {
    return parseInt(value.replace('px', ''), 10)
  }

  /**
   * Set the width of the content block.
   * @return {void}
   */
  setWidth = (): void => {
    // use clientWidth here instead of offsetWidth
    // because this value is used to contain the sticky
    // element INSIDE of its parents borders
    if (this.sticky && this.sticky.parentElement) {
      this.sticky.style.width = `${this.sticky.parentElement.clientWidth}px`
    }
  }

  /**
   * Takes one of the anchor prop values and determines
   * whether to anchor to the top or bottom of the element
   * @param {string} anchor the anchor prop value
   * @return {number} the parsed anchor point
   */
  getAnchor(anchor: string): number {
    const anchorParts = /(\w+):?(\w*)/.exec(anchor)
    
    if (!anchorParts) {
      return 0
    }
    
    const anchorEl = document.getElementById(anchorParts[1])
    
    if (!anchorEl) {
      return 0
    }
    
    let anchorPoint: number

    if (anchorParts[2] === 'bottom') {
      anchorPoint = anchorEl.getBoundingClientRect().bottom
    } else if (anchorParts[2] === 'top' || !anchorParts[2]) {
      anchorPoint = anchorEl.getBoundingClientRect().top
    } else {
      anchorPoint = 0
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
  setStickyPoints(): {stickyStart: number, stickyStop: number} {
    let topAnchor: number | undefined
    let bottomAnchor: number | undefined

    if (!this.sticky) {
      return {
        stickyStart: 0,
        stickyStop: 0
      }
    }

    if (this.props.topAnchor) {
      topAnchor = this.getAnchor(this.props.topAnchor)
    }

    if (this.props.bottomAnchor) {
      bottomAnchor = this.getAnchor(this.props.bottomAnchor)
    }

    const currentHeight = this.sticky.offsetHeight

    const stickyContainer = this.sticky.parentElement?.parentElement?.parentElement
    
    if (!stickyContainer) {
      return {
        stickyStart: 0,
        stickyStop: 0
      }
    }
    
    const containerTop = stickyContainer.getBoundingClientRect().top
    const containerBottom = stickyContainer.getBoundingClientRect().bottom

    let topPoint = topAnchor !== undefined ? topAnchor : containerTop
    let bottomPoint = bottomAnchor !== undefined ? bottomAnchor : containerBottom

    if (this.props.topOffset) {
      topPoint += this.props.topOffset
    }

    if (this.props.bottomOffset) {
      bottomPoint += this.props.bottomOffset
    }

    let stickyStart: number
    let stickyStop: number

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

  /**
   * Determine the state of whether the content should be stuck, anchored to the stopping
   * point of the sticky behavior (e.g. the bottom of the container), or neither.
   * @return {void}
   */
  setContentState = (): void => {
    if (!this.sticky || !this.placeholder) {
      return
    }
    
    const stickyPoints = this.setStickyPoints()
    let stickyFlag: boolean
    let anchorFlag: boolean

    if (this.props.stickToBottom) {
      stickyFlag = stickyPoints.stickyStart > 0 && stickyPoints.stickyStop <= 0
      anchorFlag = stickyPoints.stickyStart <= 0
    } else {
      stickyFlag = stickyPoints.stickyStart <= 0 && stickyPoints.stickyStop > 0
      anchorFlag = stickyPoints.stickyStop <= 0
    }

    if (stickyFlag) {
      if (this.props.stickToBottom) {
        this.sticky.style.top = 'auto'
        this.sticky.style.bottom = '0px'
      } else {
        this.sticky.style.top = '0px'
      }

      this.placeholder.style.display = 'block'
      this.setState({isStuck: true})
    } else {
      if (anchorFlag) {
        const container = this.sticky.parentElement?.parentElement?.parentElement
        if (container && this.placeholder.style.height) {
          this.sticky.style.top = `${container.clientHeight -
            this.parsePxValue(this.placeholder.style.height)}px`
        }
      }

      this.placeholder.style.display = 'none'
      this.setState({isStuck: false})
    }
  }

  render() {
    const {children, className, ...props} = this.props
    const stickyClass = this.state.isStuck ? 'rev-Sticky--stuck' : ''
    const stickyClassName = classNames(className, 'rev-Sticky', stickyClass)
    const divProps: any = {...props}

    delete divProps.stickToBottom
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
 * Props for the StickyContainer component
 */
export interface StickyContainerProps {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

/**
 * A StickyContainer component to hold a Sticky element.
 */
class StickyContainer extends Component<StickyContainerProps> {
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

// Define the Sticky type with Container
interface StickyClass extends React.ComponentClass<StickyProps> {
  Container: typeof StickyContainer
}

// Add the Container to Sticky
(Sticky as any).Container = StickyContainer

// Export with type casting
export default Sticky as StickyClass 