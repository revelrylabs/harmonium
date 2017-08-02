import React, {Component} from 'react'
import TopBar from 'revelry-components/lib/TopBar'
import Menu from 'revelry-components/lib/Menu'
import Input from 'revelry-components/lib/Input'
import InputGroup from 'revelry-components/lib/InputGroup'
import Button from 'revelry-components/lib/Button'
import Icon from 'revelry-components/lib/Icon'
import Form from 'revelry-components/lib/Form'

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
                <Button><Icon i="magnifying-glass" /></Button>
              </InputGroup.Button>
            </InputGroup>
          </Form>
        </TopBar.Right>
      </TopBar>
    )
  }
}
