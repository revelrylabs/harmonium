import type {Meta, StoryObj} from '@storybook/react'
import {FileUpload} from 'harmonium'

const meta = {
  title: 'Forms/FileUpload',
  component: FileUpload,
  parameters: {
    docs: {
      description: {
        component: `Drag-and-drop file upload zone. Supports file type filtering, multiple files, and max size validation.

\`\`\`tsx
import { FileUpload } from 'harmonium'

<FileUpload
  accept="image/*"
  multiple
  maxSize={5_000_000}
  onChange={(files) => handleFiles(files)}
/>
\`\`\`

Pass custom children to replace the default drop zone content. Files exceeding \`maxSize\` are automatically filtered out.`,
      },
    },
  },
} satisfies Meta<typeof FileUpload>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <FileUpload
      accept="image/*,.pdf"
      onChange={(files) => alert(`Selected: ${files.map((f) => f.name).join(', ')}`)}
    />
  ),
}

export const CustomContent: Story = {
  render: () => (
    <FileUpload accept="image/*" onChange={(files) => console.log(files)}>
      <div style={{textAlign: 'center'}}>
        <p><strong>Upload your photo</strong></p>
        <p style={{fontSize: '14px', color: 'var(--harmonium-color-text-muted)'}}>PNG, JPG up to 5MB</p>
      </div>
    </FileUpload>
  ),
}
