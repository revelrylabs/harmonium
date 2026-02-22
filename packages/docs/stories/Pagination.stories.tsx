import type {Meta, StoryObj} from '@storybook/react'
import {Pagination} from 'harmonium'
import {useState} from 'react'

const meta = {
  title: 'Navigation/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `Page navigation with previous/next buttons and page numbers.

\`\`\`tsx
import { Pagination } from 'harmonium'

<Pagination page={currentPage} totalPages={10} onPageChange={setCurrentPage} />
\`\`\`

All three props (\`page\`, \`totalPages\`, \`onPageChange\`) are required. \`page\` is 1-based.
Set \`maxVisible\` to control how many page buttons are shown (default: 5).`,
      },
    },
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => {
    const [page, setPage] = useState(1)
    return <Pagination page={page} totalPages={10} onPageChange={setPage} />
  },
}

export const ManyPages: Story = {
  render: () => {
    const [page, setPage] = useState(5)
    return <Pagination page={page} totalPages={50} onPageChange={setPage} />
  },
}
