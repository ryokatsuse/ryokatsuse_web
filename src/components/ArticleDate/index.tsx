import React from "react"
import { Frontmatter } from "../../types/blog-post"

type Props = Pick<Frontmatter, "updated" | "date">

const format = (date: Date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export const ArticleDate: React.FC<Props> = ({ updated, date }) => {
  const publishedDate = format(new Date(date))
  const updatedDate = updated ? format(new Date(updated)) : undefined
  return (
    <>
      公開日:{publishedDate}{updatedDate ? ` / 更新日:${updatedDate}` : null}
    </>
  )
}