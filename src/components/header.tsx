import * as React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

type Props = {
  className?: string
}

const FCHeader: React.FC<Props> = ({className}) => {
  return (
    <header className={`${className}`}>
      <h1 className={`${className}__title`}>
        <Link 
          className={`${className}__link`} 
          to={`/`}>
          Ryo Katuse Blog
        </Link>
      </h1>
    </header>
  );
};

export const Header = styled(FCHeader)`
  z-index: 1;
  width: 100%;
  position: fixed;
  top: 0;
  box-sizing: border-box;
  margin: 0;
  margin-bottom: 1rem;
  padding: calc(var(--grid)/2);
  background-color: var(--header-color);

  &__title{
    text-align: center;
  }
  &__link {
    color: #fff;

    &:hover {
      text-decoration: none;
    }
  }
`
