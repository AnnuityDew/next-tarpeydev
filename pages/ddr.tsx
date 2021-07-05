import Page from "../components/Page"
import { InlineExternalLink } from "../components/ExternalLink"

// This gets called only on build
export async function getServerSideProps(context) {
  // Fetch data from external API
  let api = ""
  if (process.env.API_ENV === "test") {
    api = "http://127.0.0.1:8000"
  } else if (process.env.API_ENV === "dev") {
    api = "https://dev.tarpey.dev"
  } else {
    api = "https://api.tarpey.dev"
  }

  // Pass data to the page via props
  return { props: { apiUrl: api } }
}

export default function About() {

  return (
    <Page
      loggedIn={false}
      titleTwo=" - DDR"
      description="Mike Tarpey's attempts to reverse engineer PS2 DDR memory card data for scores and statistics."
      heading="DDR"
    >
      <h2>Under construction!</h2>
    </Page>
  )
}
