import React from "react"
import { graphql, Link } from "gatsby"
import { MarkdownRemark } from "../../types/blog-post"
import { Tags } from "../Tags"
import { ArticleDate } from "../ArticleDate"

export type BlogItemData = Pick<
  MarkdownRemark<"title" | "date"| 'updated' | "tags">,
  "fields" | "frontmatter"
>

type Props = BlogItemData

export const BlogItem: React.FC<Props> = ({
  fields,
  frontmatter
}) => {
  const title = frontmatter.title || fields.slug
  return (
    frontmatter.date ? (
      <article className="mb-3">
      <header>
        <h3 className="text-lg">
          <Link
            to={fields.slug}>{title}</Link>
        </h3>
        <div className="flex flex-wrap items-center mt-1">
          <ArticleDate {...frontmatter} />
          <div>
            {frontmatter.tags ? (
                <small>
                  <Tags tags={frontmatter.tags} />
                </small>
              ) : null}
          </div>
        </div>
      </header>
    </article>
    ) : null
  )
}

export const query = graphql`
  fragment BlogIncludeData on MarkdownRemark {
    fields {
      slug
    }
    frontmatter {
      date
      title
      updated
      tags
    }
  }
`
