/**
 * Frontmatter of article
 */
export type Frontmatter = {
  title: string

  date: string
  /**
   * Publish date
   */
  published: string
  /**
   * Updated date
   */
  updated?: string
  /**
   * Tags
   */
  tags?: string[]

  mainVisual?: {
    childImageSharp: {
      gatsbyImageData: {
        images: {
          fallback: {
            src: string
          }
        }
      }
    }
  }
//   {
//     "childImageSharp": {
//         "gatsbyImageData": {
//             "layout": "constrained",
//             "placeholder": {
//                 "fallback": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAMCAYAAABiDJ37AAAACXBIWXMAAAsTAAALEwEAmpwYAAABuklEQVQoz5WSSW/bMBSE9W8aJF61ULZE2dZii6JWywq91G1QJIAvCYpe2lN/+xSk4sCJXaM9PJCgoME3b0azHA9zniOrVhC7PZKigj9nmIYL9E0bPYOo8+Mc37u6paZYCTjTAJo5crHgOfJlgzDmSMsacVaA+iG6OrkqKoXMMVUAy0YoCM0YuWB5CV4sUYsNeFEp8SBO0BmaZ0Snd3nqZIzJnCP9coATpa1gkldYig2CRQLddjAk47c5khwFTsXuhgS3PQNdQsG+PoMEHJpEZnmFor5XdsvVPapGqH0WtSTlGFijM0LDtjELXdCpg5HroW4E6CyAZjkULCtVGFlVq31GLFWWQ8ZVWJ4fvbPfGRLQyRiHR4bdNkSaxNgKATqZtYQyhNV6iznP1A93AwMd3VIi8n7JsgzsU9fETc9sU64buJJQ7lBSNJvPitCZ+BdTvRTKwLLRNyz0bQ/J7gDbZy2hTFiO7KQM5W81udxHC2Id4eX7GhF7Z3mHOC2U6KnFq4Kv34lL8FRGKMMZNMN2FJ2sjEzzn4Q+rOJhH+LnjxIxo+0OZV02+wdESfpG9z+Wn74t8PtXjYR7+AP5+pq6e0LNNQAAAABJRU5ErkJggg=="
//             },
//             "images": {
//                 "fallback": {
//                     "src": "/static/55218f02c7998346870140e47445f57b/ae9a8/knowledge.png",
//                     "srcSet": "/static/55218f02c7998346870140e47445f57b/825df/knowledge.png 170w,\n/static/55218f02c7998346870140e47445f57b/2b540/knowledge.png 340w,\n/static/55218f02c7998346870140e47445f57b/ae9a8/knowledge.png 679w",
//                     "sizes": "(min-width: 679px) 679px, 100vw"
//                 },
//                 "sources": [
//                     {
//                         "srcSet": "/static/55218f02c7998346870140e47445f57b/b1eec/knowledge.webp 170w,\n/static/55218f02c7998346870140e47445f57b/bebb0/knowledge.webp 340w,\n/static/55218f02c7998346870140e47445f57b/36278/knowledge.webp 679w",
//                         "type": "image/webp",
//                         "sizes": "(min-width: 679px) 679px, 100vw"
//                     }
//                 ]
//             },
//             "width": 679,
//             "height": 422
//         }
//     }
// }
}

/**
 * markdownRemark data
 */
export type MarkdownRemark<FrontmatterKeys extends keyof Frontmatter> = {
  id: string
  excerpt: string
  html: string
  tableOfContents: string
  frontmatter: Pick<Frontmatter, FrontmatterKeys>
  fields: {
    slug: string
    filePath: string
  }
}
