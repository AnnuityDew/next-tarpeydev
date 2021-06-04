import React from "react"
import styled from "styled-components"

interface ButtonProps {
  label: string
  kind: string
  width: string
}

export const StyledButton = styled.button`
  width: ${props => props.width};
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7),
    -2px 2px 4px rgba(0, 0, 0, 0.7);
  place-items: center;
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;
  font-family: Poppins, sans-serif;
  padding: 0.5rem 0.5rem;
  transition: 0.3s;
  ${props => {
    if (props.kind === "dark") {
      return `
        color: white;
        background: ${props.theme.gradients.buttonDark};
        border: 0px solid white;
      `
    } else {
      return `
        color: black;
        background: ${props.theme.gradients.buttonLight};
        border: 0px solid black;
      `
    }
  }}
`

export const AppButton = ({ label, kind, width }: ButtonProps) => (
  /* outer div allows us to pad and align */
  <StyledButton kind={kind} width={width}>
    {label}
  </StyledButton>
)