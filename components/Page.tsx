import React from "react"
import SEO from "./SEO"
import Header from "./Header"

interface PageProps {
  children: React.ReactNode
  loggedIn?: boolean
  titleTwo?: string
  description?: string
  url?: string
  urlImage?: string
  heading?: string
  subheading?: string
}

const defaultDesc =
  "Mike Tarpey's app playground. Search for a game in the backlog, " +
  "generate a March Madness bracket, view stats for Mildred League, " +
  "or dive into the time capsule..."

const Page = ({
  children,
  loggedIn = false,
  titleTwo = "",
  description = defaultDesc,
  url = "",
  urlImage = "",
  heading = "",
  subheading = "",
}: PageProps) => (
  <React.Fragment>
    <SEO
      titleTwo={titleTwo}
      description={description}
      url={url}
      urlImage={urlImage}
    />
    <Header loggedIn={loggedIn} heading={heading} subheading={subheading}></Header>
    <main>{children}</main>
  </React.Fragment>
)

export default Page
