import React, { useState } from 'react';
import {Row, Col} from 'harmonium/lib/grid'
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
  const [active, setActive] = useState(1);

  if (typeof props.examples === 'string') {
    return (
      <div className="example-section HTMLCodeSection">
        <LiveProvider theme={theme} code={props.examples} scope={props.scope}>
          <LiveError />
          <LivePreview className="example-preview" />
          <div className="rev-Tabs">
        <ul className="rev-Tabs-titles">
          <li className={`rev-TabsTitle ${active === 1 && "rev-TabsTitle--selected"}`}>
            <a className="rev-TabsTitle-link" onClick={() => setActive(1)}>React</a>
          </li>
          <li className={`rev-TabsTitle ${active === 2 && "rev-TabsTitle--selected"}`}>
            <a className="rev-TabsTitle-link" onClick={() => setActive(2)}>HTML</a>
          </li>
        </ul>
        <div className="rev-Tabs-content">
          <div
            className={`rev-TabsItem-panel ${active === 1 && "rev-TabsItem-panel--selected"}`}
          >
            <div className="rev-Row">
              <div className="rev-Col">
                <LiveEditor className="example-react-code" />
              </div>
            </div>
          </div>
          <div
            className={`rev-TabsItem-panel ${active === 2 && "rev-TabsItem-panel--selected"}`}
          >
            <div className="rev-Row">
              <div className="rev-Col">
                <LiveHTML />
              </div>
            </div>
          </div>
        </div>
      </div>
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
            disableHTMLPreview={props.disableHTMLPreview}
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
