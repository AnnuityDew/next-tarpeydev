import React from "react"
import SEO from "./SEO"
import Header from "./Header"

type AppProps = {
  children: React.ReactNode;
  titleTwo?: string;
  description?: string;
}

const defaultDesc =
  "Mike Tarpey's app playground. Search for a game in the backlog, " +
  "generate a March Madness bracket, view stats for Mildred League, " +
  "or dive into the time capsule..."

const App = ({
  children,
  titleTwo = "",
  description = defaultDesc,
}: AppProps) => (
  <React.Fragment>
    <SEO titleTwo={titleTwo} description={description} />
    <Header />
    <main>{children}</main>
  </React.Fragment>
)

export default App