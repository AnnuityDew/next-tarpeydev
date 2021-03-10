/* special "core" next.js page where we can apply global CSS */

import { createGlobalStyle, ThemeProvider } from "styled-components"
import "../styles/global.css"
import Error from "next/error"
import { breakpoints } from "../utils/breakpoints"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  html {
    font-family: "Lato", sans-serif;
    -webkit-text-size-adjust: 100%;
    background-color: #000000;
    font-size: 16px;
  }
  img {
    border-style: none;
  }
  main {
    font-family: "Poppins", sans-serif;
    color: #FFFFFF;
    margin: 0 20px;
    ${breakpoints("font-size", "rem", [
      { 0: 1 },
      { 600: 1.2 },
      { 900: 1.4 },
      { 1200: 1.6 },
      { 1600: 1.6 },
    ])};
  }
  a { background-color: #000000;}
  a:link {color: #66d9ff;}        
  a:visited {color: #ffe066;}
  a:hover {color: #99e6ff;}        
  a:active {color: #99e6ff;}
`

const theme = {
  colors: {
    vanilla: "#F3E5AB",
    mild: "#76FF4D",
    medium: "#FFED4D",
    max: "#FF914D",
  },
  uconn: {
    c900: "#000e2f",
    c800: "#172346",
    c700: "#2f395d",
    c600: "#475076",
    c500: "#606890",
    c400: "#7a81aa",
    c300: "#949bc6",
    c200: "#afb5e2",
    c100: "#cbd1ff",
  },
}

export default function App({ Component, pageProps }) {
  /* global error handling that catches serversideprops errors */
  if (pageProps.error) {
    return (
      <Error
        statusCode={pageProps.error.statusCode}
        title={pageProps.error.message}
      />
    )
  }
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
