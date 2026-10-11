import * as React from 'react'
import {describe, it, expect, vi} from 'vitest'
import {render, screen, waitFor} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Checkbox,
  DataGrid,
  DatePicker,
  Drawer,
  FileUpload,
  Pagination,
  Popover,
  Radio,
  RadioGroup,
  Select,
  Sidebar,
  SidebarItem,
  SidebarSection,
  Slider,
  Switch,
  TimePicker,
  ToastProvider,
  useToast,
} from './components'

// Keyboard support for the interactive components whose own test files don't
// already cover it, following the WAI-ARIA Authoring Practices patterns.
// Tabs, ToggleGroup, Menu, Dialog, Tooltip, Combobox, MultiSelect,
// CommandPalette, NumberInput and Accordion (Enter/Space; Base UI's accordion
// has no arrow-key navigation, which the APG pattern makes optional) are
// covered in their own files.

describe('Drawer', () => {
  it('traps focus inside while open', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Button>Outside</Button>
        <Drawer open onClose={() => {}} aria-label="Filters">
          <Button>First</Button>
          <Button>Last</Button>
        </Drawer>
      </>,
    )
    const first = screen.getByRole('button', {name: 'First'})
    const last = screen.getByRole('button', {name: 'Last'})
    await waitFor(() => expect(first).toHaveFocus())
    await user.tab()
    expect(last).toHaveFocus()
    // Tabbing past either end lands on a focus guard that wraps around.
    await user.tab()
    await waitFor(() => expect(first).toHaveFocus())
    await user.tab({shift: true})
    await waitFor(() => expect(last).toHaveFocus())
  })
})

describe('Popover', () => {
  it.each(['{Enter}', ' '])('opens from the keyboard with %s', async (key) => {
    const user = userEvent.setup()
    render(
      <Popover content="Details">
        <Button>Options</Button>
      </Popover>,
    )
    await user.tab()
    await user.keyboard(key)
    expect(await screen.findByRole('dialog')).toBeInTheDocument()
    expect(screen.getByRole('button', {name: 'Options'})).toHaveAttribute('aria-expanded', 'true')
  })
})

describe('Checkbox and Switch', () => {
  it('Checkbox toggles with Space', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Accept terms" onChange={onChange} />)
    await user.tab()
    const checkbox = screen.getByRole('checkbox', {name: 'Accept terms'})
    expect(checkbox).toHaveFocus()
    await user.keyboard(' ')
    expect(checkbox).toHaveAttribute('aria-checked', 'true')
    await user.keyboard(' ')
    expect(checkbox).toHaveAttribute('aria-checked', 'false')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('Switch toggles with Space and Enter', async () => {
    const user = userEvent.setup()
    render(<Switch label="Notifications" />)
    await user.tab()
    const toggle = screen.getByRole('switch', {name: 'Notifications'})
    expect(toggle).toHaveFocus()
    await user.keyboard(' ')
    expect(toggle).toHaveAttribute('aria-checked', 'true')
    await user.keyboard('{Enter}')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  it('a disabled Checkbox and Switch are not tab stops', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Checkbox label="Locked" disabled />
        <Switch label="Beta" disabled />
        <Button>After</Button>
      </>,
    )
    await user.tab()
    expect(screen.getByRole('button', {name: 'After'})).toHaveFocus()
  })
})

describe('RadioGroup', () => {
  it('is one tab stop, on the selected radio', async () => {
    const user = userEvent.setup()
    render(
      <>
        <RadioGroup legend="Plan" defaultValue="pro">
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
          <Radio value="team" label="Team" />
        </RadioGroup>
        <Button>After</Button>
      </>,
    )
    await user.tab()
    expect(screen.getByRole('radio', {name: 'Pro'})).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', {name: 'After'})).toHaveFocus()
  })

  it('skips disabled radios with the arrow keys', async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup legend="Plan" defaultValue="free">
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" disabled />
        <Radio value="team" label="Team" />
      </RadioGroup>,
    )
    await user.tab()
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('radio', {name: 'Team'})).toHaveFocus()
    expect(screen.getByRole('radio', {name: 'Team'})).toHaveAttribute('aria-checked', 'true')
  })
})

describe('Slider', () => {
  it('jumps to min and max with Home and End', async () => {
    const user = userEvent.setup()
    render(<Slider min={0} max={10} defaultValue={5} aria-label="Volume" />)
    await user.tab()
    const slider = screen.getByRole('slider', {name: 'Volume'})
    expect(slider).toHaveFocus()
    await user.keyboard('{End}')
    expect(slider).toHaveValue('10')
    await user.keyboard('{Home}')
    expect(slider).toHaveValue('0')
    await user.keyboard('{ArrowUp}')
    expect(slider).toHaveValue('1')
  })
})

