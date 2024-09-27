import type { Metadata } from 'next'
import { ubuntu } from '@/styles/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Landrup Dans',
  description: 'Landrup Dans',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="dk">
      <body className={`${ubuntu.className} antialiased`}>{children}</body>
    </html>
  )
}
