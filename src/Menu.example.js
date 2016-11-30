import React, {Component} from 'react'
import Menu from './Menu'
import Icon from './Icon'

export class Basic extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item><a href="#">One</a></Menu.Item>
        <Menu.Item><a href="#">Two</a></Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
        <Menu.Item><a href="#">Four</a></Menu.Item>
      </Menu>
    )
  }
}

export class RightAlignment extends Component {
  render() {
    return (
      <Menu right>
        <Menu.Item><a href="#">One</a></Menu.Item>
        <Menu.Item><a href="#">Two</a></Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
        <Menu.Item><a href="#">Four</a></Menu.Item>
      </Menu>
    )
  }
}

export class Centered extends Component {
  render() {
    return (
      <Menu center>
        <Menu.Item><a href="#">One</a></Menu.Item>
        <Menu.Item><a href="#">Two</a></Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
        <Menu.Item><a href="#">Four</a></Menu.Item>
      </Menu>
    )
  }
}

export class Vertical extends Component {
  render() {
    return (
      <Menu vertical>
        <Menu.Item><a href="#">One</a></Menu.Item>
        <Menu.Item><a href="#">Two</a></Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
        <Menu.Item><a href="#">Four</a></Menu.Item>
      </Menu>
    )
  }
}

export class Simple extends Component {
  render() {
    return (
      <Menu simple>
        <Menu.Item><a href="#">One</a></Menu.Item>
        <Menu.Item><a href="#">Two</a></Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
        <Menu.Item><a href="#">Four</a></Menu.Item>
      </Menu>
    )
  }
}

export class Nested extends Component {
  render() {
    return (
      <Menu vertical>
        <Menu.Item>
          <a href="#">One</a>
          <Menu nested>
            <Menu.Item><a href="#">A</a></Menu.Item>
            <Menu.Item><a href="#">B</a></Menu.Item>
            <Menu.Item><a href="#">C</a></Menu.Item>
          </Menu>
        </Menu.Item>
        <Menu.Item>
          <a href="#">Two</a>
          <Menu nested vertical>
            <Menu.Item><a href="#">A</a></Menu.Item>
            <Menu.Item><a href="#">B</a></Menu.Item>
            <Menu.Item><a href="#">C</a></Menu.Item>
          </Menu>
        </Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
      </Menu>
    )
  }
}

export class ActiveState extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item active><a href="#">One</a></Menu.Item>
        <Menu.Item><a href="#">Two</a></Menu.Item>
        <Menu.Item><a href="#">Three</a></Menu.Item>
      </Menu>
    )
  }
}

export class Text extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item text>Just Text</Menu.Item>
        <Menu.Item><a href="#">Link</a></Menu.Item>
        <Menu.Item><a href="#">Link</a></Menu.Item>
      </Menu>
    )
  }
}

export class IconsOnTop extends Component {
  render() {
    return (
      <Menu iconTop>
        <Menu.Item><a href="#"><Icon i="list" /> <span>One</span></a></Menu.Item>
        <Menu.Item><a href="#"><Icon i="list" /> <span>Two</span></a></Menu.Item>
        <Menu.Item><a href="#"><Icon i="list" /> <span>Three</span></a></Menu.Item>
        <Menu.Item><a href="#"><Icon i="list" /> <span>Four</span></a></Menu.Item>
      </Menu>
    )
  }
}
