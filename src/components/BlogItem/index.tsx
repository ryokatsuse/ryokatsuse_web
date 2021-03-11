import React from "react"
import styled from "styled-components"
import { MarkdownRemark } from "../../../types/blog-post"
import Link from "next/link"
// import { Tags } from "../Tags"

export type BlogItemData = Pick<
  MarkdownRemark<"title" | "date"| "tags">,
  "fields" | "frontmatter"
>

type Props = {
  className?: string
  frontmatter: string
  slug: string
}

const FCBlogItem: React.FC<Props> = ({
  className,
  slug,
  frontmatter
}) => {
  const title = frontmatter.title || slug
  return (
    frontmatter.date ? (
      <article className={`${className}`}>
      <header>
        <h3>
          <Link href={slug}>
            <a
              href=""
              className={`${className}__link`}
              >{title}</a>
          </Link>
        </h3>
        <div className={`${className}__item`}>
          <div className={`${className}__date`}>
            {frontmatter.date}
          </div>
          {/* <div>
            {frontmatter.tags ? (
                <small>
                  <Tags tags={frontmatter.tags} />
                </small>
              ) : null}
          </div> */}
        </div>
      </header>
    </article>
    ) : null
  )
}

export const BlogItem = styled(FCBlogItem)`
  margin-bottom: 1rem;

  &__item {
    display: flex;
    flex-flow: row wrap;
    -webkit-box-align: center;
    align-items: center;
    margin-top: .5rem;
  }

  &__date {
    margin-right: 20px;
  }
`

