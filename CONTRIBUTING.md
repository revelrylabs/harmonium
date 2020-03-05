# Contributing and Development

## Development Setup

Clone and run `./bin/setup`.

## Running the docs site locally

```
cd docs-src
npm run develop
```

This will open up a new browser tab at localhost:8000.
While this is running you can make changes in the src folder and the site will
automatically reload with your changes.

From time to time, you may need to run `npm run build` in the root harmonium
directory to rebuild the `lib/` directory as you change components.

## How to add code

### React component JavaScript

* Write a component like `src/my-component.js`.
* Write an example file like `docs-src/src/examples/my-component.js.example`.
  * The module should have one or more named exports that are React components, defined with ES6 class syntax. (`export class Example1 extends Compnent {}`)
  * Each example will be built into the docs site.
* Import your component into `docs-src/src/ExampleScope.js`
* Write a test file like `src/my-component.test.js`.
  * Run tests with `npm test`.
  * See `test-config.js` to see what additional globals are available in tests. (`expect`, `shallow`, `mount`, etc.)

### Add Vars table at the bottom of the Component's Example Page:

* Create a new folder in `/docs-src/src/pages/components called ComponentNameTables`
* Create a new file in that folder called `ComponentNameVars.js`
* Table Markup:
```jsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.Header>Variable Name</Table.Header>
      <Table.Header>Default Value</Table.Header>
      <Table.Header>Description</Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.HeadStacked>
    <Table.Data>[ComponentName] Vars</Table.Data>
  </Table.HeadStacked>
  <Table.Body>
    <Table.Row>
      <Table.Data>
        <Table.HeaderInline>Var:</Table.HeaderInline> [Var]
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Default Value:</Table.HeaderInline> [Var Default]
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Description:</Table.HeaderInline> [Var Desc.]
      </Table.Data>
    </Table.Row>
  </Table.Body>
</Table>
```
  * Make sure to check the harmonium-settings.scss file for any vars that were not listed at the top of the components stylesheet.
* Import the ComponentNameVars file into the main example page: `/docs-src/src/pages/components/ComponentName.js`
* After the `ExampleSection` include `<h3>Variables:</h3>`
* Then call in the table: `<ComponentNameVars />`

### Add Props table at the bottom of the Component's Example Page:

* If you haven't already, create a new folder in `/docs-src/src/pages/components called ComponentNameTables`
* Create a new file in the `ComponentNameTables` folder called `ComponentNameProps.js`
* Table details:
```jsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.Header>Name</Table.Header>
      <Table.Header>Type</Table.Header>
      <Table.Header>Default</Table.Header>
      <Table.Header>Description</Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.HeadStacked>
    <Table.Data>[ComponentName] Props</Table.Data>
  </Table.HeadStacked>
  <Table.Body>
    <Table.Row>
      <Table.Data>
        <Table.HeaderInline>Name:</Table.HeaderInline> [prop]
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Type:</Table.HeaderInline> [PropType]
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Default:</Table.HeaderInline> [Prop Default]
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Description:</Table.HeaderInline> [Prop Desc.]
      </Table.Data>
    </Table.Row>
  </Table.Body>
</Table>
```
  * Include all possible props (also check the components file to make sure you didnt miss any props that were not listed on the site.)
* Import the ComponentNameProps file into the main example page: `/docs-src/src/pages/components/ComponentName.js`
* After the Variables section include `<h3>Properties:</h3>`
* Then call in the table: `<ComponentNameProps />`


### Sass

When creating a new component, new styles will likely be needed. Follow the steps below to ensure you have updated all the necessary files.

* Add an SCSS file like `scss/components/_ComponentName.scss`
* Update `scss/components/_components.scss` so that it imports your new component's style sheet.
* New variables should be at the top of the component's style sheet (`_ComponentName.scss`) with `!default` tags.
* Add component vars to `/harmonium/settings-templates/harmonium-component-settings.scss`. Remove any `!default` tags


## Submitting Changes

1. Fork the repository.
2. Set up the gem per the instructions above and ensure `npm test`
   runs cleanly.
3. Create a topic branch.
4. Add tests for your unimplemented feature or bug fix.
5. Run `npm test`. If your specs pass, return to step 4.
6. Implement your feature or bug fix.
7. Re-run `npm test`. If your specs fail, return to step 6.
8. Thoroughly document and comment your code.
9. Add a usage example as src/ComponentName.example.js
10. Run `cd docs-src && npm run develop` and make sure your example loads and looks like you expect.
11. Add, commit, and push your changes.
12. Submit a pull request.
