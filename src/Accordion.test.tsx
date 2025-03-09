import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from './Accordion'

describe('Accordion', () => {
  it('should render without throwing', () => {
    render(
      <Accordion>
        <Accordion.Item contentKey={1} title="One" />
      </Accordion>
    )
    
    expect(screen.getByText('One')).toBeInTheDocument()
  })

  it('should add className to child', () => {
    const testClassName = '__TEST__'
    const { container } = render(
      <Accordion className={testClassName}>
        <Accordion.Item contentKey={1} title="One" />
      </Accordion>
    )
    
    const accordionElement = container.querySelector('ul')
    expect(accordionElement).toHaveClass('rev-Accordion')
    expect(accordionElement).toHaveClass(testClassName)
  })

  it('should handle single active items', () => {
    const { container } = render(
      <Accordion active={1}>
        <Accordion.Item contentKey={1} title="One">Content One</Accordion.Item>
      </Accordion>
    )
    
    const accordionItem = container.querySelector('.rev-AccordionItem')
    expect(accordionItem).toHaveClass('rev-AccordionItem--selected')
    expect(screen.getByText('Content One')).toBeInTheDocument()
  })

  it('should handle multiple active items (with array)', () => {
    const { container } = render(
      <Accordion active={[1, 2]}>
        <Accordion.Item contentKey={1} title="One">Content One</Accordion.Item>
        <Accordion.Item contentKey={2} title="Two">Content Two</Accordion.Item>
      </Accordion>
    )
    
    const accordionItems = container.querySelectorAll('.rev-AccordionItem')
    expect(accordionItems[0]).toHaveClass('rev-AccordionItem--selected')
    expect(accordionItems[1]).toHaveClass('rev-AccordionItem--selected')
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.getByText('Content Two')).toBeInTheDocument()
  })

  it('should handle multiple active items (with an object)', () => {
    render(
      <Accordion active={{ 1: true, 2: true }}>
        <Accordion.Item contentKey={1} title="One">Content One</Accordion.Item>
        <Accordion.Item contentKey={2} title="Two">Content Two</Accordion.Item>
      </Accordion>
    )
    
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.getByText('Content Two')).toBeInTheDocument()
  })
})

describe('Accordion.Stateful', () => {
  it('should render without throwing', () => {
    render(
      <Accordion.Stateful>
        <Accordion.Item contentKey={1} title="One">Content One</Accordion.Item>
      </Accordion.Stateful>
    )
    
    expect(screen.getByText('One')).toBeInTheDocument()
    // Content should not be visible initially
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
  })

  it('can handle clicks to toggle content', () => {
    render(
      <Accordion.Stateful>
        <Accordion.Item contentKey={1} title="One">Content One</Accordion.Item>
      </Accordion.Stateful>
    )
    
    // Content should not be visible initially
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
    
    // Click the title to show content
    fireEvent.click(screen.getByText('One'))
    expect(screen.getByText('Content One')).toBeInTheDocument()
    
    // Click again to hide content
    fireEvent.click(screen.getByText('One'))
    expect(screen.queryByText('Content One')).not.toBeInTheDocument()
  })

  it('can handle clicks with custom onClick handler', () => {
    const onClickSpy = jest.fn()
    
    render(
      <Accordion.Stateful>
        <Accordion.Item contentKey={1} title="One" onClick={onClickSpy}>
          Content One
        </Accordion.Item>
      </Accordion.Stateful>
    )
    
    // Click the title
    fireEvent.click(screen.getByText('One'))
    
    // Custom onClick should be called
    expect(onClickSpy).toHaveBeenCalled()
    
    // Content should be visible
    expect(screen.getByText('Content One')).toBeInTheDocument()
  })

  it('supports multi mode to allow multiple items open', () => {
    render(
      <Accordion.Stateful multi>
        <Accordion.Item contentKey={1} title="One">Content One</Accordion.Item>
        <Accordion.Item contentKey={2} title="Two">Content Two</Accordion.Item>
      </Accordion.Stateful>
    )
    
    // Click first item
    fireEvent.click(screen.getByText('One'))
    expect(screen.getByText('Content One')).toBeInTheDocument()
    
    // Click second item - first should still be open
    fireEvent.click(screen.getByText('Two'))
    expect(screen.getByText('Content One')).toBeInTheDocument()
    expect(screen.getByText('Content Two')).toBeInTheDocument()
  })
}) 