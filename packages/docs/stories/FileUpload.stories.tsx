import type {Meta, StoryObj} from '@storybook/react'
import {FileUpload} from 'harmonium'

const meta = {
  title: 'Forms/FileUpload',
  component: FileUpload,
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
