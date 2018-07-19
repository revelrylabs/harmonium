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
      <Table.HeadStacked>
        <Table.Data>
          Input Props
        </Table.Data>
      </Table.HeadStacked>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>placeholder</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> 
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Prop used to display a short hint in the input before the user enters a value.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>error</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool, string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> 
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Prop added for input errors.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>label</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Prop added for input label.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>help</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Prop added for input help text.
          </Table.Data>
        </Table.Row>
        
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>button</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> string
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Prop added for button text on FileInputs.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}

