import { useMutation } from '@tanstack/react-query'
import { AnimatePresence, m } from 'framer-motion'
import { Check, ListVideo } from 'lucide-react'

import { useOutside } from '@/hooks/useOutside'

import { useUserPlaylists } from '@/app/my/playlists/useUserPlaylists'
import { playlistService } from '@/services/playlist.service'
import type { ISingleVideoResponse } from '@/types/video.types'

interface Props {
	video: ISingleVideoResponse
}

export function SaveToPlaylist({ video }: Props) {
	const { data, refetch: refetchPlaylists } = useUserPlaylists()
	const { isShow, ref, setIsShow } = useOutside<HTMLDivElement>(false)

	const { mutate: togglePlaylist, isPending } = useMutation({
		mutationKey: ['toggle video'],
		mutationFn: (playlistId: string) => playlistService.toggleVideoInPlaylist(playlistId, video.id),
		async onSuccess() {
			const { toast } = await import('react-hot-toast')
			toast.success(isInPlaylist ? 'Successfully removed' : 'Successfully added', {
				id: 'playlist'
			})
			setIsShow(false)
			refetchPlaylists()
		}
	})

	const isInPlaylist = data?.data.some(playlist => playlist.videos.some(v => v.id === video.id))

	return (
		<div
			className='relative z-10'
			ref={ref}
		>
			<button
				onClick={() => setIsShow(!isShow)}
				className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'
			>
				<ListVideo size={20} />
				{isInPlaylist ? 'Saved' : 'Save'}
			</button>

			<AnimatePresence>
				{isShow && (
					<m.ul
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 10 }}
						transition={{ duration: 0.3 }}
						className='bg-gray-800 px-4 py-2 rounded absolute bottom-[125%] right-0 shadow w-max max-w-34'
					>
						{data?.data.map(playlist => (
							<li
								key={playlist.id}
								className='mb-1 last:mb-0'
							>
								<button
									onClick={() => {
										togglePlaylist(playlist.id)
									}}
									className='border-b border-b-transparent transition-colors hover:text-primary flex items-center gap-1'
									disabled={isPending}
								>
									{playlist.videos.some(v => v.id === video.id) && <Check size={16} />}{' '}
									{playlist.title}
								</button>
							</li>
						))}
					</m.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
