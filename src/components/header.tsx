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
      <div
        className={`${className}__inner`}>
        <h1 className={`${className}__title`}>
          <a 
            href="/"
            className={`${className}__link`}>{title}</a>
        </h1>
        <nav className={`${className}__nav`}>
          <ul className={`${className}__nav-inner`}>
            <li className={`${className}__nav-inner__list`}>
              <a href="/blog/about">
                <FontAwesomeIcon
                  className={`${className}__nav-icon`} 
                  icon={["fas", "user-alt"]} />
              </a>
            </li>
            <li className={`${className}__nav-inner__list`}>
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="external noopener"
                aria-label={`${author}のGitHub`}
              >
                <FontAwesomeIcon
                  className={`${className}__nav-icon`} 
                  icon={["fab", "github"]} />
              </a>
            </li>
            <li className={`${className}__nav-inner__list`}>
              <a
                href={`https://twitter.com/${twitter}`}
                target="_blank"
                rel="external noopener"
                aria-label={`${author}のTwitter`}
              >
                <FontAwesomeIcon
                  className={`${className}__nav-icon`}
                  icon={["fab", "twitter"]} />
              </a>
            </li>
          </ul>
          <div className={`${className}__toggle`}>
            <Toggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export const Header = styled(FCHeader)`
  width: 100%;
  position: sticky;
  top: 0;
  margin: 0;
  z-index: 2;
  margin-bottom: 1rem;
  background-color: var(--dark-color);

  &__inner {
    display: block;
    max-width: calc(600px + 10%);
    margin: 0 auto;
    padding: 0 2em 0 2rem;
  }

  &__title{
    font-size: 1.6rem;
  }
  &__link {
    color: #fff;

    &:hover {
      text-decoration: none;
    }
  }
  &__nav {
    display: flex;
    align-items: center;
    justify-content:space-between;
    margin-top: 6px;
    padding-bottom: 8px;
    font-size: 1.41421rem;
    line-height: 1.75rem;

    &-inner {
      display: flex;
      list-style: none;
    }
    &-icon {
      margin: 0 0.45rem;
      color: #fff;
      width: 1em;
    }
  }

  &__toggle {

  }
`
