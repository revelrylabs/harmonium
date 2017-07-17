Master status: ![Travis Build Status](https://travis-ci.org/revelrylabs/revelry_core_node.svg?branch=master)

# revelry-components

This is the Revelry component library for React.

There is a gallery of example component usage [here](http://revelry-ui.herokuapp.com/).

## Installation

To install the toolkit for use in your project:

```sh
npm install --save revelry-components
```

## Usage

You can import components and use components from the toolkit like:

```jsx
import {Row, Col} from 'revelry-components/lib/components/grid'
import {Callout} from 'revelry-components/lib/components/Callout'

function Hello() {
  return (
    <Row>
      <Col>
        <Callout>Hello, world.</Callout>
      </Col>
    </Row>
  )
}
```

See the example site for more examples of how to use the components in your projects.

## Configuration

At this time, there are not significant configuration options for revelry-components itself. If you import Foundation styles for use with this library, you can configure it as normal.

## Contributing and Development

See [CONTRIBUTING.md](https://github.com/revelrylabs/revelry_core_node/blob/master/CONTRIBUTING.md) for guidance on how to develop revelry-components.

Bug reports and pull requests are welcome on GitHub at https://github.com/revelrylabs/revelry_core_node. Check out [CONTRIBUTING.md](https://github.com/revelrylabs/revelry_core_node/blob/master/CONTRIBUTING.md) for more info.

Everyone is welcome to participate in the project. We expect contributors to
adhere the Contributor Covenant Code of Conduct (see [CODE_OF_CONDUCT.md](https://github.com/revelrylabs/revelry_core_node/blob/master/CODE_OF_CONDUCT.md)).


