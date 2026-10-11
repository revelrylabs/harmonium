/**
 * Consumer props must add to a component's own behaviour, not replace it
 * (#685): handlers run alongside the internal ones (the consumer's first),
 * `aria-describedby` is merged, and a consumer `id` keeps Field links intact.
 */
import {describe, it, expect, vi} from 'vitest'
import type * as React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Checkbox,
  Combobox,
  CommandPalette,
  DatePicker,
  Dialog,
  DialogBody,
  DialogHeader,
  Drawer,
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FileUpload,
  Input,
  Menu,
  MenuItem,
  MultiSelect,
  NumberInput,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  TimePicker,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  useFieldContext,
} from '.'

/** Base UI adds this to React events passed through its merged handlers. */
function preventBaseUIHandler(event: React.SyntheticEvent) {
  ;(event as unknown as {preventBaseUIHandler: () => void}).preventBaseUIHandler()
}

describe('consumer handlers run alongside internal ones', () => {
  it('Dialog onClick: clicks inside still do not close it', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose} onClick={onClick}>
        <DialogBody>
          <button>Inside</button>
        </DialogBody>
      </Dialog>,
    )
    await user.click(screen.getByRole('button', {name: 'Inside'}))
    expect(onClick).toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('Drawer onClick: clicks inside still do not close it', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const onClose = vi.fn()
    render(
      <Drawer open onClose={onClose} onClick={onClick}>
        <button>Inside</button>
      </Drawer>,
    )
    await user.click(screen.getByRole('button', {name: 'Inside'}))
    expect(onClick).toHaveBeenCalled()
    expect(onClose).not.toHaveBeenCalled()
  })

  it('DialogHeader with its own id still labels the dialog', () => {
    render(
      <Dialog open>
        <DialogHeader id="title">Edit</DialogHeader>
      </Dialog>,
    )
    expect(screen.getByRole('dialog', {name: 'Edit'})).toHaveAttribute(
      'aria-labelledby',
      'title',
    )
  })

  it('CommandPalette onKeyDown: arrow keys and Enter still work', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    const onSelect = vi.fn()
    render(
      <CommandPalette
        open
        onKeyDown={onKeyDown}
        items={[
          {id: 'a', label: 'Alpha', onSelect: vi.fn()},
          {id: 'b', label: 'Beta', onSelect},
        ]}
      />,
    )
    await waitFor(() => expect(screen.getByRole('combobox')).toHaveFocus())
    await user.keyboard('{ArrowDown}{Enter}')
    expect(onKeyDown).toHaveBeenCalled()
    expect(onSelect).toHaveBeenCalled()
  })

  it('TabsTrigger onClick: the tab still activates', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b" onClick={onClick}>
            B
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    )
    await user.click(screen.getByRole('tab', {name: 'B'}))
    expect(onClick).toHaveBeenCalled()
    expect(screen.getByRole('tab', {name: 'B'})).toHaveAttribute('aria-selected', 'true')
  })

  it('TabsList onKeyDown: arrow keys still move between tabs', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(
      <Tabs defaultValue="a">
        <TabsList onKeyDown={onKeyDown}>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b">B</TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    )
    await user.click(screen.getByRole('tab', {name: 'A'}))
    await user.keyboard('{ArrowRight}')
    expect(onKeyDown).toHaveBeenCalled()
    expect(screen.getByRole('tab', {name: 'B'})).toHaveFocus()
  })

  it('AccordionTrigger onClick: the section still toggles', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Accordion>
        <AccordionItem value="a">
          <AccordionTrigger onClick={onClick}>Section</AccordionTrigger>
          <AccordionContent>Body</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByRole('button', {name: 'Section'}))
    expect(onClick).toHaveBeenCalled()
    expect(screen.getByRole('button', {name: 'Section'})).toHaveAttribute(
      'aria-expanded',
      'true',
    )
  })

  it('ToggleGroupItem onClick: the item is still pressed', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <ToggleGroup aria-label="Align">
        <ToggleGroupItem value="left">Left</ToggleGroupItem>
        <ToggleGroupItem value="right" onClick={onClick}>
          Right
        </ToggleGroupItem>
      </ToggleGroup>,
    )
    await user.click(screen.getByRole('button', {name: 'Right'}))
    expect(onClick).toHaveBeenCalled()
    expect(screen.getByRole('button', {name: 'Right'})).toHaveAttribute(
      'aria-pressed',
      'true',
    )
  })

  it('Tooltip trigger keeps its handlers and aria-describedby', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    render(
      <>
        <p id="hint">Hint</p>
        <Tooltip content="Tip">
          <button aria-describedby="hint" onFocus={onFocus}>
            Trigger
          </button>
        </Tooltip>
      </>,
    )
    await user.tab()
    expect(onFocus).toHaveBeenCalled()
    const tooltip = await screen.findByRole('tooltip')
    const ids = screen.getByRole('button').getAttribute('aria-describedby')?.split(' ')
    expect(ids).toEqual(expect.arrayContaining(['hint', tooltip.id]))
  })

  it('Popover trigger onClick: the popover still opens', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Popover content="Content">
        <button onClick={onClick}>Open</button>
      </Popover>,
    )
    await user.click(screen.getByRole('button', {name: 'Open'}))
    expect(onClick).toHaveBeenCalled()
    expect(await screen.findByText('Content')).toBeInTheDocument()
  })

  it('Menu trigger and MenuItem onClick: the menu still opens and closes', async () => {
    const user = userEvent.setup()
    const onTriggerClick = vi.fn()
    const onItemClick = vi.fn()
    render(
      <Menu trigger={<button onClick={onTriggerClick}>Actions</button>}>
        <MenuItem onClick={onItemClick}>Edit</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByRole('button', {name: 'Actions'}))
    expect(onTriggerClick).toHaveBeenCalled()
    await user.click(await screen.findByRole('menuitem', {name: 'Edit'}))
    expect(onItemClick).toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('menuitem')).not.toBeInTheDocument())
  })

  it('inline Menu onKeyDown: arrow keys still move between items', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    render(
      <Menu onKeyDown={onKeyDown}>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByRole('menuitem', {name: 'One'}))
    await user.keyboard('{ArrowDown}')
    expect(onKeyDown).toHaveBeenCalled()
    expect(screen.getByRole('menuitem', {name: 'Two'})).toHaveFocus()
  })

  it('FileUpload onClick: the picker still opens', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const {container} = render(<FileUpload onClick={onClick} />)
    const input = container.querySelector('input[type=file]') as HTMLInputElement
    const openPicker = vi.spyOn(input, 'click')
    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalled()
    expect(openPicker).toHaveBeenCalled()
  })

  it('NumberInput onKeyDown: Enter still clamps to max', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    const onChange = vi.fn()
    render(<NumberInput aria-label="Qty" max={5} onKeyDown={onKeyDown} onChange={onChange} />)
    const input = screen.getByRole('spinbutton')
    await user.clear(input)
    await user.type(input, '9{Enter}')
    expect(onKeyDown).toHaveBeenCalled()
    expect(onChange).toHaveBeenLastCalledWith(5)
  })

  it('Slider onKeyDown: arrow keys still change the value', async () => {
    const user = userEvent.setup()
    const onKeyDown = vi.fn()
    const onChange = vi.fn()
    render(<Slider aria-label="Volume" onKeyDown={onKeyDown} onChange={onChange} />)
    screen.getByRole('slider').focus()
    await user.keyboard('{ArrowRight}')
    expect(onKeyDown).toHaveBeenCalled()
    expect(onChange).toHaveBeenCalled()
  })

  it('Checkbox onClick: it still toggles', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Checkbox label="Agree" onClick={onClick} />)
    await user.click(screen.getByRole('checkbox'))
    expect(onClick).toHaveBeenCalled()
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('Radio onClick in a RadioGroup: it is still selected', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <RadioGroup name="color" legend="Color">
        <Radio value="red" label="Red" />
        <Radio value="blue" label="Blue" onClick={onClick} />
      </RadioGroup>,
    )
    await user.click(screen.getByRole('radio', {name: 'Blue'}))
    expect(onClick).toHaveBeenCalled()
    expect(screen.getByRole('radio', {name: 'Blue'})).toBeChecked()
  })
})

