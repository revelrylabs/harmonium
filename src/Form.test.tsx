import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Form from './Form'

describe('Form', () => {
  it('should render without throwing', () => {
    render(<Form />)
    expect(document.querySelector('form')).toBeInTheDocument()
  })

  it('should add className to form', () => {
    const testClassName = '__TEST__'
    render(<Form className={testClassName} />)
    
    const form = document.querySelector('form')
    expect(form).toHaveClass('rev-Form')
    expect(form).toHaveClass(testClassName)
  })
  
  it('should default to post method', () => {
    render(<Form />)
    const form = document.querySelector('form')
    expect(form).toHaveAttribute('method', 'post')
  })
  
  it('should allow custom method values', () => {
    render(<Form method="get" />)
    const form = document.querySelector('form')
    expect(form).toHaveAttribute('method', 'get')
  })
  
  it('should add method override input for non-GET/POST methods', () => {
    render(<Form method="put" />)
    
    // Form should still be post
    const form = document.querySelector('form')
    expect(form).toHaveAttribute('method', 'post')
    
    // But should have a hidden input for the real method
    const hiddenInput = document.querySelector('input[name="_method"]')
    expect(hiddenInput).toBeInTheDocument()
    expect(hiddenInput).toHaveAttribute('value', 'put')
  })
  
  it('should use custom method override input name when provided', () => {
    render(<Form method="delete" methodOverrideInputName="custom_method" />)
    
    const hiddenInput = document.querySelector('input[name="custom_method"]')
    expect(hiddenInput).toBeInTheDocument()
    expect(hiddenInput).toHaveAttribute('value', 'delete')
  })
  
  it('should not add method override input when disabled', () => {
    render(<Form method="patch" enableMethodOverride={false} />)
    
    const form = document.querySelector('form')
    expect(form).toHaveAttribute('method', 'patch')
    
    const hiddenInput = document.querySelector('input[name="_method"]')
    expect(hiddenInput).not.toBeInTheDocument()
  })
}) 