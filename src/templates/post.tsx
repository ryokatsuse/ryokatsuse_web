import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { graphql, useStaticQuery } from "gatsby"

import styled from "styled-components"
import { MarkdownRemark } from "../types/blog-post"
import { ShareButtons } from "../components/share"
import { Tags } from "../components/Tags"
import {ArticleDate} from '../components/ArticleDate/'

type Props = {
  className?: string
  slug: string
  post: Pick<
    MarkdownRemark<"title" | "date" | "published" | "tags">, | "frontmatter" | "html"
  >
}

const FCPost: React.FC<Props> = ({ className, post, slug }) => {
  const url = typeof window !== 'undefined' ? window.location.href : ''

  const hostUrl = "https://placehold.jp/"
  const size = {
    horizontal: 740,
    vertical: 457
  }
  const css = '{"background-color":" #fff","color":" #333","font-size":" 32px","word-break":" break-all","padding":" 10px"}'
  const imageUrl =
      hostUrl + size.horizontal + "x" + size.vertical + ".png?css=" + encodeURIComponent(css) + "&text=" + post.frontmatter.title

  return (
    <article className={`${className}`}>
      <header>
        <div className={`${className}__img_wrapper`}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={`${className}__item`}>
          <div className={`${className}__date`}>
            <ArticleDate {...post.frontmatter} />
          </div>
          <small>
            {post.frontmatter.tags ? (
              <div>
                <Tags tags={post.frontmatter.tags} />
              </div>
            ) : null}
          </small>
        </div>
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

  ul > li > p {
    margin-bottom: 0;
  }

  .gatsby-resp-image-wrapper {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  &__img_wrapper {
    aspect-ratio: 740/457;
    overflow: hidden;
    margin-bottom: 16px;
  }

  &__title {
    margin: 0 0 1.5rem 0;
  }

  &__item {
    display: flex;
    flex-flow: row wrap;
    -webkit-box-align: center;
    align-items: center;
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
    font-size: 1.4rem;
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
