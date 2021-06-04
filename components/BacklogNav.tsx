
import styled from "styled-components"
import { AppButton } from "../components/AppButtons"

const StyledBacklogNav = styled.nav`
  padding: 15px 0px;
  width: 50vh;
  max-width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`

export function BacklogNav() {
  return (
    <StyledBacklogNav>
      <AppButton label="search" kind="dark" width="100%" />
      <AppButton label="visualize" kind="dark" width="100%" />
    </StyledBacklogNav>
  )
}
