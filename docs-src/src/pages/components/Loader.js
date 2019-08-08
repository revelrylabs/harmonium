import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'
import Layout from '../../layouts/index.js'

const examples = {
  Sizes: require('raw-loader!../../examples/Loader/Sizes.js.example'),
  Duration: require('raw-loader!../../examples/Loader/Duration.js.example'),
  Color: require('raw-loader!../../examples/Loader/Color.js.example'),
  'Secondary color': require('raw-loader!../../examples/Loader/SecondaryColor.js.example'),
  'Usage with button': require('raw-loader!../../examples/Loader/ButtonLoader.js.example'),
}

export default class LoaderExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Loader"
          metaDescription={
            'The Loader component is a loading spinner that can be used to ' +
            'indicate that some content is loading, or that the system is ' +
            'otherwise doing work which may take some time to complete.'
          }
          extraKeywords="Component, Loader, Spinner, Busy Indicator"
        >
          <p>
            The Loader component is a loading spinner that can be used to
            indicate that some content is loading, or that the system is
            otherwise doing work which may take some time to complete.
          </p>
        </Headers>
        <ExampleSection
          title="Examples"
          examples={examples}
          depth={1}
          scope={scope}
        />
      </div>
    )
  }
}
