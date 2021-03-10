import styled from "styled-components"

type ButtonProps = {
  label: string
  click: React.MouseEventHandler<HTMLButtonElement>
  /* className essential for styled components to work!
    https://stackoverflow.com/questions/54113367/extending-styles-with-styled-components-not-working */
  className: string
}

const Button = (props: ButtonProps) => (
  <button className={props.className} onClick={props.click}>
    {props.label}
  </button>
)

export const StyledButton = styled(Button)`
  /* Adapt the colors based on primary prop */
  background: ${props => (props.primary ? "palevioletred" : "white")};
  color: ${props => (props.primary ? "white" : "palevioletred")};

  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`
