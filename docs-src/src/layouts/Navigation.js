import React from 'react'
import Menu from 'harmonium/lib/Menu'
import Drawer from 'harmonium/lib/Drawer'
import packageInfo from '../../../package.json'

export default function Navigation() {
  return (
    <Drawer
      fixed
      expanderChildren="+"
      closerChildren="+"
      className="DocsSiteNav"
      left
    >
      <nav>
        <a className="rev-Brand ExampleBrand Hide--smallOnly" href="/">
          <img src="/images/harmonium-logo-white.png" alt="Harmonium"/>
          <small>Version {packageInfo.version}</small>
        </a>
        <Menu className="FixedDrawerLinks">
          <Menu.Item>
            <a href="https://github.com/revelrylabs/harmonium">GitHub</a>
          </Menu.Item>
          <Menu.Item>
            <a href="https://www.npmjs.com/package/harmonium">NPM</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Starter</h5>
          </Menu.Item>
          <Menu.Item>
            <a href={'/settings-templates.zip'} download>
              Download Starter Settings
            </a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Design Guidelines</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/guidelines/overview/">Overview</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Grid</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/grid/">Rows &amp; Columns</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/ExpandingCol/">Expanding Columns</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Forms</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Button/">Buttons</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Checkbox/">Checkboxes</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/DatePicker/">Date Picker</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Input/">Inputs</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/InputGroup/">Input Group</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/MediaUploader/">Media Uploader</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Radio/">Radio Buttons</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Select/">Selects</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Textarea/">Textareas</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/TimePicker/">Time Picker</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Slider/">Slider Input</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Lists</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Emptyable/">Emptyable</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Pagination/">Pagination</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Formatting</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Currency/">Currency</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/NumberFormatter/">Number Formatter</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Pluralize/">Pluralize</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Navigation</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Menu/">Menu</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/TopBar/">Top Bar</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Drawer/">Stateful Drawer</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/StatelessDrawer/">StatelessDrawer</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Breadcrumbs/">Breadcrumbs</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Cards &amp; Media</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Card/">Card</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/CardLayout/">Card Layout</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/FlexVideo/">Flex Video</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/MediaObject/">Media Object</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Containers</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Accordion/">Accordion</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Callout/">Callout</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Modal/">Modal</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Sticky/">Sticky</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Tabs/">Tabs</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Table/">Table</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/DataGrid/">DataGrid</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Atoms</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Badge/">Badge</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/CloseButton/">Close Button</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Icon/">Icon</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Utilities</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/AuthenticityToken/">Authenticity Token</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/BrowserSupportWarning/">
              Browser Support Warning
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/HelpText/">Help Text</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Loader/">Loader</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Progress/">Progress</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Social/">Social</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/TextAlign/">Text Align</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Visibility/">Visibility</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Prototyping</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Lipsum/">Lorem Ipsum</a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text>
            <h5>Map</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Map/DefaultMap/">Default Map Component</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Map/HybridMap/">Hybrid Map</a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Map/DesignedSilverMap/">
              Small Designed Silver Map
            </a>
          </Menu.Item>
          <Menu.Item>
            <a href="/components/Map/DesignedRetroMap/">
              Designed Retro Map
            </a>
          </Menu.Item>
        </Menu>
      </nav>
    </Drawer>
  )
}
