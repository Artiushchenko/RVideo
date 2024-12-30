'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicHistoryPage = dynamic(() => import('./HistoryPage').then(mod => mod.HistoryPage), {
	ssr: false,
	loading: () => (
		<div className='w-1/2 mt-16'>
			<SkeletonLoader
				count={3}
				className='h-28 rounded-md mb-6'
			/>
		</div>
	)
})

export function HPage() {
	return <DynamicHistoryPage />
}
