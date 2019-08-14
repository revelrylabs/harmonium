import React from 'react'
import Table from 'harmonium-react/lib/Table'
import Layout from '../../../layouts/index.js'

export default function InputVars() {
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
        <Table.Row>
          <Table.Header>Input Vars</Table.Header>
        </Table.Row>
      </Table.HeadStacked>
      <Table.Body>
        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-height</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>40px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default height
            for slider component container.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-track-height</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>3px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default height
            for slider track.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-track-padding-right</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$global-padding</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default
            right-padding for the slider.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-track-color</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$light-gray</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default color
            for the slider track.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-input-height</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>25px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default height
            for text input.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-input-width</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>80px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default width
            for text input.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-input-margin</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>80px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default margin
            for text input.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-thumb-width</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>16px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default width
            for the slider thumb.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-thumb-height</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>16px</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default height
            for the slider thumb.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-thumb-border-radius</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>50%</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default border
            radius for the slider thumb.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-thumb-background</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default
            background color for the slider thumb.
          </Table.Data>
        </Table.Row>

        <Table.Row>
          <Table.Data>
            <Table.HeaderInline>Var:</Table.HeaderInline>{' '}
            <code>$slider-progress-color</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Default Value:</Table.HeaderInline>{' '}
            <code>$primary</code>
          </Table.Data>
          <Table.Data>
            <Table.HeaderInline>Description:</Table.HeaderInline> Default
            background color of the slider progress bar.
          </Table.Data>
        </Table.Row>
      </Table.Body>
    </Table>
  )
}
