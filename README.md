<img src="docs-src/static/images/harmonium-logo.png" width="400px"/>

[![NPM Version][npm-badge]][npm-url]
[![Dependency Status](https://dependencyci.com/github/revelrylabs/harmonium/badge)](https://dependencyci.com/github/revelrylabs/harmonium)
[![Coverage Status](https://opencov.prod.revelry.net/projects/8/badge.svg)](https://opencov.prod.revelry.net/projects/8)

# Harmonium 9 - Modernized React Component Framework

Harmonium is a framework of React components optimized for teams that want to ship apps fast. It is a curated list of components that work together and have cohesive styles. One of our design goals is that you never have to research and handpick component packages. Whatever you need is already here.

Harmonium was built by [Revelry](https://revelry.co). We've been doing React since the earliest version was in beta. We've built dozens of React apps and we've learned what works and what doesn't. And our focus is on shipping gold fast. So we never want to solve the same problem twice.

A gallery of components is at https://harmonium.revelry.co.

## New in Version 9

Version 9 brings major modernizations to Harmonium:

- **React 18**: Full support for React 18 with improved performance
- **TypeScript Support**: Enhanced type safety with TypeScript
- **Modern Testing**: Updated to React Testing Library for more reliable testing
- **Latest Dependencies**: All dependencies updated to their latest versions
- **Improved Developer Experience**: New scripts for linting, formatting, and development

## Installation

To install the toolkit for use in your project:

```sh
npm install --save harmonium
```

## SCSS Setup

We've built a set of SCSS styles for all the components. In order to use Harmonium, make sure that your asset compilation pipeline can understand scss files.

Import Harmonium's styles into your scss like so:

```scss
/* myapp.scss */
@import '~harmonium/scss/app';
/* your styles here; */
```

Harmonium includes !default values for color-palette and harmonium-settings vars. You can download the starter settings here (which include color-palette.scss and harmonium-settings.scss) and easily view/edit variables to fit your project

Your style imports would look something like this:

```scss
/* myapp.scss */
@import 'wherever-your-styles-live/color-palette';
@import 'wherever-your-styles-live/harmonium-settings';
@import 'wherever-your-styles-live/harmonium-component-settings';
@import '~/harmonium/scss/app';
/* your styles here; */
```

## Customization

Harmonium's settings can be customized even further. By using harmonium's cli, you can create a configuration file to update the design token values used to create the `_color-palette.scss` and `_harmonium-settings.scss` used above.

To create the configuration file, run:

```sh
npx harmonium init
```

This will create a file, `harmonium.config.js`, in the root of your project

In this file you can update the values of the design tokens. You can also update the build path of the output

To create the assets with the values you defined, run:

```sh
npx harmonium build
```

And they should be created in the build path specificed in `harmonium.config.js`

## Usage with React

You can import components and use components from the toolkit like:

```jsx
import React from 'react'
import { Row, Col, Button } from 'harmonium'

const MyComponent = () => {
  return (
    <Row>
      <Col>
        <h3>Hello, world</h3>
      </Col>
      <Col>
        <Button small>Click here</Button>
      </Col>
    </Row>
  )
}

export default MyComponent
```

## Usage with TypeScript

Harmonium now supports TypeScript out of the box:

```tsx
import React from 'react'
import { Row, Col, Button } from 'harmonium'
import type { ButtonProps } from 'harmonium'

// You can use type information from Harmonium
const CustomButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} className="custom-button" />
}

const MyComponent: React.FC = () => {
  return (
    <Row>
      <Col>
        <h3>Hello, world</h3>
      </Col>
      <Col>
        <CustomButton small>Click here</CustomButton>
      </Col>
    </Row>
  )
}

export default MyComponent
```

## Usage with HTML

If you aren't using React, you can still take advantage of Harmonium's components by adding the proper classes to your markup

```html
<div class="rev-Row">
  <div class="rev-Col">
    <h3>Hello, world</h3>
  </div>
  <div class="rev-Col">
    <button class="rev-Button">Press me</button>
  </div>
</div>
```

A vanilla JavaScript file to use without React can be found at `src/vanilla/harmonium.js` inside of the Harmonium package. To add interactivity, make sure to include it on your page.

```html
<script type="module">
  import {initializeAllComponents} from '/path/to/harmonium.js'
  document.addEventListener('DOMContentLoaded', () => {
    initializeAllComponents()
  })
</script>
```

See the example site at https://harmonium.revelry.co for more examples of how to
use the components in your projects.

## Updating to Harmonium 9

1. Update the harmonium dependency to `^9.0.0` in your package.json file
2. Make sure you're using a modern Node.js version (18+)
3. If you're using TypeScript, you'll get full type definitions automatically
4. If you're using Jest for testing, you may need to update your test configuration to accommodate React 18
5. Review the [CHANGELOG.md](https://github.com/revelrylabs/harmonium/blob/master/CHANGELOG.md) for detailed migration instructions

## Contributing and Development

See [CONTRIBUTING.md](https://github.com/revelrylabs/harmonium/blob/master/CONTRIBUTING.md)
for guidance on how to develop harmonium.

Bug reports and pull requests are welcome on GitHub at https://github.com/revelrylabs/harmonium. Check out [CONTRIBUTING.md](https://github.com/revelrylabs/harmonium/blob/master/CONTRIBUTING.md) for more info.

Everyone is welcome to participate in the project. We expect contributors to
adhere to the Contributor Covenant Code of Conduct (see [CODE_OF_CONDUCT.md](https://github.com/revelrylabs/harmonium/blob/master/CODE_OF_CONDUCT.md)).

[npm-badge]: https://img.shields.io/npm/v/harmonium.svg
[npm-url]: https://www.npmjs.com/package/harmonium

## License

See [LICENSE](https://github.com/revelrylabs/harmonium/blob/master/LICENSE) for details.
