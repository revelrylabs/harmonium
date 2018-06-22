import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

export default function InputProps() {
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
          Input Props
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>placeholder</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span> 
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop used to display a short hint in the input before the user enters a value.
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
            <span>Description:</span> Prop added for input errors.
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
            <span>Description:</span> Prop added for input label.
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
            <span>Description:</span> Prop added for input help text.
          </Table.Data>
        </Table.Row>
        
        <Table.Row>
          <Table.Data>
            <span>Name:</span> <code>button</code>
          </Table.Data>
          <Table.Data>
            <span>Type:</span> string
          </Table.Data>
          <Table.Data>
            <span>Default:</span>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Prop added for button text on FileInputs.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

