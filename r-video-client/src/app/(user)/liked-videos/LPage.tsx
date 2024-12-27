'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicLikedVideosPage = dynamic(
	() => import('./LikedVideosPage').then(mod => mod.LikedVideosPage),
	{
		ssr: false,
		loading: () => (
			<div className='w-1/2 mt-16'>
				<SkeletonLoader
					count={3}
					className='h-28 rounded-md mb-6'
				/>
			</div>
		)
	}
)

export function LPage() {
	return <DynamicLikedVideosPage />
}
