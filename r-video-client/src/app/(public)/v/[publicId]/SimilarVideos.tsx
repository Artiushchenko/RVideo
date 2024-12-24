import { VideoItem } from '@/ui/video-item/VideoItem'

import type { ISingleVideoResponse } from '@/types/video.types'

export function SimilarVideos({ videos }: { videos: ISingleVideoResponse['similarVideos'] }) {
	return (
		<div className='grid grid-cols-1 gap-8'>
			{videos.map(video => (
				<VideoItem
					key={video.id}
					video={video}
				/>
			))}
		</div>
	)
}
