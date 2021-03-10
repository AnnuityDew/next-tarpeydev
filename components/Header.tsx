import * as React from "react"
import Link from "next/link"

const Header = () => (
  <header>
    <Link href="/">
      <a>Home</a>
    </Link>{" "}
    <Link href="/about">
      <a>What happened to the other apps?</a>
    </Link>
  </header>
)

export default Header