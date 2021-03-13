import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import styled from "styled-components"
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
  const twitterShareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    text
  )}&url=${encodeURIComponent(url)}`
  const hatenaShareLink = `https://b.hatena.ne.jp/entry?url=${encodeURIComponent(
    url
  )}`
  return (
    <div className={`${className}`}>
      <nav className={`${className}__nav`}>
        <a
          className={`${className}__sns`}
          aria-label="Share on Twitter"
          href={twitterShareLink}
          rel="external noopener"
          target="_blank"
        >
          <FontAwesomeIcon
            className={`${className}__sns-link`}
            icon={["fab", "twitter"]} />
        </a>
        <a
          className={`${className}__sns`}
          href={hatenaShareLink}
          rel="external noopener"
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
