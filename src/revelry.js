import _ from 'underscore'
import UnderscoreString from 'underscore.string'
import React from 'react'
import {renderToString} from 'react-dom/server'
import CoreMixin from './mixins/core'
import mixSpecIntoComponent from './mixSpecIntoComponent'

_.str = UnderscoreString

const ESCAPE_LOOKUP = {
  '&': '&amp;',
  '>': '&gt;',
  '<': '&lt;',
  '"': '&quot;',
  '\'': '&#x27;',
}
const ESCAPE_REGEX = /[&><'']/g

const App = {
  Mixins: {},
  Components: {},
  Examples: {},
}

class Revelry {

  static Mixins = {
    Core: CoreMixin,
  }
  static Components = {}
  static Examples = {}
  static App = App

  static pathToObject(container) {
    return function(path) {
      const parts = path.split('/')

      let object = container

      for(let i = 0; i < parts.length; i++) {
        const key = parts[i]

        object = object[key]
        if(object === null || typeof object === 'undefined') {
          break
        }
      }

      return object
    }
  }

  static isServerContext() {
    return typeof window === 'undefined'
  }

  static isClientContext() {
    return !Revelry.isServerContext()
  }

  static appObject(name, object) {
    return Revelry.registerObject(`App.${name}`, object)
  }

  static registerObject(name, object) {
    const parts = name.split('.')
    let container = Revelry

    _(parts).each((part, i) => {

      if(i === parts.length - 1) {
        if(container[part] !== null && typeof container[part] !== 'undefined' && name !== 'App.Components.Main') {
          console.warn(`Object previously defined: ${name}`)
        }
        container[part] = object
      } else {
        container[part] = container[part] || {}
        container = container[part]
      }
    })

    return object
  }

  static appComponent(name, object) {
    name = `App.Components.${name}`
    return Revelry.registerObject(name, Revelry.createReactClass(name, object))
  }

  static registerComponent(name, object) {
    name = `Components.${name}`
    return Revelry.registerObject(name, Revelry.createReactClass(`Revelry.${name}`, object))
  }

  static createReactClass(displayName, object) {
    object.displayName = displayName

    // Initialize mixins to an empty array if it doesn't exist yet
    if(!object.mixins) {
      object.mixins = []
    } else if(!(object.mixins instanceof Array)) {
      throw new Error(`${displayName}'s mixins property must be an array.`)
    }

    // Check for inclusion of missing mixins
    object.mixins.forEach((mixin, index) => {
      if(mixin === null || typeof mixin === 'undefined') {
        console.warn(`${displayName} attempted to include a missing mixin at index ${index}.`)
      }
    })

    // Add Revelry Core mixin
    object.mixins.unshift(Revelry.Mixins.Core)

    if(typeof object === 'function') {
      object.mixins.forEach((mixin) => mixSpecIntoComponent(object, mixin))
    }

    if(typeof object === 'function') { // ES6 or Coffeescript class, OK as-is
      return object
    }
    // Old style react class - pass to createClass
    return React.createClass(object)
  }

  static appMixin(name, object) {
    if(object === null || typeof object === 'undefined') {
      throw new Error(`Missing mixin \`${name}\``)
    }
    return Revelry.registerObject(`App.Mixins.${name}`, object)
  }

  static registerMixin(name, object) {
    if(object === null || typeof object === 'undefined') {
      throw new Error(`Missing mixin \`${name}\``)
    }
    return Revelry.registerObject(`Mixins.${name}`, object)
  }

  static registerExample(name, object) {
    name = `Examples.${name}`
    return Revelry.registerObject(name, Revelry.createReactClass(`Revelry.${name}`, object))
  }

  static appExample(name, object) {
    name = `App.Examples.${name}`
    return Revelry.registerObject(name, Revelry.createReactClass(name, object))
  }

  static registerModel(name, object) {
    return Revelry.registerObject(`Models.${name}`, object)
  }

  static appModel(name, object) {
    return Revelry.registerObject(`App.Models.${name}`, object)
  }

