import * as React from "react"
import { graphql, useStaticQuery } from "gatsby"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import styled from "styled-components"
import { SiteMetadata } from "../../types/siteMetaData"

type Props = {
  title?: string
  className?: string
}

const FCLayout : React.FC<Props> = ({title, className, children}) => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: Pick<SiteMetaData, "title" | "siteUrl">
    }
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            siteUrl
          }
        }
      }
    `
  )

  const pageTitle = title
    ? `${title} - ${site.siteMetadata.title}`
    : site.siteMetadata.title

  return (
    <>
      <Header title={site.siteMetadata.title} />
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
  padding: 5em 2em 0 2rem;
`
