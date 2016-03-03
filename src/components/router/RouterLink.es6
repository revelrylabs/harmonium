import React from 'react'
import Backbone from 'backbone'
import Revelry from '../revelry'

const App = Revelry.App

// Wraps a link with the logic necessary to trigger a navigate event on our
// router. If a route is not available on any router, fall back to normal link
// behavior.
Revelry.registerComponent('RouterLink', class RouterLink extends React.Component {
  static get propTypes() {
    return {
      children: React.PropTypes.node,
      href: React.PropTypes.string,
      templatePath: React.PropTypes.string,
    }
  }

  render() {
    return <a onClick={this.onClick.bind(this)} {...this.props}>{this.props.children}</a>
  }

  navigationOptions() {
    return _(this.props).pick('templatePath')
  }

  // Check for route match on any router and then trigger navigation if it is
  // supported. If it is not, we'll have normal link click behavior.
  onClick(e) {
    // Any router matches
    if(this.hasMatch()) {
      e.preventDefault()
      // Save the current URL on the history stack, don't trigger callbacks
      // This means our back button can take us back to this page after we swap
      Backbone.history.navigate(Backbone.history.fragment, {trigger: false})
      // Finally actually trigger the navigation & component swap
      App.router.navigateTo(this.props.href, this.navigationOptions())
    }

    return true
  }

  // Backbone routers don't behave well with a slash at the begining of a route
  // and also don't handle matching well when a URL starts with a slash. But we
  // want absolute paths in URLs so the fallback behavior will be right. Also, the
  // call to `Backbone.history.navigate` wants the slash? Trim it for matching
  // only.
  bbNormalHref() {
    return this.props.href[0] === '/' ? this.props.href.slice(1) : this.props.href
  }

  hasMatch() {
    return this.props.href !== null && typeof this.props.href !== 'undefined' && _(Backbone.history.handlers).any((handler) => {
      return handler.route.test(this.bbNormalHref())
    })
  }
})
