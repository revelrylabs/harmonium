import {useState} from 'react'
import {
  Heading,
  Text,
  Stack,
  Group,
  Button,
  Tag,
  Checkbox,
  ToggleGroup,
  ToggleGroupItem,
  EmptyState,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Field,
  FieldLabel,
  Input,
  Textarea,
  Select,
} from 'harmonium'
import type {Todo} from '../types'
import {IconPlus, IconTrash, IconInbox} from '../icons'

type Filter = 'all' | 'pending' | 'completed'

interface TodosPageProps {
  todos: Todo[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onAdd: (todo: Omit<Todo, 'id' | 'createdAt'>) => void
}

const todoCard: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: 12,
  padding: '14px 16px',
  background: '#fff',
  borderRadius: 'var(--harmonium-radius-lg)',
  border: '1px solid var(--harmonium-color-gray-100)',
  transition: 'border-color 150ms ease, box-shadow 150ms ease',
  cursor: 'default',
}

export function TodosPage({todos, onToggle, onDelete, onAdd}: TodosPageProps) {
  const [filter, setFilter] = useState<Filter>('all')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Todo['priority']>('medium')
  const [category, setCategory] = useState('Development')
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const filtered = todos.filter((t) => {
    if (filter === 'pending') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  const handleAdd = () => {
    if (!title.trim()) return
    onAdd({title: title.trim(), description: description.trim() || undefined, completed: false, priority, category})
    setTitle('')
    setDescription('')
    setPriority('medium')
    setCategory('Development')
    setDialogOpen(false)
  }

  const priorityVariant = (p: string) =>
    p === 'high' ? 'error' : p === 'medium' ? 'warning' : 'neutral'

  return (
    <Stack gap="xl" style={{maxWidth: 720}}>
      <Group justify="between" align="end">
        <Stack gap="xs">
          <Heading level={2} size="lg" style={{letterSpacing: '-0.025em'}}>
            Todos
          </Heading>
          <Text color="muted" size="sm">
            {todos.filter((t) => !t.completed).length} pending &middot;{' '}
            {todos.filter((t) => t.completed).length} completed
          </Text>
        </Stack>
        <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
          <span style={{display: 'flex', alignItems: 'center', gap: 6}}>
            <IconPlus /> Add Task
          </span>
        </Button>
      </Group>

      <ToggleGroup
        value={filter}
        onValueChange={(v) => setFilter(v as Filter)}
        size="sm"
      >
        <ToggleGroupItem value="all">All ({todos.length})</ToggleGroupItem>
        <ToggleGroupItem value="pending">
          Pending ({todos.filter((t) => !t.completed).length})
        </ToggleGroupItem>
        <ToggleGroupItem value="completed">
          Completed ({todos.filter((t) => t.completed).length})
        </ToggleGroupItem>
      </ToggleGroup>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<IconInbox />}
          title={
            filter === 'completed'
              ? 'No completed tasks'
              : filter === 'pending'
                ? 'All caught up!'
                : 'No tasks yet'
          }
          description={
            filter === 'all'
              ? 'Create your first task to get started.'
              : filter === 'pending'
                ? 'You\'ve completed all your tasks. Nice work.'
                : 'Complete some tasks to see them here.'
          }
          action={
            filter === 'all' ? (
              <Button variant="primary" size="sm" onClick={() => setDialogOpen(true)}>
                Create Task
              </Button>
            ) : undefined
          }
        />
      ) : (
        <Stack gap="xs">
          {filtered.map((todo) => (
            <div
              key={todo.id}
              style={{
                ...todoCard,
                borderColor: hoveredId === todo.id
                  ? 'var(--harmonium-color-gray-200)'
                  : 'var(--harmonium-color-gray-100)',
                boxShadow: hoveredId === todo.id
                  ? '0 1px 3px rgba(0,0,0,0.04)'
                  : 'none',
              }}
              onMouseEnter={() => setHoveredId(todo.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div style={{paddingTop: 2}}>
                <Checkbox
                  label=""
                  checked={todo.completed}
                  onChange={() => onToggle(todo.id)}
                />
              </div>
              <Stack gap="xs" style={{flex: 1, minWidth: 0}}>
                <Text
                  as="span"
                  weight="medium"
                  size="sm"
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    opacity: todo.completed ? 0.45 : 1,
                  }}
                >
                  {todo.title}
                </Text>
                {todo.description && (
                  <Text
                    size="xs"
                    color="muted"
                    as="span"
                    style={{opacity: todo.completed ? 0.4 : 1}}
                  >
                    {todo.description}
                  </Text>
                )}
                <Group gap="xs">
                  <Tag size="sm" variant={priorityVariant(todo.priority)}>
                    {todo.priority}
                  </Tag>
                  <Tag size="sm" variant="neutral">
                    {todo.category}
                  </Tag>
                </Group>
              </Stack>
              <button
                onClick={() => onDelete(todo.id)}
                aria-label={`Delete ${todo.title}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--harmonium-color-text-muted)',
                  padding: 4,
                  borderRadius: 4,
                  opacity: hoveredId === todo.id ? 1 : 0,
                  transition: 'opacity 150ms ease, color 150ms ease',
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--harmonium-color-error)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--harmonium-color-text-muted)')}
              >
                <IconTrash />
              </button>
            </div>
          ))}
        </Stack>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} size="md">
        <DialogHeader>New Task</DialogHeader>
        <DialogBody>
          <Stack gap="md">
            <Field>
              <FieldLabel>Title</FieldLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
              />
            </Field>
            <Field>
              <FieldLabel>Description</FieldLabel>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details..."
                rows={3}
              />
            </Field>
            <Group gap="md">
              <Field style={{flex: 1}}>
                <FieldLabel>Priority</FieldLabel>
                <Select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Todo['priority'])}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </Select>
              </Field>
              <Field style={{flex: 1}}>
                <FieldLabel>Category</FieldLabel>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Development</option>
                  <option>Design</option>
                  <option>Documentation</option>
                  <option>Quality</option>
                  <option>Release</option>
                </Select>
              </Field>
            </Group>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Group justify="end" gap="sm">
            <Button variant="ghost" size="sm" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAdd} disabled={!title.trim()}>
              Add Task
            </Button>
          </Group>
        </DialogFooter>
      </Dialog>
    </Stack>
  )
}
