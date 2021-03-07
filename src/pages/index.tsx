import React from "react"
import Link from "next/link"

import { Layout } from "../components/layout"
import SEO from "../components/seo"
import { getAllPosts } from "../lib/blog"

export async function getStaticProps() {
  const posts = getAllPosts()

  return {
    props: {
      posts,
    },
  }
}

const BlogIndex = ({ posts }) => {
  if (posts.length === 0) {
    return (
      <Layout>
        <SEO title="All posts" />
        <Bio />
        <p>No blog posts found. Add markdown posts to "content/blog".</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title="All posts" />
      {posts.map(post => {
        const title = post.frontmatter.title || post.slug
        return (
          <article
            key={post.slug}
            className="post-list-item"
          >
            <header>
              <h2>
                <Link href={post.slug}>
                  <span>{title}</span>
                </Link>
              </h2>
              <small>{post.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: post.frontmatter.description || post.excerpt,
                }}
                itemProp="description"
              />
            </section>
          </article>
        )
      })}
    </Layout>
  )
}

export default BlogIndex
