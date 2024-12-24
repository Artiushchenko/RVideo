'use client'

import { useMutation } from '@tanstack/react-query'
import { Heart, ListPlus } from 'lucide-react'
import { startTransition, useEffect, useState } from 'react'

import { COLORS } from '@/constants/colors.constant'

import { useProfile } from '@/hooks/useProfile'

import { transformCount } from '@/utils/transform-count'

import { userService } from '@/services/user.service'
import type { ISingleVideoResponse } from '@/types/video.types'

export function VideoActions({ video }: { video: ISingleVideoResponse }) {
	const { profile, refetch } = useProfile()

	const isLiked = profile?.likes.some(like => like.videoId === video.id) || false

	const [isLikedLocal, setIsLikedLocal] = useState(isLiked)

	const [optimisticLike, setOptimisticLike] = useState<number>(video.likes.length)

	useEffect(() => {
		setIsLikedLocal(isLiked)
	}, [isLiked])

	const { mutate } = useMutation({
		mutationKey: ['like', video.id],
		mutationFn: () => userService.toggleLike(video.id),
		onMutate() {
			startTransition(() => {
				const newIsLiked = !isLikedLocal
				setIsLikedLocal(newIsLiked)
				setOptimisticLike(prevLikeCount => {
					if (newIsLiked) {
						return prevLikeCount + 1
					}

					return prevLikeCount - 1
				})
			})
		},
		onError() {
			startTransition(() => {
				const revertedIsLiked = !isLikedLocal
				setIsLikedLocal(revertedIsLiked)
				setOptimisticLike(prevLikeCount => {
					if (revertedIsLiked) {
						return prevLikeCount + 1
					}

					return prevLikeCount - 1
				})
			})
		},
		onSuccess() {
			refetch()
		}
	})

	return (
		<div className='flex items-center gap-7'>
			<button className='flex items-center gap-1 transition-opacity opacity-80 hover:opacity-100'>
				<ListPlus size={20} />
				Save
			</button>

			<button
				className='text-primary flex items-center gap-1.5 transition-opacity opacity-80 hover:opacity-100'
				onClick={() => mutate()}
			>
				<Heart
					size={20}
					fill={isLikedLocal ? COLORS.primary : 'transparent'}
				/>
				{transformCount(optimisticLike)}
			</button>
		</div>
	)
}
