import React, { useEffect } from 'react';
import {Row, Col} from 'harmonium/lib/grid'
import Playground from 'component-playground'
import Prism from 'prismjs'
import prettier from 'prettier/standalone';
import prettierHTML from 'prettier/parser-html'

function renderHTMLExamples(previewAreas){
  function worker(index){
    if(index == previewAreas.length){
      return;
    }

    const previewArea = previewAreas[index];
    const parent = previewArea.closest('.rev-Col')
    const htmlPreviewArea = parent.querySelector('.htmlPreviewArea')
    if(htmlPreviewArea){
      htmlPreviewArea.textContent = prettier.format(previewArea.innerHTML, {parser: 'html', plugins: [prettierHTML]})
      Prism.highlightElement(htmlPreviewArea);
    }

    var nextFunction = worker.bind(this, index + 1);
    window.requestAnimationFrame(nextFunction);
  }

  var nextFunction = worker.bind(this, 0);
  window.requestAnimationFrame(nextFunction);
}

export default function ExampleSection(props) {
  useEffect(() => {
    if(!props.disableHTMLPreview){
      renderHTMLExamples(document.querySelectorAll('.previewArea'))
    }
  });

  if (typeof props.examples === 'string') {
    return (
      <React.Fragment>
        <Playground theme="lucario" collapsableCode={true} codeText={props.examples} scope={props.scope} />
        {
          props.disableHTMLPreview ? null : (<section className="HTMLCodeSection">
          <h3>HTML</h3>
          <pre>
            <code className="language-markup htmlPreviewArea"></code>
          </pre>
        </section>)
        }
      </React.Fragment>
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
