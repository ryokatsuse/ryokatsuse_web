import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Helmet from "react-helmet"
import {
  TwitterShareButton,
  TwitterIcon
} from 'react-share';

class BlogPostTemplate extends React.Component<any, any> {
  render() {
    const post = this.props.data.markdownRemark
    const siteTitle = this.props.data.site.siteMetadata.title
    const { previous, next } = this.props.pageContext
    const url = typeof window !== 'undefined' ? window.location.href : ''

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title={post.frontmatter.title}
          description={post.frontmatter.description || post.excerpt}
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
          <footer>
            <div className="sns-btn">
              <TwitterShareButton title={post.frontmatter.title} url={url} className="mr-2">
              <TwitterIcon size={40} round />
              </TwitterShareButton>
              <Helmet>
              <script type="text/javascript" src="//b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async" />
              </Helmet>
              <a
                href="http://b.hatena.ne.jp/entry/"
                className="hatena-bookmark-button"
                data-hatena-bookmark-layout="vertical-normal"
                data-hatena-bookmark-lang="ja"
                title="このエントリーをはてなブックマークに追加"
                >
                <img
                  src="//b.st-hatena.com/images/entry-button/button-only@2x.png"
                  alt="このエントリーをはてなブックマークに追加"
                  width="20"
                  height="20"
                  style={{border: 'none'}}
                />
              </a>
            </div>
            <Bio />
          </footer>
        </article>

        <nav>
          <ul
            style={{
              display: `flex`,
              flexWrap: `wrap`,
              justifyContent: `space-between`,
              listStyle: `none`,
              padding: 0,
            }}
          >
            <li>
              {previous && (
                <Link to={previous.fields.slug} rel="prev">
                  ← {previous.frontmatter.title}
                </Link>
              )}
            </li>
            <li>
              {next && (
                <Link to={next.fields.slug} rel="next">
                  {next.frontmatter.title} →
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </Layout>
    )
  }
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
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`
