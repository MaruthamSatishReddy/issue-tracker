import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavigationBar from './NavigationBar'
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Issue Tracker',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>
          <NavigationBar />
          <main className='p-5'>{children}</main>
        </Theme>
      </body>
    </html>
  )
}
