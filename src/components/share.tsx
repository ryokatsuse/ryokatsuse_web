import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
import Link from "next/link"
import HatenaBookMarkLogo from "./hatenabookmark.svg"

type Props = {
  className?: string
  text: string
  url: string
}

const FCShareButtons: React.FC<Props> = ({
  className,
  text,
  url,
}) => {
  const encodeText = encodeURIComponent(`${text}`)
  const encodeUrl = encodeURIComponent(`${url}`)
  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`
  const hatenaHref = `https://b.hatena.ne.jp/entry?url=${encodeURIComponent(
    url
  )}`
  return (
    <div className={`${className}`}>
      <nav className={`${className}__nav`}>
        <Link
          href={twitterHref}>
          <a
            className={`${className}__sns`}
            aria-label="Share on Twitter"
            target="_blank"
          >
            <FontAwesomeIcon
              className={`${className}__sns-link`}
              icon={["fab", "twitter"]} />
          </a>
        </Link>
        <a
          className={`${className}__sns`}
          href={hatenaHref}
          target="_blank">
          <HatenaBookMarkLogo className={`${className}__sns-link`} />
        </a>
      </nav>
    </div>
  )
}

export const ShareButtons = styled(FCShareButtons)`
  &__title {
    text-align: center;
  }

  &__nav {
    padding: 10px;
    display: flex;
    align-items: center;
  }
  &__sns {
    color: rgb(29, 161, 242);
    display: block;
    border: none;
    background: none;
    font-size: 2rem;
    line-height: 0;

    &-link {
      overflow: visible;
      width: 1em;
      display: inline-block;
      font-size: inherit;
      height: 1em;
      vertical-align: -.125em;

      &:first-child {
        color: #1da1f2;
        margin-right: 0.5em;
      }
    }
  }
`
