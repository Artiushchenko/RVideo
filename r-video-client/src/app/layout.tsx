import type { Metadata, Viewport } from 'next'
import { Noto_Sans } from 'next/font/google'

import { Providers } from '@/providers/Providers'

import { COLORS } from '@/constants/colors.constant'
import { SITE_NAME, SITE_URL } from '@/constants/constant'

import './globals.scss'

const notoSans = Noto_Sans({ subsets: ['latin'] })

export const fetchCache = 'default-cache'

export const metadata: Metadata = {
	icons: {
		icon: '/images/logo.svg',
		shortcut: '/images/logo.svg',
		apple: '/images/256.png',
		other: {
			rel: 'touch-icons',
			url: '/images/256.png',
			sizes: '256x256',
			type: 'image/png'
		}
	},
	title: {
		absolute: `${SITE_NAME}`,
		template: `%s | ${SITE_NAME}`
	},
	description: 'The best platform for video watching',
	openGraph: {
		type: 'website',
		siteName: 'localhost',
		emails: ['r-video-support@gmail.com'],
		images: [
			{
				url: '/images/og.jpg',
				width: 1083,
				height: 500,
				alt: `${SITE_NAME}`
			}
		]
	},
	metadataBase: new URL(SITE_URL),
	applicationName: `${SITE_NAME}`,
	authors: {
		name: 'Kyrylo Artiushchenko'
	},
	manifest: '/manifest.json',
	publisher: 'Kyrylo Artiushchenko',
	formatDetection: {
		telephone: false
	}
}

export const viewport: Viewport = {
	themeColor: COLORS.bg
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={notoSans.className}>
				<Providers>{children}</Providers>
			</body>
		</html>
	)
}
