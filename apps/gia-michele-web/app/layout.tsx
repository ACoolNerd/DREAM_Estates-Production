import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gia Michèle Design | Space. Purpose. Beauty.',
  description:
    'Curated interiors, made-to-order furnishings, and thoughtful design for modern living.',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
