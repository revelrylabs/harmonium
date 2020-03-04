import React, {useEffect} from 'react'
import Row from 'harmonium/lib/Row'
import Col from 'harmonium/lib/Col'
import Layout from '../layouts/index.js'
import Prism from 'prismjs'
import CodeBlock from '../CodeBlock'

const description =
  'Harmonium is a framework of React components optimized for ' +
  'teams that want to ship apps fast. It is a curated list of ' +
  'components that work together and have cohesive styles. One ' +
  'of our design goals is that you never have to research and ' +
  'handpick component packages. Whatever you need is already here.'

const IndexPage = ({location}) => {
  useEffect(() => {
    Prism.highlightAll()
  })

  return (
    <Layout location={location} description={description}>
      <Row className="HomePage">
        <Col>
          <h1 className="ShowForSR">
            Hello Harmonium&mdash; The React Framework for Shipping Fast
          </h1>
          <p className="Lead">
            <img
              className="ResponsiveImage Show--mediumUp rev-Brand-symbol"
              src="/images/harmonium-symbol.png"
              alt="Harmonium"
            />
            Harmonium is a framework of React components optimized for teams
            that want to ship apps fast. It is a curated list of components that
            work together and have cohesive styles. One of our design goals is
            that you never have to research and handpick component packages.
            Whatever you need is already here.
          </p>
          <p>
            Harmonium was built by{' '}
            <a
              href="https://revelry.co"
              rel="noopener noreferrer"
              target="_blank"
            >
              Revelry
            </a>
            . We&apos;ve been doing React since the earliest version was in
            beta. We&apos;ve built dozens of React apps and we&apos;ve learned
            what works and what doesn&apos;t. And our focus is on shipping gold
            fast. So we never want to solve the same problem twice.
          </p>
          <h2>Installation</h2>
          <CodeBlock code={"npm install --save harmonium"} language="bash"/>

          <h2>SCSS Setup</h2>
          <p>
            We&apos;ve built a set of SCSS styles for all the components. In
            order to use Harmonium, make sure that your asset compilation
            pipeline can understand scss files.
          </p>
          <p>Import Harmonium's styles into your scss like so:</p>
          <CodeBlock
          code={`/* myapp.scss */
@import '~harmonium/scss/app';
/* your styles here; */`} language="scss" />
          <p>
            Harmonium includes !default values for color-palette and
            harmonium-settings vars. You can download the starter settings{' '}
            <a href="/settings-templates/settings-templates.zip">here</a> (which
            include color-palette.scss and harmonium-settings.scss) and easily
            view/edit variables to fit your project
          </p>
          <p>Your style imports would look something like this:</p>
          <CodeBlock
          code={`/* myapp.scss */
@import 'wherever-your-styles-live/color-palette';
@import 'wherever-your-styles-live/harmonium-settings';
@import 'wherever-your-styles-live/harmonium-component-settings';
@import '~/harmonium/scss/app';

/* your styles here; */`}
          language="scss" />

          <h2>Customization</h2>
          <p>
            Harmonium's settings can be customized even further.
            By using harmonium's cli, you can create a configuration file to update
            the design token values used to create the <code>_color-palette.scss</code> and <code>_harmonium-settings.scss</code>
            used above.
          </p>

          <p>To create the configuration file, run:</p>
          <CodeBlock language="bash" code={"npx harmonium init"} />

          <p>This will create a file, <code>harmonium.config.js</code>, in the root of your project</p>

          <p>In this file you can update the values of the design tokens. You can also update the build path of the output</p>

          <p>To create the assets with the values you defined, run:</p>
          <CodeBlock language="bash" code={"npx harmonium build"} />

          <p>And they should be created in the build path specificed in <code>harmonium.config.js</code></p>

          <h2>Usage with React</h2>
          <CodeBlock language="jsx"
              code={`import React, {Component} from 'react'
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
import Button from 'harmonium/lib/Button';

export default class MyComponent extends Component {

  render() {
    return <Row>
    <Col>
      <h3>Hello, world</h3>
    </Col>
    <Col>
      <Button small>Click here</Button>
    </Col>
    </Row>
  }
}
`} />

          <h2>Usage with HTML</h2>
          <p>
            If you aren't using React, you can still take advantage of
            Harmonium's components by adding the proper classes to your markup
          </p>
          <CodeBlock language="html"
              code={`<div class="rev-Row">
  <div class="rev-Col">
    <h3>Hello, world</h3>
  </div>
  <div class="rev-Col">
    <button class="rev-Button">Press me</button>
  </div>
</div>`} />
          <p>
            A vanilla JavaScript file to use without React can be found at{' '}
            <code>src/vanilla/harmonium.js</code> inside of the Harmonium
            package. To add interactivity, make sure to include it on your page.
          </p>
          <CodeBlock language="html"
              code={`<script type="module">
  import {initializeAllComponents} from '/path/to/harmonium.js';

  document.addEventListener('DOMContentLoaded', () => {
    initializeAllComponents()
  })
</script>`} />
          <p>For more, see the component documentation listed to the left.</p>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage
