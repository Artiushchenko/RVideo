import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constant'

import { UploadVideoMain } from './UploadVideoMain'

export const metadata: Metadata = {
	title: 'Upload video',
	...NO_INDEX_PAGE
}

export default function UploadVideoPage() {
	return <UploadVideoMain />
}
