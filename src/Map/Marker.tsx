import React, {Component} from 'react'
import {camelize} from './Utilities/Utils'

/* See Documentation
https://developers.google.com/maps/documentation/javascript/markers */

// Basic Google Maps type definitions for Marker if they don't already exist
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions)
  }
  
  class Marker {
    constructor(opts: MarkerOptions)
    setMap(map: Map | null): void
    addListener(eventName: string, handler: Function): MapsEventListener
  }
  
  class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void
  }
  
  interface MarkerOptions {
    map?: Map
    position: LatLng | LatLngLiteral | string
    icon?: any
    label?: string
    title?: string
    draggable?: boolean
    [key: string]: any
  }
  
  interface GeocoderRequest {
    address?: string
    [key: string]: any
  }
  
  interface GeocoderResult {
    geometry: {
      location: LatLng
    }
    [key: string]: any
  }
  
  type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR'
  
  interface MapOptions {
    [key: string]: any
  }
  
  interface LatLng {
    lat(): number
    lng(): number
  }
  
  interface LatLngLiteral {
    lat: number
    lng: number
  }
  
  interface MapsEventListener {
    remove(): void
  }
}

// List of marker events to listen for
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

// Define prop types for the Marker component
export interface MarkerProps {
  map?: google.maps.Map
  position: string | google.maps.LatLng | google.maps.LatLngLiteral
  icon?: any
  label?: string
  title?: string
  draggable?: boolean
  [key: string]: any
}

/**
 * Marker component for Google Maps
 * Creates a marker that identifies a location on a map
 */
export default class Marker extends Component<MarkerProps> {
  // The Google Maps Marker instance
  private marker: google.maps.Marker | null = null;
  private markerConfig: google.maps.MarkerOptions | null = null;

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

  /**
   * Create a marker with the provided configuration
   */
  loadMarker() {
    const {map, position, icon, label, title, draggable} = this.props

    this.markerConfig = {
      map,
      position,
      icon,
      label,
      title,
      draggable,
    }

    if (typeof this.props.position === 'string') {
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({address: this.props.position}, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          if (this.markerConfig) {
            this.markerConfig.position = results[0].geometry.location
            this.buildMarker()
          }
        } else {
          alert(`Marker geocoder problem type: ${status}`)
        }
      })
    } else {
      this.buildMarker()
    }
  }

  /**
   * Construct the marker and add event listeners
   */
  buildMarker() {
    if (this.markerConfig) {
      this.marker = new google.maps.Marker(this.markerConfig)
      
      evtNames.forEach((e) => {
        if (this.marker) {
          this.marker.addListener(e, this.handleEvent(e))
        }
      })
    }
    
    return this.marker
  }

  /**
   * Handle marker events
   */
  handleEvent(evt: string) {
    return (e: any) => {
      const evtName = `on${camelize(evt)}`
      const handler = this.props[evtName]

      if (handler && typeof handler === 'function') {
        handler(this.props, this.marker, e) 
      }
    }
  }

  render() {
    return null
  }
} 