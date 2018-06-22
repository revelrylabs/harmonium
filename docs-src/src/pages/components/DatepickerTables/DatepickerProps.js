import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

export default function DatepickerProps() {
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
          Datepicker Props
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>overlay</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for the calendar to overlay the content below the input.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>defaultValue</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
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
            <span>Name:</span> <code>dateFormat</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string (?)
          </Table.Data>
          <Table.Data>
            <span>Default:</span> 
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for custom date format.
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
            <span>Name:</span> <code>error</code>
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
            <span>Name:</span> <code>isOpen</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> bool
          </Table.Data>
          <Table.Data>
            <span>Default:</span> false
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for opening the calendar.
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
            <span>Description:</span> Prop added for disabling Datepicker input.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>overrides</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
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
            <span>Name:</span> <code>isSelectable</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
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
            <span>Name:</span> <code>style</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for inline styles
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>calendar</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
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
            <span>Name:</span> <code>week</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
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
            <span>Name:</span> <code>day</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> 
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
            <span>Name:</span> <code>headerDay</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span>
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
            <span>Name:</span> <code>onChange</code>
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
            <span>Name:</span> <code>alert</code>
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
            <span>Name:</span> <code>hightlights</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span>
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

