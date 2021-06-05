import Page from "../components/Page"
import { IndexAppCard } from "../components/IndexAppCards"
import { IndexAppGrid } from "../components/IndexAppGrid"
import { LinkedAppButton } from "../components/AppButtons"
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
      <IndexAppGrid>
        <IndexAppCard
          internal={true}
          label="about"
          imagesrc="/images/raw/mike-tarpey-at-pax.jpg"
          imagealt="Mike Tarpey on his way to PAX East 2020 in Boston, Massachusetts."
        >
          <p>Career and project history.</p>
          <LinkedAppButton
            label="full resume + projects"
            url="/about"
            kind="light"
          />
        </IndexAppCard>
      </IndexAppGrid>
    </Page>
  )
}
