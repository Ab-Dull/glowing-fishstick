import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AccessAlign',
  description: 'Elevating Education Together',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
};