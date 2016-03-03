import ReactDOM from 'react-dom'

export class ClientInflator {
  constructor(application) {
    this._application = application
  }

  _application = null
  get application() {
    return this._application
  }

  get container() {
    return document.getElementById(this.application.domContainerId)
  }

  get props() {
    return JSON.parse(this.container.getAttribute('data-props'))
  }

  inflate() {
    const {viewName, viewProps} = this.props
    const main = this.application.createMainComponent(viewName, viewProps)
    return ReactDOM.render(main, this.container)
  }
}

export function inflate(application) {
  return new ClientInflator(application).inflate()
}

export function inflateOnReady(application) {
  document.addEventListener('DOMContentLoaded', () => inflate(application))
}
