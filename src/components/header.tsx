import Toggle from "./toggle";
import React from "react"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import config from "../config"

type Props = {
  title: string
  className?: string
}

const FCHeader: React.FC<Props> = ({title, className}) => {
  const author = config.author
  const twitter = config.social.twitter
  const github = config.social.github

  return (
    <header className={`${className}`}>
      <h1 className={`${className}__title`}>
        <a 
          href="/"
          className={`${className}__link`}>{title}</a>
      </h1>
      <nav className={`${className}__sns`}>
        <a href="/blog/about">
          <FontAwesomeIcon
            className={`${className}__sns-icon`} 
            icon={["fas", "user-alt"]} />
        </a>
        <a
          href={`https://github.com/${github}`}
          target="_blank"
          rel="external noopener"
          aria-label={`${author}のGitHub`}
        >
          <FontAwesomeIcon
            className={`${className}__sns-icon`} 
            icon={["fab", "github"]} />
        </a>
        <a
          href={`https://twitter.com/${twitter}`}
          target="_blank"
          rel="external noopener"
          aria-label={`${author}のTwitter`}
        >
          <FontAwesomeIcon
            className={`${className}__sns-icon`}
            icon={["fab", "twitter"]} />
        </a>
        <Toggle />
      </nav>
    </header>
  );
};

export const Header = styled(FCHeader)`
  z-index: 1;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  box-sizing: border-box;
  margin: 0;
  z-index: 2;
  margin-bottom: 1rem;
  padding: calc(var(--grid)/2);
  background-color: var(--dark-color);

  &__title{
    font-size: 1.6rem;
  }
  &__link {
    color: #fff;

    &:hover {
      text-decoration: none;
    }
  }
  &__sns {
    margin-top: 6px;
    font-size: 1.41421rem;
    line-height: 1.75rem;
    &-icon {
      margin: 0 0.45rem;
      color: #fff;
      width: 1em;
    }
  }
`
