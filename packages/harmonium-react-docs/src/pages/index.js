import React from 'react'
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
import Card from 'harmonium/lib/Card'
import Menu from 'harmonium/lib/Menu'
import HelpText from 'harmonium/lib/HelpText'
import Helmet from 'react-helmet'

const IndexPage = () => (
  <Row>
    <Helmet
      title={'Harmonium | React Components for Teams That Move Fast'}
      meta={[
        {
          name: 'description',
          content:
            'Harmonium is a framework of React components optimized for ' +
            'teams that want to ship apps fast. It is a curated list of ' +
            'components that work together and have cohesive styles. One ' +
            'of our design goals is that you never have to research and ' +
            'handpick component packages. Whatever you need is already here.',
        },
        {
          name: 'keywords',
          content: 'React, JavaScript, SCSS, CSS, HTML, Web',
        },
      ]}
    >
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.0.0/codemirror.min.css"
      />
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/codemirror/5.38.0/theme/lucario.min.css"
      />
    </Helmet>
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
        <code>npm install --save harmonium</code>
      </pre>
      <p>
        You can now import the components and start using them. See the
        component example documentation listed to the left.
      </p>
      <h2>SCSS</h2>
      <p>
        We don&apos;t just provide JavaScript. We&apos;ve built a set of SCSS
        styles for all the components. It is in the <code>scss</code> directory
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
)

export default IndexPage
