# Contributing and Development

## Development Setup

Clone and run `npm install`.

## Running the docs site locally

```
cd docs-src
yarn
npm run develop
```

This will open up a new browser tab at localhost:8000.
While this is running you can make changes in the src folder and the site will
automatically reload with your changes.

From time to time, you may need to run `npm install` in the root harmonium
directory to rebuild the `lib/` directory as you change components.

If your changes aren't being reflected, try stopping the dev server, running
`npm run cache:rebuild`, and then `npm run develop` again.

## How to add code

### React component JavaScript

* Write a component like `src/my-component.js`.
* Write an example file like `docs-src/src/examples/my-component.js.example`.
  * The module should have one or more named exports that are React components, defined with ES6 class syntax. (`export class Example1 extends Compnent {}`)
  * Each example will be built into the docs site.
* Write a test file like `src/my-component.test.js`.
  * Run tests with `npm test`.
  * See `test-config.js` to see what additional globals are available in tests. (`expect`, `shallow`, `mount`, etc.)

### Sass

Try as often as possible to rely solely on Foundation Sites styles where available.
On occasion, however, you will need specific styles for components that go beyond what Foundation offers.
In this case:

* Add an SCSS file like `scss/my-component.scss`
* Edit `docs-src/src/layouts/index.scss` so that it imports your component's styles.

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
10. Run `cd docs-src && yarn && npm run develop` and make sure your example loads and looks like you expect.
11. Add, commit, and push your changes.
12. Submit a pull request.
