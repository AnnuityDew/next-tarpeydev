import * as React from "react"
import { InternalLink } from "./InternalLink"
import styled from "styled-components"

type HeaderProps = {
  loggedIn: boolean
  heading: string
  subheading: string
}

const NavGrid = styled.nav`
  display: flex;
`

export default function Header({ loggedIn, heading, subheading }: HeaderProps) {
  return (
    <header>
      <NavGrid>
        {!loggedIn && <InternalLink href="/api/auth/signin" label="login" />}
        {loggedIn && <InternalLink href="/api/auth/signout" label="logout" />}
        <InternalLink href="/backlog" label="backlog" />
        <InternalLink href="/autobracket" label="autobracket" />
        <InternalLink href="/about" label="about" />
      </NavGrid>
      <h1>{heading}</h1>
      <h3>{subheading}</h3>
    </header>
  )
}
