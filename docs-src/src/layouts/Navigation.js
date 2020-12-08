import React, {useState} from 'react'
import Menu from 'harmonium/lib/Menu'
import Drawer from 'harmonium/lib/Drawer'
import packageInfo from '../../../package.json'
import Input from 'harmonium/lib/Input'
import menuItems from '../pages/menuItems'

export default function Navigation() {

  const [formValue, setFormValue] = useState('')

  const handleFormChange = (e) => {
    setFormValue(e.target.value)
  }

  function itemCheck(item){
    return item.label.toLowerCase().includes(formValue.toLowerCase());
  }

  function displayMenu(menu){
    return menu.map( (cat, i) => {
      if (cat.contents.filter( (item) => itemCheck(item)).length >= 1)
      return ( 
        <Menu vertical key={i}>
          <Menu.Item text style={{color: 'black'}}>
            <h5>{cat.category}</h5>
          </Menu.Item>
          {cat.contents.map( (item, j) => {
          if (itemCheck(item)){
            return (
            <Menu.Item key={j}>
              <a href={`/${cat.domain}/${item.endpoint}`}>{item.label}</a>
            </Menu.Item>
            )}
          })}
        </Menu>
      )
    })
  }
  
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
          <img src="/images/harmonium-logo-white.png" alt="Harmonium" />
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
          <Menu.Item text style={{color: 'black'}}>
            <h5>Starter</h5>
          </Menu.Item>
          <Menu.Item>
            <a href={'/settings-templates.zip'} download>
              Download Starter Settings
            </a>
          </Menu.Item>
        </Menu>
        <Menu vertical>
          <Menu.Item text style={{color: 'black'}}>
            <h5>Design Guidelines</h5>
          </Menu.Item>
          <Menu.Item>
            <a href="/guidelines/overview/">Overview</a>
          </Menu.Item>
        </Menu>
        <Input placeholder='Search for Component' style={{margin:'20px', width: '85%'}} value={formValue} onChange={handleFormChange}/>

          {displayMenu(menuItems)}
 
       </nav>
    </Drawer>
  )
}
