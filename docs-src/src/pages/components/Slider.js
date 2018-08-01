import React, {Component} from 'react'
import ExampleSection from '../../ExampleSection'
import scope from '../../ExampleScope'
import Headers from '../../Headers'

const examples = {
  Slider: require('raw!../../examples/Slider.js.example'),
}

export default class SliderExamplePage extends Component {
  render() {
    return (
      <div className="rev-Row rev-Row--collapse">
        <Headers
          title="Slider"
          metaDescription={
            'Harmonium provides a simple slider with a data-binding input field.'
          }
          extraKeywords="Component, Slider, Form, input, range"
        >
          <p>
            Harmonium provides a simple slider with a data-binding input field.
            Data binding allows you to connect the slider to an external input
            field. With data binding set up, dragging the handle will change the
            value inside the text field, and editing the number in the text
            field will move the slider in real-time.
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
