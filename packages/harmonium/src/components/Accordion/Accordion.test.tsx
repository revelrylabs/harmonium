import {StrictMode} from 'react'
import {describe, it, expect, vi} from 'vitest'
import {act, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {configureAxe} from 'vitest-axe'
import * as axeMatchers from 'vitest-axe/matchers'
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from './Accordion'

expect.extend(axeMatchers)

// jsdom has no canvas, so axe cannot compute colour contrast here
const axe = configureAxe({rules: {'color-contrast': {enabled: false}}})

function renderAccordion(props: Record<string, unknown> = {}) {
  return render(
    <Accordion {...props}>
      <AccordionItem value="one">
        <AccordionTrigger value="one">Section 1</AccordionTrigger>
        <AccordionContent value="one">Content 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="two">
        <AccordionTrigger value="two">Section 2</AccordionTrigger>
        <AccordionContent value="two">Content 2</AccordionContent>
      </AccordionItem>
    </Accordion>,
  )
}

describe('Accordion', () => {
  it('renders all triggers', () => {
    renderAccordion()
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
  })

  it('starts with all items closed by default', () => {
    renderAccordion()
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('opens item on click', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('closes previously open item in single mode', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.click(screen.getByText('Section 1'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    await user.click(screen.getByText('Section 2'))
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('keeps multiple items open when multiple is true', async () => {
    const user = userEvent.setup()
    renderAccordion({multiple: true})
    await user.click(screen.getByText('Section 1'))
    await user.click(screen.getByText('Section 2'))
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('supports defaultValue', () => {
    renderAccordion({defaultValue: 'two'})
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    expect(screen.getByText('Content 2')).toBeInTheDocument()
  })

  it('calls onValueChange', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    renderAccordion({onValueChange: onChange})
    await user.click(screen.getByText('Section 1'))
    expect(onChange).toHaveBeenCalledWith(['one'])
  })

  it('sets aria-expanded on triggers', async () => {
    const user = userEvent.setup()
    renderAccordion()
    const trigger = screen.getByText('Section 1')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('calls onValueChange once per click under StrictMode', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <StrictMode>
        <Accordion onValueChange={onChange}>
          <AccordionItem value="one">
            <AccordionTrigger value="one">Section 1</AccordionTrigger>
            <AccordionContent value="one">Content 1</AccordionContent>
          </AccordionItem>
        </Accordion>
      </StrictMode>,
    )
    await user.click(screen.getByText('Section 1'))
    expect(onChange).toHaveBeenCalledOnce()
    expect(onChange).toHaveBeenCalledWith(['one'])
  })

  it('wraps each trigger in a heading', () => {
    renderAccordion()
    const heading = screen.getByRole('heading', {level: 3, name: 'Section 1'})
    expect(heading).toContainElement(screen.getByRole('button', {name: 'Section 1'}))
  })

  it('wires the trigger to a labelled region with aria-controls', async () => {
    const user = userEvent.setup()
    renderAccordion()
    const trigger = screen.getByRole('button', {name: 'Section 1'})
    await user.click(trigger)
    const region = screen.getByRole('region', {name: 'Section 1'})
    expect(region).toHaveTextContent('Content 1')
    expect(trigger).toHaveAttribute('aria-controls', region.id)
  })

  it('toggles with Enter and Space from the keyboard', async () => {
    const user = userEvent.setup()
    renderAccordion()
    await user.tab()
    const trigger = screen.getByRole('button', {name: 'Section 1'})
    expect(trigger).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await user.keyboard(' ')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.tab()
    expect(screen.getByRole('button', {name: 'Section 2'})).toHaveFocus()
  })

  it('keeps the data-state styling hooks', async () => {
    const user = userEvent.setup()
    const {container} = renderAccordion({defaultValue: ['one']})
    const [item1, item2] = container.querySelectorAll('.item')
    expect(item1).toHaveAttribute('data-state', 'open')
    expect(item2).toHaveAttribute('data-state', 'closed')
    expect(screen.getByRole('button', {name: 'Section 1'})).toHaveAttribute('data-state', 'open')
    expect(screen.getByRole('region')).toHaveAttribute('data-state', 'open')
    expect(item1.querySelector('.chevron')).toHaveAttribute('data-state', 'open')
    await user.click(screen.getByRole('button', {name: 'Section 1'}))
    expect(item1).toHaveAttribute('data-state', 'closed')
    expect(item1.querySelector('.chevron')).toHaveAttribute('data-state', 'closed')
  })

  it('supports controlled mode with a string or an array', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const {rerender} = render(
      <Accordion value="two" onValueChange={onChange}>
        <AccordionItem value="one">
          <AccordionTrigger value="one">Section 1</AccordionTrigger>
          <AccordionContent value="one">Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger value="two">Section 2</AccordionTrigger>
          <AccordionContent value="two">Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(screen.getByText('Content 2')).toBeInTheDocument()
    await user.click(screen.getByText('Section 1'))
    expect(onChange).toHaveBeenCalledWith(['one'])
    // Still controlled: nothing changes until the parent updates `value`
    expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    rerender(
      <Accordion value={['one']} onValueChange={onChange}>
        <AccordionItem value="one">
          <AccordionTrigger value="one">Section 1</AccordionTrigger>
          <AccordionContent value="one">Content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="two">
          <AccordionTrigger value="two">Section 2</AccordionTrigger>
          <AccordionContent value="two">Content 2</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(screen.getByText('Content 1')).toBeInTheDocument()
    expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
  })

  it('still toggles when the consumer passes onClick (#685)', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Accordion>
        <AccordionItem value="one">
          <AccordionTrigger value="one" onClick={onClick}>
            Section 1
          </AccordionTrigger>
          <AccordionContent value="one">Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByText('Section 1'))
    expect(onClick).toHaveBeenCalledOnce()
    expect(screen.getByText('Content 1')).toBeInTheDocument()
  })

  it('has no axe violations', async () => {
    const {container} = renderAccordion({defaultValue: 'one'})
    // Base UI may update after mount (e.g. once it has measured the DOM)
    const results = await act(() => axe(container))
    expect(results).toHaveNoViolations()
  })
})
