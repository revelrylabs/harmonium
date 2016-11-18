import React, {Component, PropTypes} from 'react'

export default class InputErrors extends Component {

  static propTypes = {
    errors: PropTypes.array,
  };

  static defaultProps = {
    errors: [],
  }

  render() {
    const {errors} = this.props

    if (errors.length === 0) {
      return null
    }

    return <span className="form-error is-visible">{errors.join('. ')}</span>
  }
}
