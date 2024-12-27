'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicPlaylistsPage = dynamic(
	() => import('./PlaylistsPage').then(mod => mod.PlaylistsPage),
	{
		ssr: false,
		loading: () => (
			<div className='grid-5-cols mt-16'>
				<SkeletonLoader
					count={5}
					className='h-36 rounded-md mb-6'
				/>
			</div>
		)
	}
)

export function PPage() {
	return <DynamicPlaylistsPage />
}
