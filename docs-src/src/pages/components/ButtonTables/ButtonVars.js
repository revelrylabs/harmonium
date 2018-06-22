import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

export default function ButtonVars() {
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
          Button Vars
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$brand</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default background color for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-border</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>0</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default border for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-color</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$white</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font color for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-bkgd-hover</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>darken($brand, 5%)</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default background color for buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-color-hover</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$white</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font color for buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-bkgd-active</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$darken($brand, 10%)</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default background color for buttons on active.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-color-active</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$white</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font color for buttons on active.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$button-radius</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$global-radius</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default border-radius for buttons.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )

}

