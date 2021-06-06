// https://medium.com/@albertchu539/how-to-make-an-app-drawer-with-react-hooks-and-css-1338ae57afb4
// https://medium.com/@axionoso/step-by-step-guide-to-react-sliding-drawer-e0f8facf3bab
// https://stackoverflow.com/questions/44459813/adding-transitions-to-styled-components

import styled from "styled-components"
import { InternalLink } from "./InternalLink"
import { ExternalLink } from "./ExternalLink"
import { CloseDrawerButton } from "./DrawerButton"

const AppDrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #4d000e;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  max-width: 70vw;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-out;
  transform: ${props => (props.isOpen ? "translateX(0)" : "translateX(100%)")};
  a {
    transition: 0.3s;
  }
  a:hover {
    background: ${props => props.theme.gradients.buttonBlue};
  }
`

export function AppDrawer({ isOpen, onClick }) {
  return (
    <AppDrawerNav isOpen={isOpen}>
      <CloseDrawerButton onClick={onClick} />
      <InternalLink href="/" label="Home" />
      <InternalLink href="/backlog" label="Dew's Backlog" />
      <InternalLink href="/autobracket" label="Autobracket" />
      <ExternalLink href="https://timecapsule.tarpey.dev">
        Time Capsule
      </ExternalLink>
      <InternalLink href="/mildredleague" label="Mildred League" />
      <InternalLink href="/ddr" label="DDR" />
      <InternalLink href="/about" label="About tarpey.dev" />
    </AppDrawerNav>
  )
}
