import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Header } from "../components/header"
import { Footer } from "../components/footer"
import { SiteMetaData } from "../types/siteMetaData"
import "./fa-default"

export const Layout : React.FC = ({children}) => {
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

  return (
    <>
      <Header title={site.siteMetadata.title} />
        <main className="block max-w-3xl my-0 mx-auto pt-20 px-8 pb-0">
            {children}
        </main>
      <Footer />
    </>
  );
};
