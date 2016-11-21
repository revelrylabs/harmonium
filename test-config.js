import React from 'react'
import chai, {expect} from 'chai'
import {mount, shallow} from 'enzyme'
import {jsdom} from 'jsdom'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

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
