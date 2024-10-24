import Head from 'next/head'
import { baseUrl } from '@/context/constants'

export const Manifest: React.FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <link href={`${baseUrl}/manifest.json`} rel="manifest" />
      <link
        href={`${baseUrl}/icon-192x192.png`}
        rel="icon"
        type="image/png"
        sizes="192x192"
      />
      <link
        href={`${baseUrl}/icon-512x512.png`}
        rel="icon"
        type="image/png"
        sizes="512x512"
      />
      <link
        rel="apple-touch-icon"
        href={`${baseUrl}/icon-192x192.png`}
      />
      <meta name="theme-color" content="#000" />
    </Head>
  )
}
