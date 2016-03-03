import React from 'react'
import Revelry from '../revelry'

export default Revelry.registerMixin('BackboneProps', {
  // Component should contain a map of prop names to Backbone classes, like:
  //
  // backboneMap = {
  //   users: User.Collection,
  // }

  // Set up our Backbone instance objects.
  componentWillMount() {
    this.backbonify(this.props)
  },

  componentWillReceiveProps(nextProps) {
    this.backbonify(nextProps)
  },

  backbonify(props) {
    this.__bb = []

    _.each(this.backboneMap, (klass, name) => {
      let data = props[name]

      if(data != null && !(data instanceof Backbone.Model || data instanceof Backbone.Collection)) {
        // Rewrite the prop as the correct Backbone model or collection.
        props[name] = new klass(data)
      }

      // Save a reference so we can wire up events.
      this.__bb.push(props[name])
    })
  },

  // Whenever there may be a change in the Backbone data, trigger a reconcile.
  componentDidMount() {
    _.each(this.__bb, (model) => {
      model.on('all', this.forceUpdate.bind(this, null), this)
    })
  },

  // Clean up any dangling references when the component is destroyed.
  componentWillUnmount() {
    _.each(this.__bb, (model) => {
      model.off(null, null, this)
    })
  },

})
