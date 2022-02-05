import Toggle from "../components/toggle";
import React from "react"
import { graphql, Link, useStaticQuery } from "gatsby"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

type Props = {
  title: string
}

export const Header: React.FC<Props> = ({title}) => {
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
    <header className="z-10 w-full fixed top-0 m-0 mb-1 p-1 bg-gray-900">
      <div className="flex justify-between max-w-3xl my-0 mx-auto md:py-2 py-0 md:px-6 px-2">
        <h1 className="text-2xl">
          <Link
            className="text-white hover:no-underline"
            to={`/`}>
            {title}
          </Link>
        </h1>
        <nav className="text-2xl flex justify-between gap-2">
          <Link to="/blog/about">
            <FontAwesomeIcon
              className="text-white"
              icon={["fas", "user-alt"]} />
          </Link>
          <a
            href={`https://github.com/${social.github}`}
            target="_blank"
            rel="external noopener"
            aria-label={`${author.name}のGitHub`}
          >
            <FontAwesomeIcon
              className="text-white"
              icon={["fab", "github"]} />
          </a>
          <a
            href={`https://twitter.com/${social.twitter}`}
            target="_blank"
            rel="external noopener"
            aria-label={`${author.name}のTwitter`}
          >
            <FontAwesomeIcon
              className="text-white"
              icon={["fab", "twitter"]} />
          </a>
          <Toggle />
        </nav>
      </div>
    </header>
  );
};

