import * as React from "react"

const Footer : React.FC<any> = () => {
  return (
    <div>
        <footer>
          <hr />
          <div className="links">
            <a href="https://github.com/ryokatsuse"
              rel="nofollow noopener noreferrer"
              target="_blank">GitHub</a>
            <a 
              href="https://twitter.com/ryo__kts"
              rel="nofollow noopener noreferrer"
              target="_blank">Twitter</a>
          </div>
          <p className="copy-right">
            © {new Date().getFullYear()}
            {` `}
            <a href="/">Ryo Kastuse Blog</a>
          </p>
          <p>Google Analyticsを使っています。</p>
        </footer>
      </div>
  );
};
export default Footer
