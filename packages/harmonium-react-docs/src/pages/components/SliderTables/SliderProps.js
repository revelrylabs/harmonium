import React from 'react'
import Table from 'harmonium-react/lib/Table'
import Layout from '../../../layouts/index.js'

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
        <Table.Row>
          <Table.Header>Input Props</Table.Header>
        </Table.Row>
      </Table.HeadStacked>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>initialValue</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> number
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default</Table.HeaderInline> 25
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> The starting value of the slider.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>min</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> number
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default</Table.HeaderInline> 0
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> The minimum value of the range slider.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>max</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> number
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default</Table.HeaderInline> 100
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> The maximum value of the range slider.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>step</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> number
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default</Table.HeaderInline> 1
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> The interval to increment or decrement the slider
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
            <Table.HeaderInline>Default</Table.HeaderInline> slider
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> The name attribute for the text input field.
          </Table.Data>
        </Table.Row>

      </Table.Body>
    </Table>
  )
}
