'use client'

import { Heart } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { useProfile } from '@/hooks/useProfile'

export function SubscriptionsPage() {
	const { profile, isLoading } = useProfile()

	return (
		<section>
			<Heading
				isPageHeading
				Icon={Heart}
			>
				Subscriptions
			</Heading>
			<div className='grid-5-cols'>
				{isLoading ? (
					<SkeletonLoader
						count={5}
						className='h-36 rounded-md'
					/>
				) : profile?.subscribedVideos?.length ? (
					profile?.subscribedVideos?.map(video => (
						<VideoItem
							key={video.id}
							video={video}
						/>
					))
				) : (
					<p>Subscriptions not found</p>
				)}
			</div>
		</section>
	)
}
