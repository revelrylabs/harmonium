import type {Meta, StoryObj} from '@storybook/react'
import React, {useState} from 'react'
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Field,
  FieldLabel,
  FieldError,
  Input,
  Checkbox,
  Stack,
  Separator,
  Group,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from 'harmonium'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    setErrors(newErrors)
  }

  return (
    <div style={{maxWidth: 420, margin: '40px auto'}}>
      <Card>
        <CardHeader>
          <Stack gap="xs">
            <h2 style={{margin: 0, fontSize: '1.5rem'}}>Welcome back</h2>
            <p style={{margin: 0, color: '#666'}}>
              Sign in to your account
            </p>
          </Stack>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Field error={!!errors.email}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>
              <Field error={!!errors.password}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError>{errors.password}</FieldError>
              </Field>
              <Group justify="between">
                <Checkbox label="Remember me" />
                <a href="#" style={{fontSize: '0.875rem', color: '#295DE5'}}>
                  Forgot password?
                </a>
              </Group>
              <Button variant="primary" type="submit">
                Sign in
              </Button>
            </Stack>
          </form>
        </CardBody>
        <CardFooter>
          <p
            style={{
              textAlign: 'center',
              margin: 0,
              fontSize: '0.875rem',
              color: '#666',
            }}
          >
            Don&apos;t have an account?{' '}
            <a href="#" style={{color: '#295DE5'}}>
              Sign up
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

function SignupForm() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!name) newErrors.name = 'Name is required'
    if (!email) newErrors.email = 'Email is required'
    if (!password) newErrors.password = 'Password is required'
    if (password && password.length < 8)
      newErrors.password = 'Must be at least 8 characters'
    if (password !== confirm)
      newErrors.confirm = 'Passwords do not match'
    setErrors(newErrors)
  }

  return (
    <div style={{maxWidth: 420, margin: '40px auto'}}>
      <Card>
        <CardHeader>
          <Stack gap="xs">
            <h2 style={{margin: 0, fontSize: '1.5rem'}}>Create account</h2>
            <p style={{margin: 0, color: '#666'}}>
              Get started with Harmonium
            </p>
          </Stack>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Field error={!!errors.name}>
                <FieldLabel>Full name</FieldLabel>
                <Input
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FieldError>{errors.name}</FieldError>
              </Field>
              <Field error={!!errors.email}>
                <FieldLabel>Email</FieldLabel>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <FieldError>{errors.email}</FieldError>
              </Field>
              <Field error={!!errors.password}>
                <FieldLabel>Password</FieldLabel>
                <Input
                  type="password"
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <FieldError>{errors.password}</FieldError>
              </Field>
              <Field error={!!errors.confirm}>
                <FieldLabel>Confirm password</FieldLabel>
                <Input
                  type="password"
                  placeholder="Repeat your password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                />
                <FieldError>{errors.confirm}</FieldError>
              </Field>
              <Button variant="primary" type="submit">
                Create account
              </Button>
            </Stack>
          </form>
        </CardBody>
        <CardFooter>
          <p
            style={{
              textAlign: 'center',
              margin: 0,
              fontSize: '0.875rem',
              color: '#666',
            }}
          >
            Already have an account?{' '}
            <a href="#" style={{color: '#295DE5'}}>
              Sign in
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

function LoginSignupTabs() {
  return (
    <div style={{maxWidth: 420, margin: '40px auto'}}>
      <Tabs defaultValue="login">
        <TabsList>
          <TabsTrigger value="login">Sign in</TabsTrigger>
          <TabsTrigger value="signup">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <LoginForm />
        </TabsContent>
        <TabsContent value="signup">
          <SignupForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

const meta: Meta = {
  title: 'Recipes/Login & Signup',
  parameters: {
    docs: {
      description: {
        component: `
Authentication forms built with Harmonium. Copy-paste these patterns into your app.

**Components used:** Card, Field, FieldLabel, FieldError, Input, Button, Checkbox, Stack, Group, Tabs
        `,
      },
    },
  },
}

export default meta

export const Login: StoryObj = {
  render: () => <LoginForm />,
}

export const Signup: StoryObj = {
  render: () => <SignupForm />,
}

export const TabbedAuth: StoryObj = {
  render: () => <LoginSignupTabs />,
}
