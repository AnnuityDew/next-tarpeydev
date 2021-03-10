/* special "core" next.js page where we can apply global CSS */

import { createGlobalStyle, ThemeProvider } from "styled-components"
import "../styles/global.css"
import Error from "next/error"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  html {
    font-family: "Lato", sans-serif;
    -webkit-text-size-adjust: 100%;
    background-color: #000000;
  }
  img {
    border-style: none;
  }
  main {
    font-family: "Poppins", sans-serif;
    color: #FFFFFF;
  }
  a.inline { background-color: #000000;}
  a.inline:link {color: #66d9ff;}        
  a.inline:visited {color: #ffe066;}
  a.inline:hover {color: #99e6ff;}        
  a.inline:active {color: #99e6ff;}
`

const theme = {
  colors: {
    primary: "#888888",
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
