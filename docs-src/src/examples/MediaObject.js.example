import React, {Component} from 'react'
import MediaObject from 'revelry-components/lib/MediaObject'
import Lipsum from 'revelry-components/lib/Lipsum'

export class Basics extends Component {
  render() {
    return (
      <MediaObject>
        <MediaObject.Section>
          <div>
            <img src= "//placehold.it/100x100"/>
          </div>
        </MediaObject.Section>
        <MediaObject.Section main>
          <Lipsum/>
        </MediaObject.Section>
      </MediaObject>
    )
  }
}

export class SectionAlignment extends Component {
  render() {
    return (
      <MediaObject>
        <MediaObject.Section middle>
          <div>
            <img src="//placehold.it/100x100"/>
          </div>
        </MediaObject.Section>
        <MediaObject.Section>
          <Lipsum/>
          <Lipsum/>
        </MediaObject.Section>
        <MediaObject.Section bottom>
          <div>
            <img src="//placehold.it/100x100"/>
          </div>
        </MediaObject.Section>
      </MediaObject>
    )
  }
}

export class Stack extends Component {
  render() {
    return (
      <MediaObject stackForSmall>
        <MediaObject.Section>
          <div>
            <img src="//placehold.it/350x100"/>
          </div>
        </MediaObject.Section>
        <MediaObject.Section>
          <h4>I can stack!</h4>
          <Lipsum/>
        </MediaObject.Section>
      </MediaObject>
    )
  }
}

export class NestedMediaObjects extends Component {
  render() {
    return (
      <MediaObject>
        <MediaObject.Section>
          <div>
            <img src="//placehold.it/100x100"/>
          </div>
        </MediaObject.Section>
        <MediaObject.Section>
          <h4>First!</h4>
          <Lipsum/>
          <MediaObject>
            <MediaObject.Section>
              <div>
                <img src="//placehold.it/100x100"/>
              </div>
            </MediaObject.Section>
            <MediaObject.Section>
              <h4>Second!</h4>
              <Lipsum/>
            </MediaObject.Section>
          </MediaObject>
        </MediaObject.Section>
      </MediaObject>
    )
  }
}
