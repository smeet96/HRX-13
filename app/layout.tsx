import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Intellidev',
  description: 'Intellidev',
  generator: 'Intellidev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
