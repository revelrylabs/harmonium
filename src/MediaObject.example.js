import React, {Component} from 'react'
import {MediaObject, MediaObjectSection} from './MediaObject'
import Lipsum from './Lipsum'

export class Basics extends Component {
  render() {
    return (
      <MediaObject>
        <MediaObjectSection>
          <div>
            <img src= "//placehold.it/100x100"/>
          </div>
        </MediaObjectSection>
        <MediaObjectSection mainSection>
          <Lipsum/>
        </MediaObjectSection>
      </MediaObject>
    )
  }
}

export class SectionAlignment extends Component {
  render() {
    return (
      <MediaObject>
        <MediaObjectSection middle>
          <div>
            <img src= "//placehold.it/100x100"/>
          </div>
        </MediaObjectSection>
        <MediaObjectSection>
          <Lipsum/>
          <Lipsum/>
        </MediaObjectSection>
        <MediaObjectSection bottom>
          <div>
            <img src= "//placehold.it/100x100"/>
          </div>
        </MediaObjectSection>
      </MediaObject>
    )
  }
}

export class Stack extends Component {
  render() {
    return (
      <MediaObject stackForSmall>
        <MediaObjectSection>
          <div>
            <img src= "//placehold.it/350x100"/>
          </div>
        </MediaObjectSection>
        <MediaObjectSection>
          <h4>I can stack!</h4>
          <Lipsum/>
        </MediaObjectSection>
      </MediaObject>
    )
  }
}

export class NestedMediaObjects extends Component {
  render() {
    return (
      <MediaObject>
        <MediaObjectSection>
          <div>
            <img src= "//placehold.it/100x100"/>
          </div>
        </MediaObjectSection>
        <MediaObjectSection>
          <h4>I'm First!</h4>
          <Lipsum/>
          <MediaObject>
            <MediaObjectSection>
              <div>
                <img src= "//placehold.it/100x100"/>
              </div>
            </MediaObjectSection>
            <MediaObjectSection>
              <h4>I'm Second!</h4>
              <Lipsum/>
            </MediaObjectSection>
          </MediaObject>
        </MediaObjectSection>
      </MediaObject>
    )
  }
}
