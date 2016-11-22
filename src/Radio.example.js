import React, {Component} from 'react'
import Radio from './Radio'
import {Row, Col} from './grid'

export class Styles extends Component {
  handleRadioChange(e) {
    console.log(e)
  }

  render() {
    return(
      <Row>
        <Col>
          <fieldset>
            <legend> Choose Your Favorite </legend>
            <Radio
              label={'Red'}
              name="pokemon"
              value={'Red'}
              onRadioClick={(e) => this.handleRadioChange(e)}
            />
            <Radio
              label={'Blue'}
              name="pokemon"
              value={'Blue'}
              onRadioClick={(e) => this.handleRadioChange(e)}
            />
            <Radio
              label={'Yellow'}
              name="pokemon"
              value={'Yellow'}
              onRadioClick={(e) => this.handleRadioChange(e)}
            />
          </fieldset>
        </Col>
      </Row>
    )
  }
}
