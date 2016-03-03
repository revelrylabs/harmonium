import React, {Component} from 'react'
import MainComponent from './MainComponent'

export default class Application {

  constructor(config) {
    this._buildViewLookup(config.views)
    this._domContainerId = config.domContainerId
    this._transform = config.transform
  }

  _views = new Map()
  get views() {
    return this._views
  }

  // Recursively transform an object tree of views into a string-key-to-component-value Map.
  _buildViewLookup(viewOrObjectOfViews, pathParts = []) {
    // Found a view. Set some/key/like/this in the view lookup.
    if(viewOrObjectOfViews.prototype instanceof Component) {
      this.views.set(pathParts.join('/'), viewOrObjectOfViews)
    // Found an object of views. Recurse into it, noting the current path.
    } else if(viewOrObjectOfViews instanceof Object) {
      Object.keys(viewOrObjectOfViews).forEach((key) => {
        this._buildViewLookup(viewOrObjectOfViews[key], [...pathParts, key])
      })
    // Found a null or something. That should not happen.
    } else {
      throw 'Invalid view.'
    }
  }

  _domContainerId = null
  get domContainerId() {
    return this._domContainerId
  }

  _transform = null
  get transform() {
    return this._transform
  }

  _mainComponent = null
  get mainComponent() {
    return this._mainComponent
  }

  createMainProps(viewName, viewProps) {
    const {views, transform} = this
    return {application: this, views, transform, viewName, viewProps}
  }

  createMainComponent(...args) {
    const props = this.createMainProps(...args)
    return this._mainComponent = <MainComponent {...props} />
  }
}
