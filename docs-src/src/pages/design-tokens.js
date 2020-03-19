import React from 'react'
import Layout from '../layouts/index.js'
import Row from 'harmonium/lib/Row'
import Col from 'harmonium/lib/Col'
import Table from 'harmonium/lib/Table'
import DesignTokens from '../../designTokens'

function sortByName(itemA, itemB) {
  const nameA = itemA.name.toUpperCase() // ignore upper and lowercase

  const nameB = itemB.name.toUpperCase() // ignore upper and lowercase

  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

function flattenDesignTokens(category) {
  let results = []

  for (const type in category) {
    if (category[type].value) {
      results.push(category[type])
    } else {
      results = results.concat(flattenDesignTokens(category[type]))
    }
  }

  results.sort(sortByName)

  return results
}

function ColorRows() {
  const colors = flattenDesignTokens(DesignTokens.color)
  const rows = []

  for (let i = 0; i < colors.length; i++) {
    const exampleStyle = {
      backgroundColor: colors[i].value,
      width: '10rem',
      height: '3rem',
      border: '1px solid #22222222',
      borderRadius: '3%',
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${colors[i].name}
            <p className="DesignTokenComment">{colors[i].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{colors[i].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle} />
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function Colors() {
  return (
    <React.Fragment>
      <h2 id="colors">Colors</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{ColorRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function FontSizeRows() {
  const rows = []
  const fontSizes = DesignTokens.font.size

  for (const font in fontSizes) {
    const exampleStyle = {
      fontSize: fontSizes[font].value,
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${fontSizes[font].name}
            <p className="DesignTokenComment">{fontSizes[font].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{fontSizes[font].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle}>Harmonium</div>
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function FontSizes() {
  return (
    <React.Fragment>
      <h2 id="font-sizes">Font Sizes</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{FontSizeRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function FontRows() {
  const rows = []
  const fontFamilies = DesignTokens.font.family

  for (const font in fontFamilies) {
    const exampleStyle = {
      fontFamily: fontFamilies[font].value,
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${fontFamilies[font].name}
            <p className="DesignTokenComment">{fontFamilies[font].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{fontFamilies[font].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle}>Harmonium</div>
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function Fonts() {
  return (
    <React.Fragment>
      <h2 id="fonts">Fonts</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{FontRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function BorderRadiusRows() {
  const rows = []
  const radii = DesignTokens.border.radius

  for (const radius in radii) {
    const exampleStyle = {
      borderRadius: radii[radius].value,
      width: '10rem',
      height: '3rem',
      border: '1px solid black',
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${radii[radius].name}
            <p className="DesignTokenComment">{radii[radius].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{radii[radius].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle} />
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function BorderRadius() {
  return (
    <React.Fragment>
      <h2 id="border-radius">Border Radius</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{BorderRadiusRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

// TODO is exampleStyle necessary here?  How can I eliminate this useless thang
function ZIndexRows() {
  const rows = []
  const zIndices = DesignTokens['z-index']

  for (const index in zIndices) {
    const exampleStyle = {
      zIndex: zIndices[index].value,
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${zIndices[index].name}
            <p className="DesignTokenComment">{zIndices[index].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <pre className="DesignTokenVariable">{zIndices[index].value}</pre>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function ZIndex() {
  return (
    <React.Fragment>
      <h2 id="z-index">Z-Index</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{ZIndexRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

// TODO fix name not being displayed at same spacing as value!
function SpacingRows() {
  const rows = []
  const spaces = DesignTokens.spacing

  for (const space in spaces) {
    const exampleStyle = {
      height: spaces[space].value,
      width: spaces[space].value,
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${spaces[space].name}
            <p className="DesignTokenComment">{spaces[space].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{spaces[space].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle} />
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function Spacing() {
  return (
    <React.Fragment>
      <h2 id="spacing">Spacing</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{SpacingRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function ShadowRows() {
  const rows = []
  const shadows = DesignTokens.box.shadow

  for (const shadow in shadows) {
    const exampleStyle = {
      "width": '10rem',
      height: '3rem',
      'border': '1px solid black',
      'box-shadow': shadows[shadow].value,
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${shadows[shadow].name}
            <p className="DesignTokenComment">{shadows[shadow].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{shadows[shadow].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle} />
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function Shadows() {
  return (
    <React.Fragment>
      <h2 id="shadows">Shadows</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{ShadowRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function FontWeightRows() {
  const rows = []
  const fontWeights = DesignTokens.font.weight

  for (const weight in fontWeights) {
    const exampleStyle = {
      fontWeight: fontWeights[weight].value,
    }

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre className="DesignTokenVariable">${fontWeights[weight].name}
            <p className="DesignTokenComment">{fontWeights[weight].comment}</p>
          </pre>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div>
            <pre className="DesignTokenVariable">{fontWeights[weight].value}</pre>
            <div className="DesignTokenExample" style={exampleStyle}>
              The quick brown fox jumped over the lazy dog.
            </div>
          </div>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function FontWeight() {
  return (
    <React.Fragment>
      <h2 id="font-weights">Font Weights</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header width="50%">Token</Table.Header>
            <Table.Header width="50%">Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{FontWeightRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function DesignTokensPage({location}) {
  return (
    <Layout location={location}>
      <Row className="DesignTokenExamples">
        <Col>
          <h1>Design Tokens</h1>
        </Col>
        <Col>
          <p>What are design tokens?</p>
        </Col>
        <Col>
          <p>Design tokens are a way to define atomic style items in an agnostic way.
            This helps to use Harmonium not only in sass and the web, but to other platforms such as native mobile.</p>
        </Col>
        <Col>
          <p>For more information on design tokens, check out the post <a href="https://css-tricks.com/what-are-design-tokens/">here</a></p>
        </Col>
        <Col>
          <BorderRadius />
          <Colors />
          <Fonts />
          <FontSizes />
          <FontWeight />
          <Shadows />
          <Spacing />
          <ZIndex />
        </Col>
      </Row>
    </Layout>
  )
}

export default DesignTokensPage
