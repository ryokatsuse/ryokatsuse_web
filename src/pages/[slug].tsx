import React from "react"
import Link from "next/link"
import { PostBody } from "../components/postBody";
import {Layout} from "../components/layout"
import SEO from "../components/seo"
import markdownToHtml from "../lib/markdown"
import { getPostBySlug, getAllPosts } from "../lib/blog"

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug)
  const content = await markdownToHtml(post.content || "")

  return {
    props: {
      ...post,
      content,
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts()

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}

const BlogPost = post => {
  return (
    <Layout>
      <PostBody frontmatter={post.frontmatter} content={post.content} />
    </Layout>
  )
}

export default BlogPost
