import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'

function PhoenixGuide() {
  return (
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      <div className="hm-stack" data-gap="lg">
        <div>
          <h1 style={{margin: '0 0 4px', fontSize: '1.5rem'}}>
            Phoenix / LiveView Integration
          </h1>
          <p style={{margin: 0, color: '#666'}}>
            Use Harmonium&apos;s design system in your Phoenix and LiveView
            projects with plain HEEX templates.
          </p>
        </div>

        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Example: Login Form in HEEX</strong>
          </div>
          <div className="hm-card-body">
            {/* Rendered version of the HEEX example */}
            <div style={{maxWidth: 400, margin: '0 auto'}}>
              <div className="hm-card" data-variant="elevated">
                <div className="hm-card-header">
                  <div className="hm-stack" data-gap="xs">
                    <strong style={{fontSize: '1.25rem'}}>Sign in</strong>
                    <span style={{color: '#666', fontSize: '0.875rem'}}>
                      Enter your credentials below
                    </span>
                  </div>
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
                    <button className="hm-button" data-variant="primary">
                      Sign in
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: 'Guides/Phoenix LiveView',
  parameters: {
    docs: {
      description: {
        component: `
## Setup

1. Install Harmonium via npm:

\`\`\`bash
cd assets && npm install harmonium
\`\`\`

2. Import the global CSS in your \`assets/css/app.css\`:

\`\`\`css
@import "harmonium/harmonium.css";
\`\`\`

That's it — no JavaScript configuration, no build plugins.

## HEEX Templates

### Button

\`\`\`heex
<button class="hm-button" data-variant="primary" data-size="md">
  Save changes
</button>

<button class="hm-button" data-variant="outline">
  Cancel
</button>
\`\`\`

### Card with Form

\`\`\`heex
<div class="hm-card" data-variant="elevated">
  <div class="hm-card-header">
    <h3>Account Settings</h3>
  </div>
  <div class="hm-card-body">
    <.form for={@form} phx-submit="save">
      <div class="hm-stack" data-gap="md">
        <div class="hm-field">
          <label class="hm-field-label">Name</label>
          <.input field={@form[:name]} class="hm-input" />
        </div>
        <div class="hm-field">
          <label class="hm-field-label">Email</label>
          <.input field={@form[:email]} class="hm-input" type="email" />
        </div>
        <div class="hm-group" data-justify="end" data-gap="sm">
          <button class="hm-button" data-variant="outline" type="button">
            Cancel
          </button>
          <button class="hm-button" data-variant="primary" type="submit">
            Save
          </button>
        </div>
      </div>
    </.form>
  </div>
</div>
\`\`\`

### Layout with Stack and Grid

\`\`\`heex
<div class="hm-stack" data-gap="lg">
  <div class="hm-grid" data-gap="md"
    style="--grid-columns: repeat(1, 1fr)"
    data-responsive-columns
    style="--grid-columns-md: repeat(3, 1fr)">
    <div class="hm-grid-col">
      <div class="hm-card">
        <div class="hm-card-body">
          <strong>Users</strong>
          <p>1,234</p>
        </div>
      </div>
    </div>
    <div class="hm-grid-col">
      <div class="hm-card">
        <div class="hm-card-body">
          <strong>Revenue</strong>
          <p>$12,345</p>
        </div>
      </div>
    </div>
    <div class="hm-grid-col">
      <div class="hm-card">
        <div class="hm-card-body">
          <strong>Orders</strong>
          <p>567</p>
        </div>
      </div>
    </div>
  </div>
</div>
\`\`\`

### Table

\`\`\`heex
<table class="hm-table" data-striped data-hoverable>
  <thead class="hm-table-head">
    <tr class="hm-table-row">
      <th class="hm-table-header-cell">Name</th>
      <th class="hm-table-header-cell">Email</th>
      <th class="hm-table-header-cell">Status</th>
    </tr>
  </thead>
  <tbody class="hm-table-body">
    <%= for user <- @users do %>
      <tr class="hm-table-row">
        <td class="hm-table-cell"><%= user.name %></td>
        <td class="hm-table-cell"><%= user.email %></td>
        <td class="hm-table-cell">
          <span class="hm-badge" data-variant="success" data-size="sm">
            Active
          </span>
        </td>
      </tr>
    <% end %>
  </tbody>
</table>
\`\`\`

### Alert

\`\`\`heex
<%= if @flash["info"] do %>
  <div class="hm-alert" data-variant="info">
    <div class="hm-alert-content"><%= @flash["info"] %></div>
  </div>
<% end %>
\`\`\`

## Theming

Override tokens in your \`app.css\`:

\`\`\`css
@import "harmonium/harmonium.css";

:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-radius-md: 8px;
  --harmonium-font-family-sans: 'Inter', sans-serif;
}
\`\`\`

## LiveView Components

You can wrap Harmonium classes in reusable Phoenix components:

\`\`\`elixir
defmodule MyAppWeb.Components.UI do
  use Phoenix.Component

  attr :variant, :string, default: "primary"
  attr :size, :string, default: "md"
  attr :rest, :global
  slot :inner_block, required: true

  def button(assigns) do
    ~H\"\"\"
    <button class="hm-button" data-variant={@variant} data-size={@size} {@rest}>
      <%= render_slot(@inner_block) %>
    </button>
    \"\"\"
  end

  attr :variant, :string, default: "elevated"
  attr :padding, :string, default: "md"
  slot :inner_block, required: true

  def card(assigns) do
    ~H\"\"\"
    <div class="hm-card" data-variant={@variant} data-padding={@padding}>
      <%= render_slot(@inner_block) %>
    </div>
    \"\"\"
  end
end
\`\`\`

Usage:

\`\`\`heex
<.button variant="primary">Save</.button>
<.card variant="elevated">
  <div class="hm-card-body">Content</div>
</.card>
\`\`\`
        `,
      },
    },
  },
}

export default meta

export const Preview: StoryObj = {
  render: () => <PhoenixGuide />,
}
