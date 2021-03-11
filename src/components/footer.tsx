import React from "react"
import styled from "styled-components"
import config from "../config"

type Props = {
  className?: string
}

const FCFooter : React.FC<Props> = ({className}) => {
  const github = config.social.github

  return (
    <footer className={`${className}`}>
      <p className={`${className}__copy-right`}>
        © {new Date().getFullYear()}
        {` `}
        このサイトは、<a rel="external" href="https://nextjs.org/">Next.js</a>で作られています。</p>
      <p>ソースコードは
        <a 
          href={`https://github.com/${github}/ryokatsuse_web`}
          target="_blank"
          rel="external noopener">こちらのリポジトリ</a>にあります。</p>
      <p>Google Analyticsを使っています。</p>
    </footer>
  );
};
export const Footer = styled(FCFooter)`
  padding: var(--grid);
  text-align: center;
  background-color: var(--dark-color);
  color: #fff;
  font-size: 0.8rem;

  &__copy-right {
    font-size: 0.8rem;
  }
`
