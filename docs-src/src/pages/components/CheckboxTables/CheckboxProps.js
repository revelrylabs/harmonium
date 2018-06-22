import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

export default function CheckboxProps() {
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
          Checkbox Props
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>stacked</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for stacked checkboxes.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>stackedForSmall</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for stacked checkboxes on small screens only.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>stackedForMedium</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false 
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for stacked checkboxes on medium screens down.
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
            <span>Description:</span> Prop added for 
          </Table.Data>
        </Table.Row>
        
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>options</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> array
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for 
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>value</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> any
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for 
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>defaultValue</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> any
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for 
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>label</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>help</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>error</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool, string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>onChnage</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> func
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>readOnly</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>className</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

