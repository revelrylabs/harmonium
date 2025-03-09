import React, { createElement, ReactNode } from 'react'
import classNames from 'classnames'
import { omit } from 'lodash'

type SocialType = (url: string, text?: string) => string

interface UrlFunctions {
  BUFFER: SocialType
  DIGG: SocialType
  EMAIL: SocialType
  FACEBOOK: SocialType
  GOOGLE_PLUS: SocialType
  LINKEDIN: SocialType
  PINTEREST: SocialType
  REDDIT: SocialType
  TUMBLR: SocialType
  TWITTER: SocialType
}

const URL_FUNCTIONS: UrlFunctions = {
  BUFFER: (url, text) => `https://buffer.com/add?text=${text}&url=${url}`,
  DIGG: (url, text) => `http://digg.com/submit?url=${url}&title=${text}`,
  EMAIL: (url, text) => `mailto:?subject=${text}&body=${url}`,
  FACEBOOK: (url) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  GOOGLE_PLUS: (url) => `https://plus.google.com/share?url=${url}`,
  LINKEDIN: (url, text) =>
    `https://www.linkedin.com/shareArticle?url=${url}&title=${text}`,
  PINTEREST: (url, text) =>
    `https://pinterest.com/pin/create/bookmarklet/?url=${url}&description=${text}`,
  REDDIT: (url, text) => `https://reddit.com/submit?url=${url}&title=${text}`,
  TUMBLR: (url, text) =>
    `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${url}&caption=${text}`,
  TWITTER: (url, text) =>
    `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
}

export interface SocialProps {
  type: SocialType
  url: string
  message?: string
  componentClass?: React.ElementType
  className?: string
  children?: ReactNode
  [key: string]: any
}

/**
 * Social component for sharing content to social networks
 * @param props - Component props
 * @returns Social component
 */
const Social: React.FC<SocialProps> & { types: UrlFunctions } = (props) => {
  const { 
    className, 
    componentClass = 'a', 
    url, 
    message = 'Check this out!',
    type,
    children,
    ...rest 
  } = props

  const getHref = (): string => {
    return type(encodeURIComponent(url), encodeURIComponent(message))
  }
  
  const componentClassName = classNames(className, 'social')
  const omittedProps = omit(rest, ['url', 'message', 'type'])
  const componentProps = {
    ...omittedProps,
    href: getHref(),
    rel: 'noopener noreferrer',
    target: '_blank',
    className: componentClassName,
  }

  return createElement(componentClass, componentProps, children)
}

// Add types as a static property
Social.types = URL_FUNCTIONS

export default Social 