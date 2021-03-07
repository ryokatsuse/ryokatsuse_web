import React from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import styled from "styled-components"
import { useRouter } from "next/router";
import "./fa-default"
import config from "../config"

type Props = {
  className?: string
}

const FCLayout : React.FC<Props> = ({className, children}) => {
  const isHome = useRouter().pathname === "/";
  const blogTitle = config.title

  return (
    <>
      <Header title={blogTitle} />
        <main className={`${className}`}>{children}</main>
      <Footer />
    </>
  );
};
export const Layout = styled(FCLayout)`
  display: block;
  max-width: calc(600px + 10%);
  margin: 0 auto;
  padding: 5em 2em 0 2rem;
`
