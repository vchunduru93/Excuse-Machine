import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Excuse Machine',
  description: 'Submit and vote on creative excuses for late assignments',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
