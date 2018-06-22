import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

export default function DatepickerVars() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>
            Variable Name
          </Table.Header>
          <Table.Header>
            Default Value
          </Table.Header>
          <Table.Header>
            Description
          </Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.HeadSmall>
        <Table.Data>
          Datepicker Vars
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$card-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default background color for calendar.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-border</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$card-border</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default border for calendar.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-container-width</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>32rem</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default width of calendar container.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-width</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>32rem</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default width of calendar.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-max-height-animation</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>35rem</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Max-height of calendar animation.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-header-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$calendar-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Background color of calendar header
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$calendar-header-height</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$size-large</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default height of calendar header.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )

}

