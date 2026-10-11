import {describe, it, expect, vi} from 'vitest'
import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {configureAxe} from 'vitest-axe'
import {FileUpload} from './FileUpload'

// jsdom has no layout, so colour contrast can't be computed here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})

const fileInput = (container: HTMLElement) =>
  container.querySelector('input[type="file"]') as HTMLInputElement

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

  it('resets the input so picking the same file again fires onChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const {container} = render(<FileUpload onChange={onChange} />)
    const input = fileInput(container)
    const file = new File(['content'], 'same.txt', {type: 'text/plain'})
    await user.upload(input, file)
    expect(input.value).toBe('')
    await user.upload(input, file)
    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith([file])
  })

  it('validates dropped files against accept and reports rejects', () => {
    const onChange = vi.fn()
    const onReject = vi.fn()
    render(
      <FileUpload accept="image/*,.pdf" multiple onChange={onChange} onReject={onReject} />,
    )
    const png = new File(['x'], 'a.png', {type: 'image/png'})
    const pdf = new File(['x'], 'b.PDF', {type: ''})
    const txt = new File(['x'], 'c.txt', {type: 'text/plain'})
    fireEvent.drop(screen.getByRole('button'), {dataTransfer: {files: [png, pdf, txt]}})
    expect(onChange).toHaveBeenCalledWith([png, pdf])
    expect(onReject).toHaveBeenCalledWith([txt])
  })

  it('keeps only one dropped file unless multiple is set', () => {
    const onChange = vi.fn()
    const onReject = vi.fn()
    render(<FileUpload onChange={onChange} onReject={onReject} />)
    const a = new File(['a'], 'a.txt', {type: 'text/plain'})
    const b = new File(['b'], 'b.txt', {type: 'text/plain'})
    fireEvent.drop(screen.getByRole('button'), {dataTransfer: {files: [a, b]}})
    expect(onChange).toHaveBeenCalledWith([a])
    expect(onReject).toHaveBeenCalledWith([b])
  })

  it('treats maxSize={0} as a limit', () => {
    const onChange = vi.fn()
    render(<FileUpload onChange={onChange} maxSize={0} />)
    const file = new File(['content'], 'test.txt', {type: 'text/plain'})
    fireEvent.drop(screen.getByRole('button'), {dataTransfer: {files: [file]}})
    expect(onChange).toHaveBeenCalledWith([])
  })

  it('keeps the drag highlight while moving over child elements', () => {
    render(<FileUpload />)
    const dropzone = screen.getByRole('button')
    fireEvent.dragEnter(dropzone)
    fireEvent.dragEnter(screen.getByText('Drop files here or click to browse'))
    fireEvent.dragLeave(dropzone)
    expect(dropzone).toHaveAttribute('data-drag-active', 'true')
    fireEvent.dragLeave(dropzone)
    expect(dropzone).not.toHaveAttribute('data-drag-active')
  })

  it('runs consumer handlers alongside the internal ones', () => {
    const onDrop = vi.fn()
    const onChange = vi.fn()
    const onKeyDown = vi.fn()
    const {container} = render(
      <FileUpload onDrop={onDrop} onKeyDown={onKeyDown} onChange={onChange} />,
    )
    const click = vi.spyOn(fileInput(container), 'click')
    const dropzone = screen.getByRole('button')
    const file = new File(['content'], 'test.txt', {type: 'text/plain'})
    fireEvent.drop(dropzone, {dataTransfer: {files: [file]}})
    expect(onDrop).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith([file])
    fireEvent.keyDown(dropzone, {key: 'Enter'})
    expect(onKeyDown).toHaveBeenCalledOnce()
    expect(click).toHaveBeenCalledOnce()
  })

  it('skips opening the picker when a consumer onClick prevents default', () => {
    const {container} = render(<FileUpload onClick={(event) => event.preventDefault()} />)
    const click = vi.spyOn(fileInput(container), 'click')
    fireEvent.click(screen.getByRole('button'))
    expect(click).not.toHaveBeenCalled()
  })

  it('marks a disabled dropzone with aria-disabled', () => {
    render(<FileUpload disabled />)
    expect(screen.getByRole('button')).toHaveAttribute('aria-disabled', 'true')
  })

  it('has no axe violations', async () => {
    const {container} = render(<FileUpload accept="image/*" />)
    expect(await axe(container)).toHaveNoViolations()
  })
})
