import React, { cloneElement, ReactElement } from 'react'
import classNames from 'classnames'

const CLASS_NAMES = {
  left: 'Text-left',
  right: 'Text-right',
  center: 'Text-center',
  justify: 'Text-justify',

  smallLeft: 'Text--smallLeft',
  smallRight: 'Text--smallRight',
  smallCenter: 'Text--smallCenter',
  smallJustify: 'Text--smallJustify',

  mediumLeft: 'Text--mediumLeft',
  mediumRight: 'Text--mediumRight',
  mediumCenter: 'Text--mediumCenter',
  mediumJustify: 'Text--mediumJustify',

  largeLeft: 'Text--largeLeft',
  largeRight: 'Text--largeRight',
  largeCenter: 'Text--largeCenter',
  largeJustify: 'Text--largeJustify',

  xlargeLeft: 'Text--xlargeLeft',
  xlargeRight: 'Text--xlargeRight',
  xlargeCenter: 'Text--xlargeCenter',
  xlargeJustify: 'Text--xlargeJustify',

  xxlargeLeft: 'Text--xxlargeLeft',
  xxlargeRight: 'Text--xxlargeRight',
  xxlargeCenter: 'Text--xxlargeCenter',
  xxlargeJustify: 'Text--xxlargeJustify',
}

// Create interface with all possible text alignment options
type TextAlignmentClassNames = typeof CLASS_NAMES
type TextAlignmentProps = {
  [K in keyof TextAlignmentClassNames]?: boolean
}

export interface TextAlignProps extends TextAlignmentProps {
  children: ReactElement
}

/**
 * TextAlign component for applying text alignment classes to its children
 * @param props - Component props
 * @returns Modified child element with text alignment classes
 */
const TextAlign: React.FC<TextAlignProps> = (props) => {
  const { children, ...alignmentProps } = props
  const classNamesList: string[] = [children.props.className]

  Object.keys(alignmentProps).forEach((propName) => {
    const className = CLASS_NAMES[propName as keyof typeof CLASS_NAMES]

    if (className) {
      classNamesList.push(className)
    }
  })

  return cloneElement(children, {
    className: classNames(classNamesList),
  })
}

export default TextAlign 