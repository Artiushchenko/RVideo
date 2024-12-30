'use client'

import dynamicNext from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { VerifiedBadge } from '@/ui/VerifiedBadge'

import { PAGE } from '@/config/public-page.config'

import { transformCount } from '@/utils/transform-count'

import type { ISingleVideoResponse } from '@/types/video.types'

const DynamicSubscribeButton = dynamicNext(
	() => import('@/components/SubscribeButton').then(mod => mod.SubscribeButton),
	{ ssr: false, loading: () => <SkeletonLoader className='w-36 h-10 rounded-md' /> }
)

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

			<DynamicSubscribeButton slug={video.channel.slug} />
		</div>
	)
}
