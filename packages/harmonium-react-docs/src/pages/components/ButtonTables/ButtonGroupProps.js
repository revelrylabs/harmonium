import React, { Component } from 'react'
import Table from 'harmonium-react/lib/Table'

export default function ButtonGroupProps() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>
            Name
          </Table.Header>
          <Table.Header>
            Type
          </Table.Header>
          <Table.Header>
            Default
          </Table.Header>
          <Table.Header>
            Description
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.HeadStacked>
        <Table.Row>
          <Table.Header>ButtonGroup Props</Table.Header>
        </Table.Row>
      </Table.HeadStacked>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Prop:</Table.HeaderInline> <code>small</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for small buttons. Adds the class <code>rev-ButtonGroup--small</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>large</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for large buttons. Adds the class <code>rev-ButtonGroup--large</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for primary button styles. Adds the class <code>rev-ButtonGroup--primary</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>secondary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for secondary (hollow) button styles. Adds the class <code>rev-ButtonGroup--secondary</code></span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>inverted</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added to invert a buttons background and font color. Adds the class <code>rev-ButtonGroup--inverted</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>success</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for success button styles. Adds the class <code>rev-ButtonGroup--success</code></span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>warning</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for warning button styles. Adds the class <code>rev-ButtonGroup--warning</code></span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>alert</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for alert button styles. Adds the class <code>rev-ButtonGroup--alert</code></span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>disabled</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for disabled button styles. Adds the class <code>rev-ButtonGroup--disabled</code></span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>expanded</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> false
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added to expand the button width to 100%. Adds the class <code>rev-ButtonGroup--expanded</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>stackedForSmall</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added to button links that you want to stack on small screens. This helps avoid button groups breaking to a new line on smaller screens. Adds the class <code>rev-ButtonGroup--stackedForSmall</code></span>
          </Table.Data>
        </Table.Row>

      </Table.Body>
    </Table>
  )
}

