import React from 'react'
import {Col} from './grid'

const BOOL_PROPS = [
  'end',
  'smallCentered',
  'mediumCentered',
  'largeCentered',
  'smallUncentered',
  'mediumUncentered',
  'largeUncentered',
  'shrink',
  'smallExpand',
  'mediumExpand',
  'largeExpand',
  'alignSelfBottom',
  'alignSelfMiddle',
  'alignSelfTop',
]

export default class FlexCol extends Col {
  static get boolProps() {
    return BOOL_PROPS
  }
}
