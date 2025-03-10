import React, {Component, ReactNode} from 'react'
import classNames from 'classnames'

// Class names mapping for parent
const PARENT_CLASS_NAMES: Record<string, string[]> = {
  stackForSmall: ['stack-for-small', 'rev-MediaObject--stackForSmall'],
  stackForMedium: ['stack-for-medium', 'rev-MediaObject--stackForMedium'],
  stackForLarge: ['stack-for-large', 'rev-MediaObject--stackForLarge'],

  right: ['align-right', 'rev-MediaObject--right'],
  center: ['align-center', 'rev-MediaObject--center'],
  justify: ['align-justify', 'rev-MediaObject--justify'],
  spaced: ['align-spaced', 'rev-MediaObject--spaced'],
  top: ['align-top', 'rev-MediaObject--top'],
  middle: ['middle', 'align-middle', 'rev-MediaObject--middle'],
  bottom: ['bottom', 'align-bottom', 'rev-MediaObject--bottom'],
  stretch: ['align-stretch', 'rev-MediaObject--stretch'],
}

// Class names mapping for section
const SECTION_CLASS_NAMES: Record<string, string[]> = {
  main: ['main-section', 'rev-MediaObject-section--main'],

  right: ['align-self-right', 'rev-MediaObject-section--right'],
  center: ['align-self-center', 'rev-MediaObject-section--center'],
  justify: ['align-self-justify', 'rev-MediaObject-section--justify'],
  spaced: ['align-self-spaced', 'rev-MediaObject-section--spaced'],
  top: ['align-self-top', 'rev-MediaObject-section--top'],
  middle: ['middle', 'align-self-middle', 'rev-MediaObject-section--middle'],
  bottom: ['bottom', 'align-self-bottom', 'rev-MediaObject-section--bottom'],
  stretch: ['align-self-stretch', 'rev-MediaObject-section--stretch'],
}

// Define the common options from the class names
type ParentOptions = keyof typeof PARENT_CLASS_NAMES
type SectionOptions = keyof typeof SECTION_CLASS_NAMES

// Interface for MediaObject props
export interface MediaObjectProps {
  className?: string
  children?: ReactNode
  stackForSmall?: boolean
  stackForMedium?: boolean
  stackForLarge?: boolean
  right?: boolean
  center?: boolean
  justify?: boolean
  spaced?: boolean
  top?: boolean
  middle?: boolean
  bottom?: boolean
  stretch?: boolean
  [key: string]: any
}

// Interface for MediaObjectSection props
export interface MediaObjectSectionProps {
  className?: string
  children?: ReactNode
  main?: boolean
  right?: boolean
  center?: boolean
  justify?: boolean
  spaced?: boolean
  top?: boolean
  middle?: boolean
  bottom?: boolean
  stretch?: boolean
  [key: string]: any
}

/**
 * MediaObjectSection component
 * A section within a media object, can be the image or the text content
 */
class MediaObjectSection extends Component<MediaObjectSectionProps> {
  render() {
    // Extract props that won't pass through
    const {className, children, ...props} = this.props

    // Start building the className
    const classNameList: string[] = []

    // Create a mutable copy of props
    const propsToProcess = {...props}

    // Add class names based on props
    Object.keys(SECTION_CLASS_NAMES).forEach((name) => {
      const typedName = name as SectionOptions
      if (propsToProcess[typedName]) {
        classNameList.push(...SECTION_CLASS_NAMES[typedName])
      }
      // Delete the prop so it doesn't pass through to the DOM
      delete propsToProcess[typedName]
    })

    // Finish building the className
    const sectionClassNames = classNames(
      classNameList,
      'media-object-section',
      'rev-MediaObject-section',
      className
    )

    return (
      <div {...propsToProcess} className={sectionClassNames}>
        {children}
      </div>
    )
  }
}

/**
 * MediaObject component with a static Section property
 * A media object is a container with left or right aligned image and text
 */
interface MediaObjectClass extends React.ComponentClass<MediaObjectProps> {
  Section: typeof MediaObjectSection
}

export default class MediaObject extends Component<MediaObjectProps> {
  static Section = MediaObjectSection as any

  render() {
    // Extract props that won't pass through
    const {className, children, ...props} = this.props

    // Start building the className
    const classNameList: string[] = []

    // Create a mutable copy of props
    const propsToProcess = {...props}

    // Add class names based on props
    Object.keys(PARENT_CLASS_NAMES).forEach((name) => {
      const typedName = name as ParentOptions
      if (propsToProcess[typedName]) {
        classNameList.push(...PARENT_CLASS_NAMES[typedName])
      }
      // Delete the prop so it doesn't pass through to the DOM
      delete propsToProcess[typedName]
    })

    // Finish building the className
    const mediaObjectClassNames = classNames(
      classNameList,
      'media-object',
      'rev-MediaObject',
      className
    )

    return (
      <div {...propsToProcess} className={mediaObjectClassNames}>
        {children}
      </div>
    )
  }
} 