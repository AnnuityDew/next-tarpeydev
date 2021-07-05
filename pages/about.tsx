import Page from "../components/Page"
import { InlineExternalLink } from "../components/ExternalLink"

export default function About() {

  return (
    <Page
      loggedIn={false}
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
