import * as React from "react"

class footer extends React.Component<any, any> {
  render() {

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

export default footer
