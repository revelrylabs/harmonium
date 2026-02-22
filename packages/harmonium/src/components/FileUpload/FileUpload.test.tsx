import {describe, it, expect, vi} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import {FileUpload} from './FileUpload'

describe('FileUpload', () => {
  it('renders with button role', () => {
    render(<FileUpload />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('renders default placeholder', () => {
    render(<FileUpload />)
    expect(screen.getByText('Drop files here or click to browse')).toBeInTheDocument()
  })

  it('renders custom children', () => {
    render(<FileUpload>Upload your file</FileUpload>)
    expect(screen.getByText('Upload your file')).toBeInTheDocument()
  })

  it('calls onChange when files are dropped', () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} />)
    const dropzone = screen.getByRole('button')
    const file = new File(['content'], 'test.txt', {type: 'text/plain'})
    fireEvent.drop(dropzone, {
      dataTransfer: {files: [file]},
    })
    expect(onChange).toHaveBeenCalledWith([file])
  })

  it('filters files by maxSize', () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} maxSize={100} />)
    const dropzone = screen.getByRole('button')
    const small = new File(['x'], 'small.txt', {type: 'text/plain'})
    const big = new File(['x'.repeat(200)], 'big.txt', {type: 'text/plain'})
    fireEvent.drop(dropzone, {
      dataTransfer: {files: [small, big]},
    })
    expect(onChange).toHaveBeenCalledWith([small])
  })

  it('does not trigger when disabled', () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} disabled />)
    const dropzone = screen.getByRole('button')
    const file = new File(['content'], 'test.txt', {type: 'text/plain'})
    fireEvent.drop(dropzone, {
      dataTransfer: {files: [file]},
    })
    expect(onChange).not.toHaveBeenCalled()
  })
})
