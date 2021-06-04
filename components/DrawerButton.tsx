// https://medium.com/@albertchu539/how-to-make-an-app-drawer-with-react-hooks-and-css-1338ae57afb4
import styled from "styled-components"
import { breakpoints } from "../utils/breakpoints"

const StyledDrawerButton = styled.div`
  color: #ffffff;
  ${breakpoints("padding", "", [
    { 0: "10px 25px 5px 25px" },
    { 900: "20px 25px" },
  ])}
  text-decoration: none;
  font-weight: 700;
`

export function DrawerButton ({ isOpen, onClick }) {
  return (
    <StyledDrawerButton onClick={onClick}>
      {!isOpen && "app drawer >"}
      {isOpen && "< close drawer"}
    </StyledDrawerButton>
  )
};
