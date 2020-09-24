import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"
import { MarkdownRemark } from "../types/blog-post"
import { ShareButtons } from "../components/share"

type Props = {
  className?: string
  slug: string
  post: Pick<
    MarkdownRemark<"title" | "date">, | "frontmatter" | "html"
  >
}

const FCPost: React.FC<Props> = ({ className, post, slug }) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''

  return (
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
  )
}

export const Post = styled(FCPost)`
  
`
