import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "gatsby"

import styled from "styled-components"

type Props = {
  className?: string
  tags: string[]
}

const FCTags = React.memo<Props>(({ className, tags }) => {
  return (
    <div className={`${className}`}>
      <ul className={`${className}__nav`}>
        {tags.map(tag => (
          <li
          className={`${className}__nav-list`}
            key={tag}>
            <FontAwesomeIcon
              className={`${className}__nav-icon`}
              aria-label="タグ" icon={["fas", "hashtag"]} />
            <Link
              to={`/tag/${tag}`}>{tag}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
})

export const Tags = styled(FCTags)`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  &__nav {
    margin: 0 0 0 10px;
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    list-style: none;

    &-list {
      margin-left: 10px;
      display: flex;
      align-items: center;

      a {
        margin-left: 5px;
      }
    }
    &-icon {
      color: #007acc;
    }
  }
`