describe('cancelling internal behaviour', () => {
  it('preventBaseUIHandler() in TabsTrigger onClick keeps the current tab', async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">A</TabsTrigger>
          <TabsTrigger value="b" onClick={preventBaseUIHandler}>
            B
          </TabsTrigger>
        </TabsList>
        <TabsContent value="a">Panel A</TabsContent>
        <TabsContent value="b">Panel B</TabsContent>
      </Tabs>,
    )
    await user.click(screen.getByRole('tab', {name: 'B'}))
    expect(screen.getByRole('tab', {name: 'A'})).toHaveAttribute('aria-selected', 'true')
  })

  it('preventBaseUIHandler() in NumberInput onKeyDown skips the Enter clamp', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(
      <NumberInput
        aria-label="Qty"
        max={5}
        onChange={onChange}
        onKeyDown={(event) => {
          if (event.key === 'Enter') preventBaseUIHandler(event)
        }}
      />,
    )
    const input = screen.getByRole('spinbutton')
    await user.clear(input)
    await user.type(input, '9{Enter}')
    expect(onChange).toHaveBeenLastCalledWith(9)
  })

  it('preventBaseUIHandler() in inline Menu onKeyDown keeps focus', async () => {
    const user = userEvent.setup()
    render(
      <Menu onKeyDown={preventBaseUIHandler}>
        <MenuItem>One</MenuItem>
        <MenuItem>Two</MenuItem>
      </Menu>,
    )
    await user.click(screen.getByRole('menuitem', {name: 'One'}))
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', {name: 'One'})).toHaveFocus()
  })

  it('preventDefault() in FileUpload onClick skips the picker', async () => {
    const user = userEvent.setup()
    const {container} = render(
      <FileUpload onClick={(event) => event.preventDefault()} />,
    )
    const input = container.querySelector('input[type=file]') as HTMLInputElement
    const openPicker = vi.spyOn(input, 'click')
    await user.click(screen.getByRole('button'))
    expect(openPicker).not.toHaveBeenCalled()
  })
})

