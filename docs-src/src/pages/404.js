import React from 'react'
import Headers from '../Headers'
import Layout from '../layouts/index.js'

const NotFoundPage = () => (
  <div>
    <Headers
      title="Not Found"
      metaDescription={
        'There is no such page!'
      }
      extraKeywords="404"
    >
      <p>
        There is no such page.
      </p>
    </Headers>
  </div>
)

export default NotFoundPage
