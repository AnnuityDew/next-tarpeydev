/* special "core" next.js page where we can apply global CSS */
import { Provider } from "next-auth/client"
import { createGlobalStyle, ThemeProvider } from "styled-components"
import "../styles/global.css"
import Error from "next/error"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  };
  html {
    font-size: 1rem;
    font-family: "Poppins", "Lato", sans-serif;
    -webkit-text-size-adjust: 100%;
    background: conic-gradient(from 225deg at 100px -100px, #dec8ff,#ffbcc8,#ffe784,#ffc4cf,#dbc3ff);
    color: black;
    overflow-y: scroll;
    min-height: 100%;
  }
  img {
    border-style: none;
  }
  main {
    padding: 20px 0px 0px 25px;
  }
`

const theme = {
  gradients: {
    main:
      "conic-gradient(from 225deg at 100px -100px, " +
      "#dec8ff,#ffbcc8,#ffe784,#ffc4cf,#dbc3ff)",
    highlight:
      "conic-gradient(at 0% 100%, #b78cf7, #ff7c94, #ffcf0d, #ff7c94, #b78cf7)",
    buttonLightRed: "linear-gradient(180deg, #ffccd5, #ff8097)",
    buttonDarkRed: "linear-gradient(180deg, #99001c, #4d000e)",
    buttonBlue: "#0d6fc3",
  },
  glass: {
    black: "rgba(0, 0, 0, 0.65)",
    blackHover: "rgba(0, 0, 0, 0.55)",
    blackBorder: "0px solid rgba(0, 0, 0, 0.72)",
    shadow: "-3px 3px 15px 0 rgba(0, 0, 0, 0.5)",
  },
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
  rainbow: {
    red: "#7f2626",
    orange: "#7f6126",
    yellow: "#617f26",
    green: "#267f26",
    teal: "#267f61",
    lb: "#26617f",
    db: "#26267f",
    purple: "#61267f",
    pink: "#7f2661",
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
      <Provider
        // Provider options are not required but can be useful in situations where
        // you have a short session maxAge time. Shown here with default values.
        options={{
          // Client Max Age controls how often the useSession in the client should
          // contact the server to sync the session state. Value in seconds.
          // e.g.
          // * 0  - Disabled (always use cache value)
          // * 60 - Sync session state with server if it's older than 60 seconds
          clientMaxAge: 0,
          // Keep Alive tells windows / tabs that are signed in to keep sending
          // a keep alive request (which extends the current session expiry) to
          // prevent sessions in open windows from expiring. Value in seconds.
          //
          // Note: If a session has expired when keep alive is triggered, all open
          // windows / tabs will be updated to reflect the user is signed out.
          keepAlive: 0,
        }}
        session={pageProps.session}
      >
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  )
}
