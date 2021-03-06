import Toggle from "../components/toggle";
import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  title: string
  className?: string
}

const FCHeader: React.FC<Props> = ({title, className}) => {
  const {
    site: {
      siteMetadata: { author, social },
    },
  } = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          author
          social {
            twitter
            github
          }
        }
      }
    }
  `)

  return (
    <header className={`${className}`}>
      <h1 className={`${className}__title`}>
        <Link 
          className={`${className}__link`} 
          to={`/`}>
          {title}
        </Link>
      </h1>
      <nav className={`${className}__sns`}>
        <Link to="/blog/about">
          <FontAwesomeIcon
            className={`${className}__sns-icon`} 
            icon={["fas", "user-alt"]} />
        </Link>
        <a
          href={`https://github.com/${social.github}`}
          target="_blank"
          rel="external noopener"
          aria-label={`${author.name}のGitHub`}
        >
          <FontAwesomeIcon
            className={`${className}__sns-icon`} 
            icon={["fab", "github"]} />
        </a>
        <a
          href={`https://twitter.com/${social.twitter}`}
          target="_blank"
          rel="external noopener"
          aria-label={`${author.name}のTwitter`}
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
    font-size: 1.41421rem;
    line-height: 1.75rem;
    &-icon {
      margin: 0 0.45rem;
      color: #fff;
    }
  }
`
