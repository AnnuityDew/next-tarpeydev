import Page from "../components/Page"

export default function Home() {
  return (
    <Page
      description="Mike Tarpey's app playground. Search for a game in the backlog, generate a March Madness bracket, view stats for Mildred League, or dive into the time capsule..."
      url="https://tarpey.dev"
      urlImage="https://tarpey.dev/tarpeydevog.png"
      heading="tarpey's apps"
    >
      <p>Welcome to my app sandbox! Click one of the buttons to continue.</p>
      <p>
        (If you're wondering where the rest of the site went, click the "about"
        button!
      </p>
    </Page>
  )
}
