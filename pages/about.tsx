import Page from "../components/Page"
import { ExternalLink } from "../components/ExternalLink"
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
      titleTwo=" - about"
      description="All about Mike Tarpey's app sandbox."
      heading="about"
      subheading="Where did all of the apps go?"
    >
      <p>
        I'm rewriting the site in React with Next.js! This site will slowly
        expand to include everything that was on the old site.
      </p>
      <p>
        For less about apps and more about me, visit{" "}
        <ExternalLink href="https://miketarpey.com">
          miketarpey.com
        </ExternalLink>
        .
      </p>
    </Page>
  )
}
