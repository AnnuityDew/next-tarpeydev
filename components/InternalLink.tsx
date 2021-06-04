/* see https://nextjs.org/docs/api-reference/next/link */
import Link from "next/link"
import styled from "styled-components"
import { breakpoints } from "../utils/breakpoints"

type InternalLinkProps = {
  href: string
  label: string
}

const HeaderLink = styled.a`
  color: #ffffff;
  ${breakpoints("padding", "", [
    { 0: "10px 25px 5px 25px" },
    { 900: "20px 25px" },
  ])}
  text-decoration: none;
  font-weight: 700;
`

export function InternalLink({ href, label }: InternalLinkProps) {
  return (
    <Link href={href} passHref>
      <HeaderLink>{label}</HeaderLink>
    </Link>
  )
}
