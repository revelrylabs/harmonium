import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'

function VueGuide() {
  return (
    <div style={{maxWidth: 800, margin: '0 auto'}}>
      <div className="hm-stack" data-gap="lg">
        <div>
          <h1 style={{margin: '0 0 4px', fontSize: '1.5rem'}}>
            Vue Integration
          </h1>
          <p style={{margin: 0, color: '#666'}}>
            Use Harmonium&apos;s design system in Vue projects with the global
            CSS file.
          </p>
        </div>

        <div className="hm-card">
          <div className="hm-card-header">
            <strong>Example: Card with Form</strong>
          </div>
          <div className="hm-card-body">
            <div style={{maxWidth: 400, margin: '0 auto'}}>
              <div className="hm-card" data-variant="elevated">
                <div className="hm-card-header">
                  <strong>Contact Us</strong>
                </div>
                <div className="hm-card-body">
                  <div className="hm-stack" data-gap="md">
                    <div className="hm-field">
                      <label className="hm-field-label">Name</label>
                      <input className="hm-input" placeholder="Your name" />
                    </div>
                    <div className="hm-field">
                      <label className="hm-field-label">Message</label>
                      <textarea
                        className="hm-textarea"
                        placeholder="Your message"
                        rows={3}
                      />
                    </div>
                    <button className="hm-button" data-variant="primary">
                      Send
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
  title: 'Guides/Vue',
  parameters: {
    docs: {
      description: {
        component: `
## Setup

1. Install Harmonium:

\`\`\`bash
npm install harmonium
\`\`\`

2. Import the global CSS in your \`main.ts\` or \`main.js\`:

\`\`\`ts
import 'harmonium/harmonium.css'
\`\`\`

Or in a CSS/SCSS file:

\`\`\`css
@import 'harmonium/harmonium.css';
\`\`\`

## Vue Templates

### Button

\`\`\`vue
<template>
  <button class="hm-button" data-variant="primary" @click="handleClick">
    Save changes
  </button>
</template>
\`\`\`

### Card with Form

\`\`\`vue
<template>
  <div class="hm-card" data-variant="elevated">
    <div class="hm-card-header">
      <h3>Settings</h3>
    </div>
    <div class="hm-card-body">
      <div class="hm-stack" data-gap="md">
        <div class="hm-field">
          <label class="hm-field-label">Name</label>
          <input class="hm-input" v-model="name" />
        </div>
        <div class="hm-field">
          <label class="hm-field-label">Email</label>
          <input class="hm-input" type="email" v-model="email" />
        </div>
      </div>
    </div>
    <div class="hm-card-footer">
      <div class="hm-group" data-justify="end" data-gap="sm">
        <button class="hm-button" data-variant="outline" @click="cancel">
          Cancel
        </button>
        <button class="hm-button" data-variant="primary" @click="save">
          Save
        </button>
      </div>
    </div>
  </div>
</template>
\`\`\`

### Responsive Grid

\`\`\`vue
<template>
  <div class="hm-grid" data-gap="md" data-responsive-columns
    :style="{ '--grid-columns': 'repeat(1, 1fr)', '--grid-columns-md': 'repeat(3, 1fr)' }">
    <div class="hm-grid-col" v-for="item in items" :key="item.id">
      <div class="hm-card">
        <div class="hm-card-body">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>
\`\`\`

### Table with v-for

\`\`\`vue
<template>
  <table class="hm-table" data-striped data-hoverable>
    <thead class="hm-table-head">
      <tr class="hm-table-row">
        <th class="hm-table-header-cell">Name</th>
        <th class="hm-table-header-cell">Status</th>
      </tr>
    </thead>
    <tbody class="hm-table-body">
      <tr class="hm-table-row" v-for="user in users" :key="user.id">
        <td class="hm-table-cell">{{ user.name }}</td>
        <td class="hm-table-cell">
          <span class="hm-badge" :data-variant="user.active ? 'success' : 'error'" data-size="sm">
            {{ user.active ? 'Active' : 'Inactive' }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>
\`\`\`

### Dynamic Variants with Vue Bindings

\`\`\`vue
<template>
  <button
    class="hm-button"
    :data-variant="isPrimary ? 'primary' : 'outline'"
    :data-size="size"
    :disabled="loading"
  >
    <span v-if="loading" class="hm-spinner" data-size="sm" />
    {{ label }}
  </button>
</template>
\`\`\`

## Vue Wrapper Components (Optional)

You can create thin wrapper components for convenience:

\`\`\`vue
<!-- components/HmButton.vue -->
<template>
  <button
    class="hm-button"
    :data-variant="variant"
    :data-size="size"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}>(), {
  variant: 'primary',
  size: 'md',
})
</script>
\`\`\`

Usage:

\`\`\`vue
<HmButton variant="primary" @click="save">Save</HmButton>
<HmButton variant="outline" size="sm">Cancel</HmButton>
\`\`\`

## Theming

Same as every other framework — just CSS:

\`\`\`css
:root {
  --harmonium-color-brand-primary: #E91E63;
  --harmonium-radius-md: 8px;
}
\`\`\`
        `,
      },
    },
  },
}

export default meta

export const Preview: StoryObj = {
  render: () => <VueGuide />,
}
