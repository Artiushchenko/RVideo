'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Edit, ExternalLink, Trash2 } from 'lucide-react'
import Link from 'next/link'
import toast, { type Toast } from 'react-hot-toast'

import { PAGE } from '@/config/public-page.config'
import { STUDIO_PAGE } from '@/config/studio-page.config'

import { studioVideoService } from '@/services/studio/studio-video.service'
import type { IVideo } from '@/types/video.types'

interface Props {
	video: IVideo
}

export function StudioActions({ video }: Props) {
	const queryClient = useQueryClient()

	const { mutate: deleteVideo, isPending: isDeletePending } = useMutation({
		mutationKey: ['delete video'],
		mutationFn: () => studioVideoService.delete(video.id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['studioVideoList']
			})

			toast.success('Video successfully deleted')
		}
	})

	const handleDelete = () => {
		toast((t: Toast) => (
			<div>
				<p className='text-center py-3 px-1'>Are you sure you want to delete this video?</p>

				<div className='flex justify-center gap-4 mt-2'>
					<button
						onClick={() => {
							deleteVideo()
							toast.dismiss(t.id)
						}}
						className='text-red-600 p-1 border border-primary rounded-md transition-colors hover:bg-primary hover:text-white'
					>
						Delete
					</button>

					<button
						onClick={() => toast.dismiss(t.id)}
						className='text-gray-400 p-1 border border-gray-400 rounded-md transition-colors hover:bg-gray-400 hover:text-white'
					>
						Cancel
					</button>
				</div>
			</div>
		))
	}

	return (
		<div className='flex justify-center items-start gap-5'>
			<Link
				href={PAGE.VIDEO(video.publicId)}
				className='text-blue-600 transition-opacity opacity-70 hover:opacity-100'
				target='_blank'
				title='Open in new tab'
			>
				<ExternalLink size={18} />
			</Link>

			<Link
				href={STUDIO_PAGE.EDIT_VIDEO(video.id)}
				className='text-orange-500 transition-opacity opacity-70 hover:opacity-100'
				title='Edit video'
			>
				<Edit size={18} />
			</Link>

			<button
				onClick={() => handleDelete()}
				className='text-red-600 transition-opacity opacity-70 hover:opacity-100'
				title='Delete video'
				disabled={isDeletePending}
			>
				<Trash2 size={18} />
			</button>
		</div>
	)
}
