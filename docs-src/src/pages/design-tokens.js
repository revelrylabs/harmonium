import React from 'react'
import Layout from '../layouts/index.js'
import Row from 'harmonium/lib/Row';
import Col from 'harmonium/lib/Col';
import Table from 'harmonium/lib/Table'
import DesignTokens from '../../designTokens'

function flattenDesignTokens(category){
  let results = []

  for (const type in category) {
    if(category[type].value){
      results.push(category[type])
    } else {
      results = results.concat(flattenDesignTokens(category[type]))
    }
  }

  results.sort(function(a, b) {
    var nameA = a.name.toUpperCase(); // ignore upper and lowercase
    var nameB = b.name.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    // names must be equal
    return 0;
  });

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



  return          (
    <React.Fragment>
      <h2>Colors</h2>
<Table>
  <Table.Head>
    <Table.Row>
      <Table.Header>
        Token
      </Table.Header>
      <Table.Header>
        Value
      </Table.Header>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {ColorRows()}
  </Table.Body>
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
        </Col>
      </Row>
    </Layout>
}



export default DesignTokensPage
