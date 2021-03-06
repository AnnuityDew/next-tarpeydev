import React from "react"
import styled from "styled-components"

interface ButtonProps {
  onClick: React.ReactEventHandler
  label: string
  kind: string
  disabled?: boolean
}

const StyledButton = styled.button`
  border-radius: 10px;
  place-items: center;
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;
  font-family: Poppins, sans-serif;
  padding: 0.5rem 0.5rem;
  margin: 0 15px 0 0;
  ${props => {
    if (props.kind === "darkPressed") {
      return `
        color: white;
        background: ${props.theme.gradients.buttonBlue};
        border: 0px solid white;
        box-shadow: inset -2px 2px 4px rgba(0, 0, 0, 0.7);
      `
    } else if (props.kind === "dark") {
      return `
        color: white;
        background: ${props.theme.gradients.buttonDarkRed};
        border: 0px solid white;
        box-shadow: -2px 2px 4px rgba(0, 0, 0, 0.7);
      `
    }
  }}
`

export const FilterButton = ({
  onClick,
  label,
  kind,
  disabled,
}: ButtonProps) => (
  /* outer div allows us to pad and align */
  <StyledButton onClick={onClick} kind={kind} disabled={disabled}>
    {label}
  </StyledButton>
)
