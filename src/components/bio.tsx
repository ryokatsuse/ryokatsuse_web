/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/ryokatsu.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div className="profile">
      <a href={`https://twitter.com/${social.twitter}`}>
        <Image
          fixed={data.avatar.childImageSharp.fixed}
          alt={author} />
      </a>
      <p>フロントエンドエンジニアやってます。技術のことやその他色々書きます。</p>
    </div>
  )
}

export default Bio
