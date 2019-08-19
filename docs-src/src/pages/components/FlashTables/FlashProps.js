import React, {Component} from 'react'
import Table from 'harmonium/lib/Table'
import Layout from '../../../layouts/index.js'

export default function FlashProps() {
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
        <Table.Data>Flash Props</Table.Data>
      </Table.HeadStacked>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>Default</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> False
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline>{' '}
            <span>
              {' '}
              Prop added for info flash. Adds the class <code>rev-Flash</code>
            </span>
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
            <Table.HeaderInline>Default:</Table.HeaderInline> False
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline>{' '}
            <span>
              {' '}
              Prop added for success flash. Adds the class{' '}
              <code>rev-Flash--success</code>
            </span>
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
            <Table.HeaderInline>Default:</Table.HeaderInline> False
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline>{' '}
            <span>
              {' '}
              Prop added for warning flash. Adds the class{' '}
              <code>rev-Flash--warning</code>
            </span>
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
            <Table.HeaderInline>Default:</Table.HeaderInline> False
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline>{' '}
            <span>
              {' '}
              Prop added for alert flash. Adds the class{' '}
              <code>rev-Flash--alert</code>
            </span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline>{' '}
            <code>persistent</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> False
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline>{' '}
            <span>
              {' '}
              Prop added for persistent flash. Adds the class{' '}
              <code>rev-Flash--persistent</code>
            </span>
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Name:</Table.HeaderInline> <code>fade</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Type:</Table.HeaderInline> bool
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default:</Table.HeaderInline> False
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline>{' '}
            <span>
              {' '}
              Prop added for fade flash. Adds the class{' '}
              <code>rev-Flash--fade</code> And fades out after 5secs
            </span>
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
