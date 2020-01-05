import React from 'react'
import Helmet from 'react-helmet'

export default function Meta({postNode, postPath}) {
  return(
    <Helmet>
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ProfPig} />
    </Helmet>
  )
}