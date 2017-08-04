import React, {Component} from 'react'
import Progress from 'revelry-components/lib/Progress'

export class Basic extends Component {
  render() {
    return (
      <div>
        <Progress value={20} />
        <Progress value={40} />
        <Progress value={60} />
        <Progress value={80} />
        <Progress value={100} />
      </div>
    )
  }
}

export class WithText extends Component {
  render() {
    return (
      <div>
        <Progress value={90}>text</Progress>
      </div>
    )
  }
}

export class Colors extends Component {
  render() {
    return (
      <div>
        <Progress value={90} secondary>secondary</Progress>
        <Progress value={90} success>success</Progress>
        <Progress value={90} warning>warning</Progress>
        <Progress value={90} alert>alert</Progress>
      </div>
    )
  }
}

export class MinAndMax extends Component {
  render() {
    return (
      <div>
        <Progress min={1} max={5} value={4}>4 on a 1 to 5 scale</Progress>
      </div>
    )
  }
}
