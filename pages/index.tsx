import Page from "../components/Page"
import { ExternalLink } from "../components/ExternalLink"

export default function Home() {
  return (
    <Page
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
        For now, to view the other apps that haven't moved over here yet, visit{" "}
        <ExternalLink href="https://timecapsule.tarpey.dev">
          timecapsule.tarpey.dev
        </ExternalLink>
        . (Yes, that means there's a timecapsule INSIDE the timecapsule now...)
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
