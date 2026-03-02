import {useState, useCallback} from 'react'
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellMain,
  TopBar,
  TopBarSection,
  Sidebar,
  SidebarSection,
  SidebarItem,
  Avatar,
  Badge,
  Text,
} from 'harmonium'
import type {Page, Todo} from './types'
import {initialTodos} from './data'
import {DashboardPage} from './pages/Dashboard'
import {TodosPage} from './pages/Todos'
import {SettingsPage} from './pages/Settings'
import {IconDashboard, IconTodo, IconSettings} from './icons'

export function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [todos, setTodos] = useState<Todo[]>(initialTodos)

  const addTodo = useCallback((todo: Omit<Todo, 'id' | 'createdAt'>) => {
    setTodos((prev) => [
      ...prev,
      {...todo, id: crypto.randomUUID(), createdAt: new Date()},
    ])
  }, [])

  const toggleTodo = useCallback((id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? {...t, completed: !t.completed} : t)),
    )
  }, [])

  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const pendingCount = todos.filter((t) => !t.completed).length

  return (
    <AppShell>
      <AppShellHeader>
        <TopBar>
          <TopBarSection align="left">
            <Text as="span" weight="semibold" size="md" style={{letterSpacing: '-0.02em'}}>
              TaskFlow
            </Text>
          </TopBarSection>
          <TopBarSection align="right">
            <Avatar fallback="JD" size="sm" />
          </TopBarSection>
        </TopBar>
      </AppShellHeader>
      <AppShellSidebar>
        <Sidebar width="sm" style={{background: '#fff', paddingTop: '8px'}}>
          <SidebarSection label="Menu">
            <SidebarItem
              active={page === 'dashboard'}
              icon={<IconDashboard />}
              onClick={() => setPage('dashboard')}
            >
              Dashboard
            </SidebarItem>
            <SidebarItem
              active={page === 'todos'}
              icon={<IconTodo />}
              onClick={() => setPage('todos')}
            >
              <span style={{display: 'flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'space-between'}}>
                Todos
                {pendingCount > 0 && (
                  <Badge variant="primary" size="sm">{pendingCount}</Badge>
                )}
              </span>
            </SidebarItem>
            <SidebarItem
              active={page === 'settings'}
              icon={<IconSettings />}
              onClick={() => setPage('settings')}
            >
              Settings
            </SidebarItem>
          </SidebarSection>
        </Sidebar>
      </AppShellSidebar>
      <AppShellMain style={{background: '#fafafa', padding: '32px'}}>
        {page === 'dashboard' && <DashboardPage todos={todos} />}
        {page === 'todos' && (
          <TodosPage
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onAdd={addTodo}
          />
        )}
        {page === 'settings' && <SettingsPage />}
      </AppShellMain>
    </AppShell>
  )
}
