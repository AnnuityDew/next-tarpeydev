import { useState } from "react"
import { InternalLink } from "./InternalLink"
import styled from "styled-components"
import { breakpoints, gridBreakpoints } from "../utils/breakpoints"
import { OpenDrawerButton } from "./DrawerButton"
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
  ${gridBreakpoints("grid-template-columns", [
    { 0: "1fr" },
    { 450: "1fr max-content max-content" },
  ])}
  grid-template-columns: 1fr max-content max-content;
  align-items: center;
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
  ${breakpoints("justify-self", "", [{ 0: "center" }, { 450: "left" }])}
`

const UserNav = styled.nav`
  place-self: center;
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
        <OpenDrawerButton onClick={toggleDrawer} />
      </PageHeaderGrid>
      <AppDrawer isOpen={isOpen} onClick={toggleDrawer} />
    </PageHeader>
  )
}
