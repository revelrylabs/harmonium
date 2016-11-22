import React, {Component} from 'react'
import {Row, Col} from './grid'
import {Input, Textarea, Radio, Checkbox} from './forms'

export class Example extends Component {
  render() {
    return (
      <Row>
        <Col>
          <form>
            <Row>
              <Col>
                <Input
                  name="users[name]"
                  defaultValue="Al Pacino"
                  label="Name"
                  help="The name of the user, duh."
                  error="Oh no! An error!"
                />
              </Col>
              <Col>
                <Textarea
                  name="users[bio]"
                  label="Bio"
                  error="Just an error without help text."
                />
              </Col>
              <Col>
                <Radio name="users[handedness]" defaultValue="left" label="Lefty" error />
                <Radio name="users[handedness]" defaultValue="right" label="Righty" />
              </Col>
              <Col>
                <Radio.Fieldset name="users[footedness]" defaultValue="right" label="Footedness" options={[
                  {label: 'Goofy', value: 'left'},
                  {label: 'Righty', value: 'right'},
                ]} />
              </Col>
              <Col>
                <Checkbox name="users[eyes][]" defaultValue="left" label="Has left eye" error />
                <Checkbox name="users[eyes][]" defaultValue="right" label="Has right eye" />
              </Col>
              <Col>
                <Checkbox.Fieldset
                  name="users[kidneys][]"
                  defaultValue={['left', 'right']}
                  label="Has kidneys"
                  help="Harvest SO MANY kidneys!"
                  error="Not enough kidneys harvested"
                  options={[
                    {label: 'Left', value: 'left'},
                    {label: 'Right', value: 'right'},
                  ]}
                />
              </Col>
            </Row>
          </form>
        </Col>
      </Row>
    )
  }
}
