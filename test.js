require('source-map-support').install()

var React = require('react')
var Revelry = require('./lib/revelry.js').default

var Buttons = require('./lib/ui/buttons')
console.log(Buttons)

require('./lib/ui/buttons/ButtonBar')

console.log(Revelry.hasView('home/index'))

Revelry.appComponent('Home.Index', React.createClass({
  render: function() {
    // return React.DOM.div(null, 'Hello, ' + this.props.name)
    return React.createElement(Buttons.Button, null, 'HELLO')
  }
}))

console.log(Revelry.hasView('home/index'))

console.log(Revelry.viewToString('home/index', JSON.stringify({name: 'joel'})))
