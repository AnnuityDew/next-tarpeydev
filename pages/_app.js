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
    ${breakpoints("font-size", "rem", [
      { 0 : 1 },
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
    ro64: "#888888",
    ro32: "#888888",
    ro16: "#888888",
    ro64: "#888888",
    ro64: "#888888",
    ro64: "#888888",
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
