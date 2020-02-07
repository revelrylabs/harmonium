import React from 'react';
import {Row, Col} from 'harmonium/lib/grid'
import Tabs from 'harmonium/lib/Tabs'
import prettier from 'prettier/standalone';
import prettierHTML from 'prettier/parser-html'
import {
  LiveProvider,
  LiveEditor,
  LiveError,
  LivePreview,
  withLive
} from 'react-live'
import theme from "prism-react-renderer/themes/palenight";
import ReactDOMServer from "react-dom/server";
import Highlight, { defaultProps } from "prism-react-renderer";

function HTML({ live }) {
  const Result = live.element;
  const html = ReactDOMServer.renderToStaticMarkup(<Result />);
  const formattedHTML = prettier.format(html, {parser: 'html', plugins: [prettierHTML]})

  return (
    <Highlight {...defaultProps} code={formattedHTML} language="markup" theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
  );
}

const LiveHTML = withLive(HTML);

export default function ExampleSection(props) {
  if (typeof props.examples === 'string') {
    return (
      <div className="example-section HTMLCodeSection">
        <LiveProvider theme={theme} code={props.examples} scope={props.scope}>
          <LiveError />
          <LivePreview className="example-preview" />
          <Tabs.Stateful>
            <Tabs.Item contentKey={1} title="React">
              <Row>
                <Col>
                  <LiveEditor className="example-react-code" />
                </Col>
              </Row>
            </Tabs.Item>
            <Tabs.Item contentKey={2} title="HTML">
              <Row>
                <Col>
                  <LiveHTML />
                </Col>
              </Row>
            </Tabs.Item>
          </Tabs.Stateful>
        </LiveProvider>
      </div>
    )
  } else {
    const children = []

    for (const examplesTitle in props.examples) {
      if (Object.prototype.hasOwnProperty.call(props.examples, examplesTitle)) {
        children.push(
          <ExampleSection
            examples={props.examples[examplesTitle]}
            scope={props.scope}
            key={examplesTitle}
          />
        )
      }
    }

    return (
      <Row collapse>
        <Col>
          {children}
        </Col>
      </Row>
    )
  }
}
