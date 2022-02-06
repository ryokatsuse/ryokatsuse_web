import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"


type Props = {
  tags: string[]
}

export const Tags = React.memo<Props>(({ tags }) => {
  return (
    <div className="flex items-center ml-2">
      <ul className="flex items-center gap-2 list-none">
        {tags.map(tag => (
          <li
          className="flex items-center gap-1"
            key={tag}>
            <FontAwesomeIcon
              className="text-blue-500"
              aria-label="タグ" icon={["fas", "hashtag"]} />
            <Link
              className="text-blue-500"
              to={`/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
})


