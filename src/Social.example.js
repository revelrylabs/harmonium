import React, {Component} from 'react'
import Social from './Social'
import Icon from './Icon'
import Button from './Button'
import {Row, Col} from './grid'

export class SocialSharingLinks extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <p>Pass in a supported social network (listed below), a link to share, and a message that will be the default post.</p>
            <p>
              <Social socialNetwork="Buffer" url="http://revelry.co" message="Sharing via a text link!">
                Share via Buffer
              </Social>
            </p>
            <p>
              <Social socialNetwork="Digg" url="http://revelry.co" message="Sharing via a text link!">
                Share via Digg
              </Social>
            </p>
            <p>
              <Social socialNetwork="email" url="http://revelry.co" message="Sharing via a text link!">
                Share via email
              </Social>
            </p>
            <p>
              <Social socialNetwork="Facebook" url="http://revelry.co" message="Sharing via a text link!">
                Share via Facebook
              </Social>
            </p>
            <p>
              <Social socialNetwork="Google+" url="http://revelry.co" message="Sharing via a text link!">
                Share via Google+
              </Social>
            </p>
            <p>
              <Social socialNetwork="LinkedIn" url="http://revelry.co" message="Sharing via a text link!">
                Share via LinkedIn
              </Social>
            </p>
            <p>
              <Social socialNetwork="Pinterest" url="http://revelry.co" message="Sharing via a text link!">
                Share via Pinterest
              </Social>
            </p>
            <p>
              <Social socialNetwork="Reddit" url="http://revelry.co" message="Sharing via a text link!">
                Share via Reddit
              </Social>
            </p>
            <p>
              <Social socialNetwork="Tumblr" url="http://revelry.co" message="Sharing via a text link!">
                Share via Tumblr
              </Social>
            </p>
            <p>
              <Social socialNetwork="Twitter" url="http://revelry.co" message="Sharing via a text link!">
                Share via Twitter
              </Social>
            </p>
          </Col>
        </Row>
      </div>
    )
  }
}

export class SocialSharingIconsAndButtons extends Component {
  render() {
    return (
      <div>
        <p>Pass an icon or image as a child and the link will wrap it.</p>
        <p>
          <Social socialNetwork="Facebook" url="http://revelry.co" message="Sharing via a clickable icon!">
            <Icon className="stat" i="like" />
          </Social>
        </p>
        <p>Add a <code>button</code> prop and the link will render as a button.</p>
        <p>
          <Social socialNetwork="Twitter" url="http://revelry.co" message="Sharing via a button!" button tiny>
            Share on Twitter!
          </Social>
        </p>
        <p>Pass an icon/image child along with <code>button</code> and you'll get an icon button.</p>
        <p>
          <Social socialNetwork="Facebook" url="http://revelry.co" message="Sharing via an icon button!" button>
            <Icon className="stat" i="like" />
          </Social>
        </p>
      </div>
    )
  }
}
