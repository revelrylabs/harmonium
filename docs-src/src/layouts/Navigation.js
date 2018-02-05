import React from 'react'
import Link from 'gatsby-link'
import Menu from 'possum/lib/Menu'
import Card from 'possum/lib/Card'
import {Drawer} from 'possum/lib/Drawer'

export default function Navigation() {
  return (
    <Drawer
      expanderChildren="+"
      closerChildren="+"
      className="rev-Drawer--fixed DocsSiteNav"
    >
      <nav>
        <Link className="rev-Brand Show--mediumUp" to="/"><h1>Possum</h1>
          <small>Version 3.1.1</small>
        </Link>
        <Menu vertical>
          <Menu.Item text><h5>Grid</h5></Menu.Item>
          <Menu.Item><Link to="/components/grid/">Rows &amp; Columns</Link></Menu.Item>
          <Menu.Item><Link to="/components/ExpandingCol/">Expanding Columns</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Forms</h5></Menu.Item>
          <Menu.Item><Link to="/components/Button/">Buttons</Link></Menu.Item>
          <Menu.Item><Link to="/components/Checkbox/">Checkboxes</Link></Menu.Item>
          <Menu.Item><Link to="/components/Datepicker/">Date Picker</Link></Menu.Item>
          <Menu.Item><Link to="/components/Input/">Inputs</Link></Menu.Item>
          <Menu.Item><Link to="/components/InputGroup/">Input Group</Link></Menu.Item>
          <Menu.Item><Link to="/components/Label/">Labels</Link></Menu.Item>
          <Menu.Item><Link to="/components/Radio/">Radio Buttons</Link></Menu.Item>
          <Menu.Item><Link to="/components/Select/">Selects</Link></Menu.Item>
          <Menu.Item><Link to="/components/Textarea/">Textareas</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Lists</h5></Menu.Item>
          <Menu.Item><Link to="/components/Emptyable/">Emptyable</Link></Menu.Item>
          <Menu.Item><Link to="/components/Pagination/">Pagination</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Formatting</h5></Menu.Item>
          <Menu.Item><Link to="/components/Currency/">Currency</Link></Menu.Item>
          <Menu.Item><Link to="/components/NumberFormatter/">Number Formatter</Link></Menu.Item>
          <Menu.Item><Link to="/components/Pluralize/">Pluralize</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Navigation</h5></Menu.Item>
          <Menu.Item><Link to="/components/Menu/">Menu</Link></Menu.Item>
          <Menu.Item><Link to="/components/TopBar/">Top Bar</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Cards &amp; Media</h5></Menu.Item>
          <Menu.Item><Link to="/components/Card/">Card</Link></Menu.Item>
          <Menu.Item><Link to="/components/CardLayout/">Card Layout</Link></Menu.Item>
          <Menu.Item><Link to="/components/FlexVideo/">Flex Video</Link></Menu.Item>
          <Menu.Item><Link to="/components/MediaObject/">Media Object</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Containers</h5></Menu.Item>
          <Menu.Item><Link to="/components/Accordion/">Accordion</Link></Menu.Item>
          <Menu.Item><Link to="/components/Callout/">Callout</Link></Menu.Item>
          <Menu.Item><Link to="/components/Drawer/">Drawer</Link></Menu.Item>
          <Menu.Item><Link to="/components/Modal/">Modal</Link></Menu.Item>
          <Menu.Item><Link to="/components/Tabs/">Tabs</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Atoms</h5></Menu.Item>
          <Menu.Item><Link to="/components/Badge/">Badge</Link></Menu.Item>
          <Menu.Item><Link to="/components/CloseButton/">Close Button</Link></Menu.Item>
          <Menu.Item><Link to="/components/Icon/">Icon</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Utilities</h5></Menu.Item>
          <Menu.Item><Link to="/components/AuthenticityToken/">Authenticity Token</Link></Menu.Item>
          <Menu.Item><Link to="/components/BrowserSupportWarning/">Browser Support Warning</Link></Menu.Item>
          <Menu.Item><Link to="/components/HelpText/">Help Text</Link></Menu.Item>
          <Menu.Item><Link to="/components/Progress/">Progress</Link></Menu.Item>
          <Menu.Item><Link to="/components/Social/">Social</Link></Menu.Item>
          <Menu.Item><Link to="/components/TextAlign/">Text Align</Link></Menu.Item>
          <Menu.Item><Link to="/components/Visibility/">Visibility</Link></Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text><h5>Prototyping</h5></Menu.Item>
          <Menu.Item><Link to="/components/Lipsum/">Lorem Ipsum</Link></Menu.Item>
        </Menu>
      </nav>
    </Drawer>
  )
}
