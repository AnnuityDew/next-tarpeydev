import * as React from "react"
import { InternalLink } from "./InternalLink"
import styled from "styled-components"

type HeaderProps = {
  heading: string
  subheading: string
}

const NavGrid = styled.nav`
  display: grid;
  grid: auto-flow / 1fr 1fr;
`

const Header = ({ heading, subheading }: HeaderProps) => (
  <header>
    <NavGrid>
      <InternalLink href="/autobracket" label="autobracket" />
      <InternalLink href="/about" label="about" />
    </NavGrid>
    <h1>{heading}</h1>
    <h3>{subheading}</h3>
  </header>
)

export default Header
