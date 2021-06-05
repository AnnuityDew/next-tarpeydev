import styled from "styled-components"
import { breakpoints } from "../utils/breakpoints"

export const ExternalLink = styled.a`
  color: #ffffff;
  ${breakpoints("padding", "", [
    { 0: "10px 25px 5px 25px" },
    { 900: "20px 25px" },
  ])}
  text-decoration: none;
  font-weight: 700;
`
