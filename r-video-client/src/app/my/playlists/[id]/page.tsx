'use client'

import dynamic from 'next/dynamic'

import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicSinglePlaylist = dynamic(
	() => import('./SinglePlaylist').then(mod => mod.SinglePlaylist),
	{
		ssr: false,
		loading: () => (
			<div className='grid-5-cols mt-16'>
				<SkeletonLoader
					count={3}
					className='h-36 rounded-md mb-6'
				/>
			</div>
		)
	}
)

export default function Page() {
	return <DynamicSinglePlaylist />
}
