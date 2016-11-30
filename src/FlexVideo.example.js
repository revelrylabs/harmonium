import React, {Component} from 'react'
import FlexVideo from './FlexVideo'

export class Basic extends Component {
  render() {
    return (
      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/V9gkYw35Vws"
        allowFullScreen
        style={{border:0}}
      />
    )
  }
}

export class Widescreen extends Component {
  render() {
    return (
      <iframe
        width="420"
        height="315"
        src="https://www.youtube.com/embed/aiBt44rrslw"
        allowFullScreen
        style={{border:0}}
      />
    )
  }
}

export class Vimeo extends Component {
  render() {
    return (
      <iframe
        src="http://player.vimeo.com/video/60122989"
        width="400"
        height="225"
        allowFullScreen
        style={{border:0}}
      />
    )
  }
}
