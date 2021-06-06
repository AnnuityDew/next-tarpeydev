import styled from "styled-components"

const StyledBacklogNav = styled.nav`
  display: flex;
  padding: 20px 0px;
`

export function BacklogNav({ children }) {
  return <StyledBacklogNav>{children}</StyledBacklogNav>
}
