import { graphql, useStaticQuery } from "gatsby"
import React from "react"

export const Footer : React.VFC = () => {
  const {
    site: {
      siteMetadata: { social },
    },
  } = useStaticQuery(graphql`
    query footerQuery {
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
    <footer className="p-4 text-center bg-gray-900 text-white">
      <p className="text-base">
        © {new Date().getFullYear()}
        {` `}
        このサイトは、<a rel="external" href="https://www.gatsbyjs.org">Gatsby</a>で作られています。</p>
      <p>ソースコードは
        <a
          href={`https://github.com/${social.github}/ryokatsuse_web`}
          target="_blank"
          rel="external noopener">こちらのリポジトリ</a>にあります。</p>
      <p>Google Analyticsを使っています。</p>
    </footer>
  );
};

