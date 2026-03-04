import type {Meta, StoryObj} from '@storybook/react'
import React from 'react'
import {
  AppShell,
  AppShellHeader,
  AppShellSidebar,
  AppShellMain,
  Sidebar,
  SidebarSection,
  SidebarItem,
  Grid,
  GridCol,
  Stat,
  Card,
  CardBody,
  CardHeader,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Badge,
  Avatar,
  Stack,
  Group,
  Progress,
} from 'harmonium'

const recentOrders = [
  {id: 'ORD-001', customer: 'Alice Johnson', amount: '$249.00', status: 'Completed', date: 'Mar 3, 2026'},
  {id: 'ORD-002', customer: 'Bob Smith', amount: '$149.00', status: 'Processing', date: 'Mar 3, 2026'},
  {id: 'ORD-003', customer: 'Carol White', amount: '$599.00', status: 'Completed', date: 'Mar 2, 2026'},
  {id: 'ORD-004', customer: 'Dave Brown', amount: '$89.00', status: 'Pending', date: 'Mar 2, 2026'},
  {id: 'ORD-005', customer: 'Eve Davis', amount: '$329.00', status: 'Completed', date: 'Mar 1, 2026'},
]

const statusVariant: Record<string, 'success' | 'warning' | 'primary'> = {
  Completed: 'success',
  Processing: 'primary',
  Pending: 'warning',
}

function DashboardLayout() {
  return (
    <AppShell>
      <AppShellHeader>
        <Group
          justify="between"
          align="center"
          style={{padding: '12px 24px'}}
        >
          <strong style={{fontSize: '1.125rem'}}>Acme Dashboard</strong>
          <Group gap="sm" align="center">
            <span style={{fontSize: '0.875rem', color: '#666'}}>
              Jane Doe
            </span>
            <Avatar fallback="JD" size="sm" />
          </Group>
        </Group>
      </AppShellHeader>

      <AppShellSidebar>
        <Sidebar>
          <SidebarSection>
            <SidebarItem active>Dashboard</SidebarItem>
            <SidebarItem>Orders</SidebarItem>
            <SidebarItem>Products</SidebarItem>
            <SidebarItem>Customers</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Analytics">
            <SidebarItem>Reports</SidebarItem>
            <SidebarItem>Insights</SidebarItem>
          </SidebarSection>
          <SidebarSection label="Settings">
            <SidebarItem>General</SidebarItem>
            <SidebarItem>Billing</SidebarItem>
          </SidebarSection>
        </Sidebar>
      </AppShellSidebar>

      <AppShellMain>
        <div style={{padding: 24}}>
          <Stack gap="lg">
            <div>
              <h1 style={{margin: '0 0 4px', fontSize: '1.5rem'}}>
                Dashboard
              </h1>
              <p style={{margin: 0, color: '#666', fontSize: '0.875rem'}}>
                Welcome back, Jane. Here&apos;s what&apos;s happening today.
              </p>
            </div>

            <Grid columns={{base: 1, sm: 2, lg: 4}} gap="md">
              <GridCol>
                <Stat label="Revenue" value="$12,426" change="+14.2%" trend="up" />
              </GridCol>
              <GridCol>
                <Stat label="Orders" value="356" change="+8.1%" trend="up" />
              </GridCol>
              <GridCol>
                <Stat label="Customers" value="1,203" change="+3.4%" trend="up" />
              </GridCol>
              <GridCol>
                <Stat label="Refunds" value="$342" change="-2.1%" trend="down" />
              </GridCol>
            </Grid>

            <Grid columns={{base: 1, lg: 12}} gap="md">
              <GridCol span={{base: 1, lg: 8}}>
                <Card>
                  <CardHeader>
                    <Group justify="between" align="center">
                      <h3 style={{margin: 0}}>Recent Orders</h3>
                      <a
                        href="#"
                        style={{fontSize: '0.875rem', color: '#295DE5'}}
                      >
                        View all
                      </a>
                    </Group>
                  </CardHeader>
                  <CardBody>
                    <Table hoverable>
                      <TableHead>
                        <TableRow>
                          <TableHeader>Order</TableHeader>
                          <TableHeader>Customer</TableHeader>
                          <TableHeader>Amount</TableHeader>
                          <TableHeader>Status</TableHeader>
                          <TableHeader>Date</TableHeader>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {recentOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell>{order.id}</TableCell>
                            <TableCell>{order.customer}</TableCell>
                            <TableCell>{order.amount}</TableCell>
                            <TableCell>
                              <Badge
                                variant={statusVariant[order.status]}
                                size="sm"
                              >
                                {order.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardBody>
                </Card>
              </GridCol>

              <GridCol span={{base: 1, lg: 4}}>
                <Stack gap="md">
                  <Card>
                    <CardHeader>
                      <h3 style={{margin: 0}}>Sales Target</h3>
                    </CardHeader>
                    <CardBody>
                      <Stack gap="sm">
                        <Group justify="between">
                          <span style={{fontSize: '0.875rem', color: '#666'}}>
                            $12,426 of $20,000
                          </span>
                          <span
                            style={{
                              fontSize: '0.875rem',
                              fontWeight: 600,
                            }}
                          >
                            62%
                          </span>
                        </Group>
                        <Progress value={62} />
                      </Stack>
                    </CardBody>
                  </Card>
                  <Card>
                    <CardHeader>
                      <h3 style={{margin: 0}}>Top Products</h3>
                    </CardHeader>
                    <CardBody>
                      <Stack gap="sm">
                        {[
                          {name: 'Widget Pro', sales: 142},
                          {name: 'Gadget Plus', sales: 98},
                          {name: 'Gizmo Lite', sales: 67},
                          {name: 'Doohickey', sales: 45},
                        ].map((product) => (
                          <Group key={product.name} justify="between">
                            <span style={{fontSize: '0.875rem'}}>
                              {product.name}
                            </span>
                            <Badge variant="neutral" size="sm">
                              {product.sales} sold
                            </Badge>
                          </Group>
                        ))}
                      </Stack>
                    </CardBody>
                  </Card>
                </Stack>
              </GridCol>
            </Grid>
          </Stack>
        </div>
      </AppShellMain>
    </AppShell>
  )
}

const meta: Meta = {
  title: 'Recipes/Dashboard',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
A full dashboard layout with sidebar navigation, stats, data table, and summary cards. Copy-paste and customize for your app.

**Components used:** AppShell, Sidebar, Grid, Stat, Card, Table, Badge, Avatar, Progress, Stack, Group
        `,
      },
    },
  },
}

export default meta

export const Default: StoryObj = {
  render: () => <DashboardLayout />,
}
