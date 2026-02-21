import {describe, it, expect, vi} from 'vitest'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {Accordion, AccordionItem, AccordionTrigger, AccordionContent} from './Accordion'

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
})
