import { useState } from "react"
import { InternalLink } from "./InternalLink"
import styled from "styled-components"
import { breakpoints } from "../utils/breakpoints"
import { DrawerButton } from "./DrawerButton"
import { AppDrawer } from "./AppDrawer"

type HeaderProps = {
  loggedIn: boolean
  heading: string
  subheading: string
}

const PageHeader = styled.header`
  background-color: #000000;
`

const PageHeaderGrid = styled.div`
  display: grid;
  background-color: #000000;
  grid-template-columns: max-content max-content 1fr;
`

const GradientTitle = styled.h1`
  background: ${props => props.theme.gradients.main};
  word-break: keep-all;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  ${breakpoints("padding", "", [
    { 0: "10px 25px 5px 25px" },
    { 900: "20px 25px" },
  ])}
  ${breakpoints("justify-self", "", [{ 0: "center" }, { 900: "left" }])}
`

const UserNav = styled.nav`
  display: flex;
`

export default function Header({ loggedIn, heading, subheading }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  async function toggleDrawer() {
    setIsOpen(!isOpen)
  }

  return (
    <PageHeader>
      <PageHeaderGrid>
        <GradientTitle>{heading}</GradientTitle>
        <UserNav>
          {!loggedIn && <InternalLink href="/api/auth/signin" label="login" />}
          {loggedIn && <InternalLink href="/api/auth/signout" label="logout" />}
        </UserNav>
        <DrawerButton isOpen={isOpen} onClick={toggleDrawer}/>
      </PageHeaderGrid>
      <AppDrawer isOpen={isOpen} />
    </PageHeader>
  )
}
