import { AppProps } from "next/app";
import "typeface-montserrat"
import "typeface-merriweather"
import "../styles/normalize.css"
import "../styles/global.css"
import "prismjs/themes/prism.css"
import "../styles/prism-vsc-dark-plus.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
