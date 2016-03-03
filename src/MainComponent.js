import React, {Component, PropTypes} from 'react'

export default class MainComponent extends Component {

  static propTypes = {
    application: PropTypes.object.isRequired,
    viewName: PropTypes.string.isRequired,
    viewProps: PropTypes.object.isRequired,
    transform: PropTypes.func,
  }

  static childContextTypes = {
    application: PropTypes.object.isRequired,
  }

  getChildContext() {
    const {application} = this.props
    return {application}
  }

  get childClass() {
    return this.props.application.views.get(this.props.viewName)
  }

  render() {
    const instance = React.createElement(this.childClass, this.props.viewProps)
    if(this.props.transform) {
      return this.props.transform(instance)
    }
    return instance
  }
}
