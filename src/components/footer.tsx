import * as React from "react"
import { Link } from "gatsby"

class header extends React.Component<any, any> {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <footer>
          <hr />
          <div className="links">
            <a href="https://github.com/ryokatsuse"
              rel="nofollow noopener noreferrer"
              target="_blank">GitHub</a>
            <a 
              href="https://twitter.com/RyoEnter"
              rel="nofollow noopener noreferrer"
              target="_blank">Twitter</a>
          </div>
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

export default header
