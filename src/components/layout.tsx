import * as React from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import styled from "styled-components"

type Props = {
  className?: string
}

const FCLayout : React.FC<Props> = ({className, children}) => {
  return (
    <>
      <Header />
        <main className={`${className}`}>
            {children}
        </main>
      <Footer />
    </>
  );
};
export const Layout = styled(FCLayout)`
  display: block;
  max-width: calc(600px + 10%);
  margin: 0 auto;
  padding: 5em 2em;
`
