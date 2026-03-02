import {
  Heading,
  Text,
  Stat,
  Group,
  Stack,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Badge,
  Tag,
} from 'harmonium'
import type {Todo} from '../types'
import {IconTrendUp, IconTrendDown} from '../icons'

interface DashboardPageProps {
  todos: Todo[]
}

export function DashboardPage({todos}: DashboardPageProps) {
  const total = todos.length
  const completed = todos.filter((t) => t.completed).length
  const pending = total - completed
  const highPriority = todos.filter(
    (t) => t.priority === 'high' && !t.completed,
  ).length
  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0

  const categories = [...new Set(todos.map((t) => t.category))]
  const categoryStats = categories.map((cat) => ({
    name: cat,
    total: todos.filter((t) => t.category === cat).length,
    done: todos.filter((t) => t.category === cat && t.completed).length,
  }))

  const recentTodos = [...todos]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 5)

  return (
    <Stack gap="xl" style={{maxWidth: 960}}>
      <Stack gap="xs">
        <Heading level={2} size="lg" style={{letterSpacing: '-0.025em'}}>
          Dashboard
        </Heading>
        <Text color="muted" size="sm">
          Overview of your task progress
        </Text>
      </Stack>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 16,
      }}>
        <Stat
          label="Total Tasks"
          value={total}
          style={{background: '#fff'}}
        />
        <Stat
          label="Completed"
          value={completed}
          change={`${completionRate}%`}
          trend="up"
          icon={<IconTrendUp />}
          style={{background: '#fff'}}
        />
        <Stat
          label="Pending"
          value={pending}
          style={{background: '#fff'}}
        />
        <Stat
          label="High Priority"
          value={highPriority}
          trend={highPriority > 2 ? 'down' : 'neutral'}
          change={highPriority > 2 ? 'Needs attention' : 'On track'}
          icon={highPriority > 2 ? <IconTrendDown /> : undefined}
          style={{background: '#fff'}}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 16,
        alignItems: 'start',
      }}>
        <Card variant="outlined" style={{background: '#fff'}}>
          <CardHeader>Progress by Category</CardHeader>
          <CardBody>
            <Stack gap="lg">
              {categoryStats.map((cat) => (
                <Stack key={cat.name} gap="xs">
                  <Group justify="between">
                    <Text size="sm" weight="medium">{cat.name}</Text>
                    <Text size="xs" color="muted">
                      {cat.done}/{cat.total}
                    </Text>
                  </Group>
                  <Progress value={cat.done} max={cat.total} size="sm" />
                </Stack>
              ))}
            </Stack>
          </CardBody>
        </Card>

        <Card variant="outlined" style={{background: '#fff'}}>
          <CardHeader>Recent Tasks</CardHeader>
          <CardBody>
            <Stack gap="sm">
              {recentTodos.map((todo) => (
                <Group
                  key={todo.id}
                  justify="between"
                  align="center"
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid var(--harmonium-color-gray-50)',
                  }}
                >
                  <Text
                    size="sm"
                    as="span"
                    style={{
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      opacity: todo.completed ? 0.5 : 1,
                    }}
                  >
                    {todo.title}
                  </Text>
                  <Group gap="xs" style={{flexShrink: 0}}>
                    <Tag
                      size="sm"
                      variant={
                        todo.priority === 'high'
                          ? 'error'
                          : todo.priority === 'medium'
                            ? 'warning'
                            : 'neutral'
                      }
                    >
                      {todo.priority}
                    </Tag>
                    {todo.completed && (
                      <Badge variant="success" size="sm">Done</Badge>
                    )}
                  </Group>
                </Group>
              ))}
            </Stack>
          </CardBody>
        </Card>
      </div>
    </Stack>
  )
}
