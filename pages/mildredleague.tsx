import Page from "../components/Page"
import { InlineExternalLink } from "../components/ExternalLink"
import { useSession, getSession } from "next-auth/client"

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
  return { props: { apiUrl: api, session: await getSession(context) } }
}

export default function About() {
  const [session, loading] = useSession()

  return (
    <Page
      loggedIn={!!session}
      titleTwo=" - Mildred League"
      description="Mildred League is a fantasy football league created in 2013. This tarpey.dev web app tracks and visualizes the scores, statistics, and history of the league."
      heading="Mildred League"
    >
      <h2>Under construction!</h2>
    </Page>
  )
}
