'use client'

import { Compass } from 'lucide-react'
import dynamic from 'next/dynamic'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'

const DynamicExplore = dynamic(() => import('./Explore').then(mod => mod.Explore), {
	ssr: false,
	loading: () => (
		<div className='grid-5-cols'>
			<SkeletonLoader
				count={5}
				className='h-36 rounded-md'
			/>
		</div>
	)
})

export function ExploreSection() {
	return (
		<section className='pb-7'>
			<Heading Icon={Compass}>Explore</Heading>

			<DynamicExplore />
		</section>
	)
}
