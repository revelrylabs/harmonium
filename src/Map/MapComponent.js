import React, {Component} from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import {camelize, loadJS} from './Utilities/Utils'

const BOOL_PROPS_TO_CLASS_NAMES = {
  small: 'rev-Map--small',
  medium: 'rev-Map--medium',
  large: 'rev-Map--large',
}

const BOOL_PROPS = Object.keys(BOOL_PROPS_TO_CLASS_NAMES)

const evtNames = [
  'bounds_changed',
  'center_changed',
  'click',
  'dblclick',
  'drag',
  'dragend',
  'dragstart',
  'heading_changed',
  'idle',
  'maptypeid_changed',
  'mousemove',
  'mouseout',
  'mouseover',
  'projection_changed',
  'resize',
  'rightclick',
  'tilesloaded',
  'tilt_changed',
  'zoom_changed',
]

export default class MapComponent extends Component {
  componentDidMount() {
    const mapScript = window.document.getElementById('mapScript')

    if (!mapScript) {
      this.initMap()
    } else {
      this.loadMap()
    }
  }

  componentWillUnmount() {
    Object.keys(this.listeners).forEach((e) => {
      google.maps.event.removeListener(this.listeners[e])
    })
  }

  initMap = async () => {
    // this is added for the examples pruposes
    const apiKey = typeof this.props.apiKey === 'string' ? this.props.apiKey : process.env.GATSBY_apiKey

    await loadJS(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`)
    this.loadMap()
  }

  loadMap() {
    const propClassNames = BOOL_PROPS.reduce((acc, key) => {
      const value = BOOL_PROPS_TO_CLASS_NAMES[key]

      acc[value] = this.props[key]
      return acc
    }, {})

    this.newClassName = classNames(propClassNames)

    this.mapConfig = {
      apiKey: this.props.apiKey,
      backgroundColor: this.props.backgroundColor,
      center: this.props.center,
      clickableIcons: !!this.props.clickableIcons,
      disableDefaultUI: this.props.disableDefaultUI,
      disableDoubleClickZoom: this.props.disableDoubleClickZoom,
      draggable: this.props.draggable,
      draggableCursor: this.props.draggableCursor,
      draggingCursor: this.props.draggingCursor,
      fullscreenControl: this.props.fullscreenControl,
      gestureHandling: this.props.gestureHandling,
      heading: this.props.heading,
      keyboardShortcuts: this.props.keyboardShortcuts,
      mapTypeControl: this.props.mapTypeControl,
      mapTypeId: this.props.mapTypeId,
      maxZoom: this.props.maxZoom,
      minZoom: this.props.minZoom,
      noClear: this.props.noClear,
      panControl: this.props.panControl,
      rotateControl: this.props.rotateControl,
      scaleControl: this.props.scaleControl,
      scrollwheel: this.props.scrollwheel,
      streetViewControl: this.props.streetViewControl,
      style: this.props.style,
      styles: this.props.styles,
      tilt: this.props.tilt,
      zoom: this.props.zoom,
      zoomControl: this.props.zoomControl,
    }

    if (typeof this.props.center === 'string') {
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({address: this.props.center}, (results, status) => {
        if (status === 'OK') {
          this.mapConfig.center = results[0].geometry.location
          this.buildMap()
        } else {
          alert(`Map geocoder problem type: ${status}`)
        }
      })
    } else {
      this.buildMap()
    }
  }

  buildMap() {
    this.map = new google.maps.Map(
      document.getElementById('map'),
      this.mapConfig
    )
    this.listeners = {} // attached to MapComponent
    evtNames.forEach((e) => {
      this.listeners[e] = this.map.addListener(e, this.handleEvent(e))
    })
    this.forceUpdate()
    /*  https://reactjs.org/docs/react-component.html#forceupdate
    https://reactjs.org/docs/react-component.html#shouldcomponentupdate */
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`

      if (this.props[evtName]) {
        this.props[evtName](this.props, this.map, e)
      }
    }
  }

  renderChildren() {
    const {children} = this.props

    if (!children) {
      return ''
    }
    return React.Children.map(children, (child) => {
      if (!child) {
        return ''
      }
      return React.cloneElement(child, {
        map: this.map,
      })
    })
  }

  render() {
    return (
      <div>
        {this.props.apiKey ? '' : <h4>Missing API Key!</h4>}
        {this.props.center ? '' : <h4>Missing center props!</h4>}
        <div
          id="map"
          className={this.newClassName}
          style={this.newClassName ? {} : this.props.style}
        />
        {this.renderChildren()}
      </div>
    )
  }
}

/* See Documentation
https://developers.google.com/maps/documentation/javascript/reference/3.exp/map#MapOptions */

MapComponent.propTypes = {
  apiKey: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  center: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  children: PropTypes.array,
  clickableIcons: PropTypes.bool,
  disableDefaultUI: PropTypes.bool,
  disableDoubleClickZoom: PropTypes.bool,
  draggable: PropTypes.bool,
  draggableCursor: PropTypes.string,
  draggingCursor: PropTypes.string,
  fullscreenControl: PropTypes.bool,
  gestureHandling: PropTypes.string,
  heading: PropTypes.number,
  keyboardShortcuts: PropTypes.bool,
  mapTypeControl: PropTypes.bool,
  mapTypeId: PropTypes.string,
  maxZoom: PropTypes.number,
  minZoom: PropTypes.number,
  noClear: PropTypes.bool,
  panControl: PropTypes.bool,
  rotateControl: PropTypes.bool,
  scaleControl: PropTypes.bool,
  scrollwheel: PropTypes.bool,
  streetViewControl: PropTypes.bool,
  style: PropTypes.object,
  styles: PropTypes.array,
  tilt: PropTypes.number,
  zoom: PropTypes.number,
  zoomControl: PropTypes.bool,
}

MapComponent.defaultProps = {
  zoom: 14,
  style: {
    width: '55vw',
    height: '55vh',
  },
}

evtNames.forEach((e) => (MapComponent.propTypes[camelize(e)] = PropTypes.func))
