import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import HatenaBookMarkLogo from "./hatenabookmark.svg"

type Props = {
  text: string
  url: string
}

export const ShareButtons: React.FC<Props> = ({
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
    <div>
      <div className="mb-0 font-bold">Share</div>
      <div className="pt-3 pr-3 pb-3 flex items-center gap-3">
        <a
          className="block appearance-none border-none bg-none text-3xl leading-none first:text-blue-400"
          aria-label="Share on Twitter"
          href={twitterShareLink}
          rel="external noopener"
          target="_blank"
        >
          <FontAwesomeIcon icon={["fab", "twitter"]} />
        </a>
        <a
          className="block appearance-none border-none bg-none text-3xl leading-none first:text-blue-400"
          href={hatenaShareLink}
          rel="external noopener"
          target="_blank">
          <img
            className="w-7 h-7 m-0"
            src={HatenaBookMarkLogo}
            alt="はてなブックマーク" />
        </a>
      </div>
    </div>
  )
}