import Image from 'next/image'
import Link from 'next/link'

import { SubscribeButton } from '@/components/SubscribeButton'

import { Heading } from '@/ui/Heading'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoChannel({ video }: { video: ISingleVideoResponse }) {
	return (
		<div className='flex items-center justify-between mb-6'>
			<div className='flex gap-4 items-center'>
				<Link href={PAGE.CHANNEL(video.channel.slug)}>
					<Image
						alt={video.channel.user.name || ''}
						src={video.channel.avatarUrl}
						width={50}
						height={50}
						className='rounded-full flex-shrink-0 shadow'
						priority
					/>
				</Link>
				<div>
					<Link href={PAGE.CHANNEL(video.channel.slug)}>
						<Heading
							className='mb-0'
							classNameHeading='text-lg'
						>
							<span className='flex items-center gap-2'>
								{video.channel.user.name}
								{video.channel.isVerified && <VerifiedBadge size={15} />}
							</span>
						</Heading>
					</Link>

					<div className='text-gray-400 text-sm flex items-center gap-1'>
						{transformCount(video.channel.subscribers.length)} subscribers
					</div>
				</div>
			</div>

			<SubscribeButton slug={video.channel.slug} />
		</div>
	)
}
