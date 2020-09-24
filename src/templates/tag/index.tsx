import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql } from "gatsby"
import React from "react"
import styled from "styled-components"
import {
  BlogItem,
  BlogItemData
} from "../../components/BlogItem"
import {Layout} from "../../components/layout"
import SEO from "../../components/seo"

type Props = {
  data: {
    markdownRemark: {
      html: string
    } | null
    allMarkdownRemark: {
      edges: Array<{
        node: BlogItemData
      }>
    }
  }
  pageContext: {
    tag: string
    slug: string
  }
}

const TagPageTemplate: React.FC<Props> = ({data, pageContext }) => {
  const posts = data.allMarkdownRemark.edges
  const { tag, slug } = pageContext

  return (
    <Layout title={tag} slug={slug}>
      <SEO title={tag} />
      <div className="tag">
        <h1 className="tag__heading">
          {tag}の検索結果（{posts.length}件）
        </h1>
        {posts.map(({ node }) => {
          return <BlogItem key={node.fields.slug} {...node} />
        })}
      </div>
    </Layout>
  )
}

export default TagPageTemplate

export const pageQuery = graphql`
  query($tag: String, $slug: String) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fields: { sourceFileType: { eq: "blog" } }
      }
    ) {
      edges {
        node {
          ...BlogIncludeData
        }
      }
    }
  }
`
