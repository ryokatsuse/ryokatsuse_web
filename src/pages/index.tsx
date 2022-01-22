import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import {
  BlogItem,
  BlogItemData
} from "../components/BlogItem"
import SEO from "../components/seo"

type Props = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: BlogItemData
      }>
    }
  }
}

const BlogIndex: React.FC<Props> = ({data}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title="">
      <SEO title="ryokatsu.dev" />
      {posts.map(({ node }) => {
        return <BlogItem key={node.fields.slug} {...node} />
      })}
    </Layout>
  )
}
export default BlogIndex

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { fields: { sourceFileType: { eq: "blog" } } }
      ) {
      edges {
        node {
          ...BlogIncludeData
        }
      }
    }
  }
`

