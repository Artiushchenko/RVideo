'use client'

import { Video } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicStudioVideoList = dynamic(
	() => import('./StudioVideoList').then(mod => mod.StudioVideoList),
	{
		ssr: false,
		loading: () => (
			<div className=''>
				<SkeletonLoader
					count={3}
					className='h-32 rounded-md mb-6'
				/>
			</div>
		)
	}
)

export function StudioVideoListPage() {
	return (
		<section className='pb-7'>
			<Heading
				isPageHeading
				Icon={Video}
				className='mb-6'
			>
				Content
			</Heading>

			<DynamicStudioVideoList />
		</section>
	)
}
