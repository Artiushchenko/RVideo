'use client'

import { ListVideo } from 'lucide-react'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'

import { useOutside } from '@/hooks/useOutside'

import { CreatePlaylist } from './CreatePlaylist'
import { PlaylistItem } from './PlaylistItem'
import { useUserPlaylists } from './useUserPlaylists'

export function PlaylistsPage() {
	const { isShow, ref, setIsShow } = useOutside<HTMLDivElement>(false)
	const { data, isLoading, refetch } = useUserPlaylists()

	return (
		<section>
			<div className='flex justify-between items-center mb-6'>
				<Heading
					isPageHeading
					Icon={ListVideo}
					className='mb-0'
				>
					Playlists
				</Heading>

				<Button
					variant='secondary'
					onClick={() => setIsShow(true)}
				>
					Create a playlist
				</Button>
			</div>

			<div className='grid-5-cols'>
				{isLoading ? (
					<SkeletonLoader
						count={3}
						className='h-28 rounded-md mb-6'
					/>
				) : data?.data?.length ? (
					data?.data?.map(playlist => (
						<PlaylistItem
							key={playlist.id}
							playlist={playlist}
						/>
					))
				) : (
					<p>Playlist not found!</p>
				)}
			</div>

			{isShow && (
				<CreatePlaylist
					refetch={refetch}
					onClose={() => setIsShow(false)}
					ref={ref}
				/>
			)}
		</section>
	)
}
