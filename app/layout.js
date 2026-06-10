import '@mantine/core/styles.css';

import { Inter } from 'next/font/google'
import { MantineProvider } from '@mantine/core'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Venuze — Find The Perfect Venue',
  description: 'Discover and book the best venues for any occasion.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MantineProvider>
         
        {children}

          

        </MantineProvider>
      </body>
    </html>
  )
}


