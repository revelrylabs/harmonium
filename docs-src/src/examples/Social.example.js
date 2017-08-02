import React, {Component} from 'react'
import Social from 'revelry-components/lib/Social'
import Button from 'revelry-components/lib/Button'
import Icon from 'revelry-components/lib/Icon'
import {Row, Col} from 'revelry-components/lib/grid'

export class SocialSharingLinks extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <p>Pass in a supported social network (listed below), a link to share, and a message that will be the default post.</p>            
            <p>
              <Social type={Social.types.BUFFER} url="http://revelry.co" message="Sharing via a text link!">
                Share via Buffer
              </Social>
            </p>
            <p>
              <Social type={Social.types.DIGG} url="http://revelry.co" message="Sharing via a text link!">
                Share via Digg
              </Social>
            </p>
            <p>
              <Social type={Social.types.EMAIL} url="http://revelry.co" message="Sharing via a text link!">
                Share via email
              </Social>
            </p>
            <p>
              <Social type={Social.types.FACEBOOK} url="http://revelry.co" message="Sharing via a text link!">
                Share via Facebook
              </Social>
            </p>
            <p>
              <Social type={Social.types.GOOGLE_PLUS} url="http://revelry.co" message="Sharing via a text link!">
                Share via Google+
              </Social>
            </p>
            <p>
              <Social type={Social.types.LINKEDIN} url="http://revelry.co" message="Sharing via a text link!">
                Share via LinkedIn
              </Social>
            </p>
            <p>
              <Social type={Social.types.PINTEREST} url="http://revelry.co" message="Sharing via a text link!">
                Share via Pinterest
              </Social>
            </p>
            <p>
              <Social type={Social.types.REDDIT} url="http://revelry.co" message="Sharing via a text link!">
                Share via Reddit
              </Social>
            </p>
            <p>
              <Social type={Social.types.TUMBLR} url="http://revelry.co" message="Sharing via a text link!">
                Share via Tumblr
              </Social>
            </p>
            <p>
              <Social type={Social.types.TWITTER} url="http://revelry.co" message="Sharing via a text link!">
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
          <Social type={Social.types.FACEBOOK} url="http://revelry.co" message="Sharing via a clickable icon!">
            <Icon className="stat" i="like" />
          </Social>
        </p>
        <p>Add a <code>componentClass={'{Button}'}</code> prop and the link will render as a button.</p>
        <p>
          <Social type={Social.types.TWITTER} url="http://revelry.co" message="Sharing via a button!" componentClass={Button}>
            Share on Twitter!
          </Social>
        </p>
      </div>
    )
  }
}
