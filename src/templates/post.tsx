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
    <article className={`${className}`}>
      <header>
        <h1 className={`${className}__title`}>
          {post.frontmatter.title}
        </h1>
        <p>
          {post.frontmatter.date}
        </p>
      </header>
      <section
        className={`${className}__section`}
        dangerouslySetInnerHTML={{ __html: post.html }} />
      <hr/>
      <ShareButtons text={post.frontmatter.title} url={url} />
    </article>
  )
}

export const Post = styled(FCPost)`

  p {
    margin-bottom: 1.75rem;
  }

  .gatsby-resp-image-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  & h1 {
    margin: 0 0 1.5rem 0;
  }

  & h2,
  & h3,
  & h4 {
    margin: 1.5rem 0;
  }

  & h2 {
    font-size: 1.8rem;
  }

  & h3 {
    font-size: 1.6rem;
  }

  & h4 {
    font-size: 1.4rem;
  }

  &__section {
    margin: 1rem 0;
  }

  pre[class*="language-"] {
    padding: 12px;
  }


`
