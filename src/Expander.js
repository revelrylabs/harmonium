import React from 'react'
import PropTypes from 'prop-types'

const Expander = (props) => {
  return (
    <div
      className={`rev-Drawer ${props.open ? 'rev-Drawer--open' : ''} ${
        props.className
      }`}
    >
      {props.closer}
      <div className="rev-Drawer-contents">{props.children}</div>
    </div>
  )
}

Expander.defaultProps = {
  className: '',
}

Expander.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  closer: PropTypes.node,
  open: PropTypes.bool,
}

export default Expander
