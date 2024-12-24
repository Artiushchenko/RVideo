import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

export const metadata: Metadata = {
	title: 'Studio',
	...NO_INDEX_PAGE
}

export default function StudioPage() {
	return <div>Studio</div>
}
