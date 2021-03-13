/* see https://nextjs.org/docs/api-reference/next/link */
import Link from "next/link"
import styled from "styled-components"

type InternalLinkProps = {
  href: string
  label: string
}

const HeaderLink = styled.a`
  color: #ffffff;
  text-decoration: none;
  margin: 3px;
  padding: 8px;
  border-style: solid;
  border-width: 1px;
  border-color: #ffffff;
  border-radius: 10px;
  &:link {
    ${props => {
      return `background: ${props.theme.uconn.c600}`
    }}
  }
  &:hover {
    ${props => {
      return `background: ${props.theme.uconn.c800}`
    }}
  }
`

export function InternalLink({ href, label }: InternalLinkProps) {
  return (
    <Link href={href} passHref>
      <HeaderLink>{label}</HeaderLink>
    </Link>
  )
}
