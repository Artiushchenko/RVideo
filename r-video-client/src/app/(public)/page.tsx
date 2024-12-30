import { Flame } from 'lucide-react'
import type { Metadata } from 'next'

import { Heading } from '@/ui/Heading'
import { VideoItem } from '@/ui/video-item/VideoItem'

import { ExploreSection } from './explore/ExploreSection'
import { videoService } from '@/services/video.service'

export const revalidate = 100

export const metadata: Metadata = {
	title: 'Home',
	description: 'The best video platform',
	alternates: {
		canonical: '/'
	},
	openGraph: {
		type: 'website',
		url: '/',
		title: 'RVideo'
	}
}

export default async function Home() {
	const data = await videoService.getTrendingVideos()
	const trendingVideos = data.data.slice(0, 5)

	return (
		<section>
			{!!trendingVideos.length && (
				<section className='mb-7'>
					<Heading Icon={Flame}>Trending</Heading>
					<div className='grid-5-cols'>
						{trendingVideos.map(video => (
							<VideoItem
								key={video.id}
								video={video}
								Icon={Flame}
								isImagePriority
							/>
						))}
					</div>
				</section>
			)}

			<ExploreSection />
		</section>
	)
}