type ControlCase = [
  name: string,
  renderControl: (props: Record<string, unknown>) => React.ReactElement,
  getControl: () => HTMLElement,
]

const byLabel = () => screen.getByLabelText('Label')

const controls: ControlCase[] = [
  ['Input', (p) => <Input {...p} />, byLabel],
  ['Textarea', (p) => <Textarea {...p} />, byLabel],
  [
    'Select',
    (p) => (
      <Select {...p}>
        <option value="a">A</option>
      </Select>
    ),
    byLabel,
  ],
  ['DatePicker', (p) => <DatePicker {...p} />, byLabel],
  ['TimePicker', (p) => <TimePicker {...p} />, byLabel],
  ['NumberInput', (p) => <NumberInput {...p} />, byLabel],
  ['Checkbox', (p) => <Checkbox {...p} />, () => screen.getByRole('checkbox', {name: 'Label'})],
  ['Switch', (p) => <Switch {...p} />, () => screen.getByRole('switch', {name: 'Label'})],
]

describe.each(controls)('%s in a Field', (_name, renderControl, getControl) => {
  it('a consumer id wins, and FieldLabel follows it', () => {
    render(
      <Field>
        <FieldLabel>Label</FieldLabel>
        {renderControl({id: 'custom'})}
      </Field>,
    )
    const label = screen.getByText('Label') as HTMLLabelElement
    expect(label.htmlFor).toBe('custom')
    expect(document.getElementById('custom')).not.toBeNull()
    expect(getControl()).toBeInTheDocument()
  })

  it('merges a consumer aria-describedby with FieldDescription', () => {
    render(
      <>
        <p id="extra">Extra</p>
        <Field>
          <FieldLabel>Label</FieldLabel>
          {renderControl({'aria-describedby': 'extra'})}
          <FieldDescription>Description</FieldDescription>
        </Field>
      </>,
    )
    const ids = getControl().getAttribute('aria-describedby')?.split(' ')
    expect(ids).toEqual(
      expect.arrayContaining(['extra', screen.getByText('Description').id]),
    )
  })

  it('runs consumer onFocus and onBlur', async () => {
    const user = userEvent.setup()
    const onFocus = vi.fn()
    const onBlur = vi.fn()
    render(
      <Field>
        <FieldLabel>Label</FieldLabel>
        {renderControl({onFocus, onBlur})}
      </Field>,
    )
    await user.click(getControl())
    await user.tab()
    expect(onFocus).toHaveBeenCalled()
    expect(onBlur).toHaveBeenCalled()
  })
})

