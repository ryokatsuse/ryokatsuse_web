import * as React from "react"
import { Link } from "gatsby"

class header extends React.Component<any, any> {
  render() {
    const { title, children } = this.props

    return (
      <div>
        <header className="top-header">
          <h1 className="h1-title">
            <Link to={`/`}>
              Ryo Katuse Blog
            </Link>
          </h1>
        </header>
      </div>
    )
  }
}

export default header
