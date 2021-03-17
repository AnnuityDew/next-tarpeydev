/* https://nextjs.org/docs/api-reference/next/head */

import Head from "next/head"

interface HeadProps {
  titleTwo?: string
  description?: string
  url?: string
  urlImage?: string
}

function SEO({ titleTwo, description, url, urlImage }: HeadProps) {
  const title = `tarpey's apps${titleTwo}`
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="author" content="Mike Tarpey" />
        <meta name="description" content={description} />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#2b5797" />
        <meta name="theme-color" content="#2b5797" />
        <link rel="shortcut icon" href="/favicon.ico" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={urlImage} />
        <meta name="twitter:image" content={urlImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="tarpey's apps" />
      </Head>
    </div>
  )
}

export default SEO
