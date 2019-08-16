import React, {Component} from 'react'
import Table from 'harmonium/lib/Table'
import Layout from '../../../layouts/index.js'

export default function FlashVars() {
  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.Header>Variable Name</Table.Header>
          <Table.Header>Default Value</Table.Header>
          <Table.Header>Description</Table.Header>
        </Table.Row>
      </Table.Head>
      <Table.HeadStacked>
        <Table.Data>Flash Vars</Table.Data>
      </Table.HeadStacked>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$flash-background</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default
            background color for Flash.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$flash-border-size</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>1px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default border
            for Flash.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$flash-border-color</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$divider-color-dark</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default border
            color for Flash.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$flash-color</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$white</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default font
            color for Flash.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$flash-padding</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$global-vertical-space, $global-horizontal-space</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default
            padding for Flash.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
