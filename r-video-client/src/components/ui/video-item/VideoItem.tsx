import * as m from 'framer-motion/m'
import { type LucideIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'
import { transformDate } from '@/utils/transform-date'

import { VerifiedBadge } from '../VerifiedBadge'

import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
	Icon?: LucideIcon
}

export function VideoItem({ video, Icon }: Props) {
	return (
		<m.div
			whileHover={{
				scale: 1.03,
				y: -5
			}}
			transition={{
				type: 'spring',
				stiffness: 500,
				damping: 30
			}}
		>
			<div className='relative mb-1.5'>
				<Link href={PAGE.VIDEO(video.publicId)}>
					<Image
						src={video.thumbnailUrl}
						width={300}
						height={170}
						alt={video.title}
						className='rounded-md'
					/>
				</Link>

				<Link
					href={PAGE.CHANNEL(video?.channel?.slug) || ''}
					className='absolute left-1.5 bottom-2'
				>
					<Image
						src={video.channel?.avatarUrl || ''}
						width={35}
						height={35}
						alt={video?.channel?.user?.name || ''}
						className='rounded-full shadow'
						quality={100}
					/>
				</Link>
			</div>

			<div className='mb-2 flex items-center justify-between'>
				<div className='flex items-center gap-0.5'>
					{Icon && (
						<Icon
							className='text-red-600'
							size={20}
						/>
					)}
					<span className='text-gray-400 text-xs'>{transformCount(video.viewsCount)} views</span>
				</div>

				<div>
					<span className='text-gray-400 text-xs'>{transformDate(video.createdAt)}</span>
				</div>
			</div>

			<div className='mb-1'>
				<Link
					href={PAGE.VIDEO(video.publicId)}
					className='line-clamp-2 leading-[1.3]'
				>
					{video.title}
				</Link>
			</div>

			<div>
				<Link
					href={PAGE.CHANNEL(video?.channel?.slug) || ''}
					className='flex items-center gap-1'
				>
					<span className='text-gray-400 text-sm'>{video.channel.user.name}</span>
					{video.channel.isVerified && <VerifiedBadge />}
				</Link>
			</div>
		</m.div>
	)
}
