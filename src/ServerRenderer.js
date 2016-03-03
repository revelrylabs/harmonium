import ReactDOM from 'react-dom/server'
import _ from 'underscore'

const ESCAPE_LOOKUP = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;',
}
const ESCAPE_REGEX = /[&><"']/g

function escapeForBrowser(text) {
  return text.replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match])
}

function resetUniqueId() {
  let idCounter = 0

  _.uniqueId = function(prefix) {
    const id = `${++idCounter}`

    return prefix ? prefix + id : id
  }
}

export default class ServerRenderer {

  constructor(application) {
    this._application = application
  }

  get application() {
    return this._application
  }

  hasView(viewName) {
    return this.application.views.get(viewName)
  }

  renderView(viewName, viewProps) {
    resetUniqueId()

    const id = this.application.domContainerId

    const props = {viewName, viewProps}
    const json = JSON.stringify(props)
    const escapedJson = escapeForBrowser(json)
    const main = this.application.createMainComponent(viewName, viewProps)

    const content = ReactDOM.renderToString(main)

    return `<div id="${id}" data-props="${escapedJson}">${content}</div>`
  }
}
