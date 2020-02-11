import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'
import Layout from '../../../layouts/index.js'

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

      <Table.HeadStacked>
        <Table.Row>
          <Table.Header>Button Vars</Table.Header>
        </Table.Row>
      </Table.HeadStacked>

      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-bkgd</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-brand-primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default background color for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-border</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>0</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default border for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-color</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-white</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default font color for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-bkgd-hover</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>darken($color-brand-primary, 5%)</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default background color for buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-color-hover</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-white</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default font color for buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-bkgd-active</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$darken($color-brand-primary, 10%)</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default background color for buttons that are active.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-color-active</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-white</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default font color for buttons that are active.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-radius</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$border-radius-small</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default border-radius for buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-bkgd-secondary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>transparent</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default background color for secondary buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>button-box-shadow-secondary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-brand-primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default box-shadow for secondary buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-color-secondary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-brand-primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default font color for secondary buttons.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-bkgd-secondary-hover</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>darken($color-brand-primary, 5%)</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default background color for secondary buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-box-shadow-secondary-hover</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>darken($color-brand-primary, 5%)</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default box-shadow for secondary buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-color-secondary-hover</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-white</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default font color for secondary buttons on hover.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-bkgd-secondary-active</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>darken($color-brand-primary, 10%)</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default background color for secondary buttons that are active.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-box-shadow-secondary-active</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>darken($color-brand-primary, 10%)</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default box-shadow for secondary buttons that are active.
          </Table.Data>
        </Table.Row>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline> <code>$button-color-secondary-active</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline> <code>$color-white</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default color for secondary buttons that are active.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )

}

