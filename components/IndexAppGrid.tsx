import styled from "styled-components"

const GriddedIndexSection = styled.section`
  padding: 0 25px 0 0;
  display: grid;
  grid-gap: 25px;
  grid-template-columns: repeat(auto-fill, minmax(min(300px, 100%), 1fr));
  margin: 0 0 25px 0;
`

export const IndexAppGrid = ({ children }) => (
  <GriddedIndexSection>{children}</GriddedIndexSection>
)
