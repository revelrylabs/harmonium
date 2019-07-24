import React, { Component } from 'react'
import Table from 'harmonium-react/lib/Table'

export default function ButtonProps() {
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
          <Table.Header>Button Props</Table.Header>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for small buttons. Adds the class <code>rev-Button--small</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for large buttons. Adds the class <code>rev-Button--large</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for primary button styles. Adds the class <code>rev-Button--primary</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for secondary (hollow) button styles. Adds the class <code>rev-Button--secondary</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added to invert a buttons background and font color. Adds the class <code>rev-Button--inverted</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for success button styles. Adds the class <code>rev-Button--success</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for warning button styles. Adds the class <code>rev-Button--warning</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for alert button styles. Adds the class <code>rev-Button--alert</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added for disabled button styles. Adds the class <code>rev-Button--disabled</code></span>
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
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added to expand the button width to 100%. Adds the class <code>rev-Button--expanded</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>href</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Prop added to a link to make it styled like a button. Adds the class <code>rev-Button</code></span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>target</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> enum: <code>_blank</code>, <code>_parent</code>, <code>_self</code>, <code>_top</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Attribute added to specify how you want the link to open.</span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>type</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> enum: <code>submit</code>, <code>reset</code>, <code>button</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Attribute added to specify the type of button. </span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>name</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Attribute added that names the button. This will be submitted with the form data.</span>
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>value</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline><span> Attribute added to define the value of the button. This will be submitted with the form data.</span>
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

