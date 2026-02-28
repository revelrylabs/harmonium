import {Button, Stack, Heading, Text} from 'harmonium'

export function App() {
  return (
    <Stack gap="lg" style={{padding: '2rem', maxWidth: 600, margin: '0 auto'}}>
      <Heading level={1}>Harmonium Playground</Heading>
      <Text color="muted">Use this space to test components during development.</Text>
      <Button variant="primary">Hello Harmonium</Button>
    </Stack>
  )
}
