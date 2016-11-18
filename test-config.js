import React from 'react'
import chai, {expect} from 'chai'
import {mount, shallow} from 'enzyme'
import chaiEnzyme from 'chai-enzyme'

chai.use(chaiEnzyme())

global.expect = expect
global.mount = mount
global.shallow = shallow
global.React = React
