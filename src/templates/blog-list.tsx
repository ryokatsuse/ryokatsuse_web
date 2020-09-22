import * as React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"

type Props = {
  data: {
    allMarkdownRemark: {
      edges: Array<{
        node: Array<string>
      }>
    }
  }
}

const BlogIndex : React.FC<Props> = ({data}) => {
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout location="" title="">
      <SEO title="ryokatsu.dev" />
      {posts.map(({ node }: {node: any}) => {
        const title = node.frontmatter.title || node.fields.slug
        return (
          <article
            key={node.fields.slug}
            className="article-block">
            <header>
              <h4>
                <b>{node.frontmatter.date}</b>
                <Link style={{ boxShadow: `none` }} to={node.fields.slug}>
                  {title}
                </Link>
              </h4>
            </header>
          </article>
        )
      })}
    </Layout>
  )
}
export default BlogIndex

export const pageQuery = graphql`
  query blogPageQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "YYYY-MM-DD")
            title
          }
        }
      }
    }
  }
`
