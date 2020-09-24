import { graphql, Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { MarkdownRemark } from "../../types/blog-post"

export type BlogItemData = Pick<
  MarkdownRemark<"title" | "date">,
  "fields" | "frontmatter"
>

type Props = {
  className?: string
} & BlogItemData

const FCBlogItem: React.FC<Props> = ({
  className,
  fields,
  frontmatter
}) => {
  const title = frontmatter.title || fields.slug
  return (
    <article className={`${className}`}>
      <header>
        <h3>
          <Link
            className={`${className}__link`}
            to={fields.slug}>{title}</Link>
        </h3>
        <div>
          {frontmatter.date}
        </div>
      </header>
    </article>
  )
}

export const BlogItem = styled(FCBlogItem)`
  margin-bottom: 1rem;
`

export const query = graphql`
  fragment BlogIncludeData on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      date
      title
    }
  }
`
