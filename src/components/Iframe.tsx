import React from 'react'
import { Helmet } from 'react-helmet'

const Iframely = () => {
  return (
    <Helmet>
      <script
      type="text/javascript"
      src="https://cdn.iframe.ly/embed.js"
      />
    </Helmet>
  )
}

export default Iframely