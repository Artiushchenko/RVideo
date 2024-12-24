import { type RefObject, useState } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

export function usePlayPause(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const [isPlaying, setIsPlaying] = useState(false)

	const togglePlayPause = () => {
		if (isPlaying) {
			playerRef.current?.pause()
		} else {
			playerRef.current?.play()
		}

		setIsPlaying(!isPlaying)
	}

	return { isPlaying, togglePlayPause, setIsPlaying }
}
