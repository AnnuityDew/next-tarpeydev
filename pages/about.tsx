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
      titleTwo=" - about"
      description="All about Mike Tarpey's app sandbox."
      heading="about"
      subheading="Where did all of the apps go?"
    >
      <p>
        This site is a place for me to play around with creating web apps. All of the code for the site can be found on{" "} 
        <InlineExternalLink href="https://github.com/AnnuityDew/next-tarpeydev">GitHub</InlineExternalLink>.
      </p>
      <p>
        For less about apps and more about me, visit{" "}
        <InlineExternalLink href="https://miketarpey.com">
          miketarpey.com
        </InlineExternalLink>
        .
      </p>
    </Page>
  )
}
