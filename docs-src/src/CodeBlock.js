import React from 'react';
import theme from "prism-react-renderer/themes/palenight";
import Highlight, { defaultProps } from "prism-react-renderer";

export default function CodeBlock({ code, language }) {
  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
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
