import React from 'react'
import Layout from '../layouts/index.js'
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
import Table from 'harmonium/lib/Table'
import DesignTokens from '../../designTokens'

function sortByName(itemA, itemB) {
  var nameA = itemA.name.toUpperCase(); // ignore upper and lowercase
  var nameB = itemB.name.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1
  }
  if (nameA > nameB) {
    return 1
  }

  // names must be equal
  return 0
}

function flattenDesignTokens(category){
  let results = []

  for (const type in category) {
    if(category[type].value){
      results.push(category[type])
    } else {
      results = results.concat(flattenDesignTokens(category[type]))
    }
  }

  results.sort(sortByName);

  return results
}

function ColorRows(){
  const colors = flattenDesignTokens(DesignTokens.color);
  const rows = []

  for (let i = 0; i < colors.length; i++) {
    const exampleStyle = {
      backgroundColor: colors[i].value,
      width: '10rem',
      height: '3rem',
      border: '1px solid #22222222',
      borderRadius: '3%'
    };

    rows.push(<Table.Row>
      <Table.Data>
        <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre>${colors[i].name}</pre>
          <p><i>{colors[i].comment}</i></p>
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Value:</Table.HeaderInline>
        <div style={exampleStyle}></div>
        <pre>{colors[i].value}</pre>
      </Table.Data>
    </Table.Row>)
  }

  return rows
}

function Colors() {
  return (
    <React.Fragment>
      <h2>Colors</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{ColorRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function FontSizeRows(){
  const rows = []
  const fontSizes = DesignTokens.font.size

  for(const font in fontSizes){
    const exampleStyle = {
      fontSize: fontSizes[font].value,
    };

    rows.push(<Table.Row>
      <Table.Data>
        <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre>${fontSizes[font].name}</pre>
          <p><i>{fontSizes[font].comment}</i></p>
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Value:</Table.HeaderInline>
        <div style={exampleStyle}>Harmonium</div>
        <pre>{fontSizes[font].value}</pre>
      </Table.Data>
    </Table.Row>)
  }

  return rows
}

function FontSizes() {
  return (
    <React.Fragment>
      <h2>Font Sizes</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
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
    };

    rows.push(<Table.Row>
      <Table.Data>
        <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre>${fontFamilies[font].name}</pre>
          <p><i>{fontFamilies[font].comment}</i></p>
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Value:</Table.HeaderInline>
        <div style={exampleStyle}>Harmonium</div>
        <pre>{fontFamilies[font].value}</pre>
      </Table.Data>
    </Table.Row>)
  }

  return rows
}

function Fonts() {
  return (
    <React.Fragment>
      <h2>Fonts</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
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
    };

    rows.push (
    <Table.Row>
      <Table.Data>
        <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre>${radii[radius].name}</pre>
          <p><i>{radii[radius].comment}</i></p>
      </Table.Data>
      <Table.Data>
        <Table.HeaderInline>Value:</Table.HeaderInline>
        <div style={exampleStyle}></div>
        <pre>{radii[radius].value}</pre>
      </Table.Data>
    </Table.Row>
    )
  }

  return rows

}

function BorderRadius() {
  return (
    <React.Fragment>
      <h2>Border Radius</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
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
  const zIndices = DesignTokens["z-index"]

  for (const index in zIndices) {
    const exampleStyle = {
      zIndex: zIndices[index].value
    };

    rows.push (
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
            <pre>${zIndices[index].name}</pre>
            <p><i>{zIndices[index].comment}</i></p>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <pre>${zIndices[index].value}</pre>
        </Table.Data>
      </Table.Row>
      )
    }

    return rows
}

function ZIndex() {
  return (
    <React.Fragment>
      <h2>Z-Index</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
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
      spacing: spaces[space].value,
      height: spaces[space].value,
      width: spaces[space].value,
    };

    rows.push (
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre>${spaces[space].name}</pre>
          <p><i>{spaces[space].comment}</i></p>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div style={exampleStyle}></div>
          <pre>${spaces[space].value}</pre>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function Spacing() {
  return (
    <React.Fragment>
      <h2>Spacing</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{SpacingRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function ShadowRows() {
  
  const rows = []
  const shadows = DesignTokens.shadow

  for (const shadow in shadows) {
    const exampleStyle = {
      shadowing: shadows[shadow].value,
      width: '10rem',
      height: '3rem',
      border: '1px solid black',
    };

    rows.push (
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
          <pre>${shadows[shadow].name}</pre>
          <p><i>{shadows[shadow].comment}</i></p>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div style={exampleStyle}></div>
          <pre>${shadows[shadow].value}</pre>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function Shadows() {
  return (
    <React.Fragment>
      <h2>Shadows</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{ShadowRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function FontWeightRows() {

  const rows = []
  const fontWeights = DesignTokens.font

  for (const weight in fontWeights) {
    const exampleStyle = {
      fontWeight: fontWeights[weight].value,
    };

    rows.push(
      <Table.Row>
        <Table.Data>
          <Table.HeaderInline>Token:</Table.HeaderInline>
            <pre>${fontWeights[weight].name}</pre>
            <p><i>{fontWeights[weight].comment}</i></p>
        </Table.Data>
        <Table.Data>
          <Table.HeaderInline>Value:</Table.HeaderInline>
          <div style={exampleStyle}>The quick brown fox jumped over the lazy dog.</div>
          <pre>{fontWeights[weight].value}</pre>
        </Table.Data>
      </Table.Row>
    )
  }

  return rows
}

function FontWeight() {
  return (
    <React.Fragment>
      <h2>Font Weights</h2>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.Header>Token</Table.Header>
            <Table.Header>Value</Table.Header>
          </Table.Row>
        </Table.Head>
        <Table.Body>{FontWeightRows()}</Table.Body>
      </Table>
    </React.Fragment>
  )
}

function DesignTokensPage({location}) {
  return <Layout location={location}>
      <Row>
      <Col>
          <h1>Design Tokens</h1>
        </Col>
        <Col>
          <Colors />
          <Fonts />
          <FontSizes />
          <BorderRadius />
          <ZIndex />
          <Spacing />
          <Shadows />
          <FontWeight />
        </Col>
      </Row>
    </Layout>
}



export default DesignTokensPage
