import * as React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import {
  BlogItem,
  BlogItemData, } from "../components/BlogItem"
import SEO from "../components/seo"
import styled from "styled-components"

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
    <Layout location="" title="">
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
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          ...BlogIncludeData
        }
      }
    }
  }
`

