import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import type { IVideo } from '@/types/video.types'

interface Props {
	video: Pick<IVideo, 'publicId' | 'title'>
}

export function VideoItemTitle({ video }: Props) {
	return (
		<Link
			href={PAGE.VIDEO(video.publicId)}
			className='line-clamp-2 leading-[1.3]'
		>
			{video.title}
		</Link>
	)
}
