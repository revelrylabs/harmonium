import React from 'react'
import { useEffect } from "react"
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
import Layout from '../layouts/index.js'
import Prism from "prismjs"

const description = 'Harmonium is a framework of React components optimized for ' +
'teams that want to ship apps fast. It is a curated list of ' +
'components that work together and have cohesive styles. One ' +
'of our design goals is that you never have to research and ' +
'handpick component packages. Whatever you need is already here.'

const IndexPage = ({location}) => {
  useEffect(() => {
    // call the highlightAll() function to style our code blocks
    Prism.highlightAll()
  })

  return <Layout location={location} description={description}>
    <Row>
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
          Harmonium is a framework of React components optimized for teams that
          want to ship apps fast. It is a curated list of components that work
          together and have cohesive styles. One of our design goals is that you
          never have to research and handpick component packages. Whatever you
          need is already here.
        </p>
        <p>
          Harmonium was built by Revelry Labs. We&apos;ve been doing React since
          the earliest version was in beta. We&apos;ve built dozens of React apps
          and we&apos;ve learned what works and what doesn&apos;t. And our focus
          is on shipping gold fast. So we never want to solve the same problem
          twice.
        </p>
        <h2>Installation</h2>
        <pre>
          <code className="language-bash">npm install --save harmonium</code>
        </pre>
        <h2>Using Harmonium with React</h2>
        <pre>
            <code className="language-jsx">
              {`import React, {Component} from 'react'
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
`}
            </code>
          </pre>
        <p>
          For more, see the component documentation listed to the left.
        </p>
        <h2>Using Harmonium without React</h2>
        <p>
          We don&apos;t just provide React components. We&apos;ve built a set of SCSS
          styles for all the components.
        </p>
        <p>
          To include Harmonium's styles into your scss, import it like so
        </p>
        <pre>
            <code className="language-scss">
              {`/* myapp.scss */
@import '~harmonium/scss/app';
/* your styles here; */
`}
            </code>
          </pre>
        <p>
          You can import the variable settings as well to override them
        </p>
          <pre>
            <code className="language-scss">
              {`/* myapp.scss */
@import '~harmonium/settings-templates/color-palette';
@import '~harmonium/settings-templates/harmonium-settings';
@import '~harmonium/scss/app';

$brand: #eeeeee;

/* your styles here; */
`}
            </code>
          </pre>
        <p>
          For advanced configurations, styles can be found in the <code>scss</code> directory
          of the package. You can either copy it into your project&apos;s SCSS
          directory, or use a tool like{' '}
          <a href="https://www.npmjs.com/package/sassy-npm-importer">
            sassy-npm-importer
          </a>{' '}
          to import it from the package.
        </p>
        <p>
          The styles can be easily customized for your project through many
          overrideable SCSS variables. You can download starter settings files to
          include in your project{' '}
          <a href="/settings-templates/settings-templates.zip">here.</a>
        </p>
      </Col>
    </Row>
  </Layout>
}

export default IndexPage
