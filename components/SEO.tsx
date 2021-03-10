/* https://nextjs.org/docs/api-reference/next/head */

import Head from "next/head"

type HeadProps = {
  titleTwo?: string
  description?: string
}

function SEO({ titleTwo, description }: HeadProps) {
  return (
    <div>
      <Head>
        <title>tarpey's apps{titleTwo}</title>
        <meta name="author" content="Mike Tarpey" />
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png') }}"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png') }}"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png') }}"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <link
          rel="shortcut icon"
          href="{{ url_for('static', path='/favicon.ico') }}"
        />
      </Head>
    </div>
  )
}

export default SEO
