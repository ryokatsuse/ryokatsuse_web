import * as React from "react"
import Header from "../components/header"
import Footer from "../components/footer"

const Layout : React.FC<any> = ({children}) => {
  return (
    <div>
      <Header />
        <main>{children}</main>
      <Footer />
    </div>
  );
};
export default Layout
