import * as React from "react"
import styled from "styled-components"

type Props = {
  className?: string
}

const FCFooter : React.FC<Props> = ({className}) => {
  return (
    <footer className={`${className}`}>
      <hr />
      <div className={`${className}__links`}>
        <a className={`${className}__links-link`}
          href="https://github.com/ryokatsuse"
          rel="nofollow noopener noreferrer"
          target="_blank">GitHub</a>
        <a className={`${className}__links-link`}
          href="https://twitter.com/ryo__kts"
          rel="nofollow noopener noreferrer"
          target="_blank">Twitter</a>
      </div>
      <p className={`${className}__copy-right`}>
        © {new Date().getFullYear()}
        {` `}
        <a href="/">ryokatsu.dev</a>
      </p>
      <p>Google Analyticsを使っています。</p>
    </footer>
  );
};
export const Footer = styled(FCFooter)`
  padding: var(--grid);
  text-align: center;
  padding: 0;

  &__links {
    margin: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &-link {
      color: #333;
      margin-right: 8px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  &__copy-right {
    font-size: 1rem;
    font-style: italic;
  }
  @media (prefers-color-scheme: dark) {
    &__links {
      &-link {
        color: #fff;
      }
    }
  }

`
