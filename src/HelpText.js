import React, {PropTypes} from 'react'

const HelpText = ({className, children}) => (
  <span className={className}>
    {children}
  </span>
)

HelpText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
}

export default HelpText
