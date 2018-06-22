import React, { Component } from 'react'
import Table from 'harmonium/lib/Table'

export default function InputVars() {
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
          Input Vars
        </Table.Data>
      </Table.HeadSmall>
      <Table.Body>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$white</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default background color for inputs.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-bkgd-focus</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$input-bkgd</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Background color for inputs on focus.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-box-shadow</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>0 0 0 1px $divider-color inset</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default box-shadow for inputs.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-box-shadow-focus</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>0 0 0 1px $divider-color-dark inset</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default box-shadow for inputs on focus.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-radius</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$global-radius</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default border-radius for inputs.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-color</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$body-font-color</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font color of inputs.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-color-focus</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$input-color</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font color of inputs on focus.
          </Table.Data>
        </Table.Row>
        
        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$input-font-size</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$global-font-size</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font size of inputs.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$label-color</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$body-font-color</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font color of input labels.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <span>Var:</span> <code>$label-font-size</code>
          </Table.Data>
          <Table.Data>
            <span>Default Value:</span> <code>$global-font-size</code>
          </Table.Data>
          <Table.Data>
            <span>Description:</span> Default font size of input labels.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )

}

