import React from 'react'
import Backbone from 'backbone'
import Revelry from '../revelry'

const App = Revelry.App

Revelry.registerComponent('Router', class Router extends React.Component {

  // Convert 'defaults' from Rails route, which looks like
  //   { controller: 'foo', action: 'new' } into a path as array like this:
  //   ['foo', 'new']
  static routeInfoParts(info) {
    const parts = info.controller.split('/')

    parts.push(info.action)
    return parts
  }

  // Take the route path from routeInfoParts and turn it into a slash-delimited
  // string like this 'foo/new'
  static routeFunctionName(info) {
    return Router.routeInfoParts(info).join('/')
  }

  // Create the config hash which we pass to the backbone router, which looks
  // like this:
  //   routes: {
  //     "profiles(.:format)": "profiles/show",
  //     "profiles/:id(.:format)": "profiles/show",
  //     "foo(.:format)": "foo/show"
  //   }
  static routerConfig() {
    const config = {
      routes: {},
    }

    // for(let i = 0; i < global.REV_RAILS_ROUTES.length; i++) {
    //   const [key, value] = global.REV_RAILS_ROUTES[i]
    //
    //   if(value.controller) {
    //     config.routes[key] = config.routes[key] || Router.routeFunctionName(value)
    //   }
    // }

    return config
  }

  static get mixins() {
    return [Backbone.Events]
  }

  constructor(props) {
    super(props)

    this.state = {
      bbRouter: new Backbone.Router(this.constructor.routerConfig()),
      // Seed the path and options (which we pass down to child components) from
      // the initial props we received. Updates will come from the AJAX prop fetch.
      path: this.props.path,
      options: this.props.options,
    }
  }

  componentDidMount() {
    if(App.router && Revelry.env === 'development') {
      console.error('You attempted to mount two routers at the same time.' +
                    'Only one router may be mounted at a time.')
    } else {
      App.router = this
    }
    // Start history to pay attention to pushState and hashChange events
    // Only start history client side. It uses APIs which are not available on
    // the server-- plus we don't need to catch route changes on during the
    // server-side render!
    if(Revelry.isClientContext() && !Backbone.History.started) {
      Backbone.history.start({
        pushState: true,
      })
    }
    // Listen for any route matches and handle
    this.listenTo(this.state.bbRouter, 'route', this.routeChangeHandler.bind(this))
  }

  componentWillUnmount() {
    if(App.router === this) {
      App.router = null
    }
    this.stopListening()
  }

  locationURL() {
    const [baseUrl, query] = Backbone.history.fragment.split('?')
    const originalQueryString = query && query.length ? `${query}&` : ''

    return `/${baseUrl}?${originalQueryString}${encodeURIComponent('__props')}`
  }

  // Fall back to full page navigation request
  onPropsFetchFailure() {
    window.location = this.locationURL()
  }

  // Make a handler for successful props fetching of a given templatePath
  // Close over the templatePath so when Backbone calls the callback we have it
  makePropsFetchSuccessHandler(templatePath) {
    return (data, textStatus, _xhr) => {
      try {
        this.setState({
          path: templatePath,
          options: JSON.parse(data),
        })
        window.scrollTo(0, 0)
      } catch(_err) {
        this.onPropsFetchFailure()
      }
    }
  }

  routeChangeHandler(templatePath, _params) {
    // Request the same props from the server that we would get for a server-side
    // render. If we get them back successfully, swap the page. If we fail, fall
    // back to server side render.
    Backbone.ajax({
      url: this.locationURL(),
      beforeSend: (xhr) => {
        xhr.setRequestHeader('Content-Type', 'text/reactprops')
        xhr.setRequestHeader('Accept', 'text/reactprops')
      },
      success: this.makePropsFetchSuccessHandler(templatePath),
      error: this.onPropsFetchFailure.bind(this),
    })

    return true
  }

  navigateTo(url, options) {
    if(options && options.templatePath) {
      Backbone.history.navigate(url)
      return this.routeChangeHandler(options.templatePath)
    } else {
      return Backbone.history.navigate(url, {
        trigger: true,
      })
    }
  }

  render() {
    const children = React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, {
        path: this.state.path,
        options: this.state.options,
      })
    })

    return (
      <div className="RevRouter">
        {children}
      </div>
    )
  }
})
