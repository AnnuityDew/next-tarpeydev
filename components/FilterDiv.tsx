import React from "react"
import styled from "styled-components"

export const StyledFilterDiv = styled.div`
  display: flex;
  padding: 0px 0px 20px 0px;
`

export const FilterDiv = ({ children }) => (
  /* outer div allows us to pad and align */
  <StyledFilterDiv>{children}</StyledFilterDiv>
)
