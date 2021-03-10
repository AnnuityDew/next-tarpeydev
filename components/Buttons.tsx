import styled from "styled-components"

type ButtonProps = {
  label: string;
  kind: string;
  click: React.MouseEventHandler<HTMLButtonElement>;
  /* className essential for styled components to work!
    https://stackoverflow.com/questions/54113367/extending-styles-with-styled-components-not-working */
  className: string;
}

const Button = (props: ButtonProps) => (
  <button className={props.className} onClick={props.click}>
    {props.label}
  </button>
)

export const StyledButton = styled(Button)`
  cursor: pointer;
  font-size: 1em;
  font-weight: 700;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  transition: 0.3s;
  &:hover {
    background: rgba(255, 255, 255, 0.3)
  };
  ${props => {
    if (props.kind === "vanilla") {
      return `
        background: rgba(0, 0, 0, 0);
        color: ${props.theme.colors.vanilla};
        border: 2px solid ${props.theme.colors.vanilla};
      `
    } else if (props.kind === "mild") {
      return `
        background: rgba(0, 0, 0, 0);
        color: ${props.theme.colors.mild};
        border: 2px solid ${props.theme.colors.mild};
      `
    } else if (props.kind === "medium") {
      return `
        background: rgba(0, 0, 0, 0);
        color: ${props.theme.colors.medium};
        border: 2px solid ${props.theme.colors.medium};
      `
    } else if (props.kind === "max") {
      return `
        background: rgba(0, 0, 0, 0);
        color: ${props.theme.colors.max};
        border: 2px solid ${props.theme.colors.max};
      `
    }
  }}
`
