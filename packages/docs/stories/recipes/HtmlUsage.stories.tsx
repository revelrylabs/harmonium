import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'

/**
 * Raw HTML rendered using Harmonium's global CSS classes.
 * These examples use .hm-* classes instead of React components,
 * demonstrating how non-React projects consume Harmonium.
 */

function HtmlExamples() {
  return (
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      <div className="hm-stack" data-gap="lg">
        <div>
          <h1 style={{margin: '0 0 4px', fontSize: '1.5rem'}}>
            HTML + CSS Usage
          </h1>
          <p style={{margin: 0, color: '#666', fontSize: '0.875rem'}}>
            These components are rendered using plain HTML with{' '}
            <code>.hm-*</code> CSS classes — no React, no JavaScript.
          </p>
        </div>

        {/* Buttons */}
        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Buttons</strong>
          </div>
          <div className="hm-card-body">
            <div className="hm-group" data-gap="sm">
              <button className="hm-button" data-variant="primary">
                Primary
              </button>
              <button className="hm-button" data-variant="secondary">
                Secondary
              </button>
              <button className="hm-button" data-variant="outline">
                Outline
              </button>
              <button className="hm-button" data-variant="ghost">
                Ghost
              </button>
              <button className="hm-button" data-variant="primary" data-size="sm">
                Small
              </button>
              <button className="hm-button" data-variant="primary" data-size="lg">
                Large
              </button>
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Badges</strong>
          </div>
          <div className="hm-card-body">
            <div className="hm-group" data-gap="sm">
              <span className="hm-badge" data-variant="primary">Primary</span>
              <span className="hm-badge" data-variant="success">Success</span>
              <span className="hm-badge" data-variant="warning">Warning</span>
              <span className="hm-badge" data-variant="error">Error</span>
              <span className="hm-badge" data-variant="neutral">Neutral</span>
            </div>
          </div>
        </div>

        {/* Card */}
        <div className="hm-card" data-variant="elevated">
          <div className="hm-card-header">
            <strong>Card with Form</strong>
          </div>
          <div className="hm-card-body">
            <div className="hm-stack" data-gap="md">
              <div className="hm-field">
                <label className="hm-field-label">Email</label>
                <input
                  className="hm-input"
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
              <div className="hm-field">
                <label className="hm-field-label">Password</label>
                <input
                  className="hm-input"
                  type="password"
                  placeholder="Enter password"
                />
              </div>
            </div>
          </div>
          <div className="hm-card-footer">
            <div className="hm-group" data-justify="end" data-gap="sm">
              <button className="hm-button" data-variant="outline">
                Cancel
              </button>
              <button className="hm-button" data-variant="primary">
                Submit
              </button>
            </div>
          </div>
        </div>

        {/* Alert */}
        <div className="hm-alert" data-variant="info">
          <div className="hm-alert-content">
            This is an info alert rendered with plain HTML classes.
          </div>
        </div>

        {/* Grid */}
        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Responsive Grid</strong>
          </div>
          <div className="hm-card-body">
            <div
              className="hm-grid"
              data-gap="md"
              data-responsive-columns=""
              style={
                {
                  '--grid-columns': 'repeat(1, 1fr)',
                  '--grid-columns-md': 'repeat(3, 1fr)',
                } as React.CSSProperties
              }
            >
              <div className="hm-grid-col">
                <div className="hm-card" data-variant="outlined">
                  <div className="hm-card-body">Column 1</div>
                </div>
              </div>
              <div className="hm-grid-col">
                <div className="hm-card" data-variant="outlined">
                  <div className="hm-card-body">Column 2</div>
                </div>
              </div>
              <div className="hm-grid-col">
                <div className="hm-card" data-variant="outlined">
                  <div className="hm-card-body">Column 3</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Table</strong>
          </div>
          <div className="hm-card-body">
            <table className="hm-table" data-striped="" data-hoverable="">
              <thead className="hm-table-head">
                <tr className="hm-table-row">
                  <th className="hm-table-header-cell">Name</th>
                  <th className="hm-table-header-cell">Role</th>
                  <th className="hm-table-header-cell">Status</th>
                </tr>
              </thead>
              <tbody className="hm-table-body">
                <tr className="hm-table-row">
                  <td className="hm-table-cell">Alice</td>
                  <td className="hm-table-cell">Admin</td>
                  <td className="hm-table-cell">
                    <span className="hm-badge" data-variant="success" data-size="sm">
                      Active
                    </span>
                  </td>
                </tr>
                <tr className="hm-table-row">
                  <td className="hm-table-cell">Bob</td>
                  <td className="hm-table-cell">Editor</td>
                  <td className="hm-table-cell">
                    <span className="hm-badge" data-variant="warning" data-size="sm">
                      Pending
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Progress */}
        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Progress & Spinner</strong>
          </div>
          <div className="hm-card-body">
            <div className="hm-stack" data-gap="md">
              <div className="hm-progress" data-variant="primary">
                <div
                  className="hm-progress-bar"
                  style={{width: '65%'}}
                  role="progressbar"
                  aria-valuenow={65}
                />
              </div>
              <div className="hm-group" data-gap="md" data-align="center">
                <div className="hm-spinner" data-size="sm" />
                <span style={{fontSize: '0.875rem', color: '#666'}}>
                  Loading...
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Guides/HTML + CSS Usage',
  parameters: {
    docs: {
      description: {
        component: `
Use Harmonium without React — in Phoenix/LiveView, Vue, Rails, or plain HTML.

## Setup

Include the global CSS file in your project:

\`\`\`html
<link rel="stylesheet" href="node_modules/harmonium/dist/harmonium.css">
\`\`\`

Or import in your bundler:

\`\`\`css
@import 'harmonium/harmonium.css';
\`\`\`

## Usage

Use \`.hm-*\` CSS classes with \`data-*\` attributes for variants:

\`\`\`html
<button class="hm-button" data-variant="primary" data-size="md">
  Click me
</button>

<div class="hm-card" data-variant="elevated">
  <div class="hm-card-header">Title</div>
  <div class="hm-card-body">Content</div>
  <div class="hm-card-footer">Actions</div>
</div>

<div class="hm-stack" data-direction="vertical" data-gap="md">
  <div class="hm-field">
    <label class="hm-field-label">Email</label>
    <input class="hm-input" type="email" />
  </div>
  <button class="hm-button" data-variant="primary">Submit</button>
</div>
\`\`\`

## Theming

Override CSS custom properties — identical to React usage:

\`\`\`css
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-radius-md: 8px;
}
\`\`\`

## Class Reference

| React Component | HTML Class | Data Attributes |
|----------------|------------|-----------------|
| \`<Button>\` | \`.hm-button\` | \`data-variant\`, \`data-size\`, \`data-expanded\` |
| \`<Card>\` | \`.hm-card\` | \`data-variant\`, \`data-padding\` |
| \`<CardHeader>\` | \`.hm-card-header\` | — |
| \`<CardBody>\` | \`.hm-card-body\` | — |
| \`<CardFooter>\` | \`.hm-card-footer\` | — |
| \`<Stack>\` | \`.hm-stack\` | \`data-direction\`, \`data-gap\`, \`data-align\`, \`data-justify\`, \`data-wrap\` |
| \`<Group>\` | \`.hm-group\` | \`data-gap\`, \`data-align\`, \`data-justify\`, \`data-wrap\`, \`data-grow\` |
| \`<Grid>\` | \`.hm-grid\` | \`data-gap\`, \`data-align\` + \`--grid-columns\` CSS var |
| \`<GridCol>\` | \`.hm-grid-col\` | \`--col-span\` CSS var |
| \`<Input>\` | \`.hm-input\` | \`data-size\` |
| \`<Textarea>\` | \`.hm-textarea\` | — |
| \`<Select>\` | \`.hm-select\` | \`data-size\` |
| \`<Badge>\` | \`.hm-badge\` | \`data-variant\`, \`data-size\` |
| \`<Alert>\` | \`.hm-alert\` | \`data-variant\`, \`data-dismissible\` |
| \`<Table>\` | \`.hm-table\` | \`data-striped\`, \`data-hoverable\` |
| \`<Progress>\` | \`.hm-progress\` | \`data-variant\`, \`data-size\` |
| \`<Spinner>\` | \`.hm-spinner\` | \`data-size\` |
| \`<Separator>\` | \`.hm-separator\` | \`data-orientation\`, \`data-spacing\` |
| \`<Avatar>\` | \`.hm-avatar\` | \`data-size\` |
| \`<Container>\` | \`.hm-container\` | \`data-size\`, \`data-padding\` |
        `,
      },
    },
  },
}

export default meta

export const LivePreview: StoryObj = {
  render: () => <HtmlExamples />,
}
