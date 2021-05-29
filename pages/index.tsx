import Page from "../components/Page"
import { ExternalLink } from "../components/ExternalLink"
import { useSession, getSession } from "next-auth/client"

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

export default function Home() {
  const [session, loading] = useSession()

  return (
    <Page
      loggedIn={!!session}
      description="Mike Tarpey's app playground. Search for a game in the backlog, generate a March Madness bracket, view stats for Mildred League, or dive into the time capsule..."
      url="https://tarpey.dev"
      urlImage="https://tarpey.dev/tarpeydevog.png"
      heading="tarpey's apps"
    >
      <p>Welcome to my app sandbox!</p>
      <p>
        I'm rewriting the site in React with Next.js! This site will slowly
        expand to include everything that was on the old site.
      </p>
      <p>
        For now, here's a link to my personal pages at{" "}
        <ExternalLink href="https://miketarpey.com">
          miketarpey.com
        </ExternalLink>
        .
      </p>
    </Page>
  )
}
