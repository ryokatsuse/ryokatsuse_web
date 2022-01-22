import React from "react"
import Helmet from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"
import { SiteMetaData } from "../types/siteMetaData"

type Props = {
  description?: string
  lang?: string
  meta?: any[]
  title: string
}

const SEO: React.FC<Props> = ({
  description,
  lang = "ja",
  meta = [],
  title,
}) => {
  const { site } = useStaticQuery<{
    site: {
      siteMetadata: Pick<
        SiteMetaData,
        "title" | "description" | "social" | "siteUrl"
      >
    }
  }>(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            siteUrl
            social {
              twitter
            }
          }
        }
      }
    `
  )

  const metaDescription = description || site.siteMetadata.description

  const hostUrl = "https://placehold.jp/"
  const size = {
    horizontal: 740,
    vertical: 457
  }
  const css = '{"background-color":" #fff","color":" #333","font-size":" 32px","word-break":" break-all","padding":" 10px"}'
  const imageUrl =
      hostUrl + size.horizontal + "x" + size.vertical + ".png?css=" + encodeURIComponent(css) + "&text=" + title

  const titleDisp = title
    ? `${title} - ${site.siteMetadata.title}`
    : site.siteMetadata.title

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: imageUrl,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.social.twitter,
        },
        {
          name: `twitter:title`,
          content: titleDisp,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    />
  )
}


export default SEO
