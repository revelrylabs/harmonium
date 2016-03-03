import React from 'react'
import Revelry from '../../revelry'

Revelry.registerComponent('ModelProgressIndicator', class ModelProgressIndicator extends React.Component {

  static get Status() {
    return this._Status = this._Status || {
      STARTED: 0,
      REQUESTED: 1,
      SYNCED: 2,
      ERRORED: 3,
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      status: this.constructor.Status.STARTED,
    }

    this.onRequest = this.onRequest.bind(this)
    this.onSync = this.onSync.bind(this)
    this.onError = this.onError.bind(this)
  }

  render() {
    return (
      <span className={this.progressClasses()}>
        {this.childForCurrentStatus()}
      </span>
    )
  }

  childForCurrentStatus() {
    const statusNames = ['started', 'requested', 'synced', 'errored']

    for(let i = 0; i < statusNames.length; i++) {
      const currentStatus = this.childForStatus(statusNames[i])

      if(currentStatus) {
        return currentStatus
      }
    }
  }

  childForStatus(statusName) {
    if(this.props[statusName] && this.state.status === this.constructor.Status[statusName.toUpperCase()]) {
      return this.props[statusName]
    }
  }

  componentDidMount() {
    this.props.model.on('request', this.onRequest)
    this.props.model.on('sync', this.onSync)
    this.props.model.on('error', this.onError)
  }

  componentWillUnmount() {
    this.props.model.off('request', this.onRequest)
    this.props.model.off('sync', this.onSync)
    this.props.model.off('error', this.onError)
  }

  onRequest() {
    this.setState({
      status: this.constructor.Status.REQUESTED,
    })
  }

  onSync() {
    this.setState({
      status: this.constructor.Status.SYNCED,
    })
  }

  onError() {
    this.setState({
      status: this.constructor.Status.ERRORED,
    })
  }

  progressClasses() {
    return this.suitSet('ModelProgressIndicator', {
      started: this.state.status === this.constructor.Status.STARTED,
      requested: this.state.status === this.constructor.Status.REQUESTED,
      synced: this.state.status === this.constructor.Status.SYNCED,
      errored: this.state.status === this.constructor.Status.ERRORED,
    })
  }
})
