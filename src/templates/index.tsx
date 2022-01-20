
import { graphql } from "gatsby"
import React from "react"
import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { Post } from "./post"
import { MarkdownRemark } from "../types/blog-post"

type Props = {
  data: {
    markdownRemark: MarkdownRemark<"title" | "date" | "updated" | "published" | "tags" | "mainVisual">
  }
}

const BlogPostTemplate: React.FC<Props> = ({ data }) => {
  const post = data.markdownRemark

  return (
    <Layout title={post.frontmatter.title}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <Post post={post}/>
    </Layout>
  )

}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        updated
        # mainVisual {
        #     childImageSharp {
        #       gatsbyImageData(placeholder: BLURRED)
        #     }
        #   }
        tags
      }
    }
  }
`
