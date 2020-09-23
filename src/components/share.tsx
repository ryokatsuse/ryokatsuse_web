import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
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
          className={`${className}__link`}
          aria-label="Share on Twitter"
          href={twitterShareLink}
          rel="external noopener"
          target="_blank"
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <a
          className={`${className}__link`}
          href={hatenaShareLink}
          rel="external noopener"
          target="_blank">
          <img
            className={`${className}__image`}
            src={HatenaBookMarkLogo}
            alt="はてなブックマーク" />
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
  &__link {
    display: block;
    appearance: none;
    border: none;
    background: none;
    font-size: 2rem;
    line-height: 0;

    &:first-child {
      color: #1da1f2;
      margin-right: 0.5em;
    }
  }

  img {
    width: 1em;
    height: 1em;
    margin: 0;
  }
`
