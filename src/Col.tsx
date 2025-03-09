import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  // props for float grid
  smallCentered: ['rev-Col--smallCentered'],
  mediumCentered: ['rev-Col--mediumCentered'],
  largeCentered: ['rev-Col--largeCentered'],
  xlargeCentered: ['rev-Col--xlargeCentered'],
  xxlargeCentered: ['rev-Col--xxlargeCentered'],

  smallUncentered: ['rev-Col--smallUncentered'],
  mediumUncentered: ['rev-Col--mediumUncentered'],
  largeUncentered: ['rev-Col--largeUncentered'],
  xlargeUncentered: ['rev-Col--xlargeUncentered'],
  xxlargeUncentered: ['rev-Col--xxlargeUncentered'],

  end: ['rev-Col--end'],

  // padding props for float or flex grid
  collapse: ['rev-Col--collapse'],
  mediumCollapse: ['rev-Col--mediumCollapse'],
  largeCollapse: ['rev-Col--largeCollapse'],
  xlargeCollapse: ['rev-Col--xlargeCollapse'],
  xxlargeCollapse: ['rev-Col--xxlargeCollapse'],

  uncollapse: ['rev-Col--uncollapse'],
  mediumUncollapse: ['rev-Col--mediumUncollapse'],
  largeUncollapse: ['rev-Col--largeUncollapse'],
  xlargeUncollapse: ['rev-Col--xlargeUncollapse'],
  xxlargeUncollapse: ['rev-Col--xxlargeUncollapse'],

  // width props for flex grid
  shrink: ['rev-Col--shrink'],

  // align-self props for flex grid
  alignStart: ['rev-Col--alignStart'],
  alignEnd: ['rev-Col--alignEnd'],
  alignCenter: ['rev-Col--alignCenter'],
  alignBaseline: ['rev-Col--alignBaseline'],
  alignStretch: ['rev-Col--alignStretch'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  small: (arg: number) => [`rev-Col--small${arg}`],
  medium: (arg: number) => [`rev-Col--medium${arg}`],
  large: (arg: number) => [`rev-Col--large${arg}`],
  xlarge: (arg: number) => [`rev-Col--xlarge${arg}`],
  xxlarge: (arg: number) => [`rev-Col--xxlarge${arg}`],

  smallOffset: (arg: number) => [`rev-Col--smallOffset${arg}`],
  mediumOffset: (arg: number) => [`rev-Col--mediumOffset${arg}`],
  largeOffset: (arg: number) => [`rev-Col--largeOffset${arg}`],
  xlargeOffset: (arg: number) => [`rev-Col--xlargeOffset${arg}`],
  xxlargeOffset: (arg: number) => [`rev-Col--xxlargeOffset${arg}`],

  smallPush: (arg: number) => [`rev-Col--smallPush${arg}`],
  mediumPush: (arg: number) => [`rev-Col--mediumPush${arg}`],
  largePush: (arg: number) => [`rev-Col--largePush${arg}`],
  xlargePush: (arg: number) => [`rev-Col--xlargePush${arg}`],
  xxlargePush: (arg: number) => [`rev-Col--xxlargePush${arg}`],

  smallPull: (arg: number) => [`rev-Col--smallPull${arg}`],
  mediumPull: (arg: number) => [`rev-Col--mediumPull${arg}`],
  largePull: (arg: number) => [`rev-Col--largePull${arg}`],
  xlargePull: (arg: number) => [`rev-Col--xlargePull${arg}`],
  xxlargePull: (arg: number) => [`rev-Col--xxlargePull${arg}`],

  smallOrder: (arg: number) => [`rev-Col--smallOrder${arg}`],
  mediumOrder: (arg: number) => [`rev-Col--mediumOrder${arg}`],
  largeOrder: (arg: number) => [`rev-Col--largeOrder${arg}`],
  xlargeOrder: (arg: number) => [`rev-Col--xlargeOrder${arg}`],
  xxlargeOrder: (arg: number) => [`rev-Col--xxlargeOrder${arg}`],
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  
  // Boolean props
  smallCentered?: boolean
  mediumCentered?: boolean
  largeCentered?: boolean
  xlargeCentered?: boolean
  xxlargeCentered?: boolean
  smallUncentered?: boolean
  mediumUncentered?: boolean
  largeUncentered?: boolean
  xlargeUncentered?: boolean
  xxlargeUncentered?: boolean
  end?: boolean
  collapse?: boolean
  mediumCollapse?: boolean
  largeCollapse?: boolean
  xlargeCollapse?: boolean
  xxlargeCollapse?: boolean
  uncollapse?: boolean
  mediumUncollapse?: boolean
  largeUncollapse?: boolean
  xlargeUncollapse?: boolean
  xxlargeUncollapse?: boolean
  shrink?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  
  // Number props
  small?: number
  medium?: number
  large?: number
  xlarge?: number
  xxlarge?: number
  smallOffset?: number
  mediumOffset?: number
  largeOffset?: number
  xlargeOffset?: number
  xxlargeOffset?: number
  smallPush?: number
  mediumPush?: number
  largePush?: number
  xlargePush?: number
  xxlargePush?: number
  smallPull?: number
  mediumPull?: number
  largePull?: number
  xlargePull?: number
  xxlargePull?: number
  smallOrder?: number
  mediumOrder?: number
  largeOrder?: number
  xlargeOrder?: number
  xxlargeOrder?: number
}

/**
 * Col component for grid layouts
 * @param props - Component props
 * @returns Col component
 */
const Col: React.FC<ColProps> = (props) => {
  const { children, className, ...passthrough } = props

  const boolClassNames: string[] = []

  BOOL_PROPS.forEach((name) => {
    if (passthrough[name as keyof typeof passthrough]) {
      boolClassNames.push(BOOL_PROPS_TO_CLASS_NAMES[name as keyof typeof BOOL_PROPS_TO_CLASS_NAMES])
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const numberClassNames: string[] = []

  NUMBER_PROPS.forEach((name) => {
    const value = passthrough[name as keyof typeof passthrough]
    const func = NUMBER_PROPS_TO_CLASS_NAMES[name as keyof typeof NUMBER_PROPS_TO_CLASS_NAMES]

    if (value != null) {
      numberClassNames.push(func(value as number))
    }
    delete passthrough[name as keyof typeof passthrough]
  })

  const divClassName = classNames(
    className,
    'rev-Col',
    boolClassNames,
    numberClassNames
  )

  return (
    <div {...passthrough} className={divClassName}>
      {children}
    </div>
  )
}

export default Col 