import React, {Component} from 'react'
import TopBar from './TopBar'
import Menu from './Menu'
import Input from './Input'
import InputGroup from './InputGroup'
import Button from './Button'
import Icon from './Icon'
import Form from './Form'

export class Example extends Component {
  render() {
    return (
      <TopBar>
        <TopBar.Title>
          <strong>Hello</strong>
        </TopBar.Title>
        <TopBar.Left>
          <Menu>
            <Menu.Item><a href="#">One</a></Menu.Item>
            <Menu.Item><a href="#">Two</a></Menu.Item>
          </Menu>
        </TopBar.Left>
        <TopBar.Right>
          <Form>
            <InputGroup style={{margin: 0}}>
              <InputGroup.Field>
                <Input type="text" placeholder="Search" />
              </InputGroup.Field>
              <InputGroup.Button>
                <Button primary><Icon i="magnifying-glass" /></Button>
              </InputGroup.Button>
            </InputGroup>
          </Form>
        </TopBar.Right>
      </TopBar>
    )
  }
}
