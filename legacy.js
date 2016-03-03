console.warn('DEPRECATION WARNING: You are using the legacy layer for revelry_core. This is not recommended, as it pollutes the global scope. Use of this module should be considered merely a stopgap to debug the interesting problems before tackling predictable scoping ones from the old Sprockets build pipeline.')

global.React = require('react')
global._ = require('underscore')
global.Backbone = require('backbone')
global.Revelry = require('./lib/revelry').default
global.Rev = Revelry
global.App = Revelry.App

require('./lib/everything')

module.exports = Revelry
