import type {StorybookConfig} from '@storybook/react-vite'
import {resolve} from 'path'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve || {}
    config.resolve.alias = {
      ...config.resolve.alias,
      harmonium: resolve(__dirname, '../../harmonium/src'),
    }
    return config
  },
}

export default config
