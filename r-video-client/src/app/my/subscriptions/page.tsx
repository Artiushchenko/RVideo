import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

import { SubPage } from './SubPage'

export const metadata: Metadata = {
	title: 'History',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <SubPage />
}
