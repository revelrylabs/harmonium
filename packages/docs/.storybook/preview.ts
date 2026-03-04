import type {Preview} from '@storybook/react'
import '../../harmonium/src/tokens/tokens.css'
import '../../harmonium/dist/harmonium.css'
import './preview.css'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {name: 'light', value: '#ffffff'},
        {name: 'subtle', value: '#f4f4f4'},
        {name: 'dark', value: '#1a1a1a'},
      ],
    },
  },
}

export default preview
