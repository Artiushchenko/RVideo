import dayjs from 'dayjs'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { processHtmlContent } from '@/utils/process-html-content'

import { StudioActions } from './StudioActions'
import type { IFullVideo } from '@/types/video.types'

interface Props {
	video: IFullVideo
}

export function StudioVideoItem({ video }: Props) {
	const { initialContent } = processHtmlContent(video.description, 1)

	return (
		<div className='grid grid-cols-[0.56fr_1.1fr_0.25fr_0.2fr_0.25fr_0.2fr_0.25fr] gap-6 mb-6 border-b border-b-border pb-6 last:border-none'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				target='_blank'
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

			<div>
				<Link
					href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
					className='line-clamp-1 text-lg mb-1'
				>
					{video.title}
				</Link>

				<div className='text-sm opacity-50'>{parse(initialContent)}</div>
			</div>

			<div>
				<div className='text-gray-400 text-sm'>{dayjs(video.createdAt).format('DD MMM YYYY')}</div>

				<div className='text-gray-500 text-sm'>Published</div>
			</div>

			<div>
				<div className='text-gray-400 text-sm'>
					{video.viewsCount.toLocaleString('ru-RU')} views
				</div>
			</div>

			<div>
				<div className='text-gray-400 text-sm'>
					{video.comments.length.toLocaleString('ru-RU')} comments
				</div>
			</div>

			<div>
				<div className='text-gray-400 text-sm'>
					{video.likes.length.toLocaleString('ru-RU')} likes
				</div>
			</div>

			<StudioActions video={video} />
		</div>
	)
}
