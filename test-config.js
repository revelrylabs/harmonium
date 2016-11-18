import React from 'react'
import {expect} from 'chai'
import {mount, shallow} from 'enzyme'
import {jsdom} from 'jsdom'

global.document = jsdom('')
global.window = document.defaultView
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property]
  }
})

global.navigator = {
  userAgent: 'node.js'
}

global.expect = expect
global.mount = mount
global.shallow = shallow
global.React = React
