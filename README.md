# revelry_core_node
This is the Node.js port of revelry_core.

## How to contribute

Clone the repo. Write a component like `src/my-component.js`. Write an example file like `src/my-component.example.js` that has some named exports which are example components. Run the following to generate the docs site locally:

```
npm run docs
```

You can open the generated HTML however you want, but `open ./docs/index.html` is a good choice on Mac.

## Development

```
npm install
npm run dev
```

This will open up a new browser tab at localhost:8000. While this is running you can make changes in the src folder and the site will automatically reload with your changes.
