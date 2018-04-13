import {Component} from 'react'
import PropTypes from 'prop-types'

export default class InfoWindow extends Component {
  componentDidUpdate(prevProps) {
    const {visible, marker, map} = this.props

    if (!map) {
      return ''
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

  renderInfoWindow() {
    const {content} = this.props

    const InfoWindowConfig = {
      content,
    }

    this.infowindow = new google.maps.InfoWindow(InfoWindowConfig)
  }

  updateContent() {
    const {content} = this.props

    this.infowindow.setContent(content)
  }

  openInfoWindow() {
    const {map, marker} = this.props

    if (marker) {
      return this.infowindow.open(map, marker)
    }
    return ''
  }

  closeInfoWindow() {
    return this.infowindow.close()
  }

  render() {
    return null
  }
}

InfoWindow.propTypes = {
  map: PropTypes.object,
  marker: PropTypes.object,
  visible: PropTypes.bool,
  content: PropTypes.string.isRequired,
}
