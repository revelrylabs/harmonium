import React, {Component, createElement} from 'react'

const modules = []
function add(name, mod) {
  modules.push({name, mod})
}

// BEGIN ADDING EXAMPLES

import * as Badge from './Badge.example'
add('Badge', Badge)

import * as Label from './Label.example'
add('Label', Label)

import * as Callout from './Callout.example'
add('Callout', Callout)

import * as CardLayout from './CardLayout.example'
add('CardLayout', CardLayout)

import * as Card from './Card.example'
add('Card', Card)

import * as grid from './grid.example'
add('grid', grid)

import * as Input from './Input.example'
add('Input', Input)

import * as InputGroup from './InputGroup.example'
add('InputGroup', InputGroup)

import * as Select from './Select.example'
add('Select', Select)

import * as Checkbox from './Checkbox.example'
add('Checkbox', Checkbox)

import * as Radio from './Radio.example'
add('Radio', Radio)

import * as Button from './Button.example'
add('Button', Button)

import * as ButtonGroup from './ButtonGroup.example'
add('ButtonGroup', ButtonGroup)


import * as Icon from './Icon.example'
add('Icon', Icon)

import * as Menu from './Menu.example'
add('Menu', Menu)

import * as Lipsum from './Lipsum.example'
add('Lipsum', Lipsum)

import * as Pagination from './Pagination.example'
add('Pagination', Pagination)

import * as TopBar from './TopBar.example'
add('TopBar', TopBar)

import * as BrowserSupportWarning from './BrowserSupportWarning.example'
add('BrowserSupportWarning', BrowserSupportWarning)

import * as Textarea from './Textarea.example'
add('Textarea', Textarea)

// FINISH ADDING EXAMPLES

class Example extends Component {
  render() {
    const {name, component} = this.props
    return (
      <div>
        <h4>{name}</h4>
        {createElement(component, {})}
        <hr />
      </div>
    )
  }
}

class ModuleExamples extends Component {
  render() {
    const {name, mod} = this.props
    const examples = Object.keys(mod).map((key) => (
      <Example key={key} name={key} component={mod[key]} />
    ))
    return (
      <div>
        <h2>{name}</h2>
        {examples}
      </div>
    )
  }
}

export default class KitchenSink extends Component {
  render() {
    const moduleSections = modules.map(({name, mod}) => (
      <ModuleExamples key={name} name={name} mod={mod} />
    ))
    return (
      <div>
        {moduleSections}
      </div>
    )
  }
}
