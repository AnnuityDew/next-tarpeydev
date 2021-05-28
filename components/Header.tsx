import * as React from "react"
import { InternalLink } from "./InternalLink"
import styled from "styled-components"
import { useSession, getSession } from "next-auth/client"

type HeaderProps = {
  heading: string
  subheading: string
}

const NavGrid = styled.nav`
  display: flex;
`

export default function Header({ heading, subheading }: HeaderProps) {
  const [session, loading] = useSession()
  let conditionalNav

  if (session) {
    conditionalNav = (
      <>
        <InternalLink href="/api/auth/signout" label="logout" />
        <InternalLink href="backlog-admin" label="backlog-admin" />
      </>
    )
  } else {
    conditionalNav = <InternalLink href="/api/auth/signin" label="login" />
  }

  return (
    <header>
      <NavGrid>
        {conditionalNav}
        <InternalLink href="/autobracket" label="autobracket" />
        <InternalLink href="/about" label="about" />
      </NavGrid>
      <h1>{heading}</h1>
      <h3>{subheading}</h3>
    </header>
  )
}
