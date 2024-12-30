import * as m from 'framer-motion/m'
import Image from 'next/image'
import Link from 'next/link'

import { PAGE } from '@/config/public-page.config'

import type { IPlaylist } from '@/types/playlist.types'

interface Props {
	playlist: IPlaylist
}

export function PlaylistItem({ playlist }: Props) {
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
			<div className='mb-6'>
				<Link
					href={PAGE.PLAYLISTS(playlist.id)}
					className='block relative'
				>
					<div className='rounded-lg shadow-lg absolute w-10/12 h-full left-[8.5%] -top-3 bg-[#666876]' />

					<div className='rounded-lg shadow-lg absolute w-11/12 h-full left-[4.1%] -top-1.5 inset-0 bg-[#9294a1]' />

					{!!playlist.videos[0]?.thumbnailUrl ? (
						<Image
							src={playlist.videos[0]?.thumbnailUrl}
							width={290}
							height={160}
							alt={playlist.title}
							quality={100}
							className='rounded-lg shadow-lg relative'
						/>
					) : (
						<div className='bg-gray-300 w-[227] h-[128.5] rounded-lg shadow-lg relative flex items-center justify-center text-black uppercase font-medium text-2xl'>
							Empty
						</div>
					)}

					<div className='absolute bottom-1.5 right-1.5 font-medium px-1.5 py-0.5 text-xs bg-black rounded'>
						{playlist.videos.length} videos
					</div>
				</Link>

				<div className='mt-2 font-medium'>
					<Link
						href={PAGE.PLAYLISTS(playlist.id)}
						className='line-clamp-2 leading-[1.3]'
					>
						{playlist.title}
					</Link>
				</div>
			</div>
		</m.div>
	)
}
