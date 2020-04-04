import * as React from "react"
import HEADER from "../components/header"
import FOOTER from "../components/footer"

class Layout extends React.Component<any, any> {
  render() {
    const { children } = this.props

    return (
      <div>
        <HEADER />
        <main>{children}</main>
        <FOOTER />
      </div>
    )
  }
}

export default Layout
