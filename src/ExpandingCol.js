import React, {cloneElement, PropTypes} from 'react'
import {Row, Col} from './grid'
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
    closer: <Button className="rev-ExpandingCol-closer secondary" icon="minus" />,
    expander: <Button className="rev-ExpandingCol-expander secondary" icon="plus" />,
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
    let {children, closer, expander, ...remainingProps} = this.props
    return <ExpandingCol
        open={this.state.open}
        closer={cloneElement(closer, {onClick: this.closePane})}
        expander={cloneElement(expander, {onClick: this.expandPane})}
        {...remainingProps}
      >
        {children}
      </ExpandingCol>
  }
}

export class ExpandingCol extends React.Component {
  static defaultProps = {
    className: 'rev-ExpandingCol--expanderless',
  }

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    closer: PropTypes.node,
    open: PropTypes.bool,
  }

  render() {
    let {children, closer, expander, open, className, ...remainingProps} = this.props
    let openClass = open ? 'is-open' : 'is-closed'

    return (
      <Col
        {...remainingProps}
        className={`rev-ExpandingCol-pane ${className} ${openClass}`}
      >
        {open ? closer : expander}
        <div className="rev-ExpandingCol-pane-content">
          {children}
        </div>
      </Col>
    )
  }
}
