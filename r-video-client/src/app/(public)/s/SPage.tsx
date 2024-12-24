'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSearchPage = dynamic(() => import('./SearchPage').then(mod => mod.SearchPage), {
	ssr: false,
	loading: () => (
		<div className='grid-5-cols'>
			<SkeletonLoader
				count={3}
				className='h-36 rounded-md'
			/>
		</div>
	)
})

export function SPage() {
	return <DynamicSearchPage />
}
