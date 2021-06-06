// https://medium.com/@albertchu539/how-to-make-an-app-drawer-with-react-hooks-and-css-1338ae57afb4
import styled from "styled-components"
import { breakpoints } from "../utils/breakpoints"

const StyledOpenDrawerButton = styled.div`
  color: #ffffff;
  ${breakpoints("padding", "", [
    { 0: "10px 25px 5px 25px" },
    { 900: "20px 25px" },
  ])}
  text-decoration: none;
  font-weight: 700;
  place-self: center;
`

const StyledCloseDrawerButton = styled.div`
  background-color: #ffffff;
  color: #444444;
  ${breakpoints("padding", "", [
    { 0: "10px 25px 5px 25px" },
    { 900: "20px 25px" },
  ])}
  text-decoration: none;
  font-weight: 700;
`

export function OpenDrawerButton({ onClick }) {
  return (
    <StyledOpenDrawerButton onClick={onClick}>
      {"app drawer >"}
    </StyledOpenDrawerButton>
  )
}

export function CloseDrawerButton({ onClick }) {
  return (
    <StyledCloseDrawerButton onClick={onClick}>
      {"< close drawer"}
    </StyledCloseDrawerButton>
  )
}
