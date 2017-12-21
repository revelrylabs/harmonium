import React from 'react'
import Link from 'gatsby-link'
import Menu from 'revelry-components/lib/Menu'

export default function Navigation() {
  return (
    <div className="rev-Rail">
      <nav className="rev-NavigationOutline">
        <h2><a href="/">Component Docs</a></h2>
        <Menu>
          <h3>Grid</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/grid/">Rows &amp; Columns</Link></Menu.Item>
            <Menu.Item><Link to="/components/ExpandingCol/">Expanding Columns</Link></Menu.Item>
          </Menu>
          <h3>Forms</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Button/">Button</Link></Menu.Item>
            <Menu.Item><Link to="/components/Checkbox/">Checkboxes and Fieldsets</Link></Menu.Item>
            <Menu.Item><Link to="/components/FileInput/">File Input</Link></Menu.Item>
            <Menu.Item><Link to="/components/Input/">Input</Link></Menu.Item>
            <Menu.Item><Link to="/components/InputGroup/">Input Group</Link></Menu.Item>
            <Menu.Item><Link to="/components/Label/">Label</Link></Menu.Item>
            <Menu.Item><Link to="/components/Radio/">Radio</Link></Menu.Item>
            <Menu.Item><Link to="/components/Select/">Select</Link></Menu.Item>
            <Menu.Item><Link to="/components/Textarea/">Textarea</Link></Menu.Item>
          </Menu>
          <h3>Lists</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Emptyable/">Emptyable</Link></Menu.Item>
            <Menu.Item><Link to="/components/Pagination/">Pagination</Link></Menu.Item>
          </Menu>
          <h3>Formatting</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Currency/">Currency</Link></Menu.Item>
            <Menu.Item><Link to="/components/NumberFormatter/">Number Formatter</Link></Menu.Item>
            <Menu.Item><Link to="/components/Pluralize/">Pluralize</Link></Menu.Item>
          </Menu>
          <h3>Navigation</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Menu/">Menu</Link></Menu.Item>
            <Menu.Item><Link to="/components/TopBar/">Top Bar</Link></Menu.Item>
          </Menu>
          <h3>Cards &amp; Media</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Card/">Card</Link></Menu.Item>
            <Menu.Item><Link to="/components/CardLayout/">Card Layout</Link></Menu.Item>
            <Menu.Item><Link to="/components/FlexVideo/">Flex Video</Link></Menu.Item>
            <Menu.Item><Link to="/components/MediaObject/">Media Object</Link></Menu.Item>
          </Menu>
          <h3>Containers</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Accordion/">Accordion</Link></Menu.Item>
            <Menu.Item><Link to="/components/Callout/">Callout</Link></Menu.Item>
            <Menu.Item><Link to="/components/Modal/">Modal</Link></Menu.Item>
            <Menu.Item><Link to="/components/Tabs/">Tabs</Link></Menu.Item>
          </Menu>
          <h3>Atoms</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Badge/">Badge</Link></Menu.Item>
            <Menu.Item><Link to="/components/CloseButton/">Close Button</Link></Menu.Item>
            <Menu.Item><Link to="/components/Icon/">Icon</Link></Menu.Item>
          </Menu>
          <h3>Utilities</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/AuthenticityToken/">Authenticity Token</Link></Menu.Item>
            <Menu.Item><Link to="/components/BrowserSupportWarning/">Browser Support Warning</Link></Menu.Item>
            <Menu.Item><Link to="/components/HelpText/">Help Text</Link></Menu.Item>
            <Menu.Item><Link to="/components/Progress/">Progress</Link></Menu.Item>
            <Menu.Item><Link to="/components/Social/">Social</Link></Menu.Item>
            <Menu.Item><Link to="/components/TextAlign/">Text Align</Link></Menu.Item>
            <Menu.Item><Link to="/components/Visibility/">Visibility</Link></Menu.Item>
          </Menu>
          <h3>Prototyping</h3>
          <Menu nested>
            <Menu.Item><Link to="/components/Lipsum/">Lorem Ipsum</Link></Menu.Item>
          </Menu>
        </Menu>
      </nav>
    </div>
  )
}
