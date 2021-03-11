import React from "react"
import { Layout } from "../components/layout"
import { BlogItem } from "../components/BlogItem";
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
        <SEO title="ryokatsu.dev" />
        <p>No blog posts found. Add markdown posts to "content/blog".</p>
      </Layout>
    )
  }

  return (
    <Layout>
      <SEO title="ryokatsu.dev" />
      {posts.map(post => {
        return <BlogItem key={post.slug} {...post} />
      })}
    </Layout>
  )
}

export default BlogIndex
