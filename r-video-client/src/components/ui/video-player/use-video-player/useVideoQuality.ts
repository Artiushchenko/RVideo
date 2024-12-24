import { type Dispatch, type RefObject, type SetStateAction, useState } from 'react'

import { EnumVideoPlayerQuality, type HTMLCustomVideoElement } from '../video-player.types'

interface Props {
	setIsPlaying: Dispatch<SetStateAction<boolean>>
	fileName: string
	currentTime: number
}

export function useVideoQuality(
	playerRef: RefObject<HTMLCustomVideoElement | null>,
	{ setIsPlaying, fileName, currentTime }: Props
) {
	const [quality, setQuality] = useState(EnumVideoPlayerQuality['1080p'])

	const changeQuality = (quality: EnumVideoPlayerQuality) => {
		if (!playerRef.current) {
			return
		}

		setQuality(quality)

		playerRef.current.src = `/uploads/videos/${quality}/${fileName}`
		playerRef.current.currentTime = currentTime
		playerRef.current.play()
		setIsPlaying(true)
	}

	return { quality, changeQuality }
}
