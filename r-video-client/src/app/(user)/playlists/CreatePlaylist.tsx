'use client'

import { useMutation } from '@tanstack/react-query'
import * as m from 'framer-motion/m'
import { X } from 'lucide-react'
import type { RefObject } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useHotkeys } from 'react-hotkeys-hook'

import { Heading } from '@/ui/Heading'
import { SkeletonLoader } from '@/ui/SkeletonLoader'
import { Button } from '@/ui/button/Button'
import { Field } from '@/ui/field/Field'

import { playlistService } from '@/services/playlist.service'
import type { IPlaylistData } from '@/types/playlist.types'

interface Props {
	refetch: () => void
	onClose: () => void
	ref: RefObject<HTMLDivElement | null>
}

export function CreatePlaylist({ refetch, onClose, ref }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<IPlaylistData>({
		mode: 'onChange'
	})

	useHotkeys('esc', e => {
		e.preventDefault()
		onClose()
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['create a playlist'],
		mutationFn: (data: IPlaylistData) => playlistService.createPlaylist(data),
		onSuccess() {
			refetch()
			reset()
			onClose()
			toast.success('Playlist successfully created')
		},
		onError() {
			toast.error('Error creating playlist')
		}
	})

	const onSubmit: SubmitHandler<IPlaylistData> = data => {
		mutate(data)
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<m.div
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
				transition={{ duration: 0.3 }}
				style={{
					position: 'relative',
					width: '26rem'
				}}
			>
				<div
					className='bg-gray-800 rounded-lg p-6'
					ref={ref}
				>
					<button
						onClick={onClose}
						className='absolute top-2 right-2 text-white'
						title='Close a modal window'
					>
						<X size={22} />
					</button>

					<Heading classNameHeading='text-xl'>Create a playlist</Heading>

					<form onSubmit={handleSubmit(onSubmit)}>
						{isPending ? (
							<SkeletonLoader count={2} />
						) : (
							<>
								<Field
									label='Title'
									type='text'
									registration={register('title', {
										required: 'Title is required!'
									})}
									error={errors.title?.message}
									placeholder='Enter title'
								/>

								<Field
									label='Video public ID (from URL)'
									type='text'
									registration={register('videoPublicId', {
										required: 'Video public ID is required!',
										minLength: {
											value: 10,
											message: 'Video public ID must be exactly 10 characters!'
										},
										maxLength: {
											value: 10,
											message: 'Video public ID must be exactly 10 characters!'
										}
									})}
									error={errors.videoPublicId?.message}
									placeholder='Enter video public ID'
								/>
							</>
						)}

						<div className='text-center mt-4'>
							<Button
								type='submit'
								isLoading={isPending}
							>
								Create
							</Button>
						</div>
					</form>
				</div>
			</m.div>
		</div>
	)
}
