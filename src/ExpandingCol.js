import React, {cloneElement} from 'react'
import PropTypes from 'prop-types'
import {Col} from './grid'
import Button from './Button'

// An expanding column that manages its own state. This is to be used in
// non-Redux applications where the state is not managed by another component
// If you are using Redux, or if a different component controls whether the
// column is open or not, use an ExpandingCol instead
export class ExpandingColStateContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    closer: PropTypes.element,
    expander: PropTypes.element,
  }

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

  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  expandPane = () => {
    this.setState({open: true})
  }

  closePane = () => {
    this.setState({open: false})
  }

  // Feeds open state, closer and opener down to an ExpandingCol. Note that
  // we clone the closer and expander so that we can accept them as props
  // from up the tree but still inject our onClick handlers for open/close
  render() {
    const {children, closer, expander, ...remainingProps} = this.props

    return (
      <ExpandingCol
        open={this.state.open}
        closer={cloneElement(closer, {onClick: this.closePane})}
        expander={cloneElement(expander, {onClick: this.expandPane})}
        {...remainingProps}
      >
        {children}
      </ExpandingCol>
    )
  }
}

export default class ExpandingCol extends React.Component {
  static defaultProps = {
    className: 'rev-ExpandingCol--expanderless',
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    closer: PropTypes.node,
    expander: PropTypes.node,
    open: PropTypes.bool,
  }

  render() {
    const {children, closer, expander, open, className, ...remainingProps} = this.props
    const openClass = open ? 'is-open' : 'is-closed'

    return (
      <Col {...remainingProps} className={`rev-ExpandingCol-pane ${className} ${openClass}`}>
        {open ? closer : expander}
        <div className="rev-ExpandingCol-pane-content">{children}</div>
      </Col>
    )
  }
}

ExpandingCol.ExpandingCol = ExpandingCol
ExpandingCol.Stateful = ExpandingColStateContainer
ExpandingCol.ExpandingColStateContainer = ExpandingColStateContainer
exports.ExpandingCol = ExpandingCol
exports.Stateful = ExpandingColStateContainer
exports.ExpandingColStateContainer = ExpandingColStateContainer
