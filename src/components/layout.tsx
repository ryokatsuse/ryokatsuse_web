import React from "react"
import { Link } from "gatsby"

class Layout extends React.Component<any, any> {
  render() {
    const { title, children } = this.props
    let header

    header = (
      <h1>
        <Link
          style={{
            boxShadow: `none`,
            textDecoration: `none`,
            color: `inherit`,
          }}
          to={`/`}
        >
          {title}
        </Link>
      </h1>
    )
    return (
      <div>
        <header
          className="top-header">{header}</header>
        <main>{children}</main>
        <footer>
          <hr />
          <p className="copy-right">
            © {new Date().getFullYear()}
            {` `}
            <a href="/">Ryo Kastuse Blog</a>
          </p>
        </footer>
      </div>
    )
  }
}

export default Layout
