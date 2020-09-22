import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import styled from "styled-components"

type Props = {
  className?: string
}

const FCFooter : React.FC<Props> = ({className}) => {
  const {
    site: {
      siteMetadata: { author, social },
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
    <footer className={`${className}`}>
      <p className={`${className}__copy-right`}>
        © {new Date().getFullYear()}
        {` `}
        このサイトは、<a rel="external" href="https://www.gatsbyjs.org">Gatsby</a>で作られています。
      <p>ソースコードは
        <a 
          href={`https://github.com/${social.github}/ryokatsuse_web`}
          target="_blank"
          rel="external noopener">こちらのリポジトリ</a>にあります。</p>
      </p>
      <p>Google Analyticsを使っています。</p>
    </footer>
  );
};
export const Footer = styled(FCFooter)`
  padding: var(--grid);
  text-align: center;
  background-color: var(--dark-color);
  color: #fff;

  &__copy-right {
    font-size: 1rem;
  }
`
