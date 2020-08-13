import * as React from "react"
import { Link } from "gatsby"

const Header: React.FC<any> = () => {
  return (
    <header className="top-header">
      <h1 className="h1-title">
        <Link to={`/`}>
          Ryo Katuse Blog
        </Link>
      </h1>
    </header>
  );
};
export default Header
