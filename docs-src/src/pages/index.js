import React from 'react'
import {Row, Col} from 'awesome-possum/lib/grid'
import Card from 'awesome-possum/lib/Card'
import Menu from 'awesome-possum/lib/Menu'
import HelpText from 'awesome-possum/lib/HelpText'

const IndexPage = () => (
  <div>
    <h1>Possum</h1>

    <p>
      Possum is a framework of React components optimized for teams that want to
      ship apps fast. It is a curated list of components that work together and
      have cohesive styles. One of our design goals is that you never have to
      research and handpick component packages. Whatever you need is already
      here.
    </p>
    <p>
      Possum was built by Revelry Labs. We've been doing React since the
      earliest version was in beta. We've built dozens of React apps and we've
      learned what works and what doesn't. And our focus is on shipping gold
      fast. So we never want to solve the same problem twice.
    </p>
    <h2>Installation</h2>
    <pre>
      <code>npm install --save awesome-possum</code>
    </pre>
    <p>
      You can now import the components and start using them. See the component
      example documentation listed to the left.
    </p>
    <h2>SCSS</h2>
    <p>
      We don't just provide JavaScript. We've built a set of SCSS styles for all
      the components. It is in the <code>scss</code> directory of the package.
      You can either copy it into your project's SCSS directory, or use a tool
      like{' '}
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
  </div>
)

export default IndexPage
