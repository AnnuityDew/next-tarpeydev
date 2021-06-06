import styled from "styled-components"

const StyledBacklogDiv = styled.div`
  display: flex;
  flex-direction: column;
`

export function BacklogDiv({ children }) {
  return <StyledBacklogDiv>{children}</StyledBacklogDiv>
}