describe('native form controls', () => {
  it('Select is reachable with Tab', async () => {
    const user = userEvent.setup()
    render(
      <Select aria-label="Country">
        <option>Canada</option>
      </Select>,
    )
    await user.tab()
    expect(screen.getByRole('combobox', {name: 'Country'})).toHaveFocus()
  })

  it('DatePicker and TimePicker take typed values', async () => {
    const user = userEvent.setup()
    const onDate = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => event.target.value)
    const onTime = vi.fn((event: React.ChangeEvent<HTMLInputElement>) => event.target.value)
    render(
      <>
        <DatePicker aria-label="Date" onChange={onDate} />
        <TimePicker aria-label="Time" onChange={onTime} />
      </>,
    )
    await user.tab()
    expect(screen.getByLabelText('Date')).toHaveFocus()
    await user.keyboard('2024-05-01')
    expect(onDate).toHaveLastReturnedWith('2024-05-01')
    await user.tab()
    expect(screen.getByLabelText('Time')).toHaveFocus()
    await user.keyboard('09:30')
    expect(onTime).toHaveLastReturnedWith('09:30')
  })
})

describe('FileUpload', () => {
  it.each(['{Enter}', ' '])('opens the file picker with %s', async (key) => {
    const user = userEvent.setup()
    const {container} = render(<FileUpload />)
    const input = container.querySelector('input[type="file"]') as HTMLInputElement
    const openPicker = vi.spyOn(input, 'click')
    await user.tab()
    expect(screen.getByRole('button')).toHaveFocus()
    await user.keyboard(key)
    expect(openPicker).toHaveBeenCalledTimes(1)
  })

  it('is not a tab stop when disabled', async () => {
    const user = userEvent.setup()
    render(
      <>
        <FileUpload disabled />
        <Button>After</Button>
      </>,
    )
    await user.tab()
    expect(screen.getByRole('button', {name: 'After'})).toHaveFocus()
  })
})

describe('DataGrid', () => {
  it('sorts from the keyboard with Enter and Space on the header button', async () => {
    const user = userEvent.setup()
    const rows = [
      {id: 1, name: 'Bea'},
      {id: 2, name: 'Al'},
      {id: 3, name: 'Cy'},
    ]
    render(
      <DataGrid
        aria-label="People"
        columns={[{key: 'name', header: 'Name', sortable: true}]}
        data={rows}
        rowKey={(row) => row.id}
      />,
    )
    const names = () => screen.getAllByRole('cell').map((cell) => cell.textContent)
    await user.tab()
    expect(screen.getByRole('button', {name: /Name/})).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(names()).toEqual(['Al', 'Bea', 'Cy'])
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'ascending')
    await user.keyboard(' ')
    expect(names()).toEqual(['Cy', 'Bea', 'Al'])
    expect(screen.getByRole('columnheader')).toHaveAttribute('aria-sort', 'descending')
  })
})

describe('Pagination', () => {
  it('changes page with Enter and marks the current page', async () => {
    const user = userEvent.setup()
    function Pager() {
      const [page, setPage] = React.useState(1)
      return <Pagination page={page} totalPages={5} onPageChange={setPage} />
    }
    render(<Pager />)
    expect(screen.getByRole('button', {name: '1'})).toHaveAttribute('aria-current', 'page')
    // Previous is disabled on the first page, so the first tab stop is page 1
    await user.tab()
    expect(screen.getByRole('button', {name: '1'})).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', {name: '2'})).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('button', {name: '2'})).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('button', {name: '1'})).not.toHaveAttribute('aria-current')
  })
})

describe('Breadcrumbs', () => {
  it('links are tab stops and the current page is not', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
          <BreadcrumbItem active>Install</BreadcrumbItem>
        </Breadcrumbs>
        <Button>After</Button>
      </>,
    )
    await user.tab()
    expect(screen.getByRole('link', {name: 'Home'})).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('link', {name: 'Docs'})).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', {name: 'After'})).toHaveFocus()
  })
})

describe('Sidebar', () => {
  it('reaches each enabled item with Tab and activates it with Enter', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Sidebar aria-label="Main">
        <SidebarSection>
          <SidebarItem href="/">Home</SidebarItem>
          <SidebarItem onClick={onClick}>Settings</SidebarItem>
          <SidebarItem disabled>Billing</SidebarItem>
        </SidebarSection>
      </Sidebar>,
    )
    await user.tab()
    expect(screen.getByRole('link', {name: 'Home'})).toHaveFocus()
    await user.tab()
    expect(screen.getByRole('button', {name: 'Settings'})).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    await user.tab()
    expect(screen.getByRole('button', {name: 'Billing'})).not.toHaveFocus()
  })
})

describe('Toast', () => {
  function Trigger() {
    const {toast} = useToast()
    return <Button onClick={() => toast({message: 'Saved', duration: 0})}>Save</Button>
  }

  it('F6 moves focus to the toasts and Escape dismisses the focused toast', async () => {
    const user = userEvent.setup()
    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>,
    )
    await user.click(screen.getByRole('button', {name: 'Save'}))
    await screen.findByText('Saved')
    await user.keyboard('{F6}')
    expect(screen.getByRole('region', {name: 'Notifications'})).toHaveFocus()
    await user.tab()
    const toast = screen.getByRole('dialog', {name: 'Saved'})
    expect(toast).toHaveFocus()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByText('Saved')).not.toBeInTheDocument())
  })
})
