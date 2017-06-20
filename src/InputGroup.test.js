import InputGroup from './InputGroup'
import Input from './Input'
import Button from './Button'

describe('InputGroup', () => {
  it('should render without throwing', () => {
    shallow(
      <InputGroup>
        <InputGroup.Label>$</InputGroup.Label>
        <InputGroup.Field>
          <Input type="number" defaultValue={100} />
        </InputGroup.Field>
        <InputGroup.Button>
          <Button>Save</Button>
        </InputGroup.Button>
      </InputGroup>
    )
  })
})
