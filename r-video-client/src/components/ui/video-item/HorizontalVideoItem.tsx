import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'

import { VideoChannelName } from './VideoChannelName'
import { VideoItemTitle } from './VideoItemTitle'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
}

export function HorizontalVideoItem({ video }: Props) {
	return (
		<m.div
			whileHover={{
				scale: 1.01,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='flex items-stretch gap-4 mb-6'>
				<Link
					href={PAGE.VIDEO(video.publicId)}
					className='flex-shrink-0'
				>
					<Image
						src={video.thumbnailUrl}
						width={205}
						height={115}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>

				<div className='flex flex-col justify-between'>
					<div>
						<div className='mb-1 text-lg'>
							<VideoItemTitle video={video} />
						</div>

						<div className='mb-1'>
							<VideoChannelName
								channel={video.channel}
								spanClassName='mr-0.5'
							/>
						</div>
					</div>

					<div className='flex items-center gap-2 pb-1'>
						<span className='text-gray-400 text-xs'>{transformCount(video.viewsCount)} views</span>

						<span className='text-xs'>·</span>

						<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
					</div>
				</div>
			</div>
		</m.div>
	)
}
