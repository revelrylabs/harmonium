import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Tabs from './Tabs'

describe('Tabs', () => {
  it('should render without throwing', () => {
    render(
      <Tabs>
        <Tabs.Item contentKey={1} title="One" />
      </Tabs>
    )
    expect(document.querySelector('.rev-Tabs')).toBeInTheDocument()
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    render(
      <Tabs className={testClassName}>
        <Tabs.Item contentKey={1} title="One" />
      </Tabs>
    )
    
    const tabs = document.querySelector('.rev-Tabs')
    expect(tabs).toHaveClass('rev-Tabs')
    expect(tabs).toHaveClass(testClassName)
  })

  it('should render tab titles and content', () => {
    render(
      <Tabs>
        <Tabs.Item contentKey={1} title="One">Content One</Tabs.Item>
        <Tabs.Item contentKey={2} title="Two">Content Two</Tabs.Item>
      </Tabs>
    )
    
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.queryByText('Content Two')).not.toBeInTheDocument() // Not active by default
  })
})

describe('StatefulTabs', () => {
  it('should render without throwing (default active case)', () => {
    render(
      <Tabs.Stateful defaultActive={1}>
        <Tabs.Item contentKey={1} title="One">Content One</Tabs.Item>
      </Tabs.Stateful>
    )
    expect(document.querySelector('.rev-Tabs')).toBeInTheDocument()
    expect(screen.getByText('Content One')).toBeInTheDocument()
  })

  it('should render without throwing (without default active case)', () => {
    render(
      <Tabs.Stateful>
        <Tabs.Item contentKey={1} title="One">Content One</Tabs.Item>
      </Tabs.Stateful>
    )
    expect(document.querySelector('.rev-Tabs')).toBeInTheDocument()
    expect(screen.getByText('Content One')).toBeInTheDocument()
  })

  it('should handle clicks on tab titles', () => {
    render(
      <Tabs.Stateful>
        <Tabs.Item contentKey={1} title="One">Content One</Tabs.Item>
        <Tabs.Item contentKey={2} title="Two">Content Two</Tabs.Item>
      </Tabs.Stateful>
    )
    
    // Initially, only the first tab content should be visible
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.queryByText('Content Two')).not.toBeInTheDocument()
    
    // Click on the second tab
    fireEvent.click(screen.getByText('Two'))
    
    // Now the second tab content should be visible and the first hidden
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
    expect(screen.getByText('Content Two')).toBeInTheDocument()
  })
})

describe('Tabs.Item', () => {
  it('can render without error (title case)', () => {
    render(<Tabs.Item contentKey={1} title="One" renderTitle />)
    expect(screen.getByText('One')).toBeInTheDocument()
  })
  
  it('can render without error (panel case, active)', () => {
    render(<Tabs.Item contentKey={1} title="One" active>Panel Content</Tabs.Item>)
    expect(screen.getByText('Panel Content')).toBeInTheDocument()
  })

  it('can render without error (panel case, inactive)', () => {
    render(<Tabs.Item contentKey={1} title="One">Panel Content</Tabs.Item>)
    expect(screen.queryByText('Panel Content')).not.toBeInTheDocument()
  })
  
  it('can render without error (panel case, inactive with renderHiddenTabs)', () => {
    render(
      <Tabs.Item contentKey={1} title="One" renderHiddenTabs>
        Panel Content
      </Tabs.Item>
    )
    
    // Content should be in the DOM but hidden
    const panel = screen.getByText('Panel Content')
    expect(panel).toBeInTheDocument()
    expect(panel.parentElement).toHaveStyle('display: none')
  })
}) 