  static pullInto(context) {
    console.warn('`Revelry.pullInto` is deprecated.')
    return (...names) => {
      names.forEach((name) => context[name] = Revelry.Components[name])
    }
  }

  static _escaper(match) {
    return ESCAPE_LOOKUP[match]
  }

  static escapeTextForBrowser(text) {
    return (`${text}`).replace(ESCAPE_REGEX, Revelry._escaper)
  }

  static _resetUniqueId() {
    let idCounter = 0

    _.uniqueId = function(prefix) {
      const id = `${++idCounter}`

      return prefix ? prefix + id : id
    }
  }

  static hasView(path) {
    console.log('hasView', path, Revelry.App.Components)
    return Revelry.Components.Main.hasView(path)
  }

  static viewToString(path, options) {
    console.log('viewToString', path, Revelry.App.Components)
    Revelry._resetUniqueId()

    const {Main} = Revelry.Components

    const props = {
      path,
      options,
    }

    const json = Revelry.escapeTextForBrowser(JSON.stringify(props))

    const tag = (inner) => `<div data-react-class='App.Components.Main' data-react-props='${json}'>${inner}</div>`

    const component = React.createElement(Main, props)

    // 2 checks: One is for standard Rails apps and one for jsonapi-resources.
    if(props.options.disable_prerender || (props.options.meta && props.options.meta['disable-prerender'])) {
      return tag
    }

    try {
      return tag(renderToString(component))
    } catch(e) {
      return `<pre><code>${path}</code></pre>` +
             `<pre><code>${Revelry.escapeTextForBrowser(e.stack)}</code></pre>` +
             tag('') +
             `<pre><code>${json}</code></pre>`
    }
  }

  static initExecjsRails() {
    global.execjs_rails_has_view = Revelry.hasView.bind(Revelry)
    global.execjs_rails_handler = Revelry.viewToString.bind(Revelry)
  }
}

if(Revelry.isClientContext()) {
  window.global = window
}




Revelry.registerComponent('Main', class Main extends React.Component {

  /* CLASS METHODS */

  static pathToComponentClass(path) {
    const parts = path.split('/')

    let klass = Revelry.App.Components
    // console.log(Revelry.App.Components)

    for(let i = 0; i < parts.length; i++) {
      const key = parts[i]

      klass = klass[key]
      if(klass === null || typeof klass === 'undefined') {
        break
      }
    }

    return klass
  }

  static hasView(path) {
    const klass = Main.pathToComponentClass(path)
    const found = klass !== null && typeof klass !== 'undefined'

    return found
  }

  static createElement(klass, props, children) {
    if(React.createElement !== null && typeof React.createElement !== 'undefined') {
      return React.createElement(klass, props, children)
    }
    return (
      <klass {...props}>
        {children}
      </klass>
    )
  }

  static get propTypes() {
    return {
      path: React.PropTypes.string.isRequired,
      options: React.PropTypes.object,
    }
  }

  /* INSTANCE METHODS */

  getChildComponentClassName() {
    return this.constructor.pathToComponentClassName(this.props.path)
  }

  getChildComponentClass() {
    return this.constructor.pathToComponentClass(this.props.path)
  }

  // Some things are just easier when semi-global.
  // (Think CSRF token.)
  componentWillMount() {
    Revelry.App.props = this.props.options
  }

  componentWillUpdate(nextProps, nextState) {
    Revelry.App.props = this.nextProps.options
  }

  render() {
    const klass = this.getChildComponentClass()

    if(klass === null || typeof klass === 'undefined') {
      return <div>{`Couldn't locate component \`${this.getChildComponentClassName()}\``}</div>
    }
    return this.constructor.createElement(klass, this.props.options)
  }
})


// Application code can overwrite this to do whatever extra stuff you want.
Revelry.appComponent('Main', class Main extends React.Component {
  render() {
    console.warn('Revelry application does not define a `Main` component. Falling back to default implementation.')
    return <Revelry.Components.Main {...this.props} />
  }
})


export default Revelry
