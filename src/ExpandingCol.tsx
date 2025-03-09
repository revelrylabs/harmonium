import React, { cloneElement, ReactElement, ReactNode } from 'react'
import { Col } from './grid'
import Button from './Button'

export interface ExpandingColProps {
  children?: ReactNode
  className?: string
  closer?: ReactElement
  expander?: ReactElement
  open?: boolean
  [key: string]: any
}

interface ExpandingColStateContainerState {
  open: boolean
}

// Create the ExpandingCol class first as a forward declaration
class ExpandingCol extends React.Component<ExpandingColProps> {
  static defaultProps = {
    className: 'rev-ExpandingCol--expanderless',
  }

  render() {
    const {
      children,
      closer,
      expander,
      open,
      className,
      ...remainingProps
    } = this.props
    const openClass = open ? 'is-open' : 'is-closed'

    return (
      <Col
        {...remainingProps}
        className={`rev-ExpandingCol-pane ${className || ''} ${openClass}`}
      >
        {open ? closer : expander}
        <div className="rev-ExpandingCol-pane-content">{children}</div>
      </Col>
    )
  }
}

// An expanding column that manages its own state. This is to be used in
// non-Redux applications where the state is not managed by another component
// If you are using Redux, or if a different component controls whether the
// column is open or not, use an ExpandingCol instead
export class ExpandingColStateContainer extends React.Component<ExpandingColProps, ExpandingColStateContainerState> {
  static defaultProps = {
    // intentionally blank to override the 'expanderless' class of the stateless
    // version of the component
    className: '',
    closer: (
      <Button className="rev-ExpandingCol-closer rev-Button rev-Button--small rev-Button--secondary">
        -
      </Button>
    ),
    expander: (
      <Button className="rev-ExpandingCol-expander rev-Button rev-Button--small rev-Button--secondary">
        +
      </Button>
    ),
  }

  constructor(props: ExpandingColProps) {
    super(props)
    this.state = {
      open: false,
    }
  }

  expandPane = (): void => {
    this.setState({ open: true })
  }

  closePane = (): void => {
    this.setState({ open: false })
  }

  // Feeds open state, closer and opener down to an ExpandingCol. Note that
  // we clone the closer and expander so that we can accept them as props
  // from up the tree but still inject our onClick handlers for open/close
  render() {
    const { children, closer, expander, ...remainingProps } = this.props

    return (
      <ExpandingCol
        open={this.state.open}
        closer={closer && cloneElement(closer, { onClick: this.closePane })}
        expander={expander && cloneElement(expander, { onClick: this.expandPane })}
        {...remainingProps}
      >
        {children}
      </ExpandingCol>
    )
  }
}

// Add static properties
(ExpandingCol as any).ExpandingCol = ExpandingCol
;(ExpandingCol as any).Stateful = ExpandingColStateContainer
;(ExpandingCol as any).ExpandingColStateContainer = ExpandingColStateContainer

export default ExpandingCol 