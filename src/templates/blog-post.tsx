import React from "react"
import { Link, graphql } from "gatsby"
import { Layout } from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import { MarkdownRemark } from "../types/blog-post"
import { ShareButtons } from "../components/share"

type Props = {
  data: {
    markdownRemark: MarkdownRemark<"title" | "published" | "updated" | "tags" | "date">
  }
  pageContext: {
    slug: string
    previous?: Pick<MarkdownRemark<"title">, "fields" | "frontmatter">
    next?: Pick<MarkdownRemark<"title">, "fields" | "frontmatter">
  }
}

const BlogPostTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const { slug, previous, next } = pageContext
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
    <Layout 
    title={post.frontmatter.title}
    slug={slug}>
      <SEO
        title={post.frontmatter.title}
        description={post.excerpt}
      />
      <article className="blog-post">
        <header>
          <h1>
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              display: `block`
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr/>
        <ShareButtons text={post.frontmatter.title} url={url} />
      </article>
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
      }
    }
  }
`
