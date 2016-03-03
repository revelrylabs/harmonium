import React from 'react'
import _ from 'underscore'

export default {

  suitSetObject: function(base, flags) {
    let obj = {}
    obj[base] = true
    for(let name in flags) {
      obj[`${base}--${name}`] = flags[name]
    }
    return obj
  },

  suitSet: function(base, flags) {
    return this.classSet(this.suitSetObject(base, flags))
  },

  getPropsWithout: function(...names) {
    return _.omit(this.props, names)
  },

  classSet: function(flags) {
    let classNames = []
    for(let name in flags) {
      if(flags[name]) {
        classNames.push(name)
      }
    }
    return classNames.join(' ')
  },

  cx: function() {
    this.classSet.apply(this, arguments)
  },

  getClassSetObjectFromClassName: function(className) {
    let obj = {}
    className.split(' ').forEach((name) => {
      obj[name.trim()] = true
    })
    return obj
  },

  classAdd: function(flags) {
    let obj = this.getClassSetObjectFromClassName(this.props.className || '')
    _.extend(obj, flags)
    return this.classSet(obj)
  },

  mapChildren: function(fn) {
    return React.Children.map(this.props.children, fn)
  },

  getNormalizedChildren: function() {
    console.warn('Core mixin method `getNormalizedChildren` is deprecated. Please use `mapChildren` or `React.Children.map`.')
    let children = this.props.children
    return children && children.length === 0 ? [children] : children
  },

}
