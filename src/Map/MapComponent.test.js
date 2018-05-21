import React from 'react'
import MapComponent from './MapComponent'
import {MAP_API_KEY} from './Utilities/config'

describe('MapComponent', () => {
  it('should render a map with the appropriate design', () => {
    shallow(
      <MapComponent
        apiKey={MAP_API_KEY}
        small
        zoom={12}
        center={'City Park, New Orleans, LA'}
      />
    )
  })
})
