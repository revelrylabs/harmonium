import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Menu from './Menu'

describe('Menu', () => {
  it('should render without throwing', () => {
    render(<Menu>Menu Content</Menu>)
    expect(screen.getByText('Menu Content')).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<Menu className={testClassName}>Menu Content</Menu>)
    
    const menu = screen.getByText('Menu Content').parentElement
    expect(menu).toHaveClass('rev-Menu')
    expect(menu).toHaveClass(testClassName)
  })
  
  it('should handle boolean props', () => {
    render(<Menu horizontal>Horizontal Menu</Menu>)
    
    const menu = screen.getByText('Horizontal Menu').parentElement
    expect(menu).toHaveClass('rev-Menu--horizontalLeft')
  })
  
  it('should handle multiple boolean props', () => {
    render(<Menu nested icons>Nested Menu with Icons</Menu>)
    
    const menu = screen.getByText('Nested Menu with Icons').parentElement
    expect(menu).toHaveClass('rev-Menu--nested')
    expect(menu).toHaveClass('rev-Menu--icons')
  })
})

describe('Menu.Item', () => {
  it('should render without throwing', () => {
    render(<Menu.Item>Menu Item</Menu.Item>)
    expect(screen.getByText('Menu Item')).toBeInTheDocument()
  })

  it('should add className to element', () => {
    const testClassName = '__TEST__'
    render(<Menu.Item className={testClassName}>Menu Item</Menu.Item>)
    
    const menuItem = screen.getByText('Menu Item').parentElement
    expect(menuItem).toHaveClass('rev-Menu-item')
    expect(menuItem).toHaveClass(testClassName)
  })
  
  it('should handle text prop', () => {
    render(<Menu.Item text>Text Menu Item</Menu.Item>)
    
    const menuItem = screen.getByText('Text Menu Item').parentElement
    expect(menuItem).toHaveClass('rev-Menu-item--text')
  })
  
  it('should handle divider prop', () => {
    render(<Menu.Item divider>Divider Menu Item</Menu.Item>)
    
    const menuItem = screen.getByText('Divider Menu Item').parentElement
    expect(menuItem).toHaveClass('rev-Menu-item--divider')
  })
  
  it('should handle active prop', () => {
    render(<Menu.Item active>Active Menu Item</Menu.Item>)
    
    const menuItem = screen.getByText('Active Menu Item').parentElement
    expect(menuItem).toHaveClass('rev-Menu-item--selected')
  })
  
  it('should work within Menu component', () => {
    render(
      <Menu>
        <Menu.Item>First Item</Menu.Item>
        <Menu.Item active>Active Item</Menu.Item>
      </Menu>
    )
    
    expect(screen.getByText('First Item')).toBeInTheDocument()
    expect(screen.getByText('Active Item').parentElement).toHaveClass('rev-Menu-item--selected')
  })
}) 