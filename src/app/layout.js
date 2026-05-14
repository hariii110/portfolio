import { Inter } from 'next/font/google'
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
  keywords: [
    'Full Stack Developer',
    'MERN Stack Developer',
    'React Developer',
    'Node.js Developer',
    'Hari Narayan',
  ],
  authors: [{ name: 'Hari Narayan' }],
  creator: 'Hari Narayan',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}