import React, {Component} from 'react'
import Social from './Social'
import Icon from './Icon'
import {Row, Col} from './grid'

export class SocialSharingLinks extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <p>
              <Social socialNetwork="Buffer" url="http://revelry.co" message="Sharing via a text link!">Share via Buffer</Social>
            </p>
            <p>
              <Social socialNetwork="Digg" url="http://revelry.co" message="Sharing via a text link!">Share via Digg</Social>
            </p>
            <p>
              <Social socialNetwork="email" url="http://revelry.co" message="Sharing via a text link!">Share via email</Social>
            </p>
            <p>
              <Social socialNetwork="Facebook" url="http://revelry.co" message="Sharing via a text link!">Share via Facebook</Social>
            </p>
            <p>
              <Social socialNetwork="Google+" url="http://revelry.co" message="Sharing via a text link!">Share via Google+</Social>
            </p>
            <p>
              <Social socialNetwork="LinkedIn" url="http://revelry.co" message="Sharing via a text link!">Share via LinkedIn</Social>
            </p>
            <p>
              <Social socialNetwork="Pinterest" url="http://revelry.co" message="Sharing via a text link!">Share via Pinterest</Social>
            </p>
            <p>
              <Social socialNetwork="Reddit" url="http://revelry.co" message="Sharing via a text link!">Share via Reddit</Social>
            </p>
            <p>
              <Social socialNetwork="Tumblr" url="http://revelry.co" message="Sharing via a text link!">Share via Tumblr</Social>
            </p>
            <p>
              <Social socialNetwork="Twitter" url="http://revelry.co" message="Sharing via a text link!">Share via Twitter</Social>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export class SocialSharingIcons extends Component {
  render() {
    return (
      <div>
        <p>Pass an icon or image as a child.</p>
        <Social socialNetwork="Facebook" url="http://revelry.co" message="Sharing via an icon link!">
          <Icon className="stat" i="like" />
        </Social>
      </div>
    )
  }
}
