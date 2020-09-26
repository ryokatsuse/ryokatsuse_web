import React from "react"
import { graphql } from "gatsby"
import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { Post } from "./post"
import { MarkdownRemark } from "../types/blog-post"

type Props = {
  data: {
    markdownRemark: MarkdownRemark<"title" | "published" | "updated" | "tags">
  }
  pageContext: {
    slug: string
  }
}

const BlogPostTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { slug } = pageContext

  return (
    <Layout
    title={post.frontmatter.title}
    slug={slug}>
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
        date(formatString: "YYYY-MM-DD")
        tags
      }
    }
  }
`
