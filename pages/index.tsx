import Page from "../components/Page"
import { IndexAppCard } from "../components/IndexAppCards"
import { IndexAppGrid } from "../components/IndexAppGrid"
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
          imagesrc="/images/raw/final-fantasy-13-2-collectors.jpeg"
          imagealt="Mike Tarpey's Final Fantasy XIII-2 collector's edition, on release day in early 2012."
          appName="Dew's Backlog"
          oneLiner="The real final fantasy is me finishing all of my games."
          buttonText="check the backlog"
          url="/backlog"
          buttonKind="dark"
          internal={true}
        />
        <IndexAppCard
          imagesrc="/images/raw/uconn-towers-basketball-court.jpeg"
          imagealt="View from the outdoor basketball court by Towers on the UConn Storrs campus."
          appName="Autobracket"
          oneLiner="Generate March Madness brackets based on the results of a Monte Carlo simulation."
          buttonText="make some brackets"
          url="/autobracket"
          buttonKind="dark"
          internal={true}
        />
        <IndexAppCard
          imagesrc="/images/raw/mike-tarpey-first-computer.jpeg"
          imagealt="Mike Tarpey in the mid-90s using a PC for the first time."
          appName="Time Capsule"
          oneLiner="View my first websites, created as early as 2006."
          buttonText="visit the past"
          url="https://timecapsule.tarpey.dev"
          buttonKind="dark"
          internal={false}
        />
        <IndexAppCard
          imagesrc="/images/raw/mildred-league-hot-takes.jpeg"
          imagealt="A white board of ridiculous football season hot takes from some of the members of Mildred League."
          appName="Mildred League"
          oneLiner="Winners get wings."
          buttonText="view the league"
          url="/mildredleague"
          buttonKind="dark"
          internal={true}
        />
        <IndexAppCard
          imagesrc="/images/raw/ddr-extreme-prom-lynnhaven-mall-amc.jpeg"
          imagealt="The DDR Extreme cabinet at the Virginia Beach Lynnhaven AMC on prom night 2010."
          appName="DDR"
          oneLiner="My attempts to reverse engineer PS2 DDR memory card data for scores and statistics."
          buttonText="are you ready?"
          url="/ddr"
          buttonKind="dark"
          internal={true}
        />
      </IndexAppGrid>
    </Page>
  )
}
