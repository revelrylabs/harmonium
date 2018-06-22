import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

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
      <Table.HeadSmall>
        <Table.Data>
          Button Props
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <span>Prop:</span> <code>small</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for small buttons.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>large</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for large buttons.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>primary</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for primary button styles.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>secondary</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for secondary (hollow) button styles.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>inverted</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to invert a buttons background and font color.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>success</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for success button styles.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>warning</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for warning button styles.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>alert</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for alert button styles.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>disabled</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for disabled button styles.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>expanded</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to expand the button width to 100%.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>href</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span> 
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to button links.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>target</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> enum: <code>_blank</code>, <code>_parent</code>, <code>_self</code>, <code>_top</code>
          </Table.Data>
          <Table.Data>
            <span>Default:</span> 
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to specify where to open the link.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>type</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to 
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>name</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>value</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added to 
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

