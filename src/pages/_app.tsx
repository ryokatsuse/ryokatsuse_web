import { AppProps } from "next/app";
import "typeface-montserrat"
import "typeface-merriweather"
import "prismjs/themes/prism.css"
import "../styles/global.css"
import "../styles/prism-vsc-dark-plus.css"

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
