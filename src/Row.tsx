import React from 'react'
import classNames from 'classnames'

const BOOL_PROPS_TO_CLASS_NAMES = {
  // zeros out padding on direct child cols
  collapse: ['rev-Row--collapse'],
  smallCollapse: ['rev-Row--smallCollapse'],
  mediumCollapse: ['rev-Row--mediumCollapse'],
  largeCollapse: ['rev-Row--largeCollapse'],
  xlargeCollapse: ['rev-Row--xlargeCollapse'],
  xxlargeCollapse: ['rev-Row--xxlargeCollapse'],

  // resets padding on direct child cols
  uncollapse: ['rev-Row--uncollapse'],
  smallUncollapse: ['rev-Row--smallUncollapse'],
  mediumUncollapse: ['rev-Row--mediumUncollapse'],
  largeUncollapse: ['rev-Row--largeUncollapse'],
  xlargeUncollapse: ['rev-Row--xlargeUncollapse'],
  xxlargeUncollapse: ['rev-Row--xxlargeUncollapse'],

  flex: ['rev-Row--flex'],
  smallFlex: ['rev-Row--smallFlex'],
  mediumFlex: ['rev-Row--mediumFlex'],
  largeFlex: ['rev-Row--largeFlex'],
  xlargeFlex: ['rev-Row--xlargeFlex'],
  xxlargeFlex: ['rev-Row--xxlargeFlex'],

  unflex: ['rev-Row--unflex'],
  smallUnflex: ['rev-Row--smallUnflex'],
  mediumUnflex: ['rev-Row--mediumUnflex'],
  largeUnflex: ['rev-Row--largeUnflex'],
  xlargeUnflex: ['rev-Row--xlargeUnflex'],
  xxlargeUnflex: ['rev-Row--xxlargeUnflex'],

  // flex grid props affecting child cols
  directionCol: ['rev-Row--directionCol'],

  justifyStart: ['rev-Row--justifyStart'],
  justifyEnd: ['rev-Row--justifyEnd'],
  justifyCenter: ['rev-Row--justifyCenter'],
  justifySpaceAround: ['rev-Row--justifySpaceAround'],
  justifySpaceBetween: ['rev-Row--justifySpaceBetween'],

  alignStart: ['rev-Row--alignStart'],
  alignEnd: ['rev-Row--alignEnd'],
  alignCenter: ['rev-Row--alignCenter'],
  alignBaseline: ['rev-Row--alignBaseline'],
  alignStretch: ['rev-Row--alignStretch'],
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const NUMBER_PROPS_TO_CLASS_NAMES = {
  smallUp: (arg: number) => [`rev-Row--smallUp${arg}`],
  mediumUp: (arg: number) => [`rev-Row--mediumUp${arg}`],
  largeUp: (arg: number) => [`rev-Row--largeUp${arg}`],
  xlargeUp: (arg: number) => [`rev-Row--xlargeUp${arg}`],
  xxlargeUp: (arg: number) => [`rev-Row--xxlargeUp${arg}`],
}

const NUMBER_PROPS = Object.keys(NUMBER_PROPS_TO_CLASS_NAMES)

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
  collapse?: boolean
  smallCollapse?: boolean
  mediumCollapse?: boolean
  largeCollapse?: boolean
  xlargeCollapse?: boolean
  xxlargeCollapse?: boolean
  uncollapse?: boolean
  smallUncollapse?: boolean
  mediumUncollapse?: boolean
  largeUncollapse?: boolean
  xlargeUncollapse?: boolean
  xxlargeUncollapse?: boolean
  flex?: boolean
  smallFlex?: boolean
  mediumFlex?: boolean
  largeFlex?: boolean
  xlargeFlex?: boolean
  xxlargeFlex?: boolean
  unflex?: boolean
  smallUnflex?: boolean
  mediumUnflex?: boolean
  largeUnflex?: boolean
  xlargeUnflex?: boolean
  xxlargeUnflex?: boolean
  directionCol?: boolean
  justifyStart?: boolean
  justifyEnd?: boolean
  justifyCenter?: boolean
  justifySpaceAround?: boolean
  justifySpaceBetween?: boolean
  alignStart?: boolean
  alignEnd?: boolean
  alignCenter?: boolean
  alignBaseline?: boolean
  alignStretch?: boolean
  smallUp?: number
  mediumUp?: number
  largeUp?: number
  xlargeUp?: number
  xxlargeUp?: number
}

/**
 * Row component for grid layouts
 * @param props - Component props
 * @returns Row component
 */
const Row: React.FC<RowProps> = (props) => {
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
    'rev-Row',
    boolClassNames,
    numberClassNames
  )

  return (
    <div {...passthrough} className={divClassName}>
      {children}
    </div>
  )
}

export default Row 