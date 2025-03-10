import React, {Component} from 'react'

// Basic Google Maps type definitions for InfoWindow (simplified)
declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions)
  }
  
  class Marker {
    constructor(opts: MarkerOptions)
  }
  
  class InfoWindow {
    constructor(opts?: InfoWindowOptions)
    open(map?: Map, anchor?: Marker): void
    close(): void
    setContent(content: string | Node): void
  }
  
  interface InfoWindowOptions {
    content?: string | Node
    position?: LatLng | LatLngLiteral
    [key: string]: any
  }
  
  interface MarkerOptions {
    [key: string]: any
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
}

// Add type interface for the component props
export interface InfoWindowProps {
  map?: google.maps.Map;
  marker?: google.maps.Marker;
  visible?: boolean;
  content: string;
}

/**
 * InfoWindow component for Google Maps
 * Displays content in a popup window above a marker or at a specific position on the map
 */
export default class InfoWindow extends Component<InfoWindowProps> {
  // The Google Maps InfoWindow instance
  private infowindow: google.maps.InfoWindow | null = null;

  /* eslint complexity: [2, 5] */
  componentDidUpdate(prevProps: InfoWindowProps) {
    const {visible, marker, map} = this.props

    if (!map) {
      return
    }

    if (map !== prevProps.map) {
      this.renderInfoWindow()
    }

    if (prevProps.marker !== marker) {
      this.updateContent()
    }

    if (visible) {
      return this.openInfoWindow()
    } else {
      return this.closeInfoWindow()
    }
  }

  /**
   * Create a new InfoWindow instance with the specified content
   */
  renderInfoWindow() {
    const {content} = this.props

    const InfoWindowConfig: google.maps.InfoWindowOptions = {
      content,
    }

    this.infowindow = new google.maps.InfoWindow(InfoWindowConfig)
  }

  /**
   * Update the InfoWindow content
   */
  updateContent() {
    const {content} = this.props

    if (this.infowindow) {
      this.infowindow.setContent(content)
    }
  }

  /**
   * Open the InfoWindow at the marker position or at the map center
   */
  openInfoWindow() {
    const {map, marker} = this.props

    if (this.infowindow && marker && map) {
      return this.infowindow.open(map, marker)
    }
    return
  }

  /**
   * Close the InfoWindow
   */
  closeInfoWindow() {
    if (this.infowindow) {
      return this.infowindow.close()
    }
    return
  }

  render() {
    return null
  }
} 