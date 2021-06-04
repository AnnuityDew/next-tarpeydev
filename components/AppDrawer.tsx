// https://medium.com/@albertchu539/how-to-make-an-app-drawer-with-react-hooks-and-css-1338ae57afb4
// https://medium.com/@axionoso/step-by-step-guide-to-react-sliding-drawer-e0f8facf3bab
// https://stackoverflow.com/questions/44459813/adding-transitions-to-styled-components

import styled from "styled-components"
import { InternalLink } from "./InternalLink"
import { CloseDrawerButton } from "./DrawerButton"

const AppDrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #444444;
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  max-width: 50vw;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0,0,0,0.5); 
  transition: transform 0.3s ease-out;
  transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100%)"}
`

export function AppDrawer ({ isOpen, onClick }) {
  return (
    <AppDrawerNav isOpen={isOpen}>
      <CloseDrawerButton onClick={onClick} />
      <InternalLink href="/backlog" label="backlog" />
      <InternalLink href="/autobracket" label="autobracket" />
      <InternalLink href="/about" label="about" />
    </AppDrawerNav>
  )
};
