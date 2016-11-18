import React, {Component, PropTypes} from 'react'
// import HelpText from './HelpText'

export default class InputHelpText extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    className: PropTypes.string,
  }

  render() {
    const {children, className} = this.props

    if (!children) {
      return null
    }

    return <HelpText className={className}>{children}</HelpText>
  }
}

// TODO: delete once HelpText added here
const HelpText = ({className, children}) => (
  <span className={`HelpText ${className}`}>
    {children}
  </span>
)

HelpText.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  className: PropTypes.string,
}
