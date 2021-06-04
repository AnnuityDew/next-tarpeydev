// https://medium.com/@albertchu539/how-to-make-an-app-drawer-with-react-hooks-and-css-1338ae57afb4
import styled from "styled-components"
import { InternalLink } from "./InternalLink"

const AppDrawerNav = styled.nav`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: black;
  position: fixed;
  top: 0;
  right: 0;
  width: 40%;
  z-index: 200;
  box-shadow: 1px 0px 7px rgba(0,0,0,0.5); 
  transition: transform 0.3s ease-out;
  transform: ${props => props.isOpen ? "translateX(0)" : "translateX(100%)"}
`

export function AppDrawer ({ isOpen }) {
  return (
    <AppDrawerNav isOpen={isOpen}>
      <InternalLink href="/backlog" label="backlog" />
      <InternalLink href="/autobracket" label="autobracket" />
      <InternalLink href="/about" label="about" />
    </AppDrawerNav>
  )
};
