import { type RefObject } from 'react'

import type { HTMLCustomVideoElement } from '../video-player.types'

export function useFullScreen(playerRef: RefObject<HTMLCustomVideoElement | null>) {
	const toggleFullScreen = () => {
		if (!playerRef.current) {
			return
		}

		if (playerRef.current.requestFullscreen) {
			playerRef.current.requestFullscreen()
		} else if (playerRef.current?.mozRequestFullScreen) {
			playerRef.current.mozRequestFullScreen()
		} else if (playerRef.current.webkitRequestFullScreen) {
			playerRef.current.webkitRequestFullScreen()
		} else if (playerRef.current.msRequestFullScreen) {
			playerRef.current.msRequestFullScreen()
		}
	}

	return { toggleFullScreen }
}
