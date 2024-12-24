'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSubscriptionsPage = dynamic(
	() => import('./SubscriptionsPage').then(mod => mod.SubscriptionsPage),
	{
		ssr: false,
		loading: () => (
			<div className='grid-5-cols'>
				<SkeletonLoader
					count={3}
					className='h-36 rounded-md'
				/>
			</div>
		)
	}
)

export function SubPage() {
	return <DynamicSubscriptionsPage />
}
