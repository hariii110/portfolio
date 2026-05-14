import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'Hari Narayan - Full Stack Developer',
    template: '%s | Hari Narayan',
  },
  description:
    'I am a Full Stack Developer who builds clean, fast and user-friendly web applications.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <meta name="HandheldFriendly" content="true" />
      </head>
      <body style={{ background: '#011d3a' }}>
        {children}
        <Script src="/no-zoom.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}