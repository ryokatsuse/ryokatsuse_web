import * as React from "react"
import { graphql } from "gatsby"

import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { IndexHogeQuery } from "../../types/graphql-types"

type Props = {
  data: IndexHogeQuery
}

const NotFoundPage: React.FC<Props> = ({ data }) => (

      <Layout location={data.location} title={data.site.siteMetadata.title}>
        <SEO title="404: Not Found" />
        <h1>Not Found</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
      </Layout>
)

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`

export default NotFoundPage