describe('Field parts with their own id', () => {
  it('a control stays described by FieldDescription and FieldError', () => {
    render(
      <Field error>
        <FieldLabel>Email</FieldLabel>
        <Input />
        <FieldDescription id="email-description">We never share it</FieldDescription>
        <FieldError id="email-error">Enter an email</FieldError>
      </Field>,
    )
    const input = screen.getByLabelText('Email')
    expect(input.getAttribute('aria-describedby')?.split(' ')).toEqual(
      expect.arrayContaining(['email-description', 'email-error']),
    )
    expect(input).toHaveAttribute('aria-errormessage', 'email-error')
  })

  it('Combobox and MultiSelect follow a FieldDescription id', () => {
    const options = [{value: 'apple', label: 'Apple'}]
    render(
      <>
        <Field>
          <FieldLabel>One</FieldLabel>
          <Combobox options={options} />
          <FieldDescription id="one-description">Pick one</FieldDescription>
        </Field>
        <Field>
          <FieldLabel>Many</FieldLabel>
          <MultiSelect options={options} value={[]} onChange={vi.fn()} />
          <FieldDescription id="many-description">Pick some</FieldDescription>
        </Field>
      </>,
    )
    const [one, many] = screen.getAllByRole('combobox')
    expect(one).toHaveAttribute('aria-describedby', 'one-description')
    expect(many).toHaveAttribute('aria-describedby', 'many-description')
  })

  it('Slider merges a consumer aria-describedby', () => {
    render(
      <>
        <p id="extra">Extra</p>
        <Field>
          <FieldLabel>Volume</FieldLabel>
          <Slider aria-describedby="extra" />
          <FieldDescription>Description</FieldDescription>
        </Field>
      </>,
    )
    const ids = screen.getByRole('slider').getAttribute('aria-describedby')?.split(' ')
    expect(ids).toEqual(
      expect.arrayContaining(['extra', screen.getByText('Description').id]),
    )
  })

  it('useFieldContext reports the ids the parts render with', () => {
    let ctx: ReturnType<typeof useFieldContext> = null
    function Custom() {
      ctx = useFieldContext()
      return <input id={ctx?.fieldId} aria-describedby={ctx?.describedBy} />
    }
    render(
      <Field error>
        <FieldLabel id="custom-label">Custom</FieldLabel>
        <Custom />
        <FieldDescription id="custom-description">Hint</FieldDescription>
        <FieldError id="custom-error">Wrong</FieldError>
      </Field>,
    )
    expect(ctx).toMatchObject({
      labelId: 'custom-label',
      descriptionId: 'custom-description',
      errorId: 'custom-error',
      describedBy: 'custom-description custom-error',
    })
    expect(screen.getByLabelText('Custom')).toHaveAttribute(
      'aria-describedby',
      'custom-description custom-error',
    )
  })
})
