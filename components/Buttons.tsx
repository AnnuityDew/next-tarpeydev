import styled from "styled-components"

type ButtonProps = {
  gridButton: boolean
  label: string
  sublabel?: string
  kind: string
  click: React.MouseEventHandler<HTMLButtonElement>
  /* className essential for styled components to work!
    https://stackoverflow.com/questions/54113367/extending-styles-with-styled-components-not-working */
  className: string
}

const Button = ({
  gridButton,
  label,
  sublabel,
  kind,
  click,
  className,
}: ButtonProps) => (
  <button className={className} onClick={click}>
    <h3>{label}</h3>
    <h5>{sublabel}</h5>
  </button>
)

export const StyledButton = styled(Button)`
  ${props => {
    if (props.gridButton) {
      if (props.sublabel) {
        return `
          display: grid;
          grid-template-rows: 1fr 1fr;
          margin: 0.5em 1em;
        `
      } else {
        return `
          display: grid;
          grid-template-rows: 1fr;
          margin: 0.5em 1em;
        `
      }
    } else {
      return `
        width: 100%;
        margin: 10px 0;
      `
    }
  }};
  place-items: center;
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;
  padding: 1rem 1rem;
  border-radius: 3px;
  transition: 0.3s;
  background: rgba(0, 0, 0, 0.4);
  &:hover {
    background: rgba(70, 70, 70, 0.8);
  }
  ${props => {
    if (props.kind === "vanilla") {
      return `
        color: ${props.theme.colors.vanilla};
        border: 2px solid ${props.theme.colors.vanilla};
      `
    } else if (props.kind === "mild") {
      return `
        color: ${props.theme.colors.mild};
        border: 2px solid ${props.theme.colors.mild};
      `
    } else if (props.kind === "medium") {
      return `
        color: ${props.theme.colors.medium};
        border: 2px solid ${props.theme.colors.medium};
      `
    } else if (props.kind === "max") {
      return `
        color: ${props.theme.colors.max};
        border: 2px solid ${props.theme.colors.max};
      `
    } else {
      return `
        color: ${props.theme.uconn.c200};
        border: 2px solid ${props.theme.uconn.c200};
      `
    }
  }}
`
