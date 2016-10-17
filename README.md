# revelry_core_node

This is the Node.js port of revelry_core.

## Setup

Clone and run `npm install`.

## Running the docs site locally

```
npm run dev
```

This will open up a new browser tab at localhost:8000.
While this is running you can make changes in the src folder and the site will automatically reload with your changes.

## How to add code

### React components

* Write a component like `src/my-component.js`.
* Write an example file like `src/my-component.example.js`.
  * The module should have one or more named exports that are React components, defined with ES6 class syntax. (`export class Example1 extends Compnent {}`)
  * Each example will be built into the docs site.
* Write a test file like `src/my-component.test.js`.
  * Run tests with `npm test`.
  * See `test-config.js` to see what additional globals are available in tests. (`decribe`, `it`, `expect`, `shallow`, `mount`, etc.)

### Sass

Try as often as possible to rely solely on Foundation Sites styles where available.
On occasion, however, you will need specific styles for components that go beyond what Foundation offers.
In this case:

* Add an SCSS file like `scss/my-component.scss`
* Edit `docs-src/site.scss` so that it imports your component's styles.
