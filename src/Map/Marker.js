import {Component} from 'react'
import PropTypes from 'prop-types'
import {camelize} from './Utils'

/* See Documentation
https://developers.google.com/maps/documentation/javascript/markers */

const evtNames = [
  'click',
  'dblclick',
  'dragend',
  'mousedown',
  'mouseout',
  'mouseover',
  'mouseup',
  'recenter',
]

export default class Marker extends Component {
  componentDidUpdate() {
    if (this.props && this.props.map) {
      this.loadMarker()
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null)
    }
  }

  loadMarker() {
    const {map, position, icon, label, title, draggable} = this.props

    this.markerConfig = {
      map,
      position,
      icon,
      label,
      title,
      draggable,
      // animation: animation
      /* how to deal with animation, state of the big container, wrapper? */
    }

    if (typeof this.props.position === 'string') {
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({address: this.props.position}, (results, status) => {
        if (status === 'OK') {
          this.markerConfig.position = results[0].geometry.location
          this.buildMarker()
        } else {
          alert(`Marker geocoder problem type: ${status}`)
        }
      })
    } else {
      this.buildMarker()
    }
  }

  buildMarker() {
    this.marker = new google.maps.Marker(this.markerConfig)
    evtNames.forEach((e) => {
      this.marker.addListener(e, this.handleEvent(e))
    })
    return this.marker
  }

  handleEvent(evt) {
    return (e) => {
      const evtName = `on${camelize(evt)}`

      if (this.props[evtName]) {
        this.props[evtName](this.props, this.marker, e) //* **purpose of passing this.props?* */
      }
    }
  }

  render() {
    return null
  }
}

Marker.propTypes = {
  map: PropTypes.object,
  position: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    .isRequired,
  icon: PropTypes.object,
  label: PropTypes.string,
  title: PropTypes.string,
  draggable: PropTypes.bool,
}

evtNames.forEach((e) => (Marker.propTypes[camelize(e)] = PropTypes.func))
