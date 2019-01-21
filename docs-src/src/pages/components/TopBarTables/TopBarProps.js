import React from 'react'
import Table from 'harmonium/lib/Table'

export default function TopBarProps() {
  const propsArray = [
    {
      name: <code>scroll</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code> when the container needs to scroll at all screen sizes.</span>,
    },
    {
      name: <code>scrollSmall</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at small-only breakpoint.</span>,
    },
    {
      name: <code>scrollMedium</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at medium breakpoint and up.</span>,
    },
    {
      name: <code>scrollMediumDown</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at medium breakpoint and down.</span>,
    },
    {
      name: <code>scrollLarge</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at large breakpoint and up.</span>,
    },
    {
      name: <code>scrollLargeDown</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at large breakpoint and down.</span>,
    },
    {
      name: <code>scrollXlarge</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at xlarge breakpoint and up.</span>,
    },
    {
      name: <code>scrollXlargeDown</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at xlarge breakpoint and down.</span>,
    },
    {
      name: <code>scrollNav</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. If you have updated the <code>$nav</code> breakpoint var so that it is not using the default size, this prop can be used to make the container scrollable at your customized nav breakpoint and up. </span>,
    },
    {
      name: <code>scrollNavOnly</code>,
      type: 'bool',
      defaultValue: 'none',
      description: <span>Apply to <code>rev-TopBar-item</code>. Scrolls at nav-only breakpoint.</span>,
    },
    
  ]

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Name</Table.Header>
          <Table.Header>Type</Table.Header>
          <Table.Header>Default</Table.Header>
          <Table.Header>Description</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.HeadStacked>
        <Table.Row>
          <Table.Header>TopBar Props</Table.Header>
        </Table.Row>
      </Table.HeadStacked>
      <Table.Body>
        {propsArray.map(({name, type, defaultValue, description}, index) => (
          <Table.Row key={index}>
            <Table.Data>
              <Table.HeaderInline>Name:</Table.HeaderInline>
              {name}
            </Table.Data>
            <Table.Data>
              <Table.HeaderInline>Type:</Table.HeaderInline>
              {type}
            </Table.Data>
            <Table.Data>
              <Table.HeaderInline>Default:</Table.HeaderInline>
              {defaultValue}
            </Table.Data>
            <Table.Data>
              <Table.HeaderInline>Description:</Table.HeaderInline>
              {description}
            </Table.Data>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}
