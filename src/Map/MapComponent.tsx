import React, { Component, ReactNode } from 'react'
import classNames from 'classnames'
import { camelize, loadJS } from './Utilities/Utils'

// Extended declaration for Google Maps types
declare global {
  interface Window {
    google: typeof google
  }
}

// Basic Google Maps type definitions (simplified)
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions)
    addListener(eventName: string, handler: Function): MapsEventListener
  }
  
  class Geocoder {
    geocode(request: GeocoderRequest, callback: (results: GeocoderResult[], status: GeocoderStatus) => void): void
  }
  
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
  
  interface GeocoderRequest {
    address?: string
  }
  
  interface GeocoderResult {
    geometry: {
      location: LatLng
    }
  }
  
  type GeocoderStatus = 'OK' | 'ZERO_RESULTS' | 'OVER_QUERY_LIMIT' | 'REQUEST_DENIED' | 'INVALID_REQUEST' | 'UNKNOWN_ERROR'
  
  namespace event {
    function removeListener(listener: MapsEventListener): void
  }
}

const BOOL_PROPS_TO_CLASS_NAMES: Record<string, string> = {
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

export interface MapComponentProps {
  apiKey: string
  backgroundColor?: string
  center: string | google.maps.LatLng | google.maps.LatLngLiteral
  children?: ReactNode
  clickableIcons?: boolean
  disableDefaultUI?: boolean
  disableDoubleClickZoom?: boolean
  draggable?: boolean
  draggableCursor?: string
  draggingCursor?: string
  fullscreenControl?: boolean
  gestureHandling?: string
  heading?: number
  keyboardShortcuts?: boolean
  mapTypeControl?: boolean
  mapTypeId?: string
  maxZoom?: number
  minZoom?: number
  noClear?: boolean
  panControl?: boolean
  rotateControl?: boolean
  scaleControl?: boolean
  scrollwheel?: boolean
  streetViewControl?: boolean
  style?: React.CSSProperties
  styles?: any[]
  tilt?: number
  zoom?: number
  zoomControl?: boolean
  small?: boolean
  medium?: boolean
  large?: boolean
  [key: string]: any
}

export default class MapComponent extends Component<MapComponentProps> {
  static defaultProps = {
    zoom: 14,
    style: {
      width: '55vw',
      height: '55vh',
    },
  }

  private map: google.maps.Map | null = null
  private listeners: Record<string, google.maps.MapsEventListener> = {}
  private mapConfig: any
  private newClassName: string = ''

  componentDidMount() {
    const mapScript = window.document.getElementById('mapScript')

    if (!mapScript) {
      this.initMap()
    } else {
      this.loadMap()
    }
  }

  componentWillUnmount() {
    if (window.google && window.google.maps) {
      Object.keys(this.listeners).forEach((e) => {
        if (this.listeners[e]) {
          google.maps.event.removeListener(this.listeners[e])
        }
      })
    }
  }

  initMap = async (): Promise<void> => {
    // this is added for the examples purposes
    const apiKey =
      typeof this.props.apiKey === 'string'
        ? this.props.apiKey
        : process.env.GATSBY_apiKey || ''

    try {
      await loadJS(`https://maps.googleapis.com/maps/api/js?key=${apiKey}`)
      this.loadMap()
    } catch (error) {
      console.error('Error loading Google Maps API:', error)
    }
  }

  loadMap(): void {
    const propClassNames = BOOL_PROPS.reduce((acc: Record<string, boolean>, key) => {
      const value = BOOL_PROPS_TO_CLASS_NAMES[key]

      acc[value] = !!this.props[key]
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

    if (typeof this.props.center === 'string' && window.google && window.google.maps) {
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({address: this.props.center}, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
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

  buildMap(): void {
    const mapElement = document.getElementById('map')
    if (mapElement && window.google && window.google.maps) {
      this.map = new google.maps.Map(
        mapElement,
        this.mapConfig
      )
      this.listeners = {}
      evtNames.forEach((e) => {
        if (this.map) {
          this.listeners[e] = this.map.addListener(e, this.handleEvent(e))
        }
      })
      this.forceUpdate()
    }
  }

  handleEvent(evt: string) {
    return (e: any) => {
      const evtName = `on${camelize(evt)}`
      const handler = this.props[evtName]

      if (handler && typeof handler === 'function') {
        handler(this.props, this.map, e)
      }
    }
  }

  renderChildren() {
    const { children } = this.props

    if (!children) {
      return null
    }
    
    return React.Children.map(children, (child) => {
      if (!child) {
        return null
      }
      return React.cloneElement(child as React.ReactElement<any>, {
        map: this.map,
      })
    })
  }

  render() {
    return (
      <div>
        {this.props.apiKey ? null : <h4>Missing API Key!</h4>}
        {this.props.center ? null : <h4>Missing center props!</h4>}
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